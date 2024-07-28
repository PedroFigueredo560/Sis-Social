import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import Footer from "./componentes/Footer/Index";
import Header from "./componentes/Header";
import { AuthProvider } from "./layout/AuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Header />
          <main>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
