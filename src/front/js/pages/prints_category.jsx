import React, { useState, useEffect } from "react";
import "/workspace/react-flask-hello/src/front/styles/cards_gender.css";
import "/workspace/react-flask-hello/src/front/styles/category_list.css";

function Prints_category() {

  return (
    <>
      <section id="cards_gender">
        <div className="row p_card_gender">
          <p className="pb-4 text-muted">Prints</p>
          <a className="text-dark" href="/prints_category/men">
            <h5 className="pb-3 h5_card_gender genders_titles">Men</h5>
          </a>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="prints_category/men/abstract">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src="https://res.cloudinary.com/dwssfgyty/image/upload/v1679591937/original_fw15pg_LME068_b61cgw.jpg" className="card_img" alt="..." />
                <div className="card-body">
                  <p className="card-text decoration_text">Abstract</p>
                </div>
              </div>
            </a>
          </div>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="prints_category/men/stripes">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src="https://res.cloudinary.com/dwssfgyty/image/upload/v1679592002/original_pgss15pr_cHRO022_celpf5.jpg" className="card_img" alt="..." />
                <div className="card-body">
                  <p className="card-text">Stripes</p>
                </div>
              </div>
            </a>
          </div>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="prints_category/men/geometric">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src="https://res.cloudinary.com/dwssfgyty/image/upload/v1679592037/original_SS15icap_bts50_hlb5hs.jpg" className="card_img" alt="..." />
                <div className="card-body">
                  <p className="card-text">Geometric</p>
                </div>
              </div>
            </a>
          </div>
        </div>{" "}
      </section>
      <section id="cards_gender">
        <div className="row p_card_gender">
          <a className="text-dark" href="prints_category/women">
            <h5 className="pb-3 h5_card_gender genders_titles">Women</h5>
          </a>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="prints_category/women/floral">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src="https://res.cloudinary.com/dwssfgyty/image/upload/v1679592089/original_32_12_xbspzj.jpg" className="card_img" alt="..." />
                <div className="card-body">
                  <p className="card-text">Floral</p>
                </div>
              </div>
            </a>
          </div>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="prints_category/women/geometric">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src="https://res.cloudinary.com/dwssfgyty/image/upload/v1679592147/original_68_131_wpiwye.jpg" className="card_img" alt="..." />
                <div className="card-body">
                  <p className="card-text">Geometric</p>
                </div>
              </div>
            </a>
          </div>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="prints_category/women/animal">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src="https://res.cloudinary.com/dwssfgyty/image/upload/v1679592192/original_RC2_Pri_Zebra_Camo_jmxnnw.jpg" className="card_img" alt="..." />
                <div className="card-body">
                  <p className="card-text">Animal</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
      <section id="cards_gender">
        <div className="row p_card_gender">
          <a className="text-dark" href="prints_category/children">
            <h5 className="pb-3 h5_card_gender genders_titles">Children</h5>
          </a>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="prints_category/children/animals">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src="https://res.cloudinary.com/dwssfgyty/image/upload/v1679592222/original_ft1_pri_animals_vyuwdi.jpg" className="card_img" alt="..." />
                <div className="card-body">
                  <p className="card-text">Animals</p>
                </div>
              </div>
            </a>
          </div>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="prints_category/children/sports">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src="https://res.cloudinary.com/dwssfgyty/image/upload/v1679592257/original_22-11-10-print-11_qbfncl.jpg" className="card_img" alt="..." />
                <div className="card-body">
                  <p className="card-text">Sports</p>
                </div>
              </div>
            </a>
          </div>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="prints_category/children/geometric">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src="https://res.cloudinary.com/dwssfgyty/image/upload/v1679592287/original_I_Pri_Jagged_Shapes_v2_jjdbvs.jpg" className="card_img" alt="..." />
                <div className="card-body">
                  <p className="card-text">Geometric</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
      
    </>
  );
}

export default Prints_category;
