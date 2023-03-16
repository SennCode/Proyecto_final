import React, { useContext, useEffect, useState } from "react";
import "/workspace/react-flask-hello/src/front/styles/upload_product.css";
import hoodie_black from "/workspace/react-flask-hello/src/front/img/hoodie_black.png";
import { Context } from "../store/appContext.js";
import config from "../store/config.js";

function UploadProduct() {
  const { store, actions } = useContext(Context);
  const [ bool, setBool] = useState(false)
  const [newFile3D, setNewFile3D] = useState({
    category: "",
    name: "",
    description: "",
    file_type: "",
    gender: "",
    url: [],
    files: [],
    type_clothes: "",
    size: "",
  });

  const sendImage = () => {
    
    const fileInput = document.getElementById("formFileMultiple");
    const files = Array.from(fileInput.files);
    files.forEach((file) => {
     
      const body = new FormData();
    body.append("archivo", file);
    
    fetch(`${config.HOSTNAME}/api/upload`, {
      method: "POST",
      body: body,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        
        setNewFile3D({
          ...newFile3D,
          url: [...newFile3D.url, data],
        });
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    })
    setBool(true)
  };


  const handleInputFiles = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setNewFile3D({
      ...newFile3D,
      files: urls,
    });
  };

  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setNewFile3D((prevState) => ({ ...prevState, [inputName]: inputValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendImage()
  //  if ( ) {
  //   console.log(newFile3D)
  //   actions.createFile3D(newFile3D)}
    // const urls = files.map(
    //   (file) => `${config.HOSTNAME}/api/upload/${file.name}`
    // );
    
    // const newFile3DWithUrl = {
    //   ...newFile3D,
    //   url: urls,
    // };
    // console.log(newFile3D)
    // actions.createFile3D(newFile3D);
  };

  useEffect(() => {
    console.log(newFile3D)
    const fileInput = document.getElementById("formFileMultiple")
    const files = Array.from(fileInput.files)
    if (bool && files.length == newFile3D.url.length) {
    actions.createFile3D(newFile3D);
    setNewFile3D({
      ...newFile3D,
      url: [],
    });
    setBool(false)
  }
    
  }, [bool, newFile3D.url])

  const getTypeClothesOptions = () => {
    if (
      newFile3D.gender === "Men" &&
      (newFile3D.category === "3Dfiles" || newFile3D.category === "Patterns")
    ) {
      return (
        <>
          <option value="Hoodies">Hoodies</option>
          <option value="T-Shirts">T-Shirt</option>
          <option value="Trousers">Trousers</option>
        </>
      );
    } else if (
      newFile3D.gender === "Women" &&
      (newFile3D.category === "3Dfiles" || newFile3D.category === "Patterns")
    ) {
      return (
        <>
          <option value="Dresses">Dresses</option>
          <option value="Blouses">Blouses</option>
          <option value="Trousers">Trousers</option>
        </>
      );
    } else if (
      newFile3D.gender === "Children" &&
      (newFile3D.category === "3Dfiles" || newFile3D.category === "Patterns")
    ) {
      return (
        <>
          <option value="Hoodies">Hoodies</option>
          <option value="T-Shirts">T-Shirts</option>
          <option value="Trousers">Trousers</option>
        </>
      );
    } else if (newFile3D.gender === "Men" && newFile3D.category === "Prints") {
      return (
        <>
          <option value="Abstract">Abstract</option>
          <option value="Stripes">Stripes</option>
          <option value="Geometric">Geometric</option>
        </>
      );
    } else if (
      newFile3D.gender === "Women" &&
      newFile3D.category === "Prints"
    ) {
      return (
        <>
          <option value="Floral">Floral</option>
          <option value="Geometric">Geometric</option>
          <option value="Animal">Animal</option>
        </>
      );
    } else if (
      newFile3D.gender === "Children" &&
      newFile3D.category === "Prints"
    ) {
      return (
        <>
          <option value="Animals">Animals</option>
          <option value="Sports">Sports</option>
          <option value="Geometric">Geometric</option>
        </>
      );
    } else {
      return (
        <>
          <option value="">Select a category and gender first</option>
        </>
      );
    }
  };

  const typeClothesOptions = getTypeClothesOptions();

  return (
    <div className="container-fluid container_uploadProduct">
      <div className="row">
        <div className="col-lg-12">
          <h2 className="pb-3 h3-upload">Upload file</h2>
          {/* -- Category -- */}
          <select
            className="form-select form-select-sm borders_upload"
            aria-label=".form-select-sm example "
            name="category"
            value={newFile3D.category}
            onChange={handleInputChange}
          >
            <option value="Category">Category</option>
            <option value="3Dfiles">3Dfiles</option>
            <option value="Patterns">Patterns</option>
            <option value="Prints">Prints</option>
          </select>
          {/* -- Title -- */}
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label pt-3"
            >
              Title
            </label>
            <input
              type="text"
              className="form-control borders_upload"
              id="exampleFormControlInput1"
              placeholder='e.g.: "Black Trousers"'
              name="name"
              value={newFile3D.name}
              onChange={handleInputChange}
            />
          </div>
          {/* -- Description -- */}
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
              className="form-control borders_upload"
              id="exampleFormControlTextarea1"
              rows="3"
              name="description"
              value={newFile3D.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          {/* -- Size -- */}
          <select
            className="form-select form-select-sm borders_upload mb-3"
            aria-label=".form-select-sm"
            name="size"
            value={newFile3D.size}
            onChange={handleInputChange}
          >
            <option defaultValue>Size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
          {/* -- File Type -- */}
          <select
            className="form-select form-select-sm borders_upload mb-3"
            aria-label=".form-select-sm example"
            name="file_type"
            value={newFile3D.file_type}
            onChange={handleInputChange}
          >
            <option defaultValue>File type</option>
            <option value=".obj">.obj</option>
            <option value=".zprj">.zprj</option>
            <option value="3.dxf">.dxf</option>
            <option value=".tiff">.tiff</option>
          </select>

          {/* -- Gender -- */}
          <select
            className="form-select form-select-sm borders_upload mb-3"
            aria-label=".form-select-sm example"
            name="gender"
            value={newFile3D.gender}
            onChange={handleInputChange}
          >
            <option defaultValue>Gender</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Children">Children</option>
          </select>
          {/* -- Type Clothes -- */}
          <select
            className="form-select form-select-sm borders_upload"
            aria-label=".form-select-sm example"
            name="type_clothes"
            value={newFile3D.type_clothes}
            onChange={handleInputChange}
          >
            <option defaultValue>Type Clothes</option>
            {typeClothesOptions}
          </select>
        </div>
      </div>

      {/* -- Input imgs -- */}

      <div className="mb-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="formFileMultiple" className="form-label pt-3">
              Photos
            </label>
            <input
              className="form-control"
              type="file"
              id="formFileMultiple"
              multiple
              name="files"
              onChange={handleInputFiles}
            />
          </div>
        </form>
      </div>
      {/* -- Input zip -- */}
      <div className="mb-3">
        <label htmlFor="formFileMultiple" className="form-label pt-3">
          File .zip/.rar
        </label>
        <input className="form-control" type="file" id="file-input" multiple />
      </div>
      {/* -- Imgs -- */}
      <div className="container-fluid">
        <div className="row d-flex">
          {newFile3D.files.map((url, index) => (
            <div
              key={index}
              className="col-lg-2 pt-2 ms-3 img_upload_sizes mb-2 me-2"
            >
              <img
                src={url}
                className="img-fluid img_product_page me-2"
                alt={`Product View ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-lg-2">
            <button
              onClick={handleSubmit}
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