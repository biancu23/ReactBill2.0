import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//MDB React
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBAlert,
} from "mdbreact";
//Validaciones
import useValidacion from "../../hooks/useValidacion";
import validarIniciarSesion from "../../validacion/validarIniciarSesion";
//Firebase
import firebase from "../../firebase";

const STATE_INICIAL = {
  email: "",
  password: "",
};

const Login = () => {
  const [error, guardarError] = useState(false);

  const { valores, errores, handleSubmit, handleChange } = useValidacion(
    STATE_INICIAL,
    validarIniciarSesion,
    iniciarSesion
  );

  const { email, password } = valores;

  let history = useHistory();

  async function iniciarSesion() {
    try {
      await firebase.login(email, password);
      history.push("/");
    } catch (error) {
      console.error("Hubo un error al autenticar el usuario", error.message);
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
                  <p className="h4 text-center mb-4">Iniciar Sesion</p>
                  <label
                    htmlFor="defaultFormLoginEmailEx"
                    s
                    className="grey-text"
                  >
                    Email
                  </label>
                  {errores.email && (
                    <MDBAlert color="danger"> {errores.email} </MDBAlert>
                  )}
                  <input
                    type="email"
                    id="defaultFormLoginEmailEx"
                    className="form-control"
                    onChange={handleChange}
                    name="email"
                    value={email}
                  />
                  <br />
                  <label
                    htmlFor="defaultFormLoginPasswordEx"
                    className="grey-text"
                  >
                    Contraseña
                  </label>
                  {errores.password && (
                    <MDBAlert color="danger"> {errores.password} </MDBAlert>
                  )}
                  {error && <MDBAlert color="danger">{error}</MDBAlert>}
                  <input
                    type="password"
                    id="defaultFormLoginPasswordEx"
                    className="form-control"
                    onChange={handleChange}
                    name="password"
                    value={password}
                  />
                  <div className="d-flex justify-content-around mt-4">
                    <MDBBtn color="blue" type="submit">
                      Login
                    </MDBBtn>
                    <MDBBtn outline color="blue" href="/registro">
                      Resgistrarse
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

export default Login;
