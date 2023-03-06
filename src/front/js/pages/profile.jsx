import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import "/workspace/react-flask-hello/src/front/styles/category_list.css";
import Alien from "/workspace/react-flask-hello/src/front/img/Alien.png";
import { Link, useNavigate } from "react-router-dom";
import "/workspace/react-flask-hello/src/front/styles/profile.css";

const Profile = () => {
  const { store, actions } = useContext(Context);
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
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

  return (
    <>
      {loader ? (
        <div>
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="container-fluid padindg_search_list p_card_gender">
          <div className="row ">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="card-body mt-3">
                <img
                  src={Alien}
                  className="avatar_edit rounded-circle me-2 mb-5"
                  alt="Product View 3"
                />
                <p>Username</p>
                <div className="mt-5 pt-2">
                  <button
                    type="button"
                    className="btn button_product_page text_product_page btn-sm ms-1"
                  >
                    Edit profile
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-md-2 col-6 my-2">
              <p className="mb-5">My files</p>
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
