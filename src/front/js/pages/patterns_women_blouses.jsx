import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import patron from "/workspace/react-flask-hello/src/front/img/muestraPatron.png";
import "/workspace/react-flask-hello/src/front/styles/category_list.css";
import config2 from "../store/config2.js";

function Patterns_Women_Blouses() {
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
          <p className="text-muted">Patterns / Women / blouses</p>
          <a
            className="arrow_category_list"
            href={`${config2.HOSTNAME}/patterns_category`}
          >
            <i className="fas fa-chevron-left mb-4 me-2"></i>Back
          </a>
          <div className="row ">
            {store.patterns.length
              ? store.patterns.map((file, id) =>
                  file.gender == "Women" && file.type_clothes == "Blouses" ? (
                    <div className="col-lg-3 col-md-4 col-6 my-2" key={file.id}>
                      <Link to={`/product_page/${file.id}`} key={file.id}>
                        <div className="card card_gender_background card_gender_border container_foto">
                          <img
                            src={patron}
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

export default Patterns_Women_Blouses;
