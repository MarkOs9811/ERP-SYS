import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Usuarios } from './pages/Usuarios';
import { Header } from './components/Header';
import { SideBar } from './components/SideBar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute'; // Importa la ruta privada
import { ToastContainer, toast } from 'react-toastify';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
import 'react-toastify/dist/ReactToastify.css';
import { Almacen } from './pages/Almacen';
import { Configuracion } from './pages/Configuracion';
import { Navegacion } from './components/Navegacion';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, []);

  
  return (
    <div className="App">
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

                    {/* CUERPO DE APLICACION */}
                    <div className="container">
                        <>  <ToastContainer /> 
                        <Navegacion/>
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/usuarios" element={<Usuarios />} />
                          <Route path="/almacen" element={<Almacen />} />
                          <Route path="/configuracion" element={<Configuracion />} />
                        </Routes>
                        </>
                    </div>
                    {/* ======== */}
                  </div>
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
