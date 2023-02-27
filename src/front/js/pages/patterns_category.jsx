import React, { useState, useEffect } from "react";
import patron from "/workspace/react-flask-hello/src/front/img/patron_vestido.png";
import "/workspace/react-flask-hello/src/front/styles/cards_gender.css";
import "/workspace/react-flask-hello/src/front/styles/category_list.css";

function Patterns_category() {

  return (
    <>
      <section id="cards_gender">
        <div className="row p_card_gender">
          <p className="pb-4 text-muted">Patterns</p>
          <a className="text-dark" href="/patterns_category/men">
            <h5 className="pb-3 h5_card_gender genders_titles">Men</h5>
          </a>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="patterns_category/men/hoodies">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src={patron} className="card-img" alt="..." />
                <div className="card-body">
                  <p className="card-text">Hoodies</p>
                </div>
              </div>
            </a>
          </div>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="patterns_category/men/t-shirts">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src={patron} className="card-img" alt="..." />
                <div className="card-body">
                  <p className="card-text">T-Shirt</p>
                </div>
              </div>
            </a>
          </div>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="patterns_category/men/trousers">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src={patron} className="card-img" alt="..." />
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
          <a className="text-dark" href="patterns_category/women">
            <h5 className="pb-3 h5_card_gender genders_titles">Women</h5>
          </a>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="patterns_category/women/dresses">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src={patron} className="card-img" alt="..." />
                <div className="card-body">
                  <p className="card-text">Dresses</p>
                </div>
              </div>
            </a>
          </div>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="patterns_category/women/blouses">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src={patron} className="card-img" alt="..." />
                <div className="card-body">
                  <p className="card-text">Blouses</p>
                </div>
              </div>
            </a>
          </div>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="patterns_category/women/trousers">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src={patron} className="card-img" alt="..." />
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
          <a className="text-dark" href="patterns_category/children">
            <h5 className="pb-3 h5_card_gender genders_titles">Children</h5>
          </a>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="patterns_category/children/hoodies">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src={patron} className="card-img" alt="..." />
                <div className="card-body">
                  <p className="card-text">Hoodies</p>
                </div>
              </div>
            </a>
          </div>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="patterns_category/children/t-shirts">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src={patron} className="card-img" alt="..." />
                <div className="card-body">
                  <p className="card-text">T-Shirt</p>
                </div>
              </div>
            </a>
          </div>
          <div className="pricing-column col-lg-4 col-md-4">
            <a className="text-dark" href="patterns_category/children/trousers">
              <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
                <img src={patron} className="card-img" alt="..." />
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

export default Patterns_category;
