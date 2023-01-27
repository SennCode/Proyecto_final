import React from "react";
import { Link } from "react-router-dom";
import "/workspace/react-flask-hello/src/front/styles/navbar.css";

export const Navbar = () => {
  return (
    <div class="container-fluid container-nav">
      <nav className="navbar navbar-expand-lg navbar-light navbar-color">
        <div class="container-fluid">
          <Link to="/">
            <h2 className="navbar-brand text-dark ms-5" href="#">
              3Dclothes
            </h2>
          </Link>

          <button
            class="navbar-toggler text-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse " id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto me-5">
              <li className="nav-item ms-3">
                <a className=" hover-navbar" href="#">
                  3Dfiles
                </a>
              </li>
              <li className="nav-item ms-3">
                <a className="hover-navbar" href="#">
                  Patterns
                </a>
              </li>
              <li className="nav-item ms-3">
                <a className=" hover-navbar" href="#">
                  Prints
                </a>
              </li>
            </ul>
            <i class="far fa-user-circle me-5 mt-3 hover-navbar"></i>
          </div>
        </div>
      </nav>
    </div>
  );
};
