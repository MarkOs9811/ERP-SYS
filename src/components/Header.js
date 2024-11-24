import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons'; // Importar los iconos que deseas usar

export function Header({ onToggleSidebar }) {

  // aqui declaro variables de mi localstorage para mostrarlo en mi vista
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <header className="navbar text-dark bg-white">
    <nav className="container-fluid d-flex align-items-center justify-content-between">
        {/* Botón de compresión de sidebar */}
        <button className="btn  me-3" onClick={onToggleSidebar}>
        <FontAwesomeIcon icon={faBars} size="lg" />
        </button>

        {/* Icono de usuario */}
        <div className="navbar-right d-flex">
         
          <button className="btn d-flex">
             {/* Muestra el correo del usuario */}
              {user && user.correo ? (
                <p className="mb-0  mx-3">{user.empleado.persona.nombre}</p>
              ) : (
                <p className="mb-0 mx-3">Correo no disponible</p>
              )}
            <FontAwesomeIcon icon={faUserCircle} size="lg" />
          </button>
        </div>
    </nav>
    </header>

  );
}
