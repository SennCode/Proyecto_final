import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "/workspace/react-flask-hello/src/front/styles/navbar.css";
import config from "../store/config";

export const Navbar = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ files, setFiles ] = useState([]);
  const [ search, setSearch ] = useState("");
  const results = async e =>{
    e.preventDefault()
    await fetch(`${config.HOSTNAME}/api/store/${search}`)
    .then(response => response.json())
    .then(data => {
      setFiles(data)
      console.log(data)
      
    })
   
  };

  const changeState = e =>{
    setSearch(e.target.value)
    console.log(e.target.value)
  }
  let resultado = []
  if (!search){
    resultado = files
  }

  const selectNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="container-fluid container-nav">
      <nav className="navbar navbar-expand-lg navbar-light navbar-color">
        <div className="container-fluid">
          <Link to="/">
            <h2 className="navbar-brand text-info ms-5">3Dclothes</h2>
          </Link>

          {/* --- Navegacion --- */}
          <button
            className="navbar-toggler text-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={selectNavbar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`${isOpen ? "show" : ""} collapse navbar-collapse`}
            id="navbarTogglerDemo02"
          >
            <ul className="navbar-nav ms-auto me-5">
              <li className="nav-item ms-3">
                <Link
                  to="/files3d_category"
                  className=" hover-navbar"
                  onClick={handleLinkClick}
                >
                  3DFiles
                </Link>
              </li>
              <li className="nav-item ms-3">
                <Link
                  to="/patterns_category"
                  className=" hover-navbar"
                  onClick={handleLinkClick}
                >
                  Patterns
                </Link>
              </li>
              <li className="nav-item ms-3">
                <Link
                  to="/prints_category"
                  className=" hover-navbar"
                  onClick={handleLinkClick}
                >
                  Prints
                </Link>
              </li>
            </ul>
            {/* --- Search --- */}
            <form className="d-flex container-fluid mt-2" role="search" onSubmit={results}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={changeState}
              />
              <button className="btn button_create_user" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>

            {/* DESPLEGABLE USUARIO */}

            <div className="d-flex justify-content-end ">
              <li className="nav-item dropdown d-flex justify-content-start container">
                <a
                  className="hover-navbar"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="far fa-user-circle fa-2x me-5 mt-3 mb-3 hover-navbar" />
                </a>
                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-lg-end background_user_dropdown">
                  <li>
                    <Link
                      to="/login"
                      className="dropdown-item dropdown-item-backgorund"
                    >
                      Tú Cuenta
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="dropdown-item dropdown-item-backgorund"
                    >
                      Descargas
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="dropdown-item dropdown-item-backgorund"
                    >
                      Lista Favoritos
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="dropdown-item dropdown-item-backgorund"
                    >
                      Mis Artículos
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="dropdown-item dropdown-item-backgorund"
                    >
                      Cerrar Sesión
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register_user"
                      className="dropdown-item dropdown-item-backgorund"
                    >
                      New around here? Sign up
                    </Link>
                  </li>
                </ul>
              </li>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
