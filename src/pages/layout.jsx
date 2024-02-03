

import React from "react";
import NavBar from "../component/NavBar"
import SideBar from "../component/sideBar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <NavBar />
      <div className="columns mt-6" style={{ minHeight: "100vh" }}>
        <div className="column is-2">
          <SideBar />
        </div>
        <div className="column has-background-light">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;