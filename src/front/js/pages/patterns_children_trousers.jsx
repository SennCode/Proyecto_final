import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import patron from "/workspace/react-flask-hello/src/front/img/muestraPatron.png";
import "/workspace/react-flask-hello/src/front/styles/category_list.css";
import config2 from "../store/config2.js";

function Patterns_Children_Trousers() {
  const { store, actions } = useContext(Context);
  const [loader, setLoader] = useState(true);

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
          <p className="text-muted">Patterns / Children / trousers</p>
          <a
            className="arrow_category_list"
            href={`${config2.HOSTNAME}/patterns_category`}
          >
            <i className="fas fa-chevron-left mb-4 me-2"></i>Back
          </a>
          <div className="row ">
            {store.patterns.length
              ? store.patterns.map((file, id) =>
                  file.gender == "Children" && file.type_clothes == "Trousers" ? (
                    <div className="col-lg-3 col-md-4 col-6 my-2" key={file.id}>
                      <Link to={`/product_page/${file.id}`} key={file.id}>
                        <div className="card card_gender_background card_gender_border container_foto">
                          <img
                            src={patron}
                            className="card-img-top"
                            alt="..."
                          />
                          <div className="card-body">
                            <p className="card-text text-dark text-truncate fs-6 fw-light">
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

export default Patterns_Children_Trousers;
