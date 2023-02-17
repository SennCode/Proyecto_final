import React from "react";
import hoodie_clonX from "/workspace/react-flask-hello/src/front/img/hoodie_clonX.png";
import hoodie_black from "/workspace/react-flask-hello/src/front/img/hoodie_black.png";
import hoodie from "/workspace/react-flask-hello/src/front/img/hoodie.png";
import "/workspace/react-flask-hello/src/front/styles/cards_gender.css"


function Cards_3dfiles_page(props){
  return (
    <section id="cards_gender">
    <div className="row p_card_gender">

      <h2 className="title_categories pb-4">{props.category}</h2>

      <h5 className="pb-3 h5_card_gender h5_gender_border">{props.product}</h5>
      <div className="pricing-column col-lg-4 col-md-4">
      
        <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
          <img src={hoodie_clonX} className="card-img" alt="..." />
          <div className="card-img-overlay">
            <p className="card-title">{props.clothes_type1}</p>
          </div>
        </div>
      </div>

      <div className="pricing-column col-lg-4 col-md-4">
        <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
          <img src={hoodie} className="card-img" alt="..." />
          <div className="card-img-overlay">
            <p className="card-title">{props.clothes_type2}</p>
          </div>
        </div>
      </div>

      <div className="pricing-column col-lg-4 col-md-4">
        <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2">
          <img src={hoodie_black} className="card-img" alt="..." />
          <div className="card-img-overlay">
            <p className="card-title">{props.clothes_type3}</p>
          </div>
        </div>
      </div>

    </div>
    </section>
  );
}

export default Cards_3dfiles_page;
