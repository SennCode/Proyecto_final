import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "/workspace/react-flask-hello/src/front/styles/navbar.css";
import config from "../store/config";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import "/workspace/react-flask-hello/src/front/styles/night.css";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const { id, username } = useParams();
  const [user, setUser] = useState({});
  const [search, setSearch] = useState("");
  const { store, actions } = useContext(Context);
  const [loggedOut, setLoggedOut] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);

  const navigate = useNavigate();

  const results = async (e) => {
    e.preventDefault();
    await fetch(`${config.HOSTNAME}/api/search/${search}`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setFiles(data);
        console.log(data);
        actions.set_search_results(data.files3d);
        navigate(`/search_results/${search}`);
      });
  };

  // DARK MODE
  
  useEffect(() => {
    localStorage.setItem("isNightMode", isNightMode);
  }, [isNightMode]);

  useEffect(() => {
    const storedIsNightMode = localStorage.getItem("isNightMode");
    if (storedIsNightMode !== null) {
      setIsNightMode(JSON.parse(storedIsNightMode));
    }
  }, []);

  useEffect(() => {
    if (isNightMode) {
      document.body.classList.add("isNightMode");
    } else {
      document.body.classList.remove("isNightMode");
    }
  }, [isNightMode]);

  useEffect(() => {
    fetch(`${config.HOSTNAME}/api/users/${localStorage.user_id}`)
      .then((res) => res.json())

      .then((data) => setUser(data));
  }, []);

  const changeState = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };
  let resultado = [];
  if (!search) {
    resultado = files;
  }

  const selectNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);

    const handleLogout = () => {
      // Código para cerrar sesión
      setLoggedOut(true);
    };
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
            <form
              className="d-flex container-fluid mt-2"
              role="search"
              onSubmit={results}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={changeState}
              />
              <button className="btn btn-dark" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>
            <div><button
              className="btn btn-dark btn-dark-mode btn-sm"
              onClick={() => setIsNightMode(!isNightMode)}
              style={{ borderRadius: "50%" }}
            >
              <i className={`fas ${isNightMode ? "fa-sun" : "fa-moon"}`}></i>
            </button></div>
            

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
                  {user.img && localStorage.getItem("access_token") ? (
                    <img
                      src={`${user.img}?${loggedOut}`}
                      alt="User avatar"
                      className="rounded-circle img_avatar"
                      width="40"
                      height="40"
                    />
                  ) : (
                    <i className="far fa-user-circle fa-2x me-5 mt-3 mb-3 hover-navbar" />
                  )}
                </a>
                <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-lg-end background_user_dropdown">
                  {localStorage.getItem("access_token") ? (
                    <>
                      <li>
                        <button
                          className="dropdown-item dropdown-item-backgorund"
                          onClick={() => navigate("/profile")}
                        >
                          My profile
                          <i className="fas ms-2 fa-user-cog"></i>
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item dropdown-item-backgorund"
                          onClick={() => navigate("/favorites")}
                        >
                          Favorites
                          <i className="fas ms-2 fa-star"></i>
                        </button>
                      </li>

                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          className="dropdown-item dropdown-item-backgorund"
                          onClick={() => {
                            localStorage.removeItem("access_token");
                            localStorage.removeItem("user_id");
                            navigate("/");
                          }}
                        >
                          Leave
                          <i className="fas ms-2 fa-sign-out-alt"></i>
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/login"
                          className="dropdown-item dropdown-item-backgorund"
                        >
                          Login
                          <i className="fas ms-2 fa-sign-in-alt"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/register_user"
                          className="dropdown-item dropdown-item-backgorund"
                        >
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
