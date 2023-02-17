import React, { useContext, useState } from "react";
import "/workspace/react-flask-hello/src/front/styles/product_page.css";
import hoodie_black from "/workspace/react-flask-hello/src/front/img/hoodie_black.png";
import hoodie from "/workspace/react-flask-hello/src/front/img/hoodie.png";
import Alien from "/workspace/react-flask-hello/src/front/img/Alien.png";
import { Context } from "../store/appContext.js";

function ProductPage() {
  const { store, actions } = useContext(Context);
  const [loader, setLoader] = useState(true);

  setTimeout(() => {
    setLoader(false);
  }, 2000);

  console.log(store.files3d);

  return (
    <>
      {loader ? (
        <div>
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="container-fluid container_product_page">
          {store.files3d.map((file, i) => (
            <>
              <div className="row">
                <div className="col-md-10">
                  <p className="text-muted">
                    Enlace de la ruta, ej: 3Dfiles - Hoodies
                  </p>
                  <img
                    src={hoodie}
                    className="img-fluid img_product_page"
                    alt="Product Image"
                  />
                  <button className="btn ms-1 button-heart">
                    <i className="fa fa-heart fa-heart_custom" />
                  </button>

                  <div className="row">
                    <div className="col-lg-4 col-md-4 pt-2">
                      <img
                        src={hoodie_black}
                        className="img-fluid img_product_page"
                        alt="Product View 1"
                      />
                    </div>
                    <div className="col-lg-4 col-md-4 pt-2">
                      <img
                        src={hoodie_black}
                        className="img-fluid img_product_page"
                        alt="Product View 2"
                      />
                    </div>
                    <div className="col-lg-4 col-md-4 pt-2">
                      <img
                        src={hoodie_black}
                        className="img-fluid img_product_page"
                        alt="Product View 3"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-2 butons_download_avatar mt-4">
                  <img
                    src={Alien}
                    className="img_avatar rounded-circle img_product_page"
                    alt="Product View 3"
                  />
                  <p className="p_username text_product_page">Username</p>
                  <br />
                  <button
                    type="button"
                    className="btn button_product_page btn-block mb-5 text_product_page btn-sm"
                  >
                    Download
                  </button>
                </div>
              </div>
              <div className="row container_description pt-5">
                <div className="col-lg-10 col-md-10">
                  <div className="card  img_product_page mb-3">
                    <h5 className="card-header card_header_description gradient-custom-2">
                      Description
                    </h5>
                    <div className="card-body">
                      <h5 className="card-title text_product_page">
                        {file.name}
                      </h5>
                      <p className="card-text text_product_page">
                        {file.description}
                      </p>
                      <hr />
                      <p>Size: {file.size}</p>
                      <p>File type: "{file.file_type}"</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
}

export default ProductPage;
