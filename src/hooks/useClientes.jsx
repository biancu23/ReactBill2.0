import React, { useState, useEffect, useContext } from "react";

import { FirebaseContext } from "../firebase/context";

const useClientes = () => {
  const [clientes, guardarClientes] = useState([]);

  const { firebase, usuario } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerClientes = () => {
      firebase.db
        .collection("clientes")
        .where("uidUsuario", "==", usuario.uid)
        .onSnapshot(manejarSnapshot);
    };
    obtenerClientes();
    // eslint-disable-next-line
  }, []);

  function manejarSnapshot(snapshot) {
    const clientes = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    guardarClientes(clientes);
  }

  return { clientes };
};

export default useClientes;
