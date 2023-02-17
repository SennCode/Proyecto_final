import React from 'react';
import { Link } from "react-router-dom";

function Login(){
    return(
        <section className="text-create-account mb-5 pb-5">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style="width: 185px;" alt="logo"/> */}
                      <h4 className="mt-1 mb-5 pb-1 fs-3 h1_title_create_acount">We are 3Dclothes Team</h4>
                    </div>

                    <p>Please enter your login details</p>

                    {/* email */}

                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                      />
                      <label for="floatingInput">Email</label>
                    </div>

                    {/* password */}

                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                      />
                      <label for="floatingPassword">Password</label>
                    </div>

                    {/* button */}

                    <div className="text-center pt-1 mb-5 pb-1">
                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-primary btn-block gradient-custom-2 mb-3"
                          type="button"
                        >
                          Login
                        </button>
                      </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-center pb-4">
                      <p className="mb-0 me-2">Don't have an account yet?</p>
                      <Link to="/register_user"><button type="button" className="btn btn-outline-primary">
                        Sing Up
                      </button></Link>
                      
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4 fs-2">We are more than just a company</h4>
                    <p className="small mb-0 fs-6 fst-italic">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
};

export default Login;