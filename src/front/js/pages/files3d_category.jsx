import React, { useState, useEffect } from "react";
import hoodie_clonX from "/workspace/react-flask-hello/src/front/img/hoodie_clonX.png";
import hoodie_black from "/workspace/react-flask-hello/src/front/img/hoodie_black.png";
import "/workspace/react-flask-hello/src/front/styles/night.css"
import "/workspace/react-flask-hello/src/front/styles/cards_gender.css";
import "/workspace/react-flask-hello/src/front/styles/category_list.css";

function Files3d_category() {

  return (
    <>
      <section id="cards_gender">
        <div className="row p_card_gender">
          <p className="pb-4 text-muted body_text">3Dfiles</p>
          <a className="text-dark" href="/files3d_category/men">
            <h5 className="pb-3 h5_card_gender genders_titles body_text">Men</h5>
          </a>
          <div className="col-lg-4 col-md-4">
            <a className="text-dark" href="files3d_category/men/hoodies">
            <div className="card card_img">
                <img src={hoodie_clonX}  className="img-fluid" alt="..." />
                <div className="card-body">
                  <p className="card-text decoration_text">Hoodies</p>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-md-4">
            <a className="text-dark" href="files3d_category/men/t-shirts">
            <div className="card card_img">
                <img src="https://res.cloudinary.com/dwssfgyty/image/upload/v1678959770/kmvleny2wncdpkeqmsfm.png"  className="img-fluid" alt="..."/>
                <div className="card-body">
                  <p className="card-text decoration_text">T-Shirt</p>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-md-4">
            <a className="text-dark" href="files3d_category/men/trousers">
              <div className="card ">
                <img src={hoodie_black}   alt="..." />
                <div className="card-body">
                  <p className="card-text">Trousers</p>
                </div>
              </div>
            </a>
          </div>
        </div>{" "}
      </section>
      <section id="cards_gender">
        <div className="row p_card_gender">
          <a className="text-dark" href="files3d_category/women">
            <h5 className="pb-3 h5_card_gender genders_titles">Women</h5>
          </a>
          <div className="col-lg-4 col-md-4">
            <a className="text-dark" href="files3d_category/women/dresses">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src="https://res.cloudinary.com/dwssfgyty/image/upload/v1678959778/oey6x9hbvaebhvxekswd.png"   alt="..." />
                <div className="card-body">
                  <p className="card-text">Dresses</p>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-md-4">
            <a className="text-dark" href="files3d_category/women/blouses">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src="https://res.cloudinary.com/dwssfgyty/image/upload/v1678959796/lavywaxyy6mmzsnyoog3.png"   alt="..." />
                <div className="card-body">
                  <p className="card-text">Blouses</p>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-md-4">
            <a className="text-dark" href="files3d_category/women/trousers">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src={hoodie_black}   alt="..." />
                <div className="card-body">
                  <p className="card-text">Trousers</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
      <section id="cards_gender">
        <div className="row p_card_gender">
          <a className="text-dark" href="files3d_category/children">
            <h5 className="pb-3 h5_card_gender genders_titles">Children</h5>
          </a>
          <div className="col-lg-4 col-md-4">
            <a className="text-dark" href="files3d_category/children/hoodies">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src={hoodie_clonX}   alt="..." />
                <div className="card-body">
                  <p className="card-text">Hoodies</p>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-md-4">
            <a className="text-dark" href="files3d_category/children/t-shirts">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src="https://res.cloudinary.com/dwssfgyty/image/upload/v1678708712/tw7gfqso84tf3lp1plvh.png"   alt="..." />
                <div className="card-body">
                  <p className="card-text">T-Shirt</p>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-md-4">
            <a className="text-dark" href="files3d_category/children/trousers">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src={hoodie_black}   alt="..." />
                <div className="card-body">
                  <p className="card-text">Trousers</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
      
    </>
  );
}

export default Files3d_category;
