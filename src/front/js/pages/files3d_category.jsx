import React, { useState, useEffect } from "react";
import hoodie_clonX from "/workspace/react-flask-hello/src/front/img/hoodie_clonX.png";
import hoodie_black from "/workspace/react-flask-hello/src/front/img/hoodie_black.png";
import "/workspace/react-flask-hello/src/front/styles/night.css";
import "/workspace/react-flask-hello/src/front/styles/cards_gender.css";
import "/workspace/react-flask-hello/src/front/styles/category_list.css";

function Files3d_category() {
  return (
    <>
      <section id="cards_gender">
        <div className="row p_card_gender">
          <p className="pb-4 text-muted body_text">3Dfiles</p>
          <a className="text-dark" href="/files3d_category/men">
            <h5 className="pb-3 h5_card_gender genders_titles body_text">
              Men
            </h5>
          </a>
          <div className="col-lg-4 col-md-4">
            <a className="text-dark" href="files3d_category/men/hoodies">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2 card_img ">
                <p className="card-text decoration_text mt-3 ms-2">Hoodies</p>
                <img
                  src="https://res.cloudinary.com/dwssfgyty/image/upload/v1679501873/zip_through_jacket_20211202_men_ekrvfn.png"
                  className="img-fluid mx-2"
                  alt="..."
                />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-md-4">
            <a className="text-dark" href="files3d_category/men/t-shirts">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2 card_img ">
                <p className="card-text decoration_text mt-3 ms-2">T-Shirt</p>
                <img
                  src="https://res.cloudinary.com/dwssfgyty/image/upload/v1679502138/pocket_polo_shirt_20220804_men_thcdhc.png"
                  className="img-fluid mx-2"
                  alt="..."
                />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-md-4">
            <a className="text-dark" href="files3d_category/men/trousers">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2 card_img ">
                <p className="card-text decoration_text mt-3 ms-2">Trousers</p>
                <img
                  src="https://res.cloudinary.com/dwssfgyty/image/upload/v1679502030/zip_off_cargo_20220503_men_qkcva9.png"
                  className="img-fluid mx-2"
                  alt="..."
                />
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
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2 card_img ">
                <p className="card-text decoration_text mt-3 ms-2"> Dresses</p>
                <img
                  src="https://res.cloudinary.com/dwssfgyty/image/upload/v1679502330/bleisure_cover_up_20221010_women_d9z1fh.png"
                  className="img-fluid mx-2"
                  alt="..."
                />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-md-4">
            <a className="text-dark" href="files3d_category/women/blouses">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2 card_img ">
                <p className="card-text decoration_text mt-3 ms-2"> Blouses</p>
                <img
                  src="https://res.cloudinary.com/dwssfgyty/image/upload/v1679502461/printed_blouse_20230211_women_f3gcyi.png"
                  className="img-fluid mx-2"
                  alt="..."
                />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-md-4">
            <a className="text-dark" href="files3d_category/women/trousers">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2 card_img ">
                <p className="card-text decoration_text mt-3 ms-2"> Trousers</p>
                <img
                  src="https://res.cloudinary.com/dwssfgyty/image/upload/v1679502551/fluid_trouser_20220818_gender_inclusive_men_u2jtsx.png"
                  className="img-fluid mx-2"
                  alt="..."
                />
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
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2 card_img ">
                <p className="card-text decoration_text mt-3 ms-2"> Hoodies</p>
                <img
                  src="https://res.cloudinary.com/dwssfgyty/image/upload/v1679503254/blocked_hooded_tee_20211104_boy_wummis.png"
                  className="img-fluid mx-2"
                  alt="..."
                />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-md-4">
            <a className="text-dark" href="files3d_category/children/t-shirts">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2 card_img ">
                <p className="card-text decoration_text mt-3 ms-2"> T-Shirt</p>
                <img
                  src="https://res.cloudinary.com/dwssfgyty/image/upload/v1679503225/deadstock_tee_20230214_boy_f9y1hq.png"
                  className="img-fluid mx-2"
                  alt="..."
                />
              </div>
            </a>
          </div>
          <div className="col-lg-4 col-md-4">
            <a className="text-dark" href="files3d_category/children/trousers">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2 card_img ">
                <p className="card-text decoration_text mt-3 ms-2"> Trousers</p>
                <img
                  src="https://res.cloudinary.com/dwssfgyty/image/upload/v1679503192/puffa_pants_20230110_boy_h7tpjq.png"
                  className="img-fluid mx-2"
                  alt="..."
                />
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Files3d_category;
