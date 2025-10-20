import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password1: "",
    password2: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const { username, email, phone, password1, password2 } = formData;

    if (password1.length < 8) {
      setErrorMsg("Password must be more than 8 characters");
      return;
    }

    if (password1 !== password2) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        username,
        email,
        phone,
        password1,
        password2,
      });

      if (response.data.success) {
        setSuccessMsg(response.data.success);
        setTimeout(() => navigate("/signin"), 1500);
      }
    } catch (err) {
      if (err.response && err.response.data.error) {
        setErrorMsg(err.response.data.error);
      } else {
        setErrorMsg("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar user={localStorage.getItem("username")} />
      <div className="container mt-4">
        <section className="row justify-content-center">
          <div className="col-md-4">
            <h3 className="mb-3">Create Account</h3>

            {successMsg && <div className="text-success mb-2">{successMsg}</div>}
            {errorMsg && <div className="text-danger mb-2">{errorMsg}</div>}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Your Username"
                className="form-control mb-3"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="form-control mb-3"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                className="form-control mb-3"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password1"
                placeholder="Your Password"
                className="form-control mb-3"
                value={formData.password1}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password2"
                placeholder="Confirm Password"
                className="form-control mb-3"
                value={formData.password2}
                onChange={handleChange}
                required
              />

              <input
                type="submit"
                value="Sign Up"
                className="btn btn-info w-100"
              />
            </form>

            <div className="mt-3">
              <Link to="/signin">
                Already Have an Account? Login
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Signup;
