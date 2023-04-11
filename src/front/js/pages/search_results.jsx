import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import "/workspace/react-flask-hello/src/front/styles/category_list.css";
import config2 from "../store/config2.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Card_cat from "../component/card_cat.js";

function SearchResults() {
  const { store, action } = useContext(Context);
  const [loader, setLoader] = useState(true);
  const { query } = useParams();

  useEffect(() => {
    console.log(store.search_results)
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
        <div className="container-fluid padindg_category_list p_card_gender">
          <p className="text-muted">Search results</p>
          <a
            className="arrow_category_list"
            href={`${config2.HOSTNAME}/files3d_category`}
          >
            <i className="fas fa-chevron-left mb-4 me-2"></i>Back
          </a>
          <div className="row ">
            {store.search_results?.map((file, id) => {
              console.log("hola")
              if(file.id!==1){
                return(<Card_cat 
          src={file.url}
          name={file.name}
          type={file.file_type}
          type_clothes={file.type_clothes?file.type_clothes:file.type_prints}
          file_number={file.number}
          category={file.category}
          file_id={file.id}
  ></Card_cat>)}
              
            })}
            
          </div>
        </div>
      )}
    </>
  );
}

export default SearchResults;
