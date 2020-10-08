import React, { createContext, useState } from "react";

export const FacturasContext = createContext();

const FacturasProvider = (props) => {
  //state con la informacion del cliente en la factura
  const [cliente, guardarCliente] = useState({
    uid: "",
    id: "",
    nombre: "",
    correo: "",
    direccion: "",
    telefono: "",
    identificacion: "",
  });
  //state de producto vacio en la factura
  const [producto] = useState({
    costo: 0,
    id: "",
    cantidad: 1,
    total: 0,
    numFactura: ""
  });
  //state con los detalles de los productos
  const [prodState, setProdState] = useState([{ ...producto }]);
  //state factura
  const [factura, guardarFactura] = useState({
    clienteID: "",
    totalFactura: "",
    numeroFactura: "",
    fecha: "",
    nombreCliente: "", 
    descripcion: "",
    estado: "",
  });
  //state con los detalles de la factura
  const [detalles, guardarDetalles] = useState();
  //state vista previa
  const [previa, guardarPrevia] = useState(false);
  return (
    <FacturasContext.Provider
      value={{
        cliente,
        producto,
        prodState,
        factura,
        detalles,
        previa,
        guardarPrevia,
        guardarFactura,
        guardarDetalles,
        guardarCliente,
        setProdState,
      }}
    >
      {props.children}
    </FacturasContext.Provider>
  );
};

export default FacturasProvider;
