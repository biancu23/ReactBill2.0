import React, { useState, useEffect } from "react";

const useValidacion = (stateInicial, validar, fn) => {
  const [valores, guardarValores] = useState(stateInicial);

  //Errores va a ser un objeto
  const [errores, guardarErrores] = useState({});
  const [submitForm, guardarSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      //Object.keys verifica si un objeto esta vacio o tiene algo
      const noErrores = Object.keys(errores).length === 0;

      if (noErrores) {
        fn(); // fn = funcion que se ejecuta en el componente
      }
      guardarSubmitForm(false);
    }

    // eslint-disable-next-line
  }, [errores]);

  //Funcion que se ejecuta conforme el usuario escribe algo
  const handleChange = (e) => {
    guardarValores({
      ...valores,
      [e.target.name]: e.target.value,
    });
  };

  //funcion que se ejecuta cuando el usuario hace submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validar(valores);
    guardarErrores(erroresValidacion);
    guardarSubmitForm(true);
    if (Object.keys(erroresValidacion).length === 0) {
      setTimeout(() => {
        guardarValores(stateInicial);
      }, 800);
    }
  };

  return {
    valores,
    errores,
    submitForm,
    handleSubmit,
    handleChange,
    guardarValores,
  };
};

export default useValidacion;
