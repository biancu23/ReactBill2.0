import React, { createContext, useEffect, useState } from "react";
import firebase from "./firebase";
import useAutenticacion from "../hooks/useAutenticacion";

export const FirebaseContext = createContext(null);

const FirebaseProvider = (props) => {
  const [info, guardarInfo] = useState({});
  const usuario = useAutenticacion();

  useEffect(() => {
    if (usuario !== null) {
      guardarInfo(usuario);
    }
  }, [usuario]);
  return (
    <FirebaseContext.Provider value={{ firebase, info, usuario }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
export default FirebaseProvider;
