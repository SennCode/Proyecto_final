// -----
// - La función getState retorna un objecto que tiene 2 propiedades(store y actions)
// store: Este objeto almacena los valores que se van a usar en la aplicación
// actions: Este objeto almacena funciones que van a ser llamadas en la aplicación
// para hacer cambios en el store
// - La función fetch es una función que permite hacer peticiones HTTP y obtener datos de un servidor.
// - La funcion json es un método que se utiliza para parsear la respuesta de una petición HTTP y
// convertirla en un objeto JavaScript.
// - El código está utilizando async y await para esperar a que se complete la petición HTTP y obtener
// los datos antes de continuar con el resto del código.
// -----

import config from "/workspace/react-flask-hello/src/front/js/store/config.js";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      users: [],
      files3d: [],
      patterns: [],
      prints: [],
      access_token: null,
      user_id: null,
      search_results: [],
      favorites: [],
      navigate: null,
      numero: 0,
    },

    actions: {
      navigateNull: () => {
        setStore({ navigate: null });
      },
      // Obtenemos los datos de usuario desde la API y lo convertimos en un json
      //   y lo almacenamos en el store usando setStore

      // ----------------
      // USUARIOS
      // ----------------
      getUsers: async () => {
        fetch(`${config.HOSTNAME}/api/users`)
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            return setStore({ users: data });
          });
      },

      // ----------------
      // CREAR ARCHIVO 3D
      // ----------------
      //ESTA FUNCION NO SE USA
      createFile3D: async (newFile3D) => {
        try {
          const token = localStorage.getItem("access_token");
          const response = await fetch(`${config.HOSTNAME}/api/create_file`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify(newFile3D),
          });
          if (!response.ok) {
            return { "HTTP error ": response.status };
          }
          const data = await response.json();
          setStore((store) => {
            return {
              ...store,
              files3d: [...store.files3d, data],
            };
          });
          return data;
        } catch (error) {
          console.error(error);
        }
      },

      //ESTA SI SE USA
      set3d: async (newFile3D,route) => {
        console.log({newFile3D})
        console.log(newFile3D.url)
        console.log(newFile3D.url[0])

        try {
            const response = await fetch(`${config.HOSTNAME}/api/set_${route}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: newFile3D.name,
                    category: newFile3D.category,
                    description: newFile3D.description,
                    file_type: newFile3D.file_type,
                    gender: newFile3D.gender,
                    url: newFile3D.url[0].url_image,
                    //url: newFile3D.files[0],
                    type_clothes: newFile3D.type_clothes,
                    size: newFile3D.size,
                    user_id: newFile3D.user_id,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log("ok");
                
            } else {
                throw new Error(data.msg);
            }
        } catch (error) {
            throw error;
        }
    },
      //pequeña prueba MILLAN SUBIDA ARCHIVO
      // set3d: async (newFile3D) => {
      //   console.log("esta entrando 3d");
      //   const primero = "pru";
      //   const segundo = "pru";
      //   const tercero = "pru";
      //   const cuarto = "pru";
      //   const quinto = "pru";
      //   const sexto = "pru";
      //   const septimo = "pru";
      //   const octavo = "pru";
      //   const nueve = 15
      //   try {
      //     const response = await fetch(`${config.HOSTNAME}/api/set_file3d`, {
      //       method: "POST",
            
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify({
      //         name: primero,
      //         category: segundo,
      //         description: tercero,
      //         fyle_type: cuarto,
      //         gender:quinto,url:sexto,type_clothes:septimo,size:octavo,
      //         user_id:nueve

      //       }),
      //     });
      //     const data = await response.json();
      //     if (response.ok) {
      //       /*localStorage.setItem("access_token", data.access_token);
      //       localStorage.setItem("user_id", data.user_id);
      //       setStore({ access_token: data.access_token });
      //       console.log(data.access_token);
      //       return data;*/
      //       console.log("ok");
      //     } else {
      //       throw new Error(data.msg);
      //     }
      //   } catch (error) {
      //     throw error;
      //   }
      // },

      setFavorite: async (favs) => {
        console.log("esta entrando favs");
        const primero = 1;
        const segundo = 1;
        const tercero = 1;
        const cuarto = 1;
        try {
          const response = await fetch(`${config.HOSTNAME}/api/set_favorite`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: primero,
              patterns_id: segundo,
              files3d_id: tercero,
              prints_id: cuarto,
            }),
          });
          const data = await response.json();
          if (response.ok) {
            /*localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("user_id", data.user_id);
            setStore({ access_token: data.access_token });
            console.log(data.access_token);
            return data;*/
            console.log("ok");
          } else {
            throw new Error(data.msg);
          }
        } catch (error) {
          throw error;
        }
      },
      // ----------------
      // REGISTRO USUARIO
      // ----------------

      registerUser: async (userData) => {
        if (
          !userData.username ||
          !userData.email ||
          !userData.password ||
          !userData.confirmPassword
        ) {
          return alert("All fields are required.");
        }
        if (userData.password !== userData.confirmPassword) {
          return alert("Passwords do not match.");
        }
        if (userData.password.length < 6) {
          return alert("Password must be at least 6 characters long.");
        }
        if (!userData.email.match(/\S+@\S+\.\S+/)) {
          return alert("Invalid email address.");
        }
        try {
          // Validación de campos

          const response = await fetch(`${config.HOSTNAME}/api/signup`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(userData),
          });

          if (!response.ok) {
            return { "HTTP error ": response.status };
          }

          // Resto del código
          const data = await response.json();
          setStore((store) => {
            return {
              ...store,
              users: [...store.users, data],
            };
          });

          // Mensaje de éxito
          const alertPlaceholder = document.getElementById(
            "liveAlertPlaceholder"
          );
          const alert = (message, type) => {
            const wrapper = document.createElement("div");
            wrapper.innerHTML = `
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Congratulations!</h5>
                    </div>
                    <div class="modal-body">
                      <div class="alert alert-${type}" role="alert">
                        ${message}
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-primary lert-success text-light" data-bs-dismiss="modal" onClick="window.location.href='/login'">Go to login page</button>
                    </div>
                  </div>
                </div>
              </div>
            `;
            alertPlaceholder.appendChild(wrapper);

            const modalElement = document.getElementById("exampleModal");
            const modal = new bootstrap.Modal(modalElement);
            modal.show();

            modalElement.addEventListener("hidden.bs.modal", () => {
              wrapper.remove();
            });
          };

          alert("User created successfully!", "success");

          await new Promise((resolve) => {
            const closeButton = document.querySelector(
              "#liveAlertPlaceholder .btn-close"
            );
            closeButton.addEventListener("click", () => {
              resolve();
            });
          });

          if (!response.ok) {
            return { "HTTP error ": response.status };
          }
        } catch (error) {
          console.error(error);
          throw new Error("Error en el registro. Por favor intente de nuevo.");
        }
      },

      // ----------------
      // SEARCH
      // ----------------
      set_search_results: (search) => {
        setStore({ search_results: search });
      },

      // ----------------
      // GET LOGIN
      // ----------------
      loginUser: async (email, password) => {
        try {
          const response = await fetch(`${config.HOSTNAME}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password }),
          });
          const data = await response.json();
          if (response.ok) {
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("user_id", data.user_id);
            setStore({ access_token: data.access_token });
            console.log(data.access_token);
            return data;
          } else {
            throw new Error(data.msg);
          }
        } catch (error) {
          throw error;
        }
      },

      // Obtenemos los datos de files3d desde la API y lo convertimos en un json
      //   y lo almacenamos en el store usando setStore

      // ----------------
      // GET ARCHIVOS 3D
      // ----------------
      
      getFiles3D: () => {
        fetch(`${config.HOSTNAME}/api/store`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            return setStore({ files3d: data.files3d });
          });
      },

      //GET ARCHIVO 3D UNICO PARA PRODUCT PAGE
      setNumero: (num) => {
        localStorage.setItem("category", num);
      },
      getNumero: () => {
        const value = localStorage.getItem("category");
        return value;
      },

      // ----------------
      // GET PATTERNS
      // ----------------

      getPatterns: () => {
        fetch(`${config.HOSTNAME}/api/store`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            return setStore({ patterns: data.patterns });
          });
      },

      // ----------------
      // GET PRINTS
      // ----------------
      getPrints: () => {
        fetch(`${config.HOSTNAME}/api/store`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            return setStore({ prints: data.prints });
          });
      },
      // ----------------
      // ADD FAVORITES
      // ----------------
      addFavorites: async (product_type, product_id) => {
        const token = localStorage.getItem("access_token");
        const response = await fetch(`${config.HOSTNAME}/favorites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            product_type: product_type,
            product_id: product_id,
          }),
        });

        if (response.ok) {
          const new_favorite = await response.json();
          setStore((store) => {
            return {
              ...store,
              favorites: [...store.favorites, new_favorite],
            };
          });
          console.log(
            "Se ha agregado el producto " +
              product_id +
              " a la lista de favoritos"
          );
        } else {
          console.error("Error al crear el favorito");
        }
      },

      getProfile: () => {
        const token = localStorage.getItem("access_token");
        fetch(`${config.HOSTNAME}/api/private`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((resp) => {
            if (resp.status == 200) {
              return resp.json();
            }
          })
          .then((data) => {
            setStore({ user: data });
          });
      },
    },
  };
};

export default getState;
