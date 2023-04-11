import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";

import "/workspace/react-flask-hello/src/front/styles/night.css";
import "/workspace/react-flask-hello/src/front/styles/cards_gender.css";
import "/workspace/react-flask-hello/src/front/styles/category_list.css";

import Card_main from "./card_main";
import { useParams, useNavigate } from "react-router-dom";
import Level1 from "./level1.js";

const Category=() =>{
  const { store, actions } = useContext(Context);
  const params=useParams();
  
  //files3d
  const [menfiles3d,setMenfiles3d]=useState([
    {type:"Hoodies",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1679501873/zip_through_jacket_20211202_men_ekrvfn.png", num:1},
    {type:"T-shirts",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1679502138/pocket_polo_shirt_20220804_men_thcdhc.png",num:2},
    {type:"Trousers",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1679502030/zip_off_cargo_20220503_men_qkcva9.png",num:3}]
    )
  const [womenfiles3d,setWomenfiles3d]=useState([
    {type:"Dresses",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1679502330/bleisure_cover_up_20221010_women_d9z1fh.png", num:1},
    {type:"Blouses",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1679502461/printed_blouse_20230211_women_f3gcyi.png",num:2},
    {type:"Trousers",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1679502551/fluid_trouser_20220818_gender_inclusive_men_u2jtsx.png",num:3}]
    )
  const [childrenfiles3d,setChildrenfiles3d]=useState([
    {type:"Hoodies",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1679503254/blocked_hooded_tee_20211104_boy_wummis.png", num:1},
    {type:"T-shirts",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1679503225/deadstock_tee_20230214_boy_f9y1hq.png",num:2},
    {type:"Trousers",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1679503192/puffa_pants_20230110_boy_h7tpjq.png",num:3}]
    )
    //paterns
  const [menpatterns,setMenpatterns]=useState([
    {type:"Hoodies",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1680610331/shcxjhbfc6bhsyuqn7b4.png", num:1},
    {type:"T-shirts",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1680609878/wmcmzyhzsd39hdknz9qb.png",num:2},
    {type:"Trousers",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1680610584/rh5eewh26k8pvbcudssp.png",num:3}]
    )
  const [womenpatterns,setWomenpatterns]=useState([
    {type:"Dresses",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1679502330/bleisure_cover_up_20221010_women_d9z1fh.png", num:1},
    {type:"Blouses",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1679502461/printed_blouse_20230211_women_f3gcyi.png",num:2},
    {type:"Trousers",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1679502551/fluid_trouser_20220818_gender_inclusive_men_u2jtsx.png",num:3}]
    )
  const [childrenpatterns,setChildrenpatterns]=useState([
    {type:"Hoodies",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1679503254/blocked_hooded_tee_20211104_boy_wummis.png", num:1},
    {type:"T-shirts",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1679503225/deadstock_tee_20230214_boy_f9y1hq.png",num:2},
    {type:"Trousers",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1679503192/puffa_pants_20230110_boy_h7tpjq.png",num:3}]
    )
    //prints
  const [menprints,setMenprints]=useState([
    {type:"Abstract",src:" https://res.cloudinary.com/dwssfgyty/image/upload/v1679591937/original_fw15pg_LME068_b61cgw.jpg", num:1},
    {type:"Stripes",src:" https://res.cloudinary.com/dwssfgyty/image/upload/v1679592002/original_pgss15pr_cHRO022_celpf5.jpg",num:2},
    {type:"Geometric",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1679592037/original_SS15icap_bts50_hlb5hs.jpg",num:3}]
    )
  const [womenprints,setWomenprints]=useState([
    {type:"Floral",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1679592089/original_32_12_xbspzj.jpg", num:1},
    {type:"Geometric",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1679592147/original_68_131_wpiwye.jpg",num:2},
    {type:"Animal",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1679592192/original_RC2_Pri_Zebra_Camo_jmxnnw.jpg",num:3}]
    )
  const [childrenprints,setChildrenprints]=useState([
    {type:"Sporst",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1679592257/original_22-11-10-print-11_qbfncl.jpg", num:1},
    {type:"Geometric",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1679592287/original_I_Pri_Jagged_Shapes_v2_jjdbvs.jpg",num:2},
    {type:"Animals",src:"https://res.cloudinary.com/dwssfgyty/image/upload/v1679592222/original_ft1_pri_animals_vyuwdi.jpg",num:3}]
    )
    if(params.category==="files3d"){
      return (
          <Level1 
          class={params.category}
          objectMen={menfiles3d} 
          objectWomen={womenfiles3d}
          objectChildren={childrenfiles3d}
          ></Level1>
        );}
      else if(params.category==="patterns"){
        return (
          <Level1 
          class={params.category}
          objectMen={menpatterns} 
          objectWomen={womenpatterns}
          objectChildren={childrenpatterns}
          ></Level1>
        )
      }
      else if(params.category==="prints"){
        return (
          <Level1 
          class={params.category}
          objectMen={menprints} 
          objectWomen={womenprints}
          objectChildren={childrenprints}
          ></Level1>
        )
      }else{
      <div></div>
      }
}

export default Category;
