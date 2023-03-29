import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import "/workspace/react-flask-hello/src/front/styles/category_list.css";
import config2 from "../store/config2.js";
import config from "../store/config.js";
import { Link } from "react-router-dom";
import Card_cat from "../component/card_cat.js";

function FavoriteList() {
  const { store, action } = useContext(Context);
  const [loader, setLoader] = useState(true);
  const [fav_products,setFav_products]=useState({})
  useEffect(() => {
    console.log("holitatata")
    const call_favs=async()=>{
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${config.HOSTNAME}/api/get_favorites`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await res.json();
      setFav_products(data.fav_products)
      console.log(data)
      console.log("EYOYOYO")
    }
    call_favs();
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  return (
    <>
      {loader ? (
        <div>
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="container-fluid padindg_search_list p_card_gender">
          <p className="text-muted">Favorites list</p>
          <Link
            className="arrow_category_list"
            to={`/profile`}
          >
            <i className="fas fa-chevron-left mb-4 me-2"></i>Back
          </Link>
          <div className="row ">
            {fav_products.map((file, id) => {
              return(
                <Card_cat 
                        src={file.url}
                        name={file.type_clothes}
                        type={file.file_type}
                        type_clothes={file.type_clothes?file.type_clothes:file.type_prints}
                        file_number={file.number}
                        category={file.category}
                        file_id={file.id}
                ></Card_cat>
              )
              
            })}
            
          </div>
        </div>
      )}
    </>
  );
}

export default FavoriteList;
/*{store.favorites?.map((favorite, id) => {
              return(
                <div className="col-lg-3 col-md-4 col-6 my-2" key={favorite.id}>
                    {favorite.name}{" "}
              <Link to={`/product_page/${favorite.id}`} key={favorite.id}>
                <div className="card card_gender_background card_gender_border container_foto">
                  <img
                    src="https://res.cloudinary.com/dwssfgyty/image/upload/v1676451087/ueb7xb10s0sqe7jjcazv.png"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <p className="card-text text-dark">
                      {favorite.name}/{favorite.file_type}/{favorite.gender}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
              )
              
            })}*/