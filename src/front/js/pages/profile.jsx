import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import "/workspace/react-flask-hello/src/front/styles/category_list.css";
import Alien from "/workspace/react-flask-hello/src/front/img/Alien.png";
import { Link, useNavigate } from "react-router-dom";
import "/workspace/react-flask-hello/src/front/styles/profile.css";

import config from "../store/config.js";

const Profile = () => {
  const { store, actions } = useContext(Context);
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState({});
  let navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${config.HOSTNAME}/api/users/${localStorage.user_id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/login");
    } else {
      actions.getProfile();
    }
  }, []);

  useEffect(() => {
    if (store.navigate) {
      navigate(store.navigate);
      actions.navigateNull();
    }
  }, [store.navigate]);

  const handleSave = () => {
    fetch(`${config.HOSTNAME}/api/users/${localStorage.user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          setMessage("User updated successfully.");
          response.json().then((data) => setUser(data));
          onClose();
        } else {
          setMessage("An error occurred while updating the user.");
        }
      })
      .catch((error) => {
        setMessage("An error occurred while updating the user.");
      });
  };
  

  return (
    <>
      {loader ? (
        <div>
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="container-fluid padindg_search_list p_card_gender pading_avatar">
          <div className="row d-flex">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="card-body mt-3">
                <div>
                  <h4>{user.username}</h4>
                </div>
                <i className="far fa-edit"></i>
                <label htmlFor="formFileMultiple" className="form-label pt-3">
                  <img
                    src={Alien}
                    className="avatar_edit rounded-circle me-2 mb-5"
                    alt="Product View 3"
                  />
                </label>
                <input
                  hidden
                  className="form-control"
                  type="file"
                  id="formFileMultiple"
                  multiple
                  name="url"
                />
                <form
                  action="/api/change_avatar"
                  method="post"
                  encType="multipart/form-data"
                >
                  <div className="form-group">
                    <label htmlFor="avatar">Avatar:</label>
                    <input
                      type="file"
                      className="form-control-file ms-5"
                      id="avatar"
                      name="avatar"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Guardar cambios
                  </button>
                </form>
                <hr />
                <div className="mt-5 pt-2">
                  <div className="d-grid gap-2 d-md-block">
                    {/* BOTON NEW USERNAME */}
                    <button
                      type="button"
                      className="btn btn-primary mb-3 me-2 btn-sm col-lg-6 col-md-6 "
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="@mdo"
                    >
                      Edit username
                    </button>
                    {/* BOTON NEW PASSWORD */}
                    <button
                      type="button"
                      className="btn btn-primary mb-3 me-2 btn-sm col-lg-6 col-md-6"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal2"
                      data-bs-whatever="@mdo"
                    >
                      Edit password
                    </button>
                    <div className="d-grid gap-3 d-md-block">
                      {/* BOTON FAVORITES */}
                      <button
                        type="button"
                        className="btn btn-primary mb-3 btn-sm me-2 col-lg-6 col-md-6"
                        onClick={() => navigate("/favorites")}
                      >
                        My favorites
                      </button>{" "}
                      {/* BOTON UPLOAD PRODUCT */}
                      <button
                        type="button"
                        className="btn btn-primary mb-3 btn-sm me-2 col-lg-6 col-md-6"
                        onClick={() => navigate("/upload_product")}
                      >
                        Upload new file
                      </button>{" "}
                      {/* BOTON ELIMINAR USUARIO*/}
                      <button
                        type="button"
                        className="btn btn-danger mb-3 btn-sm me-2 col-lg-6 col-md-6"
                      >
                        Delete user
                      </button>{" "}
                    </div>
                  </div>

                  {/* MODAL NEW USERNAME */}
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Edit:
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="mb-3">
                              <label
                                htmlFor="username"
                                className="col-form-label"
                              >
                                New username:
                              </label>
                              <input
                                type="text"
                                required
                                className="form-control"
                                id="username"
                                placeholder="your new username"
                                name="username"
                                value={user.user_id}
                                onChange={(e) =>
                                  setUser({ ...user, username: e.target.value })
                                }
                              />
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          {message && (
                            <div className="alert alert-primary" role="alert">
                              {message}
                            </div>
                          )}
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSave}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* MODAL NEW PASSWORD */}
                  <div
                    className="modal fade"
                    id="exampleModal2"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Edit:
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="mb-3">
                              <label
                                htmlFor="recipient-name"
                                className="col-form-label"
                              >
                                Current password:
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Current password"
                                name="password"
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="message-text"
                                className="col-form-label"
                              >
                                New password:
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="New password"
                                name="password"
                              />
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button type="button" className="btn btn-primary">
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-md-2 col-xs-6 my-2">
              <h4 className="mb-5">My files</h4>
              {store.files3d.length
                ? store.files3d.map((file, id) =>
                    file.gender == "Children" &&
                    file.type_clothes == "Hoodies" ? (
                      <Link to={`/product_page/${file.id}`} key={file.id}>
                        <div className="card card_gender_background card_gender_border container_foto">
                          <img
                            src="https://res.cloudinary.com/dwssfgyty/image/upload/v1676451087/ueb7xb10s0sqe7jjcazv.png"
                            className="card-img-top"
                            alt="..."
                          />
                          <div className="card-body">
                            <p className="card-text text-dark">
                              {file.name}/{file.file_type}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      ""
                    )
                  )
                : ""}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
