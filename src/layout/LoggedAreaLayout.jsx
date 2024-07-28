import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../componentes/Footer/Index";

const LoggedAreaLayout = () => {
  return (
    <div className="logged-area-layout">
      <main>
        <Outlet /> 
      </main>
    </div>
  );
};

export default LoggedAreaLayout;
