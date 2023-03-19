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
    actions.getFiles3D();
  }, []);

  useEffect(() => {
    getUser();
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

  const getUser = () => {
    fetch(`${config.HOSTNAME}/api/users/${localStorage.user_id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  };

  const handleAvatarChange = (event) => {
    const avatarInput = document.getElementById("avatar");
    const avatar = avatarInput.files[0];
    const blob = new Blob([avatar], { type: avatar.type });
    const urlImage = URL.createObjectURL(blob);
    const imageElement = document.getElementById("image");
    if (imageElement.src !== urlImage) {
      imageElement.src = urlImage;
    }
  };

  const handleAvatarSave = () => {
    const avatarInput = document.getElementById("avatar");
    const formData = new FormData();
    formData.append("avatar", avatarInput.files[0]);
    fetch(`${config.HOSTNAME}/api/change_avatar`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          setMessage("Avatar updated successfully.");
          response.json().then((data) => {
            getUser();
          });
          onClose();
        } else {
          setMessage("An error occurred while updating the avatar.");
        }
      })
      .catch((error) => {
        setMessage("An error occurred while updating the avatar.");
      });
      
      
  };

  const handleSave = () => {
    const token = localStorage.getItem("access_token");
    fetch(`${config.HOSTNAME}/api/users/${localStorage.user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          setMessage("User updated successfully.");
          response.json().then((data) => setUser(data));
          
        } else {
          setMessage("An error occurred while updating the user.");
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage("An error occurred while updating the user.");
      });
  };

  const handlePasswordSave = () => {
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
  
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
  
    const token = localStorage.getItem("access_token");
    fetch(`${config.HOSTNAME}/api/users/${localStorage.user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ password: newPassword }),
    })
      .then((response) => {
        if (response.ok) {
          setMessage("Password updated successfully.");
          onClose();
        } else {
          setMessage("An error occurred while updating the password.");
        }
      })
      .catch((error) => {
        setMessage("An error occurred while updating the password.");
      });
  };
  
  const handleDeleteUser = () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");

  if (!confirmed) {
    return;
  }
  
    const token = localStorage.getItem("access_token");
    fetch(`${config.HOSTNAME}/api/users/${localStorage.user_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          setMessage("User deleted successfully.");
          localStorage.clear();
          window.location.href = "/";
        } else {
          setMessage("An error occurred while deleting the user.");
        }
      })
      .catch((error) => {
        setMessage("An error occurred while deleting the user.");
      });
  };
  
  

  return (
    <>
      {loader ? (
        <div>
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="container-fluid padindg_search_list p_card_gender pading_avatar profile_text">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 p-5">
              <div className="card-body mt-3 text-center">
                <div>
                  <h4>{user.username}</h4>
                  <h6 className="text-muted">Your personal account</h6>
                </div>
                <i className="far fa-edit"></i>
                <label htmlFor="avatar" className="form-label pt-3">
                  <img
                    src={user.img}
                    className="avatar_edit rounded-circle me-2 mb-2"
                    alt="Profile Avatar"
                    id="image"
                  />
                </label>
                <input
                  hidden
                  className="form-control"
                  type="file"
                  id="avatar"
                  name="avatar"
                  onChange={handleAvatarChange}
                  
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="mt-2 pt-2 text-center">
                <div className="d-grid gap-2 d-md-block">
                  {/* BOTON FAVORITES */}
                  <button
                    type="button"
                    className="btn btn-dark mb-3 btn-sm me-2 col-lg-6 col-md-6"
                    onClick={() => navigate("/favorites")}
                  >
                    My favorites
                  </button>{" "}
                  {/* BOTON UPLOAD PRODUCT */}
                  <button
                    type="button"
                    className="btn btn-dark mb-3 btn-sm me-2 col-lg-6 col-md-6"
                    onClick={() => navigate("/upload_product")}
                  >
                    Upload new file
                  </button>{" "}
                  {/* BOTON NEW USERNAME */}
                  <button
                    type="button"
                    className="btn btn-dark mb-3 me-2 btn-sm col-lg-6 col-md-6 "
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@mdo"
                  >
                    Edit username
                  </button>
                  {/* BOTON NEW PASSWORD */}
                  <button
                    type="button"
                    className="btn btn-dark mb-3 me-2 btn-sm col-lg-6 col-md-6"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal2"
                    data-bs-whatever="@mdo"
                  >
                    Edit password
                  </button>
                  {/* BOTON ELIMINAR USUARIO*/}
                  <button
                    type="button"
                    className="btn btn-danger mb-5 btn-sm me-2 col-lg-6 col-md-6"
                    onClick={() => handleDeleteUser()}
                  >
                    Delete user
                  </button>{" "}
                  <div>
                    <button
                      type="button"
                      className="btn btn-dark btn-sm"
                      onClick={() => {
                        handleAvatarSave();
                        
                      }}
                    >
                      Save Changes
                    </button>
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
                                    setUser({
                                      ...user,
                                      username: e.target.value,
                                    })
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
                                  id="confirm-password"
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
                                  id="new-password"
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
                            <button type="button" className="btn btn-primary" onClick={handlePasswordSave}>
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row text-center">
            {" "}
            <h4 className="mb-3">My files</h4>
            <hr />
            {store.files3d.map((file, id) => (
              <div className="col-lg-2 col-md-3 col-6 my-2 " key={file.id}>
                <Link to={`/product_page/${file.id}`} key={file.id}>
                <div className="card-group">
                  <div className="card card_gender_border container_foto  ">
                    <img src={file.url} className="card-img-top  " alt="..." />
                    <div className="card-body">
                      <p className="card-text text-dark text-truncate fs-6 fw-light">
                        {file.name}/{file.file_type}
                      </p>
                    </div>
                  </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
