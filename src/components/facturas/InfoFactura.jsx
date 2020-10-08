import React, { useContext } from "react";
//Hooks
import useProductos from "../../hooks/useProductos";
import useEmpresa from "../../hooks/useEmpresa";
import useClientes from "../../hooks/useClientes";
import useFacturas from "../../hooks/useFacturas";
//Context de Facturas
import { FacturasContext } from "../../context/FacturasContext";
//MDB
import {
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBCard,
  MDBView,
  MDBCardBody,
  MDBIcon,
} from "mdbreact";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import { useState } from "react";

const InfoFactura = () => {
  //state de context facturas
  const {
    prodState,
    setProdState,
    producto,
    cliente,
    factura,
    guardarCliente,
    guardarFactura,
    guardarDetalles,
    guardarPrevia,
  } = useContext(FacturasContext);

  //Hook con la informacion de Firebase
  const { productos } = useProductos("marca");
  const { clientes } = useClientes("nombre");
  const { empresa } = useEmpresa("nombre");
  const { facturaHook } = useFacturas("numeroFactura");

  //Destructuring del state
  const {
    nombre,
    id,
    direccion,
    correo,
    identificacion,
    telefono,
    uid,
  } = cliente;

  //Contador de facturas
  const numeroFactura = facturaHook.length + 1;

  //Registra cambio en el id al seleccionar un cliente
  const handleChange = (e) => {
    guardarCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
    guardarFactura({ ...factura, [e.target.name]: e.target.value });
  };

  //agregar producto
  const addProd = () => {
    setProdState([...prodState, { ...producto }]);
  };

  //Registra los cambios en el producto
  const handleProdChange = (e) => {
    const updatedProds = [...prodState];
    updatedProds[e.target.dataset.idx][e.target.className] = e.target.value;
    setProdState(updatedProds);
  };

  //guardar el costo unitario y total en el state
  prodState.map((state) =>
    productos
      .filter((producto) => producto.id === state.id)
      .map(
        (filtered) => (
          (state.costo = filtered.precio),
          (state.total = (state.cantidad * state.costo).toFixed(2)),
          (state.numFactura = numeroFactura)
        )
      )
  );

  //Eliminar ultimo item de los productos
  const handlePostRemove = () => {
    setProdState(prodState.splice(0, prodState.length - 1));
  };

  //almacena los totales de todos los productos
  const grandTotal = prodState.map((gTotal) => Number(gTotal.total));

  //suma cada uno de los totales de los productos
  const sumaPrecios = grandTotal
    .reduce((prev, next) => prev + next, 0)
    .toFixed(2);

  //Almacena la informacion del cliente en el state
  clientes
    .filter((cliente) => cliente.id === id)
    .map((filtered) =>
      guardarCliente({
        uid: filtered.id,
        nombre: filtered.nombre,
        correo: filtered.correo,
        direccion: filtered.direccion,
        telefono: filtered.telefono,
        identificacion: filtered.identificacion,
      })
    );

  //Fecha
  const fecha = new Date().toLocaleDateString("en-US");

  const options = productos.map((producto) => ({
    value: producto.id,
    label: producto.marca + producto.modelo,
  }));

  console.log(options);
  //Al enviar el Form
  const handleSubmit = (e) => {
    e.preventDefault();
    guardarFactura({
      nombreCliente: nombre,
      clienteID: uid,
      totalFactura: sumaPrecios,
      numeroFactura: numeroFactura,
      fecha: fecha,
      estatusFactura: false,
      descripcion: factura.descripcion,
    });
    guardarDetalles(prodState);
    guardarPrevia(true);
  };
  const [selectedOption, setSelectedOption] = useState({})
  const handleChangeSearch = (e) => {
    
  };
  console.log(selectedOption)
  return (
    <MDBRow className="d-flex justify-content-center">
      <MDBCol md="10" className="mb-3">
        <MDBCard>
          <MDBView className="gradient-card-header blue darken-2">
            <MDBRow>
              <MDBCol md="6">
                <h5 className="text-white">
                  <strong>Cotizacion: #-00{numeroFactura}</strong>
                </h5>
              </MDBCol>
              <MDBCol md="6">
                <h5 className="text-white">
                  <strong>Fecha: {fecha}</strong>
                </h5>
              </MDBCol>
            </MDBRow>
          </MDBView>
          <MDBCardBody>
            <form className="white" onSubmit={handleSubmit}>
              <MDBRow className="mb-3">
                <MDBCol md="6">
                  <div className="white p-3">
                    <MDBRow>
                      <MDBCol md="12" lg="4">
                        <h5 className="mb-3">
                          <strong>Cliente:</strong>
                        </h5>
                      </MDBCol>
                      <MDBCol md="12" lg="8">
                        <select
                          className="browser-default custom-select"
                          name="id"
                          value={id}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Seleccione Cliente</option>
                          {clientes.map((cliente) => (
                            <option key={cliente.id} value={cliente.id}>
                              {cliente.nombre}
                            </option>
                          ))}
                        </select>
                      </MDBCol>
                    </MDBRow>
                    <div>
                      <strong>
                        {nombre} {identificacion}
                      </strong>
                    </div>
                    <div>Direccion: {direccion}</div>
                    <div>Correo: {correo}</div>
                    <div>Telefono: {telefono}</div>
                  </div>
                </MDBCol>
                {empresa.length === 0 ? (
                  <MDBCol md="6 text-center">
                    <NavLink exact={true} to="/perfil">
                      <MDBBtn color="primary">Registrar Empresa</MDBBtn>
                    </NavLink>
                  </MDBCol>
                ) : (
                  <MDBCol md="6">
                    {empresa.map((empresa) => (
                      <div className="white p-3" key={empresa.id}>
                        <h5 className="mb-3">
                          <strong>De:</strong>
                        </h5>
                        <div>
                          <strong>
                            {empresa.nombre} {empresa.identificacion}
                          </strong>
                        </div>
                        <div>Direccion: {empresa.direccion}</div>
                        <div>Correo: {empresa.correo}</div>
                        <div>Telefono: {empresa.telefono}</div>
                      </div>
                    ))}
                  </MDBCol>
                )}
              </MDBRow>
              <MDBTable responsive small>
                <MDBTableHead>
                  <tr>
                    <th>#</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {prodState.map((val, idx) => {
                    const prod = `prod-${idx}`;
                    const precio = `precio-${idx}`;
                    const qty = `qty-${idx}`;
                    const tot = `tot-${idx}`;
                    return (
                      <tr key={`producto-${idx}`}>
                        <td>{idx + 1}</td>
                        <td>
                          <select
                            className="id"
                            name={prod}
                            data-idx={idx}
                            id={prod}
                            value={prodState[idx].id}
                            onChange={handleProdChange}
                            required
                          >
                            <option value="">--Seleccionar Producto--</option>
                            {productos.map((producto) => (
                              <option key={producto.id} value={producto.id}>
                                {producto.marca} {producto.modelo}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input
                            disabled
                            type="number"
                            name={precio}
                            data-idx={idx}
                            id={precio}
                            className="costo"
                            value={prodState[idx].costo}
                            onChange={handleProdChange}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name={qty}
                            data-idx={idx}
                            id={qty}
                            className="cantidad"
                            value={prodState[idx].cantidad}
                            onChange={handleProdChange}
                          />
                        </td>
                        <td>
                          <input
                            disabled
                            type="number"
                            name={tot}
                            data-idx={idx}
                            id={tot}
                            className="total"
                            value={prodState[idx].total}
                            onChange={handleProdChange}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </MDBTableBody>
              </MDBTable>
              <MDBRow className="d-flex justify-content-between">
                <MDBCol sm="6">
                
                  <MDBBtn onClick={addProd} color="green" size="sm">
                    <MDBIcon icon="plus" />
                  </MDBBtn>
                  <MDBBtn onClick={handlePostRemove} color="red" size="sm">
                    <MDBIcon icon="times" />
                  </MDBBtn>
                </MDBCol>
                <MDBCol sm="6" className="mt-3">
                  <label className="mr-2">Total</label>
                  <input disabled type="number" value={sumaPrecios} />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol>
                  <div className="form-group pt-4">
                    <label htmlFor="areaDescripcion">
                      Descripcion de la cotizacion
                    </label>
                    <textarea
                      className="form-control"
                      id="areaDescripcion"
                      rows="3"
                      name="descripcion"
                      value={factura.descripcion}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow className="d-flex justify-content-end mt-5">
                <MDBCol sm="4">
                  <MDBBtn type="submit" color="blue">
                    Vista Previa
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};

export default InfoFactura;
