/*import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import "/workspace/react-flask-hello/src/front/styles/category_list.css";
import config2 from "../store/config2.js";

const Propspage =(props)=> {
  const { store, actions } = useContext(Context);
  const [loader, setLoader] = useState(true);

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
        <div className="container-fluid padindg_category_list p_card_gender ">
            <p className="text-muted">{props.ruta}</p>
          <a
            className="arrow_category_list"
            href={`${config2.HOSTNAME}/${props.url}`}

          >
          <i class="fas fa-arrow-alt-circle-left fa-lg"></i>
          </a>
          <div className="row ">
            {store.props.array.length
              ? store.props.map((file, id) =>
                  file.gender == "Children" &&
                  file.type_clothes == "Hoodies" ? (
                    <div className="col-lg-3 col-md-4 col-6 my-2" key={file.id}>
                      <Link to={`/product_page/${file.id}`} key={file.id}>
                        <div className="card card_gender_background card_gender_border container_foto">
                          <img
                            src="https://res.cloudinary.com/dwssfgyty/image/upload/v1676451087/ueb7xb10s0sqe7jjcazv.png"
                            className="card-img-top"
                            alt="..."
                          />
                          <div className="card-body">
                            <p className="card-text text-dark text-truncate fs-6 fw-light">
                              {file.name}/{file.file_type}
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
          </div>
        </div>
      )}
    </>
  );
}

export default Propspage;*/
