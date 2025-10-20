import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  return (
    <section className="row">
      <div className="col-md-12">
        <nav className="navbar navbar-expand-md navbar-light btn-light p-3">
          <Link to="/" className="navbar-brand">
            Soko <b className="text-success">Garden</b>
          </Link>

          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav">
              <Link to="/" className="nav-item nav-link">
                Home
              </Link>
              <Link to="/blog" className="nav-item nav-link">
                Blog
              </Link>
              <Link to="/about" className="nav-item nav-link">
                About Us
              </Link>
            </div>

            <div className="ms-auto d-flex align-items-center">
              {user ? (
                <>
                  <p className="mb-0 me-3">Logged in: {user}</p>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/signin" className="btn btn-outline-success btn-sm">
                  Not Signed in? Sign In Now
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
