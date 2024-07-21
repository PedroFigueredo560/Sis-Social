import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./componentes/Header";
import AppRoutes from "./Routes";
import Footer from "./componentes/Footer/Index";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
