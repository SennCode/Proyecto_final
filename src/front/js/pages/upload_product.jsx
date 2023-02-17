import React from "react";
import "/workspace/react-flask-hello/src/front/styles/upload_product.css";
import hoodie_black from "/workspace/react-flask-hello/src/front/img/hoodie_black.png";
import hoodie from "/workspace/react-flask-hello/src/front/img/hoodie.png";

const HOSTNAME =
  "https://3001-4geeksacade-reactflaskh-xex9ne5j69n.ws-eu86.gitpod.io/";

// UploadProduct se encargará de procesar la carga de un producto
function UploadProduct() {
  // función llamada sendImage que se encargará de enviar la imagen al servidor
  const sendImage = () => {
    console.log(">>>Send Image>>>");
    // obtiene el archivo que se ha cargado en el elemento con el id "file-input" y
    // lo almacena en la variable file
    const file = document.getElementById("file-input").files[0];
    console.log(file);
    // crea un objeto FormData que se usará para enviar los datos al servidor
    const body = new FormData();
    // añade el archivo que se ha cargado en el objeto FormData con el nombre "archivo"
    body.append("archivo", file);
    // inicia una petición fetch a la URL
    fetch(`${HOSTNAME}/api/upload`, {
      // se está haciendo una petición POST
      method: "POST",
      // añade el objeto FormData que se ha creado a la petición fetch
      body: body,
    })
      // indica que cuando la petición fetch se complete satisfactoriamente,
      // se ejecutará el siguiente código
      .then((res) => {
        return res.json();
      })
      // indica que cuando la respuesta JSON esté lista, se ejecutará el siguiente código
      .then((data) => {
        console.log({ data });
      });
  };

  return (
    <div className="container-fluid container_uploadProduct">
      <div className="row">
        <div className="col-lg-12">
          <h2 className="pb-3 h3-upload">Upload file</h2>
          {/* -- Category -- */}
          <select
            className="form-select form-select-sm borders_upload"
            aria-label=".form-select-sm example"
          >
            <option selected>Category</option>
            <option value="1">3Dfiles</option>
            <option value="2">Patterns</option>
            <option value="3">Prints</option>
          </select>
          {/* -- Title -- */}
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label pt-3">
              Title
            </label>
            <input
              type="email"
              className="form-control borders_upload"
              id="exampleFormControlInput1"
              placeholder='e.g.: "Black Trousers"'
            />
          </div>
          {/* -- Description -- */}
          <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
              className="form-control borders_upload"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          {/* -- Size -- */}
          <select
            className="form-select form-select-sm borders_upload mb-3"
            aria-label=".form-select-sm"
          >
            <option selected>Size</option>
            <option value="1">XS</option>
            <option value="2">S</option>
            <option value="3">M</option>
            <option value="3">L</option>
            <option value="3">XL</option>
          </select>
          {/* -- File Type -- */}
          <select
            className="form-select form-select-sm borders_upload"
            aria-label=".form-select-sm example"
          >
            <option selected>File type</option>
            <option value="1">.obj</option>
            <option value="2">.zprj</option>
            <option value="3">.dxf</option>
            <option value="4">.tiff</option>
          </select>
        </div>
      </div>

      {/* -- Input imgs -- */}

      <div className="mb-3">
        <label for="formFileMultiple" className="form-label pt-3">
          Photos
        </label>
        <input
          className="form-control"
          type="file"
          id="formFileMultiple"
          multiple
        />
      </div>
      {/* -- Input zip -- */}
      <div className="mb-3">
        <label for="formFileMultiple" className="form-label pt-3">
          File .zip/.rar
        </label>
        <input className="form-control" type="file" id="file-input" multiple />
      </div>
      {/* -- Imgs -- */}
      <div className="row">
        <div className="col-lg-12 pt-2 ms-3">
          <img
            src=""
            className="img-fluid img_product_page img_upload_sizes me-2"
            alt="Product Image"
          />
          <img
            src={hoodie_black}
            className="img-fluid img_product_page img_upload_sizes me-2"
            alt="Product View 1"
          />

          <img
            src={hoodie_black}
            className="img-fluid img_product_page img_upload_sizes me-2"
            alt="Product View 2"
          />

          <img
            src={hoodie_black}
            className="img-fluid img_product_page img_upload_sizes me-2"
            alt="Product View 3"
          />
        </div>
        <div className="row">
          <div className="col-lg-2">
            <button
              onClick={sendImage}
              type="button"
              className="btn button_product_page btn-block mb-5 text_product_page btn-sm mt-4
                "
            >
              Upload file
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadProduct;
