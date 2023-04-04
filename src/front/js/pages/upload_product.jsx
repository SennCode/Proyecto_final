import React, { useContext, useEffect, useState } from "react";
import "/workspace/react-flask-hello/src/front/styles/upload_product.css";
import { Context } from "../store/appContext.js";
import config from "../store/config.js";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';

function UploadProduct() {
  const navigate=useNavigate()
  const { store, actions } = useContext(Context);
  const [ bool, setBool] = useState(false)
  const [cuenta,setCuenta]=useState(0)
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
    user_id:JSON.parse(localStorage.getItem("user_id")),
  });

  const [showModal, setShowModal] = useState(false);

  function handleModalClose() {
    setShowModal(false);
    navigate("/profile");
  }


  const sendImage = () => {
    console.log("Enviando objeto")
    const fileInput = document.getElementById("formFileMultiple");
    const files = Array.from(fileInput.files);
    files.forEach((file) => {
     
      const body = new FormData();
    body.append("archivo", file);
    console.log({body})
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
  //FUNCION QUE FALTA POR FUNCIONAR, PROBLEMA CON EL REQUEST BODY
  const subirarchivo = () => {
    if(newFile3D.category==="3Dfiles") {
      console.log("esto es files3d");
      actions.set3d(newFile3D,"file3d");
    }
    else if(newFile3D.category==="Patterns"){
      console.log("esto es patterns");
      actions.set3d(newFile3D,"pattern")
    }
    else if(newFile3D.category==="Prints"){
      console.log("esto es prints");
      actions.set3d(newFile3D,"print")
    }
  };
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("cuando se esta llamando esta funcion")
    sendImage()
    console.log(newFile3D)
    //subirarchivo();
    setShowModal(true);
  };

  useEffect(() => {
    console.log(cuenta)
    setCuenta(cuenta+1)
    //cuenta===2?console.log(newFile3D.url[0].url_image):""
    cuenta===2?subirarchivo():""
    console.log(newFile3D)
    const fileInput = document.getElementById("formFileMultiple")
    const files = Array.from(fileInput.files)
    if (bool && files.length == newFile3D.url.length) {
    actions.createFile3D(newFile3D);
    setNewFile3D({
      ...newFile3D,
      url: [],
    });
    cuenta===2?setCuenta(0):""
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
          <option value="T-shirts">T-shirts</option>
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
          <option value="T-shirts">T-shirts</option>
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
          <h3 className="pb-3 text-decoration-underline">Upload file</h3>
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
          <button onClick={handleSubmit} type="button" className="btn btn-primary btn-block mb-5 text_product_page btn-sm mt-4" data-bs-toggle="modal" data-bs-target="#myModal">
  Upload file
</button>

<Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title className="modal-night">Upload Successful</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p className="modal-night">Your file has been uploaded successfully!</p>
  </Modal.Body>
  <Modal.Footer>
  <Button className="modal-night-btn" variant="secondary" onClick={handleModalClose}>

      Go to your profile
    </Button>
  </Modal.Footer>
</Modal> 
</div>
</div>
      </div>
    </div>
  );
}

export default UploadProduct;