import React, { useContext, useEffect, useState } from "react";
import "/workspace/react-flask-hello/src/front/styles/product_page.css";
import hoodie_black from "/workspace/react-flask-hello/src/front/img/hoodie_black.png";
import hoodie from "/workspace/react-flask-hello/src/front/img/hoodie.png";
import Alien from "/workspace/react-flask-hello/src/front/img/Alien.png";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  const [detalle, setDetalle] = useState({});
  const [loader, setLoader] = useState(true);

  setTimeout(() => {
    setLoader(false);
  }, 1000);

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const res = await fetch(
          `https://3001-4geeksacade-reactflaskh-xex9ne5j69n.ws-eu87.gitpod.io/api/store/${id}`
        );
        const data = await res.json();
        setDetalle(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetalle();
  }, [id]);

  return (
    <>
      {loader ? (
        <div>
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div class="container_product_page text_product_page">
          <div class="row">
            <div class="col-12">
              <div class="p-3">
                <p className="text-muted">
                  {detalle.gender} / {detalle.type_clothes}
                </p>
                <a
                  className="arrow_category_list"
                  href="https://3000-4geeksacade-reactflaskh-xex9ne5j69n.ws-eu88.gitpod.io/files3d_category"
                >
                  <i className="fas fa-chevron-left mb-4 me-2"></i>Back
                </a>
              </div>
            </div>

            <div class="card mb-3">
              <div class="row g-0">
                <div class="col-md-8">
                  <img
                    src={hoodie}
                    class="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div class="col-md-4">
                  <div class="card-body mt-3">
                  <img
                    src={Alien}
                    className="img_avatar rounded-circle me-2"
                    alt="Product View 3"
                  /> Username 
                    <h5 class="card-title text-start mb-4 text_product_page text-decoration-underline pt-5">Description</h5>
                    <p class="card-text text-start">{detalle.name}</p>
                    <p class="card-text text-start">{detalle.description}</p>
                    <ul className="p-2"><li>Size: {detalle.size}</li>
                    <li>Gender: {detalle.gender}</li>
                    <li>File type: {detalle.file_type}</li></ul>
                    <div className="mt-3 pt-2"><button
                    type="button"
                    className="btn button_product_page text_product_page btn-sm ms-1"
                  >
                    Download
                  </button><button className="btn button border border-0 btn-lg me-1 ">
                      <i className="fa fa-heart text-danger" />
                </button></div>
                  
                    <div class="card-body avatar_padding">
                </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div className="row g-0 ">
                <div className="col-lg-4 col-md-4 col-4 imgs_small">
                  <img src={hoodie} class="rounded img-fluid" alt="..." />
                  <img src={hoodie} class="rounded img-fluid" alt="..." />
                  <img src={hoodie} class="rounded img-fluid" alt="..." />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;

{
  /* <div class="col-6">
              <div class="p-3">
                <div className="card border border-0">
                  <img
                    src={hoodie}
                    className="img-fluid img_product_page"
                    alt="Product Image"
                  />
                  <div className="card-img-overlay">
                    <button className="btn button ms-1 border border-0 btn-lg">
                      <i className="fa fa-heart text-danger" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="p-3">
                <div className="card  img_product_page mb-3">
                  <h5 className="card-header card_header_description gradient-custom-2">
                    Description
                  </h5>
                  <div className="card-body">
                    <h5 className="card-title text_product_page">
                      {detalle.name}
                    </h5>
                    <p className="card-text text_product_page">
                      {detalle.description}
                    </p>
                    <hr />
                    <p>Size: {detalle.size}</p>
                    <p>Gender: "{detalle.gender}"</p>
                    <p>File type: "{detalle.file_type}"</p>
                  </div>
                </div>
                <img
                  src={Alien}
                  className="img_avatar rounded-circle"
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

            
            <div class="col-6">
              <div className="row"></div>
              <div class="p-3"><div className="col-lg-4 col-md-4 col-4 pt-2">
                  <img
                    src={hoodie_black}
                    className="img-fluid img_product_page"
                    alt="Product View 1"
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-4 pt-2">
                  <img
                    src={hoodie_black}
                    className="img-fluid img_product_page"
                    alt="Product View 2"
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-4 pt-2">
                  <img
                    src={hoodie_black}
                    className="img-fluid img_product_page"
                    alt="Product View 3"
                  />
                </div></div>
            </div> */
}
