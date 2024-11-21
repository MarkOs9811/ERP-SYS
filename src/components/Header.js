import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons'; // Importar los iconos que deseas usar

export function Header({ onToggleSidebar }) {
  return (
    <header className="navbar text-dark bg-white">
    <nav className="container-fluid d-flex align-items-center justify-content-between">
        {/* Botón de compresión de sidebar */}
        <button className="btn btn-dark me-3" onClick={onToggleSidebar}>
        <FontAwesomeIcon icon={faBars} size="lg" />
        </button>

        {/* Icono de usuario */}
        <div className="navbar-right d-flex">
            <h1 className="navbar-title mb-0 fs-4 mx-3">Mi Aplicación</h1>
            <button className="btn btn-dark">
                <FontAwesomeIcon icon={faUserCircle} size="lg" />
            </button>
        </div>
    </nav>
    </header>

  );
}
