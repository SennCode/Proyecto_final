import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import Category from "./component/category";
import Pageprops2 from "./component/pageprops2";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Create_user from "./pages/register_user.jsx";
import FavoriteList from "./pages/favorite_list.jsx";
import Login from "./pages/login.jsx";
import ProductPage from "./pages/product_page.jsx";
import UploadProduct from "./pages/upload_product.jsx";
import SearchResults from "./pages/search_results.jsx";
import Profile from "./pages/profile.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Category />} path="/:category" />
            <Route element={<Pageprops2 />} path="/:category/:gender/:type_clothes" />
            <Route element={<ProductPage />} path="/product_page/:category/:id" />
            <Route element={<FavoriteList />} path="/favorites" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<SearchResults />} path="/search_results/:query" />
            <Route element={<UploadProduct />} path="/upload_product" />
            <Route element={<Create_user />} path="/register_user" />
            <Route element={<Login />} path="/login" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
