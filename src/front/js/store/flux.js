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
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      users: [],
      files3d: [],
    },

    actions: {
      // Obtenemos los datos de usuario desde la API y lo convertimos en un json
      //   y lo almacenamos en el store usando setStore

      getUsers: async () => {
        fetch(
          "https://3001-4geeksacade-reactflaskh-xex9ne5j69n.ws-eu87.gitpod.io/api/users"
        )
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            return setStore({ users: data });
          });
      },

      createFile3D: async (newFile3D) => {
        try {
          const response = await fetch(
            "https://3001-4geeksacade-reactflaskh-xex9ne5j69n.ws-eu87.gitpod.io/api/store",
            {
      //         method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newFile3D),
            }
          );
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

      // registerUser: async (newUser) => {
      //   try {
      //     const response = await fetch(
      //       "https://3001-4geeksacade-reactflaskh-xex9ne5j69n.ws-eu87.gitpod.io/api/signup",
      //       {
      //         method: "POST",
      //         headers: {
      //           "Content-type": "application/json",
      //         },
      //         body: JSON.stringify(newUser),
      //       }
      //     );
      //     if (!response.ok) {
      //       return { "HTTP error ": response.status };
      //     }
      //     const data = await response.json();
      //     return data;
      //   } catch (error) {
      //     console.error(error);
      //   }
      // },

      // Obtenemos los datos de files3d desde la API y lo convertimos en un json
      //   y lo almacenamos en el store usando setStore
      getFiles3D: () => {
        fetch(
          "https://3001-4geeksacade-reactflaskh-xex9ne5j69n.ws-eu87.gitpod.io/api/store",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            return setStore({ files3d: data.files3d });
          });
      },
    },
  };
};

export default getState;
