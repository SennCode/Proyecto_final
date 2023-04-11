//npm install js-file-download --save
//Uso:
//  var fileDownload = require('js-file-download');
//  fileDownload(data, 'filename.csv');
//npm install axios
//import "./styles.css";
/*import axios from 'axios'
import fileDownload from 'js-file-download'
export default function App() {
  const handleClick = (url, filename) => {
    axios.get(url, {
      responseType: 'blob',
    })
    .then((res) => {
      fileDownload(res.data, filename)
    })
  }
  return (
    <div className="App">
      <button onClick={() => {() => handleClick('https://avatars.githubusercontent.com/u/9919?s=280&v=4', 'sample')}}>
        Download the File</button>
    </div>
  );
}*/

import React from "react";
//import "./styles.css";
import fileDownload from "js-file-download";
import axios from "axios";

 const Appp=(props)=> {
    //const file_name="ladyy.jpg"
    //const file_url="https://res.cloudinary.com/demo/image/upload/w_400,h_400,c_crop,g_face,r_max/w_200/lady.jpg"
    const file_name=props.file_name
    const file_url=props.file_url
    console.log(file_url)
  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob"
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };
//https://res.cloudinary.com/demo/image/upload/w_400,h_400,c_crop,g_face,r_max/w_200/lady.jpg
  return (
    <div className="Appp">
      <button
        onClick={() => {
          handleDownload(
            "https://res.cloudinary.com/dwssfgyty/image/upload/v1680523963/nqr7gcnu1spn0johzspv.jpg",
            file_name
          );
        }}
      >
        Download
      </button>
    </div>
  );
}
export default Appp;
