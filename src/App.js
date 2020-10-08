import React from "react";
import Routes from "../src/components/Routes";
import "./index.css";
import FirebaseProvider from "./firebase/context";
import FacturasProvider from "./context/FacturasContext";
import ModalProvider from "./context/ModalContext";

const App = () => {
  return (
    <FirebaseProvider>
      <ModalProvider>
        <FacturasProvider>
          <Routes />
        </FacturasProvider>
      </ModalProvider>
    </FirebaseProvider>
  );
};

export default App;
