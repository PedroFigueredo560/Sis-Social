
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';
import Footer from './componentes/Footer/Index';
import { AuthProvider } from './layout/AuthContext';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <main>
            <AppRoutes />
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
