import React from "react";
import TopNavigation from "./topNavigation";
import SideNavigation from "./sideNavigation";
import { MDBContainer } from "mdbreact";
const Layout = ({ children }) => {
  return (
    <div className="flexible-content vh-100">
      <TopNavigation />
      <SideNavigation />
      <main id="content" className="p-3 p-md-5">
        <MDBContainer fluid>{children}</MDBContainer>
      </main>
    </div>
  );
};

export default Layout;
