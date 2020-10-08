import React from "react";
import { MDBCard, MDBIcon, MDBRow, MDBCol } from "mdbreact";

const AdminCardSection1 = ({
  totalFacturaMesActual,
  totalFacturaMesAnterior,
  cantidadFacturas
}) => {
  return (
    <MDBRow className="mb-4">
      <MDBCol xl="4" md="6" className="mb-r">
        <MDBCard className="cascading-admin-card">
          <div className="admin-up">
            <MDBIcon icon="money-bill-alt" className="primary-color" />
            <div className="data">
              <p>VENTAS DEL MES</p>
              <h4>
                <strong>${totalFacturaMesActual}</strong>
              </h4>
            </div>
          </div>
        </MDBCard>
      </MDBCol>
      <MDBCol xl="4" md="6" className="mb-r">
        <MDBCard className="cascading-admin-card">
          <div className="admin-up">
            <MDBIcon icon="chart-line" className="primary-color" />
            <div className="data">
              <p>N° FACTURAS</p>
              <h4>
                <strong>{cantidadFacturas}</strong>
              </h4>
            </div>
          </div>
        </MDBCard>
      </MDBCol>
      <MDBCol xl="4" md="6" className="mb-r">
        <MDBCard className="cascading-admin-card">
          <div className="admin-up">
            <MDBIcon icon="chart-pie" className="primary-color" />
            <div className="data">
              <p>MES PASADO</p>
              <h4>
                <strong>${totalFacturaMesAnterior}</strong>
              </h4>
            </div>
          </div>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
};

export default AdminCardSection1;
