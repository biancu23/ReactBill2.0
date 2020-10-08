import React from "react";
import logo from "../../assets/reactlogo.png";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from "mdbreact";
import { NavLink } from "react-router-dom";
import { FirebaseContext } from "../../firebase/context";
import { useContext } from "react";
const TopNavigation = () => {
  const { usuario } = useContext(FirebaseContext);

  return (
    <div className="sidebar-fixed position-fixed">
      <a href="#!" className="logo-wrapper waves-effect">
        <img alt="React Logo" className="img-fluid py-2" src={logo} />
      </a>
        <h4 className="text-center pb-2">{usuario.displayName}</h4>
      <MDBListGroup className="list-group-flush">
        <NavLink exact={true} to="/" activeClassName="activeClass">
          <MDBListGroupItem>
            <MDBIcon icon="chart-pie" className="mr-3" />
            Dashboard
          </MDBListGroupItem>
        </NavLink>
        <NavLink to="/perfil" activeClassName="activeClass">
          <MDBListGroupItem>
            <MDBIcon icon="user" className="mr-3" />
            Perfil
          </MDBListGroupItem>
        </NavLink>
        <NavLink to="/clientes" activeClassName="activeClass">
          <MDBListGroupItem>
            <MDBIcon icon="address-book" className="mr-3" />
            Clientes
          </MDBListGroupItem>
        </NavLink>
        <NavLink to="/productos" activeClassName="activeClass">
          <MDBListGroupItem>
            <MDBIcon icon="shopping-cart" className="mr-3" />
            Productos
          </MDBListGroupItem>
        </NavLink>
        <NavLink to="/facturas" activeClassName="activeClass">
          <MDBListGroupItem>
            <MDBIcon icon="file-invoice-dollar" className="mr-3" />
            Facturas
          </MDBListGroupItem>
        </NavLink>
      </MDBListGroup>
    </div>
  );
};

export default TopNavigation;
