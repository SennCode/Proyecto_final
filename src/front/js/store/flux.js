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
      user_id: null
    },

    actions: {
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

      createFile3D: async (newFile3D) => {
        try {
          const response = await fetch(`${config.HOSTNAME}/api/store`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
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

      // ----------------
      // REGISTRO USUARIO
      // ----------------

      registerUser: async (userData) => {

        if (!userData.username || !userData.email || !userData.password || !userData.confirmPassword) {
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
          const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
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
                      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick="window.location.href='/login'">Accept</button>
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
      
          alert(
            "User created successfully! Please, you have to accept this alert to go to the login page.",
            "success"
          );
      
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
      // GET LOGIN
      // ----------------
      loginUser: async (email, password) => {
        try {
          const response = await fetch(`${config.HOSTNAME}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
          });
          const data = await response.json();
          if (response.ok) {
            localStorage.setItem('access_token', data.access_token);
            setStore({ access_token: data.access_token });
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
    },
  };
};

export default getState;
