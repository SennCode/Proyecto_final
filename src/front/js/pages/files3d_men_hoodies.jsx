import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import "/workspace/react-flask-hello/src/front/styles/category_list.css";
import config2 from "../store/config2.js";

function Files3D_Men_Hoodies() {
  const { store, actions } = useContext(Context);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    actions.getFiles3D();
  }, []);

  setTimeout(() => {
    setLoader(false);
  }, 1000);
  return (
    <>
      {loader ? (
        <div>
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="container-fluid padindg_category_list p_card_gender">
          <p className="text-muted">3Dfiles / Men / hoodies</p>
          <a
            className="arrow_category_list"
            href={`${config2.HOSTNAME}/files3d_category`}
          >
            <i className="fas fa-chevron-left mb-4 me-2"></i>Back
          </a>
          <div className="row ">
            {store.files3d.length
              ? store.files3d.map((file, i) =>
                  file.gender == "Men" && file.type_clothes == "Hoodies" ? (
                    <div className="col-lg-3 col-md-4 col-6 my-2" key={i}>
                      <Link to={`/product_page/${file.id}`} key={file.id}>
                        <div className="card card_gender_background card_gender_border container_foto card_img">
                          <img
                            src={file.url}
                            className="card-img-top "
                            alt="..."
                          />
                          <div className="card-body">
                            <p className="card-text text-dark text-truncate fs-6 fw-light mt-5">
                              {file.name}/{file.file_type}/{file.gender}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )
                )
              : ""}
          </div>
        </div>
      )}
    </>
  );
}

export default Files3D_Men_Hoodies;
