import React, { Component } from "react";
import { MDBCol, MDBCard, MDBCardBody, MDBRow, MDBView } from "mdbreact";
import { Bar, Pie } from "react-chartjs-2";

class ChartSection1 extends Component {
  render() {
    const dataBar = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Facturas Total",
          data: [
            1500,
            1600,
            2500,
            3000,
            1800,
            1450,
            2200,
            1500,
            1600,
            2500,
            3000,
            1800,
          ],
          backgroundColor: "rgba(98,  182, 239, 0.5)",
          borderWidth: 1,
        },
      ],
    };

    const barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            barPercentage: 1,
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    

    return (
      <MDBRow className="mb-4">
        <MDBCol md="12" className="mb-4">
          <MDBCard className="mb-4">
            <MDBView className="gradient-card-header blue darken-2">
              <h4 className="h4-responsive text-white">Facturacion Mensual</h4>
            </MDBView>
            <MDBCardBody>
              <Bar data={dataBar} height={500} options={barChartOptions} />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        
      </MDBRow>
    );
  }
}

export default ChartSection1;
