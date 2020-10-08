import React, { useState, useEffect, useContext } from 'react'

import { FirebaseContext } from "../firebase/context";

const useFacturas = orden => {

    const [facturaHook, guardarFacturaHook] = useState([]);

  const {firebase, usuario} = useContext(FirebaseContext);

  useEffect(() =>  {
    const obtenerFacturaHook = () => {
firebase.db.collection('facturas').where("uidUsuario", "==", usuario.uid).onSnapshot(manejarSnapshot)
    }
    obtenerFacturaHook();
    // eslint-disable-next-line
  }, [])

  function manejarSnapshot(snapshot) {
    const facturaHook = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });
    guardarFacturaHook(facturaHook);
  }

  return {facturaHook}
}

export default useFacturas;