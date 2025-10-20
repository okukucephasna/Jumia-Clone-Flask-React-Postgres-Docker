from flask import Flask, request, jsonify, render_template, send_from_directory, session, redirect
from flask_cors import CORS
import psycopg2
import requests
import datetime
import base64
from requests.auth import HTTPBasicAuth
import os

app = Flask(__name__, static_folder='frontend/build', static_url_path='/')
app.secret_key = "AW_r%@jN*HU4AW_r%@jN*HU4AW_r%@jN*HU4"

# Enable CORS for all routes
CORS(app)

# Database connection function
def get_connection():
    return psycopg2.connect(
        host='db',        # Docker Compose service name
        user='postgres',
        password='root',
        database='strangers',
        port=5432
    )


# ---------------- Serve Frontend ----------------
@app.route('/')
def serve_frontend():
    """Serve the React frontend build"""
    return send_from_directory(app.static_folder, 'index.html')


@app.errorhandler(404)
def not_found(e):
    """Serve React for any unknown route (for React Router support)"""
    return send_from_directory(app.static_folder, 'index.html')


# ---------------- Flask API Routes ----------------
@app.route('/api/home')
def home():
    connection = get_connection()
    cursorSmartphone = connection.cursor()
    cursorClothes = connection.cursor()

    sqlSmartphone = "SELECT * FROM products WHERE product_category = 'Smartphone'"
    sqlClothes = "SELECT * FROM products WHERE product_category = 'Clothes'"

    cursorSmartphone.execute(sqlSmartphone)
    cursorClothes.execute(sqlClothes)

    smartphones = cursorSmartphone.fetchall()
    clothes = cursorClothes.fetchall()

    cursorSmartphone.close()
    cursorClothes.close()
    connection.close()

    return jsonify({
        "smartphones": smartphones,
        "clothes": clothes
    })


@app.route('/api/single/<product_id>')
def single(product_id):
    connection = get_connection()
    cursor1 = connection.cursor()

    sql1 = "SELECT * FROM products WHERE product_id = %s"
    cursor1.execute(sql1, (product_id,))
    product = cursor1.fetchone()

    if not product:
        return jsonify({"error": "Product not found"}), 404

    category = product[4]

    sql2 = "SELECT * FROM products WHERE product_category = %s LIMIT 4"
    cursor2 = connection.cursor()
    cursor2.execute(sql2, (category,))
    similar = cursor2.fetchall()

    cursor1.close()
    cursor2.close()
    connection.close()

    return jsonify({
        "product": product,
        "similar": similar
    })


@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    phone = data.get('phone')
    password1 = data.get('password1')
    password2 = data.get('password2')

    if len(password1) < 8:
        return jsonify({"error": "Password must be more than 8 characters"}), 400
    elif password1 != password2:
        return jsonify({"error": "Passwords do not match"}), 400

    connection = get_connection()
    cursor = connection.cursor()

    sql = '''INSERT INTO users(username, password, phone, email)
             VALUES (%s, %s, %s, %s)'''
    cursor.execute(sql, (username, password1, phone, email))
    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({"success": "Registered Successfully"})


@app.route('/api/signin', methods=['POST'])
def signin():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    connection = get_connection()
    cursor = connection.cursor()

    sql = "SELECT * FROM users WHERE username = %s AND password = %s"
    cursor.execute(sql, (username, password))
    user = cursor.fetchone()

    cursor.close()
    connection.close()

    if not user:
        return jsonify({"error": "Invalid Credentials"}), 401

    session['key'] = username
    return jsonify({"success": True, "username": username})


@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"success": True})


# ---------------- MPESA Integration ----------------
@app.route('/api/mpesa', methods=['POST'])
def mpesa_payment():
    data = request.get_json()
    phone = str(data['phone'])
    amount = str(data['amount'])

    consumer_key = "GTWADFxIpUfDoNikNGqq1C3023evM6UH"
    consumer_secret = "amFbAoUByPV2rM5A"
    api_URL = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

    r = requests.get(api_URL, auth=HTTPBasicAuth(consumer_key, consumer_secret))
    data = r.json()
    access_token = "Bearer " + data['access_token']

    timestamp = datetime.datetime.today().strftime('%Y%m%d%H%M%S')
    passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
    business_short_code = "174379"

    data_str = business_short_code + passkey + timestamp
    encoded = base64.b64encode(data_str.encode())
    password = encoded.decode('utf-8')

    payload = {
        "BusinessShortCode": business_short_code,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": business_short_code,
        "PhoneNumber": phone,
        "CallBackURL": "https://modcom.co.ke/job/confirmation.php",
        "AccountReference": "account",
        "TransactionDesc": "account"
    }

    headers = {
        "Authorization": access_token,
        "Content-Type": "application/json"
    }

    url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    response = requests.post(url, json=payload, headers=headers)
    print(response.text)

    return jsonify({"message": "Please complete payment on your phone."})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
