import React, { useContext, useEffect, useState } from "react";
import "/workspace/react-flask-hello/src/front/styles/product_page.css";
import { useParams, useNavigate } from "react-router-dom";
import config from "../store/config";
import config2 from "../store/config2";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Heart from "react-heart";
import Alien from "/workspace/react-flask-hello/src/front/img/Alien.png";

import Appp from "../component/download_file";
const ProductPage = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const { id, username, numero } = useParams();
  const params = useParams();
  const [user, setUser] = useState({});
  const [detalle, setDetalle] = useState({});
  const [loader, setLoader] = useState(true);
  const [active, setActive] = useState(false);
  const download_archivo = async () => {
    //const res=await fetch(`${config.HOSTNAME}/api/download_file`, {
    //  method: "GET",
    // })
    // const data=await res.json()
    // console.log(data)
    /*function downloadLink(id) {
          var ajaxOptions = {
            url: 'http://httpbin.org/status/' + id
            };
            
            var res = $.ajax(ajaxOptions);
            
            function onAjaxDone(data) {
              
                location.href = 'http://httpbin.org/bytes/1024';
            }
            
            function onAjaxFail() {
              alert('Bad ID');
            }
            
            res
              .done(onAjaxDone)
                .fail(onAjaxFail)
            ;
        }
        
      function onDownloadLinkClick(e) {
          e.preventDefault();
            var $this = $(this);
            var id = $this.data('id');
            downloadLink(id);
        }
        
      $('.download-link').on('click', onDownloadLinkClick);
    ;*/
  };
  const setFav_product = async (idp, categoryp) => {
    const token = localStorage.getItem("access_token");
    const producto_id = idp;
    const category = categoryp;
    const valor = () => {
      let result = [];
      if (category === "files3d") {
        return (result = [producto_id, 1, 1]);
      } else if (category === "patterns") {
        return (result = [1, producto_id, 1]);
      } else if (category === "prints") {
        return (result = [1, 1, producto_id]);
      }
    };
    const pre = valor();
    console.log(pre);
    /*const body=(producto_id,category)=> {
      if(category==="files3d"){
      return { files3d_id: producto_id, patterns_id:1, prints_id: 1 }
    }
    else if(category==="patterns"){
      return { files3d_id: 1, patterns_id:producto_id, prints_id: 1 }
    }
    else if(category==="prints"){
      return { files3d_id: 1, patterns_id:1, prints_id: producto_id }
    }}
    body(producto_id,category);*/
    //console.log(body)
    const res = await fetch(`${config.HOSTNAME}/api/set_favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        files3d_id: pre[0],
        patterns_id: pre[1],
        prints_id: pre[2],
      }),
    });
    const data = await res.json();
    console.log(data.status);
    (await data.msg) !== 200
      ? console.log(data.msg)
      : console.log("mala recepcion");
  };

  setTimeout(() => {
    setLoader(false);
  }, 1000);

  useEffect(() => {
    // fetch(`${config.HOSTNAME}/api/users/${localStorage.user_id}`)
    //   .then((res) => res.json())
    //   .then((data) => setUser(data));
    //actions.getFile3D(id)
    console.log("ESTA PASANDO");
    const valor = actions.getNumero();
    console.log(valor);
    const fetchDetalle = async () => {
      try {
        const res = await fetch(
          `${config.HOSTNAME}/api/store/${params.category}/${id}`
        );
        const data = await res.json();
        console.log({ data });
        setDetalle(data);
      } catch (error) {
        console.error(error);
      }
    };

    console.log(user);

    fetchDetalle();
  }, [id, username]);

  //const res1 = await fetch ();
  //const data2 = await res1.json();

  return (
    <>
      {loader ? (
        <div>
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="container_product_page text_product_page">
          {localStorage.getItem("access_token") ? (
            <div className="row">
              <div className="col-12">
                <div className="p-3">
                  <p className="text-muted">
                    {detalle.gender} /
                    {detalle.type_clothes
                      ? detalle.type_clothes
                      : detalle.type_print}
                    / {detalle.name}
                  </p>
                  <Link
                    className="arrow_category_list"
                    to={`/${params.category}/${detalle.gender}/${
                      detalle.type_clothes
                        ? detalle.type_clothes
                        : detalle.type_print
                    }`}
                  >
                    <i class="fas fa-arrow-alt-circle-left fa-lg"></i>
                  </Link>
                </div>
              </div>

              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-lg-6 col-md-6 p-3">
                    <img
                      src={detalle.url}
                      className="img-fluid rounded-1"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body mt-3">
                      <img
                        src={detalle.user_img}
                        className="img_avatar rounded-circle me-2"
                        alt="Product View 3"
                      />{" "}
                      <h5 className="mt-2 text-dark">
                        Owner: {detalle.username}
                      </h5>
                      <h5 className="card-title text-start text_product_page mt-5 text-dark">
                        Description
                      </h5>
                      <hr />
                      <p className="card-text text-start text-dark">
                        Title: {detalle.name}
                      </p>
                      <p className="card-text text-start text-dark">
                        {detalle.description}
                      </p>
                      <ul className="p-2">
                        <li>Size: {detalle.size}</li>
                        <li>Gender: {detalle.gender}</li>
                        <li>File type: {detalle.file_type}</li>
                      </ul>
                      <div className="d-flex align-items-center mt-3 pt-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-primary text_product_page ms-1 btn-download-night"
                          onClick={download_archivo}
                        >
                          Download
                        </button>
                        {/* <a href={Alien} download>
                        <img src="" alt="Aqui descarga la imagen"/>
                       </a> */}

                        <div
                          className="ms-3 mt-3 press"
                          style={{ width: "2rem" }}
                        >
                          <Heart
                            isActive={active}
                            onClick={() => {
                              setFav_product(detalle.id, detalle.category);
                              setActive(!active);
                            }}
                            animationScale={1.25}
                            style={{ marginBottom: "1rem" }}
                          />
                        </div>
                      </div>
                      {/* <div className="card-body avatar_padding">
                        {" "}
                        <Appp
                          file_name={detalle.name}
                          file_url={detalle.url}
                        ></Appp>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-12">
                <div className="p-3">
                  <p className="text-muted">
                    {detalle.gender} / {detalle.type_clothes}
                  </p>
                  <Link
                    className="arrow_category_list"
                    to={`/${params.category}/${detalle.gender}/${
                      detalle.type_clothes
                        ? detalle.type_clothes
                        : detalle.type_print
                    }`}
                  >
                    <i class="fas fa-arrow-alt-circle-left fa-lg"></i>
                  </Link>
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
                      <h5 className="card-title text-start text_product_page pt-5">
                        Description
                      </h5>
                      <hr />
                      <p className="card-text text-start">
                        Title: {detalle.name}
                      </p>
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
                          type="button "
                          className="btn btn-primary btn-block mb-3 button_login-register"
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

              
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductPage;
