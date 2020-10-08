import React, { useState } from "react";
import firebase from "../../firebase";
import { useHistory } from "react-router-dom";

//Boostrap
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBAlert,
  MDBCardText,
  MDBContainer
} from "mdbreact";

//Validaciones
import useValidacion from "../../hooks/useValidacion";
import validarCrearCuenta from "../../validacion/validarCrearCuenta";

const STATE_INICIAL = {
  nombre: "",
  email: "",
  password: "",
  confirmarPassword: ""
};

const CrearCuenta = () => {
  const [error, guardarError] = useState(false);
  const { valores, errores, handleSubmit, handleChange } = useValidacion(
    STATE_INICIAL,
    validarCrearCuenta,
    crearCuenta
  );

  const { email, password, nombre, confirmarPassword} = valores;

  let history = useHistory();

  async function crearCuenta() {
    try {
      await firebase.registrar(nombre, email, password);
      history.push("/");
    } catch (error) {
      console.error("Hubo un error al registrar el usuario", error.message);
      guardarError(error.message);
    }
  }
  return (
    <MDBContainer>
      <MDBRow
        className="d-flex justify-content-center align-content-center"
        style={{ height: "100vh" }}
      >
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <MDBCardText>
                <form onSubmit={handleSubmit}>
                  <p className="h4 text-center mb-4">Registro</p>
                  <label htmlFor="nombre" s className="grey-text">
                    Nombre Completo
                  </label>
                  {errores.nombre && (
                    <MDBAlert color="danger"> {errores.nombre} </MDBAlert>
                  )}
                  <input
                    type="text"
                    id="nombre"
                    className="form-control"
                    onChange={handleChange}
                    name="nombre"
                    value={nombre}
                    placeholder="John Doe"
                  />
                  <br />
                  <label htmlFor="email" s className="grey-text">
                    Correo
                  </label>
                  {errores.email && (
                    <MDBAlert color="danger"> {errores.email} </MDBAlert>
                  )}
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    onChange={handleChange}
                    name="email"
                    value={email}
                    placeholder="correo@correo.com"
                  />
                  <br />
                  <label
                    htmlFor="password"
                    className="grey-text"
                  >
                    Contraseña
                  </label>
                  {errores.password && (
                    <MDBAlert color="danger"> {errores.password} </MDBAlert>
                  )}
                  
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    onChange={handleChange}
                    name="password"
                    value={password}
                    placeholder="Password"
                  />
                  <br />
                  <label
                    htmlFor="confirmarPassword"
                    className="grey-text"
                  >
                    Confirmar Contraseña
                  </label>
                  {errores.confirmarPassword && (
                    <MDBAlert color="danger"> {errores.confirmarPassword} </MDBAlert>
                  )}
                  {error && <MDBAlert color="danger">{error}</MDBAlert>}
                  <input
                    type="password"
                    id="confirmarPassword"
                    className="form-control"
                    onChange={handleChange}
                    name="confirmarPassword"
                    value={confirmarPassword}
                    placeholder="Confirmar Password"
                  />
                  <br />
                  <div className="d-flex justify-content-around mt-4">
                    <MDBBtn color="blue" type="submit">
                      Registrarse
                    </MDBBtn>
                    <MDBBtn outline color="blue" href="/login">
                      Volver 
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default CrearCuenta;
