import React, { useState, useEffect } from "react";
import print from "/workspace/react-flask-hello/src/front/img/print_prueba.png";
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
                <img src={print} className="card-img" alt="..." />
                <div className="card-body">
                  <p className="card-text decoration_text">Abstract</p>
                </div>
              </div>
            </a>
          </div>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="prints_category/men/stripes">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src={print} className="card-img" alt="..." />
                <div className="card-body">
                  <p className="card-text">Stripes</p>
                </div>
              </div>
            </a>
          </div>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="prints_category/men/geometric">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src={print} className="card-img" alt="..." />
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
                <img src={print} className="card-img" alt="..." />
                <div className="card-body">
                  <p className="card-text">Floral</p>
                </div>
              </div>
            </a>
          </div>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="prints_category/women/geometric">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src={print} className="card-img" alt="..." />
                <div className="card-body">
                  <p className="card-text">Geometric</p>
                </div>
              </div>
            </a>
          </div>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="prints_category/women/animal">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src={print} className="card-img" alt="..." />
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
                <img src={print} className="card-img" alt="..." />
                <div className="card-body">
                  <p className="card-text">Animals</p>
                </div>
              </div>
            </a>
          </div>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="prints_category/children/sports">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src={print} className="card-img" alt="..." />
                <div className="card-body">
                  <p className="card-text">Sports</p>
                </div>
              </div>
            </a>
          </div>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="prints_category/children/geometric">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src={print} className="card-img" alt="..." />
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
