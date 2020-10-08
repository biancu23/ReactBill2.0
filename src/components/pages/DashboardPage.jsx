import React from "react";
import ChartSection1 from "../sections/ChartSection1";
import AdminCardSection1 from "../sections/AdminCardSection1";
import Layout from "../sections/Layout";
import useFacturas from "../../hooks/useFacturas";

const DashboardPage = () => {

  //Hook con la informacion de Firebase
  const { facturaHook } = useFacturas("numeroFactura");
  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth();
  let mesAnterior = fechaActual.getMonth() - 1;
  const añoActual = fechaActual.getFullYear();

  if (mesAnterior < 0) {
    mesAnterior = 11;
  }

  //Guardar los totales de las facturas aprobadas en el mes actual
  const facturasMesActual = facturaHook
    .filter(
      (factura) =>
        factura.estatusFactura === true &&
        mesActual === new Date(factura.fecha).getMonth() &&
        añoActual === new Date(factura.fecha).getFullYear()
    )
    .map((filtered) => Number(filtered.totalFactura));

  //Suma de los totales de las facturas del mes actual
  const totalFacturaMesActual = facturasMesActual
    .reduce((prev, next) => prev + next, 0)
    .toFixed(2);

    
  //Guardar los totales de las facturas aprobadas del mes anterior
  const facturasMesAnterior = facturaHook
    .filter(
      (factura) =>
        factura.estatusFactura === true &&
        mesAnterior === new Date(factura.fecha).getMonth() &&
        añoActual === new Date(factura.fecha).getFullYear()
    )
    .map((filtered) => Number(filtered.totalFactura));

  //Suma de los totales de las facturas del mes anterior
  const totalFacturaMesAnterior = facturasMesAnterior
    .reduce((prev, next) => prev + next, 0)
    .toFixed(2);

    const cantidadFacturas = facturasMesActual.length
  return (
    <Layout>
      <AdminCardSection1
      cantidadFacturas={cantidadFacturas}
        totalFacturaMesActual={totalFacturaMesActual}
        totalFacturaMesAnterior={totalFacturaMesAnterior}
      />
      <ChartSection1 />
    </Layout>
  );
};

export default DashboardPage;
