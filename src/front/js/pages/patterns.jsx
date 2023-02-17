import React from "react";
import Cards_3dfiles_page from "../component/cards_3dfiles_page.jsx";

function Patterns() {
  const patterns_title = {
    men: "Men",
    women: "Women",
    children: "Children",
    title: "Patterns",
    Hoodies: "Hoodies",
    Tshirt: "T-shirt",
    Trousers: "Trousers",
    Dresses: "Dresses",
    Blouses: "Blouses",
  };
  return (
    <>
      <div className="body-3Dfiles">
        <Cards_3dfiles_page
          clothes_type1={patterns_title.Hoodies}
          clothes_type2={patterns_title.Tshirt}
          clothes_type3={patterns_title.Trousers}
          category={patterns_title.title}
          product={patterns_title.men}
        />
      </div>
      <div className="body-3Dfiles">
        <Cards_3dfiles_page
          clothes_type1={patterns_title.Dresses}
          clothes_type2={patterns_title.Blouses}
          clothes_type3={patterns_title.Trousers}
          product={patterns_title.women}
        />
      </div>
      <div className="body-3Dfiles">
        <Cards_3dfiles_page
          clothes_type1={patterns_title.Hoodies}
          clothes_type2={patterns_title.Tshirt}
          clothes_type3={patterns_title.Trousers}
          product={patterns_title.children}
        />
      </div>
    </>
  );
}

export default Patterns;
