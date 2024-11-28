import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faHome,
  faUsers,
  faBoxesPacking,
  faCogs,
  faShop,
  faStore,
  faBuilding,
  faArrowTrendUp,
  faHouseChimney,
  faBullhorn,
  faGear,
  faTruckFast,
} from '@fortawesome/free-solid-svg-icons'; // Sólidos
import {
  faAddressCard,
  faIdBadge,
  faCalendarAlt,
} from '@fortawesome/free-regular-svg-icons'; // Regulares

import axios from 'axios';

export function SideBar({ isCompressed }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Obtener los roles desde localStorage
  const roles = JSON.parse(localStorage.getItem('roles')) || [];

  // Íconos asociados a cada vista
  const icons = {
    inicio: faHome,
    usuarios: faUsers,
    ventas: faShop,
    incidenciasempleado: faAddressCard,
    incidencias: faBullhorn,
    almacen: faBoxesPacking,
    vender: faStore,
    proveedores: faTruckFast,
    compras: faCalendarAlt,
    'rr-hh': faIdBadge, // Adaptado para "RR.HH"
    finanzas: faArrowTrendUp,
    'areas-y-cargos': faBuilding, // Adaptado para "areas y cargos"
    configuracion: faCogs,
  };

  // Función para obtener el ícono asociado a un rol
  const getIconForRole = (roleName) => {
    const roleKey = roleName
      .toLowerCase()
      .replace(/\s+/g, '-') // Reemplaza espacios por guiones
      .replace(/\./g, '-')  // Reemplaza puntos por guiones
      .trim();
      
    return icons[roleKey] || faHome; // Devuelve el ícono o uno por defecto
  };

  // Función para cerrar sesión
  const cerrarSession = async () => {
    try {
      await axios.post('http://erp-api.test/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('roles');
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Función para convertir nombres de roles a URLs amigables
  const formatRoleToUrl = (roleName) => {
    return roleName
      .toLowerCase()
      .replace(/\s+/g, '-') // Reemplaza espacios con guiones
      .replace(/\./g, '-'); // Reemplaza puntos con guiones
  };

  return (
    <div className={`sidebar ${isCompressed ? 'compressed' : ''}`}>
      <div className="sidebar-header">
        <FontAwesomeIcon icon={faHome} className="header-icon" />
        {!isCompressed && <span className="header-title">Mi Marca</span>}
      </div>

      <ul className="menu-list">
        <Link to={`/`} className="link-opcion" key='Inicio'
            data-bs-toggle="tooltip" data-bs-placement="right" title={'Inicio'}>
          <li className={`menu-item my-2 ${location.pathname === `/` ? 'active' : ''} ${isCompressed ? 'center' : ''}`}>
            <FontAwesomeIcon icon={faHouseChimney} className="icon" />
            {!isCompressed && <span>Inicio</span>}
          </li>
        </Link>
        {roles.map((role) => (
          <Link
            to={`/${formatRoleToUrl(role.nombre)}`}
            key={role.id}
            className="link-opcion"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={role.nombre}
          >
            <li
              className={`menu-item my-2 ${location.pathname === `/${formatRoleToUrl(role.nombre)}` ? 'active' : ''} ${isCompressed ? 'center' : ''}`}
            >
              <FontAwesomeIcon icon={getIconForRole(role.nombre)} className="icon" />
              {!isCompressed && <span>{role.nombre}</span>}
            </li>
          </Link>
        ))}

        {/* Contenedor para las opciones de configuración y salir */}
        <div className="menu-footer d-flex flex-column mt-auto">
          <Link to={'/configuracion'} className="link-opcion">
            <li className={`menu-item ${location.pathname === `/configuracion` ? 'active' : ''} ${isCompressed ? 'center' : ''}`}>
              <FontAwesomeIcon icon={faGear} className="icon" />
              {!isCompressed && <span>Configuracion</span>}
            </li>
          </Link>
          <Link onClick={cerrarSession} className="logout-btn link-opcion">
            <li className={`menu-item  ${isCompressed ? 'center' : ''}`}>
              <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
              {!isCompressed && <span>Salir</span>}
            </li>
          </Link>
        </div>
      </ul>
    </div>

  );
}
