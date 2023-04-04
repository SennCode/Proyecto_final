import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import "/workspace/react-flask-hello/src/front/styles/category_list.css";
import config2 from "../store/config2.js";
import Card_cat from "./card_cat.js";
import { useParams, useNavigate } from "react-router-dom";
import config from "../store/config.js";
const Pageprops2 =(props) =>{
  const params=useParams();
  const { store, actions } = useContext(Context);
  const [loader, setLoader] = useState(true);
  const { id, username, numero } = useParams();
  const [array,setArray]=useState({});

  useEffect(() => {
    console.log("hola")
    actions.getFiles3D();

    const call_data=async()=>{
      const cat=params.category
      const res = await fetch(`${config.HOSTNAME}/api/store`);
      const data = await res.json();
      console.log(data[cat])
      const final_array=data[cat].filter((file)=>{
        return file.type_clothes===params.type_clothes && file.gender===params.gender && file.id!==1 || file.type_prints===params.type_clothes && file.gender===params.gender && file.id!==1
        })
      
      console.log(final_array)
      setArray(final_array)
      
      
    }
    call_data();
    
  }, []);

  setTimeout(() => {
    setLoader(false);
  }, 1000);
  return (
    <>
      {loader ? (
        <div>
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="container-fluid padindg_category_list p_card_gender">
          <p className="text-muted">{params.category} / {params.gender} / {params.type_clothes}</p>
          <Link
            className="arrow_category_list"
            to={`/${params.category}`}
          >
            <i className="fas fa-arrow-alt-circle-left fa-lg"></i>
          </Link>
          <div className="row container d-flex justify-content-center">
          {array.map((file, id) => {
            /*if(file.gender == "Men" && file.type_clothes == "Hoodies")*/{
                return (
                    <Card_cat 
                        src={file.url}
                        name={file.name}
                        type={file.file_type}
                        type_clothes={file.type_clothes?file.type_clothes:file.type_prints}
                        file_number={file.number}
                        category={params.category}
                        file_id={file.id}></Card_cat>
                                    
                )}
              
            })}
            
          </div>
        </div>
      )}
    </>
  );
}

export default Pageprops2;
/*
setArray(data.files3d)
      console.log(params.gender)
      if(params.gender==="men" && params.type_clothes==="Hoodies"){
        const prearray= data.files3d.filter((file)=>{ return file.type_clothes==="Hoodies" && file.gender==="Men"})
        setArray(data.files3d)
      }
      else if (params.gender===2) {
        console.log("number2")
        setArray(data.patterns)
      } else if(params.gender===3){
        console.log("number3")
        setArray(data.prints)
      }


<div className="col-lg-2 col-md-3 col-6 my-2 " key={file.id}>
                    <Link
                      to={`/product_page/${file.number}/${file.id}`}
                      key={file.id}
                      onClick={() => SetNumerito(file.number)}
                    >
                      <div className="card-group">
                        <div className="card card_gender_border container_foto  ">
                          <img
                            src={file.url}
                            className="card-img-top  "
                            alt="..."
                          />
                          <div className="card-body">
                            <p className="card-text text-dark text-truncate fs-6 fw-light">
                              {file.name}/{file.file_type}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  
                  
                  {store.files3d.length
              ? store.files3d.map((file, i) =>
                  file.gender == "Men" && file.type_clothes == "Hoodies" ? (
                    <div className="col-lg-3 col-md-4 col-6 my-2" key={i}>
                      <Link to={`/product_page/${file.id}`} key={file.id}>
                        <div className="card card_gender_background card_gender_border container_foto card_img">
                          <img
                            src={file.url}
                            className="card-img-top "
                            alt="..."
                          />
                          <div className="card-body">
                            <p className="card-text text-dark text-truncate fs-6 fw-light mt-5">
                              {file.name} / {file.gender}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )
                )
              : ""}
                  
                  */