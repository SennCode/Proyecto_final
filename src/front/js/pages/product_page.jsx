import React, { useContext, useEffect, useState } from "react";
import "/workspace/react-flask-hello/src/front/styles/product_page.css"; 
import hoodie from "/workspace/react-flask-hello/src/front/img/hoodie.png";
import { useParams, useNavigate } from "react-router-dom";
import config from "../store/config";
import config2 from "../store/config2";
import { Context } from "../store/appContext";

const ProductPage = () => {
  const navigate = useNavigate()
  const { store, actions } = useContext(Context);
  const { id, username } = useParams();
  const [user, setUser] = useState({});
  const [detalle, setDetalle] = useState({});
  const [loader, setLoader] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = async () => {
    const product_type = "files3d"
    const product_id = detalle.id

    try {
      const new_favorite = await actions.addFavorites(product_type, product_id);
      setIsFavorite(true);
      console.log(`Se ha agregado el producto ${product_id} a la lista de favoritos`);
    } catch (error) {
      console.error("Error al agregar el favorito", error);
    }
  };
  

  setTimeout(() => {
    setLoader(false);
  }, 1000);

  useEffect(() => {
    fetch(`${config.HOSTNAME}/api/users/${localStorage.user_id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
    const fetchDetalle = async () => {
      try {
        const res = await fetch(`${config.HOSTNAME}/api/store/${id}`);
        const data = await res.json();
        setDetalle(data);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchDetalle();
  }, [id, username]);
  
  

  return (
    <>
      {(loader ? (
        <div>
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="container_product_page text_product_page">
          {localStorage.getItem("access_token") ? (<div className="row">
            <div className="col-12">
              <div className="p-3">
                <p className="text-muted">
                  {detalle.gender} / {detalle.type_clothes}
                </p>
                <a
                  className="arrow_category_list"
                  href={`${config2.HOSTNAME}/files3d_category`}
                >
                  <i className="fas fa-chevron-left mb-4 me-2"></i>Back
                </a>
              </div>
            </div>

            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-lg-6 col-md-6">
                  <img
                    src={detalle.url}
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-6">
                  <div className="card-body mt-3">
                    <img
                      src={user.img}
                      className="img_avatar rounded-circle me-2"
                      alt="Product View 3"
                    />{" "}
                      <h5 className="mt-2">{user.username}</h5>

                    
                    <h5 className="card-title text-start text_product_page mt-5">
                      Description
                    </h5>
                    <hr/>
                    <p className="card-text text-start">Title: {detalle.name}</p>
                    <p className="card-text text-start">
                      {detalle.description}
                    </p>
                    <ul className="p-2">
                      <li>Size: {detalle.size}</li>
                      <li>Gender: {detalle.gender}</li>
                      <li>File type: {detalle.file_type}</li>
                    </ul>
                    <div className="mt-3 pt-2">
                      <button
                        type="button"
                        className="btn button_product_page text_product_page btn-sm ms-1"
                      >
                        Download
                      </button>
                      <button onClick={handleFavorite} className="btn button border border-0 btn-lg me-1">
        <i className={`fa fa-heart ${isFavorite ? "text-danger" : "text-muted"}`} />
      </button>
                    </div>
                    <div className="card-body avatar_padding"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="row g-0 ">
                <div className="col-lg-4 col-md-3 col-3 imgs_small">
                  <img src={detalle.url} className="rounded img-fluid" alt="..." />
                  <img src={detalle.url} className="rounded img-fluid ms-1 me-1" alt="..." />
                  <img src={detalle.url} className="rounded img-fluid pe-2" alt="..." />
                </div>
              </div>
            </div>
          </div>) : (<div className="row">
            <div className="col-12">
              <div className="p-3">
                <p className="text-muted">
                  {detalle.gender} / {detalle.type_clothes}
                </p>
                <a
                  className="arrow_category_list"
                  href={`${config2.HOSTNAME}/files3d_category`}
                >
                  <i className="fas fa-chevron-left mb-4 me-2"></i>Back
                </a>
              </div>
            </div>

            <div className="card mb-3">
              <div className="row g-0">
                
                <div className="col-md-6">
                  <div className="card-body mt-3">
                    
                    <h5 className="card-title text-start text_product_page pt-5">
                      Description
                    </h5>
                    <hr/>
                    <p className="card-text text-start">Title: {detalle.name}</p>
                    <p className="card-text text-start">
                      {detalle.description}
                    </p>
                    <ul className="p-2">
                      <li>Size: {detalle.size}</li>
                      <li>Gender: {detalle.gender}</li>
                      <li>File type: {detalle.file_type}</li>
                    </ul>
                    <div className="mt-3 pt-2">
                      <button
                      
                        type="button"
                        className="btn button_product_page text_product_page btn-sm ms-1"
                        onClick={() => navigate("/register_user")}
                      >
                        Sign Up to download
                        
                      </button>
                    </div>
                    <div className="card-body avatar_padding"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="row g-0 ">
                <div className="col-lg-3 col-md-3 col-3 imgs_small">
                  <img src={hoodie} className="rounded img-fluid" alt="..." />
                  <img src={hoodie} className="rounded img-fluid" alt="..." />
                  <img src={hoodie} className="rounded img-fluid" alt="..." />
                </div>
              </div>
            </div>
          </div>)}
          
        </div>
      ))}
    </>
  );
};

export default ProductPage;