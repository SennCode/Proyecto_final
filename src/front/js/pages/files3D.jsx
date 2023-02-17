import React from "react";
import Cards_3dfiles_page from "../component/cards_3dfiles_page.jsx";
import "/workspace/react-flask-hello/src/front/styles/files3D.css";
import { Link } from "react-router-dom";

function Files3D() {
  // FUNCION PARA PASAR LOS PROPS DESDE EL COMPONENTE CARDS_3DFILES_PAGE
  const files3d = {
    men: "Men",
    women: "Women",
    children: "Children",
    title_3dfiles: "3DFiles",
    Hoodies: "Hoodies",
    Tshirt: "T-shirt",
    Trousers: "Trousers",
    Dresses: "Dresses",
    Blouses: "Blouses",
  };

  return (
    <>
      <div className="body-3Dfiles">
        <Link to="/category_list">
          <Cards_3dfiles_page
            clothes_type1={files3d.Hoodies}
            clothes_type2={files3d.Tshirt}
            clothes_type3={files3d.Trousers}
            category={files3d.title_3dfiles}
            product={files3d.men}
          />
        </Link>
      </div>
      <div className="body-3Dfiles">
        <Link to="/category_list">
          <Cards_3dfiles_page
            clothes_type1={files3d.Dresses}
            clothes_type2={files3d.Blouses}
            clothes_type3={files3d.Trousers}
            product={files3d.women}
          />
        </Link>
      </div>
      <div className="body-3Dfiles">
        <Link to="/category_list">
          <Cards_3dfiles_page
            clothes_type1={files3d.Hoodies}
            clothes_type2={files3d.Tshirt}
            clothes_type3={files3d.Trousers}
            product={files3d.children}
          />
        </Link>
      </div>
    </>
  );
}

export default Files3D;
