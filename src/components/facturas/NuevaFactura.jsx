import React, { useContext } from "react";
import { FacturasContext } from "../../context/FacturasContext";
import VistaPrevia from "./VistaPrevia";
import Layout from "../sections/Layout";
import InfoFactura from "./InfoFactura";

const NuevaFactura = () => {
  //state de context facturas
  const { previa } = useContext(FacturasContext);

  return (
    <div>
      {previa ? (
        <VistaPrevia />
      ) : (
        <Layout>
          <InfoFactura />
        </Layout>
      )}
    </div>
  );
};

export default NuevaFactura;
