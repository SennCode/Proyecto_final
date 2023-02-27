import React, { useContext, useState } from "react";
import "/workspace/react-flask-hello/src/front/styles/create_user.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";

function Create_user() {
  const { store, actions } = useContext(Context);
  const [loader, setLoader] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [ alert, setAlert ] = useState("")

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
    const response = await actions.registerUser(formData);

    if (response.success) {
     setAlert("User created!");
     navigate('/');
    } else {
      setAlert("Error creating user!")
    }
  }catch(error){
    setAlert("Error creating user!")
  }
  };

  setTimeout(() => {
    setLoader(false);
  }, 1000);

  

  return (
    <>
      {loader ? (
        <div className="loader">Loading...</div>
      ) : (
        <section className="text-create-account mb-5 pb-5">
          <div className="container py-5 h-100" id="liveAlertPlaceholder">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-xl-10">
                <div className="card rounded-3 text-black">
                  <div className="row g-0">
                    <div className="col-lg-6">
                      <div className="card-body p-md-5 mx-md-4">
                        <div className="text-center">
                          {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style="width: 185px;" alt="logo"/> */}
                          <h4 className="mt-1 mb-5 pb-1 fs-3 h1_title_create_acount">
                            We are 3Dclothes Team
                          </h4>
                        </div>

                        <p>Please complete to create your account</p>

                        {/* username */}

                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            required
                            className="form-control"
                            id="floatingInput"
                            placeholder="your name"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="floatingInput">Username</label>
                        </div>

                        {/* email */}

                        <div className="form-floating mb-3">
                          <input
                            type="email"
                            className="form-control"
                            id="floatingInput2"
                            placeholder="name@example.com"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="floatingInput">Email</label>
                        </div>

                        {/* password */}

                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="floatingPassword">Password</label>
                        </div>

                        {/* password 2 */}

                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control"
                            id="floatingPassword2"
                            placeholder="Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="floatingPassword">
                            Confirm Password
                          </label>
                        </div>

                        {/* button */}

                        <div className="text-center pt-1 mb-5 pb-1">
                          <div className="d-grid gap-2">
                            <button
                              className="btn btn-primary btn-block button_create_user text-center mb-3"
                              type="button"
                              onClick={handleSubmit}
                            >
                              Create new account
                            </button>
                          </div>
                        </div>

                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Do you have an account?</p>
                          <Link to="/login">
                            <button
                              type="button"
                              className="btn btn-outline-primary"
                            >
                              Login
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                      <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                        <h4 className="mb-4 fs-2">
                          We are more than just a company
                        </h4>
                        <p className="small mb-0 fs-6 fst-italic">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Create_user;
