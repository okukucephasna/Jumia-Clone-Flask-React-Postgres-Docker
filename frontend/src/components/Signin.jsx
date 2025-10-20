import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await axios.post("http://localhost:5000/api/signin", {
        username,
        password,
      });

      if (response.data.success) {
        setSuccessMsg("Signed in successfully!");
        localStorage.setItem("username", response.data.username);
        setTimeout(() => navigate("/"), 1000);
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
            <h3 className="mb-3">Login Account</h3>

            {successMsg && <div className="text-success mb-2">{successMsg}</div>}
            {errorMsg && <div className="text-danger mb-2">{errorMsg}</div>}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Your Username"
                className="form-control mb-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Your Password"
                className="form-control mb-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <input
                type="submit"
                value="Sign In"
                className="btn btn-info w-100"
              />
            </form>

            <div className="mt-3">
              <Link to="/signup">
                Don't Have an Account? Create One
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Signin;
