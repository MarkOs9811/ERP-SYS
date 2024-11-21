import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Usuarios } from './pages/Usuarios';
import { Header } from './components/Header';
import { SideBar } from './components/SideBar';
import { Home } from './pages/Home';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="App">
      <Router>
        <div className="main-container">
          <SideBar isCompressed={!sidebarOpen} />
          <div className={`content ${sidebarOpen ? 'open' : ''}`}>
            <Header onToggleSidebar={toggleSidebar} />

            {/* CUERPO DEL SISTEMA */}
              <div className='container'>
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/usuarios" element={<Usuarios />} />
              </Routes>
              </div>
           
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
