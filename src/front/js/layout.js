import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import Files3d_category from "./pages/files3d_category.jsx";
import Patterns_category from "./pages/patterns_category.jsx";
import Prints_category from "./pages/prints_category.jsx";
import Prints_Men from "./pages/prints_men.jsx";
import Prints_Women from "./pages/prints_women.jsx";
import Prints_Children from "./pages/prints_children.jsx";
import Prints_Women_Floral from "./pages/prints_women_floral.jsx";
import Prints_Children_Animals from "./pages/prints_children_animals.jsx";
import Prints_Children_Sports from "./pages/prints_children_sports.jsx";
import Prints_Children_Geometric from "./pages/prints_children_geometric.jsx";
import Prints_Women_Geometric from "./pages/prints_women_geometric.jsx";
import Prints_Women_Animal from "./pages/prints_women_animal.jsx";
import Prints_Men_Abstract from "./pages/prints_men_abstract.jsx";
import Prints_Men_Stripes from "./pages/prints_men_stripes.jsx";
import Prints_Men_Geometric from "./pages/prints_men_geometric.jsx";
import Files3d_Men from "./pages/files3d_men.jsx";
import Patterns_Men from "./pages/patterns_men.jsx";
import Patterns_Men_Hoodies from "./pages/patterns_men_hoodies.jsx";
import Patterns_Men_Tshirts from "./pages/patterns_men_t-shirts.jsx";
import Patterns_Men_Trousers from "./pages/patterns_men_trousers.jsx";
import Patterns_Women_Dresses from "./pages/patterns_women_dresses.jsx";
import Patterns_Women_Blouses from "./pages/patterns_women_blouses.jsx";
import Patterns_Women_Trousers from "./pages/patterns_women_trousers.jsx";
import Patterns_Children_Hoodies from "./pages/patterns_children_hoodies.jsx";
import Patterns_Children_Tshirts from "./pages/patterns_children_t-shirts.jsx";
import Patterns_Children_Trousers from "./pages/patterns_children_trousers.jsx";
import Files3d_Men_Hoodies from "./pages/files3d_men_hoodies.jsx";
import Files3d_Men_Tshirts from "./pages/files3d_men_t-shirts.jsx";
import Files3d_Men_Trousers from "./pages/files3d_men_trousers.jsx";
import Files3d_Women from "./pages/files3d_women.jsx";
import Files3D_Women_Dresses from "./pages/files3d_women_dresses.jsx";
import Files3D_Women_Trousers from "./pages/files3d_women_trousers.jsx";
import Files3d_Women_Blouses from "./pages/files3d_women_blouses.jsx";
import Files3d_Children from "./pages/files3d_children.jsx";
import Files3d_Children_Hoodies from "./pages/files3d_children_hoodies.jsx";
import Files3D_Children_Tshirts from "./pages/files3d_children_t-shirts.jsx";
import Files3D_Children_Trousers from "./pages/files3d_children_trousers.jsx";
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
            <Route element={<FavoriteList />} path="/favorites" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<SearchResults />} path="/search_results/:query" />
            <Route element={<Prints_Men />} path="/prints_category/men" />
            <Route element={<Prints_Women />} path="/prints_category/women" />
            <Route element={<Prints_Children />} path="/prints_category/children" />
            <Route element={<Prints_Children_Animals />} path="/prints_category/children/animals" />
            <Route element={<Prints_Children_Sports />} path="/prints_category/children/sports" />
            <Route element={<Prints_Children_Geometric/>} path="/prints_category/children/geometric" />
            <Route element={<Prints_Women_Floral />} path="/prints_category/women/floral" />
            <Route element={<Prints_Women_Geometric />} path="/prints_category/women/geometric" />
            <Route element={<Prints_Women_Animal />} path="/prints_category/women/animal" />
            <Route element={<Prints_Men_Abstract />} path="/prints_category/men/abstract" />
            <Route element={<Prints_Men_Stripes />} path="/prints_category/men/stripes" />
            <Route element={<Prints_Men_Geometric />} path="/prints_category/men/geometric" />
            <Route element={<Patterns_Men />} path="/patterns_category/men" />
            <Route
              element={<Patterns_Men_Hoodies />}
              path="/patterns_category/men/hoodies"
            />
            <Route
              element={<Patterns_Men_Tshirts />}
              path="/patterns_category/men/t-shirts"
            />
            <Route
              element={<Patterns_Men_Trousers />}
              path="/patterns_category/men/trousers"
            />
            <Route
              element={<Patterns_Women_Dresses />}
              path="/patterns_category/women/dresses"
            />
            <Route
              element={<Patterns_Women_Blouses />}
              path="/patterns_category/women/blouses"
            />
            <Route
              element={<Patterns_Women_Trousers />}
              path="/patterns_category/women/trousers"
            />
            <Route
              element={<Patterns_Children_Hoodies />}
              path="/patterns_category/children/hoodies"
            />
            <Route
              element={<Patterns_Children_Tshirts />}
              path="/patterns_category/children/t-shirts"
            />
            <Route
              element={<Patterns_Children_Trousers />}
              path="/patterns_category/children/trousers"
            />
            <Route element={<Files3d_Men />} path="/files3d_category/men" />
            <Route
              element={<Files3d_Men_Hoodies />}
              path="/files3d_category/men/hoodies"
            />
            <Route
              element={<Files3d_Men_Hoodies />}
              path="/files3d_category/men/hoodies"
            />
            <Route
              element={<Files3d_Men_Tshirts />}
              path="/files3d_category/men/t-shirts"
            />
            <Route
              element={<Files3d_Men_Trousers />}
              path="/files3d_category/men/trousers"
            />
            <Route element={<Files3d_Women />} path="/files3d_category/women" />
            <Route
              element={<Files3D_Women_Dresses />}
              path="/files3d_category/women/dresses"
            />

            <Route
              element={<Files3d_Women_Blouses />}
              path="/files3d_category/women/blouses"
            />
            <Route
              element={<Files3D_Women_Trousers />}
              path="/files3d_category/women/trousers"
            />
            <Route
              element={<Files3d_Children />}
              path="/files3d_category/children"
            />
            <Route
              element={<Files3d_Children_Hoodies />}
              path="/files3d_category/children/hoodies"
            />
            <Route
              element={<Files3D_Children_Tshirts />}
              path="/files3d_category/children/t-shirts"
            />
            <Route
              element={<Files3D_Children_Trousers />}
              path="/files3d_category/children/trousers"
            />
            <Route element={<Prints_category />} path="/prints_category" />
            <Route element={<Patterns_category />} path="/patterns_category" />
            <Route element={<Files3d_category />} path="/files3d_category" />
            <Route element={<UploadProduct />} path="/upload_product" />
            <Route element={<ProductPage />} path="/product_page/:id" />
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
