import React, { useState, useEffect, useContext } from "react";

import { FirebaseContext } from "../firebase/context";

const useProductos = () => {
  const [productos, guardarProductos] = useState([]);

  const { firebase, usuario } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerProductos = () => {
      firebase.db
        .collection("productos")
        .where("uidUsuario", "==", usuario.uid)
        .onSnapshot(manejarSnapshot);
    };
    obtenerProductos();
    // eslint-disable-next-line
  }, []);

  function manejarSnapshot(snapshot) {
    const productos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    guardarProductos(productos);
  }

  return { productos };
};

export default useProductos;
