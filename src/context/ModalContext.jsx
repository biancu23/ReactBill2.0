import React, { createContext, useState } from "react";

export const ModalContext = createContext();

const ModalProvider = (props) => {
  //state con la informacion del cliente en la factura
  const [modal, guardarModal] = useState(false);
  
 const toggleModal = () => {
     guardarModal(!modal)
 }
  return (
    <ModalContext.Provider
      value={{
        modal,
        guardarModal, 
        toggleModal
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;