import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Usuarios } from './pages/Usuarios';
import { Header } from './components/Header';
import { SideBar } from './components/SideBar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute'; // Importa la ruta privada
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/usuarios" element={<Usuarios />} />
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
