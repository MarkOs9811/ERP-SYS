import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faHome, faUsers, faBox, faCogs, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export function SideBar({ isCompressed }) {
  const location = useLocation(); // Obtener la ruta actual
  const navigate = useNavigate(); // Para redirigir al usuario

  // Función para cerrar sesión
  const cerrarSession = async () => {
    try {
      // Realiza la solicitud de cierre de sesión al backend
      await axios.post('http://erp-api.test/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Usa el token almacenado en localStorage
        }
      });

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');

    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Aquí podrías mostrar un mensaje de error si es necesario
    }
  };
  return (
    <div className={`sidebar ${isCompressed ? 'compressed' : ''}`}>
      {/* Cabecera del Sidebar */}
      <div className="sidebar-header">
        <FontAwesomeIcon icon={faGem} className="header-icon" /> {/* Ícono de marca */}
        {!isCompressed && <span className="header-title">Mi Marca</span>} {/* Título visible solo si no está comprimido */}
      </div>

      {/* Lista de menús */}
      <ul className="menu-list">
          <Link to="/" className='link-opcion'>
            <li className={`menu-item my-2 ${location.pathname === "/" ? "active" : ""} ${isCompressed ? 'center' : ''}`}>
                <FontAwesomeIcon icon={faHome} className="icon" />
                {!isCompressed && <span>Inicio</span>}
            </li>
          </Link>
          <Link to="/usuarios" className='link-opcion'>
            <li className={`menu-item my-2 ${location.pathname === "/usuarios" ? "active" : ""} ${isCompressed ? 'center' : ''}`}>
                <FontAwesomeIcon icon={faUsers} className="icon" />
                {!isCompressed && <span>Usuarios</span>}
            </li>
          </Link>
          <Link to="/almacen" className='link-opcion'>
            <li className={`menu-item my-2 ${location.pathname === "/almacen" ? "active" : ""} ${isCompressed ? 'center' : ''}`}>
                <FontAwesomeIcon icon={faBox} className="icon" />
                {!isCompressed && <span>Almacén</span>}
            </li>
          </Link>
          <Link to="/configuracion" className='link-opcion'>
            <li className={`menu-item my-2 ${location.pathname === "/configuracion" ? "active" : ""} ${isCompressed ? 'center' : ''}`}>
                <FontAwesomeIcon icon={faCogs} className="icon" />
                {!isCompressed && <span>Configuración</span>}
            </li>
          </Link>
          <Link onClick={cerrarSession} className="logout-btn link-opcion">
            <li className={`menu-item my-2 ${location.pathname === "/logout" ? "active" : ""} ${isCompressed ? 'center' : ''}`}>
                <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
                {!isCompressed && <span>Salir</span>}
            </li>
          </Link>
      </ul>
    </div>
  );
}
