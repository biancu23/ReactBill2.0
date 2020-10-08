import React, { useState, useEffect, useContext } from "react";

import { FirebaseContext } from "../firebase/context";

const useEmpresa = () => {
  const [empresa, guardarEmpresa] = useState([]);

  const { firebase, usuario } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerEmpresa = () => {
      firebase.db
        .collection("empresa")
        .where("uidUsuario", "==", usuario.uid)
        .onSnapshot(manejarSnapshot);
    };
    obtenerEmpresa();
    // eslint-disable-next-line
  }, []);

  function manejarSnapshot(snapshot) {
    const empresa = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    guardarEmpresa(empresa);
  }

  return { empresa };
};

export default useEmpresa;
