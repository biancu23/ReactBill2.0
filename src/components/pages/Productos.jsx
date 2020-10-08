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
  MDBIcon,
  MDBDataTable,
} from "mdbreact";
//Sweet Alert
import Swal from "sweetalert2";
//Firebase
import { FirebaseContext } from "../../firebase/context";
//Hooks
import useProductos from "../../hooks/useProductos";
//Validaciones
import useValidacion from "../../hooks/useValidacion";
import validarCrearProducto from "../../validacion/validarCrearProducto";
//Context para apertura y cierre del modal
import { ModalContext } from "../../context/ModalContext";
import { useState } from "react";
import ModalProducto from "../sections/ModalProducto";
import Layout from "../sections/Layout";

const STATE_INICIAL = {
  marca: "",
  modelo: "",
  precio: 0,
  categoria: "",
};

const Productos = () => {
  const { valores, errores, handleSubmit, handleChange } = useValidacion(
    STATE_INICIAL,
    validarCrearProducto,
    crearProducto
  );
  //State con el cliente seleccionado para editar
  const [productSelect, setProductSelect] = useState({
    marca: "",
    modelo: "",
    precio: "",
    categoria: "",
    id: "",
  });
  //Modal
  const { modal, guardarModal } = useContext(ModalContext);

  //Destructuting del state
  const { marca, modelo, precio, categoria } = valores;

  //context con las operaciones crud de firebase
  const { firebase, usuario } = useContext(FirebaseContext);

  //Hook con la informacion de firebase
  const { productos } = useProductos("marca");

  //Datos de la tabla
  const data = {
    columns: [
      {
        label: "Marca",
        field: "marca",
        sort: "asc",
      },
      {
        label: "Modelo",
        field: "modelo",
        sort: "asc",
      },
      {
        label: "Precio",
        field: "precio",
        sort: "asc",
      },
      {
        label: "Categoria",
        field: "categoria",
        sort: "asc",
      },
      {
        label: "Accion",
        field: "accion",
      },
    ],
    rows: productos.map((producto) => ({
      marca: producto.marca,
      modelo: producto.modelo,
      precio: producto.precio,
      categoria: producto.categoria,
      accion: (
        <div className="d-flex justify-content-around">
          {
            <a href="#!"
              onClick={() => {
                guardarModal(!modal);
                setProductSelect({
                  marca: producto.marca,
                  modelo: producto.modelo,
                  precio: producto.precio,
                  categoria: producto.categoria,
                  id: producto.id,
                });
              }}
            >
              <MDBIcon icon="edit" size="lg" className="blue-text" />
            </a>
          }
          <a href="#!"
            onClick={() => {
              Swal.fire({
                title: "Desea eliminar el producto?",
                text: "Esta accion no puede ser revertida!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminar producto!",
              }).then((result) => {
                if (result.value) {
                  Swal.fire(
                    "Eliminado!",
                    "El producto ha sido eliminado.",
                    firebase.db
                      .collection("productos")
                      .doc(producto.id)
                      .delete(),
                    "success"
                  );
                }
              });
            }}
          >
            <MDBIcon icon="times" size="lg" className="red-text" />
          </a>
        </div>
      ),
    })),
  };

  async function crearProducto() {
    //Crear el objeto del nuevo producto
    const producto = {
      marca,
      modelo,
      precio,
      categoria,
      uidUsuario: usuario.uid
    };

    //insertarlo en la base de datos
    firebase.db.collection("productos").add(producto);

    //Alerta de Confirmacion
    Swal.fire({
      icon: "success",
      title: "Se ha agregado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  return (
    <Layout>
      <MDBRow>
        <MDBCol md="12">
          <MDBCard className="mt-1">
            <MDBView className="gradient-card-header blue darken-2">
              <h4 className="h4-responsive text-white">Listado de Productos</h4>
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
              <h4 className="h4-responsive text-white">Agregar Producto</h4>
            </MDBView>
            <MDBCardBody>
              <form onSubmit={handleSubmit}>
                <MDBRow>
                  <div className="form-group col-md-3">
                    <label>Marca</label>
                    {errores.marca && (
                      <MDBAlert color="danger"> {errores.marca} </MDBAlert>
                    )}
                    <input
                      type="text"
                      className="form-control text-capitalize"
                      placeholder="Marca"
                      onChange={handleChange}
                      value={marca}
                      name="marca"
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label>Modelo</label>
                    {errores.modelo && (
                      <MDBAlert color="danger"> {errores.modelo} </MDBAlert>
                    )}
                    <input
                      type="text"
                      className="form-control text-capitalize"
                      placeholder="Modelo"
                      onChange={handleChange}
                      value={modelo}
                      name="modelo"
                    />
                  </div>
                  <div className="form-group col-md-2">
                    <label>Precio</label>
                    {errores.precio && (
                      <MDBAlert color="danger"> {errores.precio} </MDBAlert>
                    )}
                    <input
                      type="number"
                      className="form-control text-capitalize"
                      placeholder="Precio $"
                      onChange={handleChange}
                      value={precio}
                      name="precio"
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label>Categoria</label>
                    {errores.categoria && (
                      <MDBAlert color="danger"> {errores.categoria} </MDBAlert>
                    )}
                    <select
                      className="browser-default custom-select"
                      onChange={handleChange}
                      name="categoria"
                      value={categoria}
                    >
                      <option>--Seleccionar--</option>
                      <option value="Refrigeracion">Refrigeracion</option>
                      <option value="Seguridad">Seguridad</option>
                      <option value="Persianas">Persianas</option>
                    </select>
                  </div>
                </MDBRow>

                <MDBBtn color="blue darken-2" type="submit">
                  Agregar Producto
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <ModalProducto productSelect={productSelect} />
      </MDBRow>
    </Layout>
  );
};

export default Productos;
