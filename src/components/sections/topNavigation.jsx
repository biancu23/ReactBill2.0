import React, { useState, useContext } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
} from "mdbreact";
import { FirebaseContext } from "../../firebase/context";
import Swal from "sweetalert2";
import { NavLink } from 'react-router-dom'
const TopNavigation = () => {
  const [collapse, setCollapse] = useState(false);
  const { firebase, usuario } = useContext(FirebaseContext);

  const onClick = () => {
    setCollapse(!collapse);
  };

  return (
    <MDBNavbar className="flexible-navbar" light expand="md" scrolling>
      <MDBNavbarBrand href="/">
        <strong>{usuario.displayName}</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={onClick} />
      <MDBCollapse isOpen={collapse} navbar>
        <MDBNavbarNav right>
          <MDBNavItem>
            <NavLink className="nav-link Ripple-parent" to="/">
              Dashboard
            </NavLink>
          </MDBNavItem>
          <MDBNavItem>
            <NavLink className="nav-link Ripple-parent" to="/perfil">
              Perfil
            </NavLink>
          </MDBNavItem>
          <MDBNavItem>
            <NavLink className="nav-link Ripple-parent" to="/clientes">
              Clientes
            </NavLink>
          </MDBNavItem>
          <MDBNavItem>
            <NavLink className="nav-link Ripple-parent" to="/productos">
              Productos
            </NavLink>
          </MDBNavItem>
          <MDBNavItem>
            <NavLink className="nav-link Ripple-parent" to="/facturas">
              Cotizaciones
            </NavLink>
          </MDBNavItem>
          <MDBNavItem>
            <a
              href="#!"
              className="nav-link Ripple-parent red-text font-weight-bold"
              onClick={() =>
                Swal.fire({
                  title: "Desea cerrar la sesion?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Si, cerrar sesion!",
                }).then((result) => {
                  if (result.value) {
                    firebase.cerrarSesion();
                  }
                })
              }
            >
              Cerrar Sesion
            </a>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
};

export default TopNavigation;
