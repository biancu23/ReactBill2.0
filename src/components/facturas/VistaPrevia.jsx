import React, { useContext } from "react";
import useProductos from "../../hooks/useProductos";
import useClientes from "../../hooks/useClientes";
import { FirebaseContext } from "../../firebase/context";
import { FacturasContext } from "../../context/FacturasContext";
import PrintProvider, { Print, NoPrint } from "react-easy-print";
import useEmpresa from "../../hooks/useEmpresa";

const VistaPrevia = () => {
  //context con las operaciones crud de firebase
  const { firebase, usuario } = useContext(FirebaseContext);
  //Hook con la informacion de Firebase
  const { productos } = useProductos("marca");
  const { clientes } = useClientes();
  const { empresa } = useEmpresa();

  //context con la informacion de la factura
  const { factura, detalles, guardarPrevia, prodState } = useContext(
    FacturasContext
  );

  const {
    clienteID,
    fecha,
    numeroFactura,
    totalFactura,
    nombreCliente,
    descripcion,
    estatusFactura,
  } = factura;

  const print = () => {
    window.print();
    //Objeto con la informacion de la factura
    const facturaFirebase = {
      clienteID,
      fecha,
      numeroFactura,
      totalFactura,
      nombreCliente,
      descripcion,
      estatusFactura,
      uidUsuario: usuario.uid,
    };

    //insertarlo en la base de datos
    firebase.db.collection("facturas").add(facturaFirebase);

    let detallesFacturaFirebase;
    prodState.map(
      (prod) => (
        (detallesFacturaFirebase = {
          costoProducto: prod.costo,
          idProducto: prod.id,
          totalProducto: prod.total,
          numFactura: prod.numFactura,
        }),
        //insertarlo en la base de datos
        firebase.db.collection("detalles_factura").add(detallesFacturaFirebase)
      )
    );

    //Recargar el componente luego de generar la cotizacion
  };

  return (
    <PrintProvider>
      <div className="poppin p-5 m-5">
        <Print single name="Invoice">
          <div
            id="divToPrint"
            style={{
              backgroundColor: "white",
              width: "210mm",
              minHeight: "297mm",
              marginLeft: "0mm",
              marginRight: "0mm",
            }}
          >
            <div className="container">
              <div className="row d-flex justify-content-between pb-1 pt-2 align-items-center">
                {empresa.map((empresa) => (
                  <div className="col-3" key={empresa.id}>
                    <img
                      src={empresa.urlimagen}
                      className="img-fluid"
                      alt="Logo"
                    />
                  </div>
                ))}

                <div className="col-3">
                  <h4 className="mb-0">COTIZACION</h4>
                </div>
              </div>
              <hr />
              <div className="row d-flex justify-content-between py-2">
                <div className="col-4">
                  <strong>Fecha: </strong> {new Date().toLocaleDateString()}
                </div>
                <div className="col-4">
                  <strong>COT: </strong>00{factura.numeroFactura}
                </div>
              </div>
              <hr />
              <div className="row d-flex justify-content-between mb-4">
                {clientes
                  .filter((cliente) => cliente.id === factura.clienteID)
                  .map((filtered) => (
                    <div className="col-5" key={filtered.id}>
                      <h5>{filtered.nombre}</h5>

                      <div>Correo: {filtered.correo}</div>
                      <div>Telefono: {filtered.telefono}</div>
                      <div>Direccion: {filtered.direccion}</div>
                      <div>Identificacion: {filtered.identificacion}</div>
                    </div>
                  ))}

                {empresa.map((empresa) => (
                  <div className="col-5" key={empresa.id}>
                    <h5>{empresa.nombre}</h5>
                    <div>Correo: {empresa.correo}</div>
                    <div>Telefono: {empresa.telefono}</div>
                    <div>Direccion: {empresa.direccion}</div>
                    <div>I.D : {empresa.identificacion}</div>
                  </div>
                ))}
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header px-2 py-0">
                      <table className="table table-sm mb-0">
                        <thead>
                          <tr>
                            <td style={{ width: "55%" }} className="border-0">
                              <strong>Producto</strong>
                            </td>
                            <td
                              style={{ width: "15%" }}
                              className="text-center border-0"
                            >
                              <strong>Cantidad</strong>
                            </td>
                            <td
                              style={{ width: "15%" }}
                              className="text-center border-0"
                            >
                              <strong>Precio</strong>
                            </td>
                            <td
                              style={{ width: "15%" }}
                              className="text-center border-0"
                            >
                              <strong>Total</strong>
                            </td>
                          </tr>
                        </thead>
                      </table>
                    </div>
                    <div className="card-body px-2">
                      <table className="table table-sm">
                        <tbody>
                          {detalles.map((detalle) =>
                            productos
                              .filter((producto) => producto.id === detalle.id)
                              .map((filtered) => (
                                <tr key={filtered.id}>
                                  <td style={{ width: "55%" }}>
                                    {filtered.marca} {filtered.modelo}
                                  </td>
                                  <td
                                    style={{ width: "15%" }}
                                    className="text-center "
                                  >
                                    {detalle.cantidad}
                                  </td>
                                  <td
                                    style={{ width: "15%" }}
                                    className="text-center "
                                  >
                                    {detalle.costo} $
                                  </td>
                                  <td
                                    style={{ width: "15%" }}
                                    className="text-center "
                                  >
                                    {detalle.total} $
                                  </td>
                                </tr>
                              ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-end mt-3">
                <div className="col-4">
                  <div className="card">
                    <table className="table table-sm m-0">
                      <tbody>
                        <tr>
                          <th
                            className="card-header"
                            style={{
                              width: "50%",
                              borderRight: "1px solid rgba(0,0,0,0.125)",
                            }}
                          >
                            <strong>Total</strong>
                          </th>
                          <td className="text-center">
                            {factura.totalFactura} $
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <NoPrint>
              <div className="row mb-3 d-flex justify-content-center">
                <div className="col-3">
                  <button className="btn btn-primary" onClick={print}>
                    Imprimir
                  </button>
                </div>
                <div className="col-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => guardarPrevia(false)}
                  >
                    Volver
                  </button>
                </div>
              </div>
            </NoPrint>
          </div>
        </Print>
      </div>
    </PrintProvider>
  );
};

export default VistaPrevia;
