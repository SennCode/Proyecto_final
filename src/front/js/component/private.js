import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Util } from "./util";

export const Private = (props) => {
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Util(setDisabled, navigate);
  }, [disabled]);

  if (disabled) {
    return <div>Debe registrarse para acceder a este contenido</div>;
  }

  return <div>{props.pagecontent}</div>;
};
