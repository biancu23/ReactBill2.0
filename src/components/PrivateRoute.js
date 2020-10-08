import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { FirebaseContext } from "../firebase/context";

const PrivateRoute = ({ component: Component, ...props }) => {


const { info, usuario } = useContext(FirebaseContext);
  return (
    <Route
      {...props}
      render={(props) =>
        !usuario ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
