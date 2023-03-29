import { useState } from "react";
import config from "../store/config";

export const Util = (setDisabled, navigate) => {
  const tokenOBJ = sessionStorage.token;//cambiar
  const data_user = sessionStorage.data_user;//cambiar
  if (!tokenOBJ || data_user === null) {
    alert("Debes logearte primero");
    navigate("/login");
    return; //o hacer el return aqui o...
  }
  //...hacer un else de todo lo de abajo, lo importante es que no corra el codigo si no hay token
  const tokenData = JSON.parse(tokenOBJ);
  fetch(`${config.HOSTNAME}/api/private2`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenData.token}`,
    },
  })
    .then((res) => {
      console.log({ res });
      return res.json();
    })
    .then((data) => {
      console.log({ data });
      sessionStorage.setItem("data_user", JSON.stringify(data.data));
      setDisabled(false);
    })
    .then(() => {
      setDisabled(false);
    });
}; /*si la info esta cargando, mensaje de cargando, si el token esta caducado, la sesion ha caducado*/

/*
const data = await res.json();
    if (res.status == 200) {
      console.log("acceso permitido");
      const tokenData = data.data;

      fetch(`${config.HOSTNAME}/api/private`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
      })
        .then((res) => {
          console.log({ res });
          return res.json();
        })
        .then((data) => {
          console.log({ data });
          localStorage.setItem("data_user", JSON.stringify(data.data));
        });
      localStorage.tokenData = JSON.stringify({ tokenData });
      navigate("/");
      //asi almacenenamos como un objeto, podria almacenarse solo el token, pero con este proceso cambiamos de string a objeto y de objeto a strng
    } else {
      console.log("mal");
      alert(data.msg);
      return;
    }*/
