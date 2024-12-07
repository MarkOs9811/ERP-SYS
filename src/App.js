import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import { PrivateRoute } from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
import { Header } from './components/Header';
import { SideBar } from './components/SideBar';
import { Navegacion } from './components/Navegacion';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { MenuPlato } from './pages/MenuPlato';
import { Usuarios } from './pages/Usuarios';
import { Almacen } from './pages/Almacen';
import { Configuracion } from './pages/Configuracion';
import { AuthProvider, useAuth } from './AuthContext';
import { Vender } from './pages/Vender';
import { Platos } from './components/componenteVender/Platos';

const BASE_URL = process.env.REACT_APP_BASE_URL;
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // useEffect para poder actualizar el logo icono y el nombre en el proyecto - pestaña 
  useEffect(() => {
    // Obtener datos de la empresa desde localStorage
    const miEmpresa = JSON.parse(localStorage.getItem("miEmpresa"));

    if (miEmpresa) {
      // Actualizar el título de la página
      document.title = miEmpresa.nombre;

      // Actualizar el favicon
      const favicon = document.getElementById("favicon");
      const logoUrl = `${BASE_URL}/storage/${miEmpresa.logo}`; // URL del logo dinámico
      favicon.href = logoUrl;
    }
  }, []); 
  
  
  

  const isAuthenticated = !!localStorage.getItem('token'); // Verifica si hay token

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <div className="main-container">
                  <SideBar isCompressed={!sidebarOpen} />
                  <div className={`content ${sidebarOpen ? 'open' : ''}`}>
                    <Header onToggleSidebar={toggleSidebar} />
                    <div className="container">
                      <ToastContainer />
                      <Navegacion />
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/usuarios" element={<Usuarios />} />
                        <Route path="/almacen" element={<Almacen />} />
                        <Route path="/vender" element={<Vender />} />
                        <Route path="/vender/platos/:id" element={<Platos />} />
                        <Route path="/configuracion" element={<Configuracion />} />
                        <Route path="/platos" element={<MenuPlato />} />
                      </Routes>
                    </div>
                  </div>
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
