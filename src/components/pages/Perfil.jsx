import React, { useContext, useState, useEffect } from "react";
//MDB React
import {
  MDBCard,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBCardText,
  MDBIcon,
  MDBBtn,
  MDBView,
  MDBInput,
} from "mdbreact";
import Swal from "sweetalert2";
//Hooks
import useEmpresa from "../../hooks/useEmpresa";
import Layout from "../sections/Layout";
import { FirebaseContext } from "../../firebase/context";
import useValidacion from "../../hooks/useValidacion";
import FileUploader from "react-firebase-file-uploader";

//Manejo de errores
import validarRegistrarEmpresa from "../../validacion/validarRegistrarEmpresa";

const STATE_INICIAL = {
  nombre: "",
  correo: "",
  telefono: "",
  direccion: "",
  identificacion: "",
  imagen: "",
  uidUsuario: "",
};

const Perfil = () => {
  //Hook de validacion
  const { valores, errores, handleSubmit, handleChange } = useValidacion(
    STATE_INICIAL,
    validarRegistrarEmpresa,
    registrarEmpresa
  );

  //Destructuring del state
  const { nombre, correo, telefono, direccion, identificacion } = valores;

  //Context de firebase
  const { info, firebase } = useContext(FirebaseContext);

  //Hook con la informacion de Firebase
  const { empresa } = useEmpresa();
  console.log(empresa);
  //state de las imagenes
  const [nombreimagen, guardarNombre] = useState("");
  const [subiendo, guardarSubiendo] = useState(false);
  const [progreso, guardarProgreso] = useState(0);
  const [urlimagen, guardarUrlImagen] = useState("");

  //Funcion para insertar en firebase
  async function registrarEmpresa() {
    //Crear el objeto para registrar empresa
    const empresa = {
      nombre,
      correo,
      telefono,
      direccion,
      urlimagen,
      identificacion,
      uidUsuario: info.uid,
    };

    //insertarlo en la base de datos
    firebase.db.collection("empresa").add(empresa);

    //Alerta de Confirmacion
    Swal.fire({
      icon: "success",
      title: "Se ha registrado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);
  };

  const handleProgress = (progreso) => guardarProgreso({ progreso });

  const handleUploadError = (error) => {
    guardarSubiendo(error);
    console.error(error);
  };

  const handleUploadSuccess = (nombre) => {
    guardarProgreso(100);
    guardarSubiendo(false);
    guardarNombre(nombre);
    firebase.storage
      .ref("empresa")
      .child(nombre)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        guardarUrlImagen(url);
      });
  };
  return (
    <Layout>
      <MDBRow className="justify-content-center" md="2">
        {/*User Card */}
        <MDBCol md="6" className="mb-3">
          <MDBCard className="cascading-admin-card">
            <div className="admin-up">
              <MDBIcon
                icon="user"
                className="primary-color"
                style={{ borderRadius: "50%" }}
              />
              <div className="data">
                <h4>
                  <strong>{info.displayName}</strong>
                </h4>
              </div>
            </div>
            <MDBCardBody>
              <MDBCardText>
                <h6>Usuario: {info.displayName}</h6>
                <h6>Email: {info.email} </h6>
                <h6>Telefono: {info.phoneNumber} </h6>
              </MDBCardText>
            </MDBCardBody>
            <MDBBtn color="blue darken-2">Editar Perfil</MDBBtn>
          </MDBCard>
        </MDBCol>
        {/*Carga condicional si existe una empresa registrada*/}
        {empresa.length !== 0 ? (
          <>
            {/*Company Card */}
            <MDBCol md="6" className="mb-3">
              {empresa.map((empresa) => (
                <MDBCard className="cascading-admin-card" key={empresa.id}>
                  <div className="admin-up">
                    <MDBIcon
                      icon="industry"
                      className="primary-color"
                      style={{ borderRadius: "50%" }}
                    />
                    <div className="data">
                      <h4>
                        <strong>{empresa.nombre}</strong>
                      </h4>
                    </div>
                  </div>
                  <MDBCardBody>
                    <MDBCardText>
                      <MDBRow>
                        <MDBCol md="6">
                          <h6>Email: {empresa.correo} </h6>
                          <h6>Telefono: {empresa.telefono} </h6>
                          <h6>Direccion: {empresa.direccion} </h6>
                          <h6>I.D: {empresa.identificacion} </h6>
                        </MDBCol>
                        <MDBCol md="6">
                          <img
                            src={empresa.urlimagen}
                            className="img-fluid"
                            alt="Logo"
                          />
                        </MDBCol>
                      </MDBRow>
                    </MDBCardText>
                  </MDBCardBody>
                  <MDBBtn color="blue darken-2">Editar Empresa</MDBBtn>
                </MDBCard>
              ))}
            </MDBCol>
          </>
        ) : (
          <>
            {/*Formulario registro de empresa*/}
            <MDBCol md="6" className="mb-3">
              <MDBCard className="mt-1">
                <MDBView className="gradient-card-header blue darken-2">
                  <h4 className="h4-responsive text-white">
                    Registrar Empresa
                  </h4>
                </MDBView>
                <MDBCardBody>
                  <form onSubmit={handleSubmit}>
                    <div className="grey-text">
                      <MDBInput
                        label="Nombre Comercial"
                        icon="university"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                      />
                      <MDBInput
                        label="Identificacion (R.U.C)"
                        icon="id-card"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        name="identificacion"
                        value={identificacion}
                        onChange={handleChange}
                      />
                      <MDBInput
                        label="Correo"
                        icon="envelope"
                        group
                        type="email"
                        validate
                        error="wrong"
                        success="right"
                        name="correo"
                        value={correo}
                        onChange={handleChange}
                      />
                      <MDBInput
                        label="Telefono"
                        icon="phone"
                        group
                        type="tel"
                        validate
                        error="wrong"
                        success="right"
                        name="telefono"
                        value={telefono}
                        onChange={handleChange}
                      />
                      <MDBInput
                        label="Direccion"
                        icon="map-marker-alt"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        className="mb-1"
                        name="direccion"
                        value={direccion}
                        onChange={handleChange}
                      />
                      <div className="text-center mb-4">
                        <FileUploader
                          accept="image/*"
                          id="imagen"
                          name="imagen"
                          randomizeFilename
                          storageRef={firebase.storage.ref("empresa")}
                          onUploadStart={handleUploadStart}
                          onUploadError={handleUploadError}
                          onUploadSuccess={handleUploadSuccess}
                          onProgress={handleProgress}
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <MDBBtn color="primary" type="submit">
                        Registrar
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </>
        )}
      </MDBRow>
    </Layout>
  );
};

export default Perfil;
