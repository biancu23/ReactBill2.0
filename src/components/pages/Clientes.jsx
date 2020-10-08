import React, { useContext } from "react";
//MDB React
import {
  MDBRow,
  MDBCol,
  MDBView,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBAlert,
  MDBDataTable,
  MDBIcon,
} from "mdbreact";
//Sweet Alert
import Swal from 'sweetalert2'
//Hooks
import useClientes from "../../hooks/useClientes";
//Firebase
import { FirebaseContext } from "../../firebase/context";
//Validaciones
import useValidacion from "../../hooks/useValidacion";
import validarCrearCliente from "../../validacion/validarCrearCliente";
import { useState } from "react";
import ModalCliente from "../sections/ModalCliente";
//Context para apertura y cierre del modal
import {ModalContext} from "../../context/ModalContext";
import Layout from "../sections/Layout";
//useValidacion
const STATE_INICIAL = {
  nombre: "",
  correo: "",
  telefono: "",
  direccion: "",
  tipo: "",
  identificacion: "",
  uidUsuario: ""
};

const Clientes = () => {
  const { valores, errores, handleSubmit, handleChange } = useValidacion(
    STATE_INICIAL,
    validarCrearCliente,
    crearCliente
  );

  //State con el cliente seleccionado para editar
  const [userSelect, setUserSelect] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    tipo: "",
    identificacion: "",
    id: ""
  });
  //Destructuring del state
  const { nombre, correo, telefono, direccion, tipo, identificacion } = valores;

  //context con las operaciones crud de firebase
  const { firebase, usuario } = useContext(FirebaseContext);

  //Modal
  const { modal, guardarModal } = useContext(ModalContext);

  //Hook con la informacion de Firebase
  const { clientes } = useClientes("nombre");

  //Datos de la tabla
  const data = {
    columns: [
      {
        label: "Nombre",
        field: "nombre",
        sort: "asc",
      },
      {
        label: "Correo",
        field: "correo",
        sort: "asc",
      },
      {
        label: "Telefono",
        field: "telefono",
        sort: "asc",
      },
      {
        label: "Direccion",
        field: "direccion",
        sort: "asc",
      },
      {
        label: "Tipo",
        field: "tipo",
        sort: "asc",
      },
      {
        label: "Identificacion",
        field: "identificacion",
        sort: "asc",
      },
      {
        label: "Accion",
        field: "accion",
      },
    ],
    rows: clientes.map((cliente) => ({
      nombre: cliente.nombre,
      correo: cliente.correo,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      tipo: cliente.tipo,
      identificacion: cliente.identificacion,
      accion: (
        <div className="d-flex justify-content-around">
          {
            <a href="#!"
              onClick={() => {
                guardarModal(!modal)
                setUserSelect({
                  nombre: cliente.nombre,
                  correo: cliente.correo,
                  telefono: cliente.telefono,
                  direccion: cliente.direccion,
                  tipo: cliente.tipo,
                  identificacion: cliente.identificacion,
                  id: cliente.id
                });
              }}
            >
              
              <MDBIcon icon="edit" size="lg" className="blue-text" />
            </a>
          }
          <a href="#!"
            onClick={() => {
              Swal.fire({
                title: 'Desea eliminar el cliente?',
                text: "Esta accion no puede ser revertida!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar cliente!'
              }).then((result) => {
                if (result.value) {
                  Swal.fire(
                    
                    'Eliminado!',
                    'El cliente ha sido eliminado.',
                    firebase.db.collection("clientes").doc(cliente.id).delete(),
                    'success'
                  )
                }
              })
            }}
          >
            <MDBIcon icon="times" size="lg" className="red-text" />
          </a>
        </div>
      ),
    })),
  };

  async function crearCliente() {
    //Crear el objeto del nuevo producto
    const cliente = {
      nombre,
      correo,
      telefono,
      direccion,
      tipo,
      identificacion,
      uidUsuario: usuario.uid
    };


    //insertarlo en la base de datos
    firebase.db.collection("clientes").add(cliente);

    //Alerta de Confirmacion
    Swal.fire({
      icon: 'success',
      title: 'Se ha agregado correctamente',
      showConfirmButton: false,
      timer: 1500
    })

  }

  
  return (
    <Layout>
    <MDBRow>
      <MDBCol md="12">
        <MDBCard className="mt-1">
          <MDBView className="gradient-card-header blue darken-2">
            <h4 className="h4-responsive text-white">Listado de Clientes</h4>
          </MDBView>
          <MDBCardBody>
            <MDBDataTable
              striped
              bordered
              small
              data={data}
              responsive
            />
          </MDBCardBody>
        </MDBCard>
      </MDBCol>

      <MDBCol md="12">
        <MDBCard className="mt-3">
          <MDBView className="gradient-card-header blue darken-2">
            <h4 className="h4-responsive text-white">Agregar Cliente</h4>
          </MDBView>
          <MDBCardBody>
            <form onSubmit={handleSubmit}>
              <MDBRow>
                <div className="form-group col-md-4">
                  <label>Nombre</label>
                  {errores.nombre && (
                    <MDBAlert color="danger"> {errores.nombre} </MDBAlert>
                  )}
                  <input
                    type="text"
                    className="form-control text-capitalize"
                    placeholder="Ingrese nombre"
                    onChange={handleChange}
                    value={nombre}
                    name="nombre"
                  />
                </div>
                <div className="form-group col-md-4">
                  <label>Correo</label>
                  {errores.correo && (
                    <MDBAlert color="danger"> {errores.correo} </MDBAlert>
                  )}
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Ingrese correo"
                    onChange={handleChange}
                    value={correo}
                    name="correo"
                  />
                </div>
                <div className="form-group col-md-4">
                  <label>Telefono</label>
                  {errores.telefono && (
                    <MDBAlert color="danger"> {errores.telefono} </MDBAlert>
                  )}
                  <input
                    type="tel"
                    className="form-control text-capitalize"
                    placeholder="Numero de telefono"
                    onChange={handleChange}
                    value={telefono}
                    name="telefono"
                  />
                </div>
                <div className="form-group col-md-4">
                  <label>Direccion</label>
                  {errores.direccion && (
                    <MDBAlert color="danger"> {errores.direccion} </MDBAlert>
                  )}
                  <input
                    type="text"
                    className="form-control text-capitalize"
                    placeholder="Ingrese direccion"
                    onChange={handleChange}
                    value={direccion}
                    name="direccion"
                  />
                </div>
                <div className="form-group col-md-4">
                  <label>Tipo</label>
                  {errores.tipo && (
                    <MDBAlert color="danger"> {errores.tipo} </MDBAlert>
                  )}
                  <select
                    className="browser-default custom-select"
                    onChange={handleChange}
                    name="tipo"
                    value={tipo}
                  >
                    <option>--Seleccionar--</option>
                    <option value="Natural">Natural</option>
                    <option value="Juridica">Juridica</option>
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label>Identificacion (opcional)</label>
                  {errores.identificacion && (
                    <MDBAlert color="danger">
                      {errores.identificacion}
                    </MDBAlert>
                  )}
                  <input
                    type="text"
                    className="form-control text-capitalize"
                    placeholder="Identificacion"
                    onChange={handleChange}
                    value={identificacion}
                    name="identificacion"
                  />
                </div>
              </MDBRow>

              <MDBBtn color="blue darken-2" type="submit">
                Agregar Cliente
              </MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <ModalCliente
      userSelect={userSelect}
      />
    </MDBRow>
    </Layout>
  );
};

export default Clientes;
