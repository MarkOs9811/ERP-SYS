import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faHome, faUsers, faBox, faCogs, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export function SideBar({ isCompressed }) {
  const location = useLocation(); // Obtener la ruta actual

  return (
    <div className={`sidebar ${isCompressed ? 'compressed' : ''}`}>
      {/* Cabecera del Sidebar */}
      <div className="sidebar-header">
        <FontAwesomeIcon icon={faGem} className="header-icon" /> {/* Ícono de marca */}
        {!isCompressed && <span className="header-title">Mi Marca</span>} {/* Título visible solo si no está comprimido */}
      </div>

      {/* Lista de menús */}
      <ul className="menu-list">
        <li className={`menu-item my-2 ${location.pathname === "/" ? "active" : ""} ${isCompressed ? 'center' : ''}`}>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} className="icon" />
            {!isCompressed && <span>Inicio</span>}
          </Link>
        </li>
        <li className={`menu-item my-2 ${location.pathname === "/usuarios" ? "active" : ""} ${isCompressed ? 'center' : ''}`}>
          <Link to="/usuarios">
            <FontAwesomeIcon icon={faUsers} className="icon" />
            {!isCompressed && <span>Usuarios</span>}
          </Link>
        </li>
        <li className={`menu-item my-2 ${location.pathname === "/almacen" ? "active" : ""} ${isCompressed ? 'center' : ''}`}>
          <Link to="/almacen">
            <FontAwesomeIcon icon={faBox} className="icon" />
            {!isCompressed && <span>Almacén</span>}
          </Link>
        </li>
        <li className={`menu-item my-2 ${location.pathname === "/configuracion" ? "active" : ""} ${isCompressed ? 'center' : ''}`}>
          <Link to="/configuracion">
            <FontAwesomeIcon icon={faCogs} className="icon" />
            {!isCompressed && <span>Configuración</span>}
          </Link>
        </li>
        <li className={`menu-item my-2 ${location.pathname === "/logout" ? "active" : ""} ${isCompressed ? 'center' : ''}`}>
          <Link to="/logout">
            <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
            {!isCompressed && <span>Salir</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
}
