import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Card_main = (props) => {
  const img = props.src;
  const type = props.type;
  const gender = props.gender;
  const category = props.category;

  //"https://res.cloudinary.com/dwssfgyty/image/upload/v1679501873/zip_through_jacket_20211202_men_ekrvfn.png"
  return (
    <div className="col-lg-4 col-md-4">
      <Link to={`/${category}/${gender}/${type}`}>
        <div className="card text-bg-dark card_gender_background card_gender_border container_foto mb-2 card_img ">
          <div className="d-flex">
            <p className="card-text decoration_text mt-3 text-dark text-dark-card-night mb-2 ms-2 text-truncate">
              {type}
            </p>
          </div>
          <img src={img} className="img-fluid mx-2" alt="..." />
        </div>
      </Link>
    </div>
  );
};
export default Card_main;
