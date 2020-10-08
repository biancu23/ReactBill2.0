import React, { useContext } from "react";
//MDB
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBCol,
  MDBRow,
  MDBAlert,
} from "mdbreact";
//Sweet Alert
import Swal from "sweetalert2";

import { ModalContext } from "../../context/ModalContext";
//Validaciones
import useValidacion from "../../hooks/useValidacion";
import { useEffect } from "react";
import { FirebaseContext } from "../../firebase/context";
import validarCrearProducto from "../../validacion/validarCrearProducto";

const ModalCliente = ({ productSelect }) => {
  //useValidacion
  const STATE_INICIAL = {
    marca: productSelect.marca,
    modelo: productSelect.modelo,
    precio: productSelect.precio,
    categoria: productSelect.categoria,
  };

  //context con las operaciones crud de firebase
  const { firebase } = useContext(FirebaseContext);
  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    guardarValores,
  } = useValidacion(STATE_INICIAL, validarCrearProducto, editarProducto);

  useEffect(() => {
    guardarValores(STATE_INICIAL);
    // eslint-disable-next-line
  }, [productSelect]);

  //Destructuring del state
  const { marca, modelo, precio, categoria } = valores;
  //Modal
  const { modal, toggleModal } = useContext(ModalContext);
  async function editarProducto() {
    //Crear el objeto del nuevo producto
    const producto = {
      marca,
      modelo,
      precio,
      categoria,
    };

    //insertarlo en la base de datos
    firebase.db.collection("productos").doc(productSelect.id).update(producto);

    Swal.fire({
      icon: "success",
      title: "Se ha editado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });

    toggleModal();
  }

  return (
    <MDBContainer>
      <MDBModal isOpen={modal} toggle={toggleModal}>
        <MDBModalHeader
          toggle={toggleModal}
          className="blue darken-2 white-text"
        >
          Editar Producto
        </MDBModalHeader>
        <MDBModalBody>
          <div>
            <form onSubmit={handleSubmit}>
              <MDBRow>
                <MDBCol md="6" className="mb-3">
                  <label htmlFor="editMarca" className="grey-text">
                    Marca
                  </label>
                  {errores.marca && (
                    <MDBAlert color="danger"> {errores.marca} </MDBAlert>
                  )}
                  <input
                    name="marca"
                    type="text"
                    id="editMarca"
                    onChange={handleChange}
                    className="form-control text-capitalize"
                    value={marca}
                  />
                </MDBCol>
                <MDBCol md="6" className="mb-3">
                  <label htmlFor="editModelo" className="grey-text">
                    Modelo
                  </label>
                  {errores.modelo && (
                    <MDBAlert color="danger"> {errores.modelo} </MDBAlert>
                  )}
                  <input
                    id="editModelo"
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={modelo}
                    name="modelo"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="6" className="mb-3">
                  <label htmlFor="editPrecio" className="grey-text">
                    Precio
                  </label>
                  {errores.precio && (
                    <MDBAlert color="danger"> {errores.precio} </MDBAlert>
                  )}
                  <input
                    id="editPrecio"
                    type="number"
                    className="form-control text-capitalize"
                    onChange={handleChange}
                    value={precio}
                    name="precio"
                  />
                </MDBCol>
                <MDBCol md="6" className="mb-3">
                  <label className="grey-text">Categoria</label>
                  {errores.categoria && (
                    <MDBAlert color="danger">{errores.categoria}</MDBAlert>
                  )}
                  <input
                    type="text"
                    className="form-control text-capitalize"
                    onChange={handleChange}
                    value={categoria}
                    name="categoria"
                    disabled
                  />
                </MDBCol>
              </MDBRow>
              <MDBModalFooter>
                <MDBBtn color="danger" onClick={toggleModal}>
                  Cancelar
                </MDBBtn>
                <MDBBtn color="blue darken-2" type="submit">
                  Editar Producto
                </MDBBtn>
              </MDBModalFooter>
            </form>
          </div>
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>
  );
};

export default ModalCliente;
