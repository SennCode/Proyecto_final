import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import "/workspace/react-flask-hello/src/front/styles/category_list.css";

function CategoryList() {
  const { store, actions } = useContext(Context);
  const [loader, setLoader] = useState(true);

  setTimeout(() => {
    setLoader(false);
  }, 2000);

  console.log(store?.files3d.length);
  return (
    <>
      {loader ? (
        <div>
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="container-fluid padindg_category_list body-Category_list">
          <h3 className="h3_category_list">Files3D</h3>
          <Link to="/product_page">
          <div className="row ">
            {store.files3d.length
              ? store.files3d.map((file, index) => (
                
                  <div className="col-lg-3 col-md-4 col-6 my-2" key={index}>
                    <div className="card card_gender_background card_gender_border container_foto">
                      <img src="https://res.cloudinary.com/dwssfgyty/image/upload/v1676451464/qlgi8udy6bearxah3o1z.png" className="card-img-top" alt="..." />
                      <div className="card-body">
                        <p className="card-text">{file.name}/{file.file_type}</p>
                      </div>
                    </div>
                  </div> 
                ))
              : console.log("No hay elementos")}
          </div>
          </Link>
        </div>
      )}
    </>
  );
}

export default CategoryList;
