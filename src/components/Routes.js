import React from "react";
import { Route, Switch } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import Perfil from "./pages/Perfil";
import Clientes from "./pages/Clientes";
import Productos from "./pages/Productos";
import Facturas from "./pages/Facturas";
import NuevaFactura from "./facturas/NuevaFactura";
import CrearCuenta from "./pages/CrearCuenta";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    
    <Switch>
      <PrivateRoute path="/" exact component={DashboardPage} />
      <PrivateRoute path="/perfil" component={Perfil} />
      <PrivateRoute path="/clientes" component={Clientes} />
      <PrivateRoute path="/productos" component={Productos} />
      <PrivateRoute path="/facturas" component={Facturas} />
      <PrivateRoute path="/nueva-factura" component={NuevaFactura} />
      <Route path="/login" component={Login}/>
      <Route path="/registro" component={CrearCuenta} />
      <Route component={NotFoundPage}/>
    </Switch>
  );
};

export default Routes;
