import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import "/workspace/react-flask-hello/src/front/styles/category_list.css";
import config2 from "../store/config2.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function SearchResults() {
  const { store, action } = useContext(Context);
  const [loader, setLoader] = useState(true);
  const { query } = useParams();

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  return (
    <>
      {loader ? (
        <div>
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="container-fluid padindg_search_list p_card_gender">
          <p className="text-muted">Search results</p>
          <a
            className="arrow_category_list"
            href={`${config2.HOSTNAME}/files3d_category`}
          >
            <i className="fas fa-chevron-left mb-4 me-2"></i>Back
          </a>
          <div className="row ">
            {store.search_results?.map((file, id) => {
              return(
                <div className="col-lg-3 col-md-4 col-6 my-2" key={file.id}>
              <Link to={`/product_page/${file.id}`} key={file.id}>
                <div className="card card_gender_background card_gender_border container_foto">
                  <img
                    src={file.url}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <p className="card-text text-dark">
                      {file.name}/{file.file_type}/{file.gender}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
              )
              
            })}
            
          </div>
        </div>
      )}
    </>
  );
}

export default SearchResults;
