import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import "/workspace/react-flask-hello/src/front/styles/night.css";
import "/workspace/react-flask-hello/src/front/styles/cards_gender.css";
import "/workspace/react-flask-hello/src/front/styles/category_list.css";
import Card_main from "./card_main";
import { useParams, useNavigate } from "react-router-dom";

const Level1=(props) =>{
  const { store, actions } = useContext(Context);
  //const hoodies_fun=actions.hola()
  const objectMen=props.objectMen;
  const objectWomen=props.objectWomen;
  const objectChildren=props.objectChildren;
  
  return (
    <>
      <section id="cards_gender">
        <div className="row p_card_gender">
          <p className="pb-4 text-muted body_text">{props.class}</p>
          <div className="text-dark" >
            <h5 className="pb-3 h5_card_gender genders_titles body_text">
              Men
            </h5>
          </div>
          {objectMen.map((file, id) =>{
            return(
          <Card_main 
            src={file.src}
            type={file.type}
            gender="Men"
            category={props.class}
            ></Card_main>)})}
          
        </div>{" "}
      </section>
      <section id="cards_gender">
        <div className="row p_card_gender">
          <div className="text-dark" >
            <h5 className="pb-3 h5_card_gender genders_titles">
                Women
            </h5>
          </div>
          {objectWomen.map((file, id) =>{
            return(
          <Card_main 
            src={file.src}
            type={file.type}
            gender="Women"
            category={props.class}
            ></Card_main>)})}
        </div>
      </section>
      <section id="cards_gender">
        <div className="row p_card_gender">
          <div className="text-dark" >
            <h5 className="pb-3 h5_card_gender genders_titles">
                Children
            </h5>
          </div>
          {objectChildren.map((file, id) =>{
            return(
          <Card_main 
            src={file.src}
            type={file.type}
            gender="Children"
            category={props.class}
            ></Card_main>)})}

        </div>
      </section>
    </>
  );
}

export default Level1;
