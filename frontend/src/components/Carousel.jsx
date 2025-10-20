import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Carousel = () => {
  return (
    <section className="row">
      <div className="col-md-12">
        <div
          id="myCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-pause="false"
        >
          {/* Wrapper for carousel items */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="../static/files/slide1.jpg"
                className="d-block w-100"
                alt="Slide 1"
                height="400"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>Some placeholder content for the first slide.</p>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="../static/files/slide2.jpg"
                className="d-block w-100"
                alt="Slide 2"
                height="400"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>Some placeholder content for the second slide.</p>
              </div>
            </div>
          </div>

          {/* Carousel controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
