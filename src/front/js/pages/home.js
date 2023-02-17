import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import hoodie_black from "/workspace/react-flask-hello/src/front/img/hoodie_black.png";
import hoodie from "/workspace/react-flask-hello/src/front/img/hoodie.png";
import hoodie_clonX from "/workspace/react-flask-hello/src/front/img/hoodie_clonX.png";
import socks from "/workspace/react-flask-hello/src/front/img/socks.png";
import Parallax from "../component/parallax.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    /* title */

    <div>
      <div className="container-fluid justify-content-center container-nav">
        <section id="title">
          <div className="row">
            <div className="col-lg-6">
              <h1 className="text-sm text-lg mt-5 ms-5 h1-title d-flex text-focus-in">
                Community where you can share 3D files and patterns from the
                main fashion programs!
              </h1>
            </div>
            <div className="col-lg-6">
              <p>
                <img className="img-hoodie img-fluid kenburns-top" src={hoodie_black} />
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* featured  */}

      <section id="features">
        <div className="container-fluid justify-content-center">
          <div className="row pt-5">
            <div className="featured-box col-lg-4">
              <i className="icon fa-solid fa-circle-check fa-4x icon-colorful mb-2"></i>
              <h3 className="h3-features">Easy to use.</h3>
              <p className="p-features">Download and use.</p>
            </div>

            <div className="featured-box col-lg-4">
              <i className="icon fa-solid fa-bullseye fa-4x icon-colorful mb-2"></i>
              <h3 className="h3-features">Elite Clientele</h3>
              <p className="p-features">Only profesionals.</p>
            </div>

            <div className="featured-box col-lg-4">
              <i className="icon fa-solid fa-heart fa-4x icon-colorful mb-2"></i>
              <h3 className="h3-features">Guaranteed to work.</h3>
              <p className="p-features">HD Files.</p>
            </div>
          </div>
        </div>
      </section>

      {/* carousel */}
      <section className="pt-5" id="carousel">
        <h2 className="h2-carousel pb-2 mx-5">
          The most modern and current designs
        </h2>
        <div
          id="carouselExampleSlidesOnly" data-bs-interval="3000"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={hoodie_clonX}
                className="img-fluid carousel-1-img"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={hoodie}
                className="img-fluid carousel-1-img"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img src={socks} className="img-fluid carousel-1-img" alt="..." />
            </div>
            <div className="carousel-item">
              <img
                src={hoodie_black}
                className="img-fluid carousel-1-img"
                alt="..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* cards */}
      <section id="pricing">
        <h2 className="h2card">A Plan for Everyone</h2>
        <p className="p-cards">Simple and affordable price plans for your.</p>

        {/* CARD 1 */}
        <div className="row">
          <div className="pricing-column col-lg-4 col-md-6 pb-3 card-size-home">
            <div className="card h-200 d-flex">
              <div className="card-header">
                <h3>Free</h3>
              </div>
              <div className="card-body">
                <h2 className="h2card">Free</h2>
                <p className="p-cards">5 Downloads Per Day</p>
                <p className="p-cards">10 Messages Per Day</p>
                <div className="d-grid gap-2 pt-5 mt-5">
                  <button
                    className="btn btn-lg btn-dark btn-outline-secondary p-cards"
                    type="button"
                  >
                    <Link
                      to="/register_user"
                      className="text-white text-decoration-none"
                    >
                      Sign Up
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* CARD 2 */}
          <div className="pricing-column col-lg-4 col-md-6 pb-3 card-size-home">
            <div className="card h-200 d-flex">
              <div className="card-header">
                <h3>Bussiness</h3>
              </div>
              <div className="card-body">
                <h2 className="h2card">$49 / mo</h2>
                <p className="p-cards">Unlimited Downloads</p>
                <p className="p-cards">Unlimited Messages</p>
                <p className="p-cards">Unlimited App Usage</p>
                <div className="d-grid gap-2 mt-5 pt-2">
                  <button
                    className="btn btn-lg btn-dark btn-outline-secondary p-cards"
                    type="button"
                  >
                    <Link
                      to="/register_user"
                      className="text-white text-decoration-none"
                    >
                      Sign Up
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* CARD 3 */}
          <div className="pricing-column col-lg-4 card-size-home">
            <div className="card h-200 d-flex">
              <div className="card-header">
                <h3>Premium</h3>
              </div>
              <div className="card-body">
                <h2 className="h2card">$99 / mo</h2>
                <p className="p-cards">Pirority Listing</p>
                <p className="p-cards">Unlimited Downloads</p>
                <p className="p-cards">Unlimited Messages</p>
                <p className="p-cards">Unlimited App Usage</p>
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-lg btn-dark btn-outline-secondary p-cards"
                    type="button"
                  >
                    <Link
                      to="/register_user"
                      className="text-white text-decoration-none"
                    >
                      Sign Up
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* cta  */}

      <section id="cta">
        <div className="container-fluid justify-content-center">
          <div className="row pt-5">
            <div className="featured-box">
              <h3 className="h3-cta justify-content-center">
                Find your perfect clothing for your personal project or contact
                the artist directly to create a personalized collection.{" "}
              </h3>
              <p className="p-cta">Download and use.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
