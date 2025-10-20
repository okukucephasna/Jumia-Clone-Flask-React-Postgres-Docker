import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/files/css/style.css";
import "../lightslider/dist/css/lightslider.css";

const Home = () => {
  const [smartphones, setSmartphones] = useState([]);
  const [clothes, setClothes] = useState([]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/home");
        setSmartphones(res.data.smartphones || []);
        setClothes(res.data.clothes || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar user={localStorage.getItem("username")} />
      <div className="container-fluid mt-3">
        <h1>Hello Soko Garden!</h1>

        {/* Carousel can be another React component */}
        {/* <Carousel /> */}

        <br />

        {/* Smartphones Slider */}
        <section className="slider p-4">
          <ul className="cs-hidden autoWidth list-unstyled d-flex flex-wrap">
            {smartphones.map((phone) => (
              <li key={phone[0]} className="me-3 mb-3">
                <div className="box border p-2">
                  <div className="slide-img position-relative">
                    <img
                      src={`/static/images/${phone[5]}`}
                      alt={phone[1]}
                      width="150"
                      height="150"
                      className="img-fluid"
                    />
                    <div className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
                      <Link to={`/single/${phone[0]}`} className="btn btn-success">
                        Buy Now
                      </Link>
                    </div>
                  </div>
                  <div className="detail-box mt-2">
                    {phone[1]}
                    <br />
                    <b className="text-warning">KES {phone[3]}</b>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <br />

        {/* Clothes Slider */}
        <section className="slider p-4">
          <ul className="cs-hidden autoWidth list-unstyled d-flex flex-wrap">
            {clothes.map((cloth) => (
              <li key={cloth[0]} className="me-3 mb-3">
                <div className="box border p-2">
                  <div className="slide-img position-relative">
                    <img
                      src={`/static/images/${cloth[5]}`}
                      alt={cloth[1]}
                      width="150"
                      height="150"
                      className="img-fluid"
                    />
                    <div className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
                      <Link to={`/single/${cloth[0]}`} className="btn btn-success">
                        Buy Now
                      </Link>
                    </div>
                  </div>
                  <div className="detail-box mt-2">
                    {cloth[1]}
                    <br />
                    <b className="text-warning">KES {cloth[3]}</b>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default Home;
