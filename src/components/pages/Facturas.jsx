import React, { useContext } from "react";
import {
  MDBRow,
  MDBCol,
  MDBView,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBDataTable,
  MDBIcon,
  MDBLink,
  MDBBadge,
} from "mdbreact";
//Hooks
import useFacturas from "../../hooks/useFacturas";
import Swal from "sweetalert2";
import { FirebaseContext } from "../../firebase/context";
import Layout from "../sections/Layout";

const ListadoFacturas = () => {
  //context con las operaciones crud de firebase
  const { firebase } = useContext(FirebaseContext);

  //Hook con la informacion de Firebase
  const { facturaHook } = useFacturas("numeroFactura");
  //Datos de la tabla
  const data = {
    columns: [
      {
        label: "Cliente",
        field: "nombre",
        sort: "asc",
      },
      {
        label: "Fecha",
        field: "fecha",
        sort: "asc",
      },
      {
        label: "COT #",
        field: "cotizacion",
        sort: "asc",
      },
      {
        label: "Total",
        field: "total",
        sort: "asc",
      },
      {
        label: "Descripcion",
        field: "descripcion",
        sort: "asc",
      },
      {
        label: "Estatus",
        field: "estatus",
        sort: "asc",
      },
    ],
    rows: facturaHook.map((factura) => ({
      nombre: factura.nombreCliente,
      fecha: factura.fecha,
      cotizacion: "00" + factura.numeroFactura,
      total: factura.totalFactura + " $",
      descripcion: factura.descripcion,
      estatus: factura.estatusFactura ? (
        
        <><MDBBadge pill color="success">
        Aprobada
      </MDBBadge><a
        href="#!"
        onClick={() => {
          firebase.db.collection("facturas").doc(factura.id).delete()
        }}
      >
        
      </a></>
      ) : (
        <>
          <MDBBadge pill color="warning" className="mr-2">
            Pendiente
          </MDBBadge>
          <a
            href="#!"
            onClick={() => {
              Swal.fire({
                title: "Desea aprobar la cotizacion",
                text: "Esta accion no puede ser revertida!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, aprobar!",
              }).then((result) => {
                if (result.value) {
                  Swal.fire({
                    icon: "success",
                    title: "La cotizacion ha sido aprobada!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  firebase.db
                    .collection("facturas")
                    .doc(factura.id)
                    .update("estatusFactura", true);
                }
              });
            }}
          >
            <MDBIcon icon="check" size="lg" className="green-text" />
          </a>
          
        </>
      ),
    })),
  };

  return (
    <Layout>
      <MDBRow>
        <MDBCol md="12">
          <MDBCard className="mt-1">
            <MDBView className="gradient-card-header blue darken-2">
              <h4 className="h4-responsive text-white">
                Listado de Cotizaciones
              </h4>
            </MDBView>
            <MDBCardBody>
              <MDBDataTable
                striped
                bordered
                small
                data={data}
                className="text-center"
                responsive
              />
            </MDBCardBody>
            <MDBCol md="4" className="pb-2">
              <MDBLink to="/nueva-factura">
                <MDBBtn color="blue darken-2">Nueva Cotizacion</MDBBtn>
              </MDBLink>
            </MDBCol>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </Layout>
  );
};

export default ListadoFacturas;
