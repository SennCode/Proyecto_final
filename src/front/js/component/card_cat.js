import React from "react";
import "/workspace/react-flask-hello/src/front/styles/category_list.css";
import { Link, useNavigate } from "react-router-dom";
const Card_cat=(props)=>{
    const url=props.href;
    const img=props.src;
    const name=props.name;
    const type=props.type;
    const file_number=props.file_number;
    const type_clothes=props.type_clothes;
    const file_id=props.file_id;
    const category=props.category
    //"https://res.cloudinary.com/dwssfgyty/image/upload/v1679501873/zip_through_jacket_20211202_men_ekrvfn.png"
    return(
    <div className="col-lg-3 col-md-4 col-6 my-2" key={file_id}>
        <Link
        to={`/product_page/${category}/${file_id}`}
        key={file_id}
    >
            
              <div className="card card_gender_background card_gender_border container_foto card_height">
              <div className="card-body d-flex">
                  <p className="card-text text-dark text-truncate">{name}</p>
                  
                </div>
              <img
                  src={img}
                  className="card-img-top img_height"
                  alt="..."
                />
                
                
              </div>
            </Link>
          </div>)
}
export default Card_cat;
/*<div className="col-lg-3 col-md-4 col-6 my-2" key={file.id}>
              <Link to={`/product_page/${file.id}`} key={file.id}>
                <div className="card card_gender_background card_gender_border container_foto">
                  <img
                    src={file.url}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <p className="card-text text-dark">
                      {file.name}/{file.file_type}/{file.gender}
                    </p>
                  </div>
                </div>
              </Link>
            </div>*/