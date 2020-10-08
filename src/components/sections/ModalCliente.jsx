import React, { useContext } from "react";
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
import Swal from "sweetalert2";

import { ModalContext } from "../../context/ModalContext";
//Validaciones
import useValidacion from "../../hooks/useValidacion";
import validarCrearCliente from "../../validacion/validarCrearCliente";
import { useEffect } from "react";
import { FirebaseContext } from "../../firebase/context";

const ModalCliente = ({ userSelect }) => {
  //useValidacion
  const STATE_INICIAL = {
    nombre: userSelect.nombre,
    correo: userSelect.correo,
    telefono: userSelect.telefono,
    direccion: userSelect.direccion,
    tipo: userSelect.tipo,
    identificacion: userSelect.identificacion,
  };
 
  //context con las operaciones crud de firebase
  const { firebase } = useContext(FirebaseContext);
  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    guardarValores,
  } = useValidacion(STATE_INICIAL, validarCrearCliente, editarCliente);

  useEffect(() => {
    guardarValores(STATE_INICIAL);
    // eslint-disable-next-line
  }, [userSelect]);

  //Destructuring del state
  const { nombre, correo, telefono, direccion, tipo, identificacion } = valores;
//Modal
const { modal, toggleModal } = useContext(ModalContext);
  async function editarCliente() {
    //Crear el objeto del nuevo producto
    const cliente = {
      nombre,
      correo,
      telefono,
      direccion,
      tipo,
      identificacion,
    };

    //insertarlo en la base de datos
    firebase.db.collection("clientes").doc(userSelect.id).update(cliente);

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
          Editar Cliente
        </MDBModalHeader>
        <MDBModalBody>
          <div>
            <form onSubmit={handleSubmit}>
              <MDBRow>
                <MDBCol md="6" className="mb-3">
                  <label htmlFor="editNombre" className="grey-text">
                    Nombre
                  </label>
                  {errores.nombre && (
                    <MDBAlert color="danger"> {errores.nombre} </MDBAlert>
                  )}
                  <input
                    name="nombre"
                    type="text"
                    id="editNombre"
                    onChange={handleChange}
                    className="form-control text-capitalize"
                    value={nombre}
                  />
                </MDBCol>
                <MDBCol md="6" className="mb-3">
                  <label htmlFor="editEmail" className="grey-text">
                    Correo
                  </label>
                  {errores.correo && (
                    <MDBAlert color="danger"> {errores.correo} </MDBAlert>
                  )}
                  <input
                    id="editEmail"
                    type="email"
                    className="form-control"
                    placeholder="Ingrese correo"
                    onChange={handleChange}
                    value={correo}
                    name="correo"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="6" className="mb-3">
                  <label htmlFor="editPhone" className="grey-text">
                    Telefono
                  </label>
                  {errores.telefono && (
                    <MDBAlert color="danger"> {errores.telefono} </MDBAlert>
                  )}
                  <input
                    id="editPhone"
                    type="tel"
                    className="form-control text-capitalize"
                    placeholder="Numero de telefono"
                    onChange={handleChange}
                    value={telefono}
                    name="telefono"
                  />
                </MDBCol>
                <MDBCol md="6" className="mb-3">
                  <label htmlFor="editIdentificacion" className="grey-text">
                    Identificacion (opcional)
                  </label>
                  {errores.identificacion && (
                    <MDBAlert color="danger">{errores.identificacion}</MDBAlert>
                  )}
                  <input
                    id="editIdentificacion"
                    type="text"
                    className="form-control text-capitalize"
                    placeholder="Identificacion"
                    onChange={handleChange}
                    value={identificacion}
                    name="identificacion"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="4" className="mb-3">
                  <label className="grey-text">Natural o Empresa</label>
                  <input
                    type="text"
                    className="form-control"
                    name="tipo"
                    value={tipo}
                    disabled
                  />
                </MDBCol>
                <MDBCol md="8" className="mb-3">
                  <label htmlFor="editAddress" className="grey-text">
                    Direccion
                  </label>
                  {errores.direccion && (
                    <MDBAlert color="danger"> {errores.direccion} </MDBAlert>
                  )}
                  <input
                    id="editAddress"
                    type="text"
                    className="form-control text-capitalize"
                    placeholder="Ingrese direccion"
                    onChange={handleChange}
                    value={direccion}
                    name="direccion"
                  />
                </MDBCol>
              </MDBRow>

              <MDBModalFooter>
                <MDBBtn color="danger" onClick={toggleModal}>
                  Cancelar
                </MDBBtn>
                <MDBBtn color="blue darken-2" type="submit">
                Editar Cliente
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
