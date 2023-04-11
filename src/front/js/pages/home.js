import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container-fluid justify-content-center video-background">
      <video
        src="https://res.cloudinary.com/dwssfgyty/video/upload/v1680601815/Grabacio%CC%81n_de_pantalla_2023-04-04_a_las_11.47.38_dh5pds.mov"
        autoPlay
        muted
        loop
        className="video-background__video"
      />

      <div className="container-video">
        <h1 className="text-center text-lg h1-title d-flex text-focus-in h1_titles_home">
          Community where you can share 3D files, patterns and prints from the main
          fashion programs!
        </h1>
      </div>

      {/* <section id="cta">
        <div className="container-fluid justify-content-center">
          <div className="row pt-5">
            <div className="featured-box">
              <h3 className="h3-cta justify-content-center">
                Find your perfect clothing for your personal project or contact
                the artist directly to create a personalized collection
              </h3>
              <p className="p-cta">Download and use</p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};
