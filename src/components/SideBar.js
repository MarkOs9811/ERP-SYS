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
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const miEmpresa = JSON.parse(localStorage.getItem('miEmpresa')); // Obtener y convertir JSON a objeto

  const fotoEmpresa = `${BASE_URL}/storage/${miEmpresa.logo}`;
  if (miEmpresa && miEmpresa.logo) { 
    console.log(fotoEmpresa); // Salida: BASE_URL/storage/imagenes/logo.png
  } else {
    console.error('El objeto miEmpresa no contiene el campo logo o no existe.');
  }
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
  const capitalizeWords = (string) => {
    if (!string) return ''; // Si el valor es nulo o vacío
    return string
      .toLowerCase() // Convierte todo a minúsculas
      .split(' ') // Divide la cadena en palabras
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza la primera letra de cada palabra
      .join(' '); // Une las palabras de nuevo en una cadena
  };

  return (
    <div className={`sidebar ${isCompressed ? 'compressed' : ''}`}>
      <div className="sidebar-header ">
        {fotoEmpresa && (
            <img
              src={fotoEmpresa}
              alt="logo empresa"
              className="img-fluid "
              style={{ maxWidth: '60px', borderRadius: '50%', marginLeft: '10px' }}
            />
        )}
        {!isCompressed && <span className="header-title">{capitalizeWords(miEmpresa.nombre)}</span>}
      </div>
      <hr className='mx-3 text-secondary'></hr>
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
              className={`menu-item my-2 ${location.pathname.startsWith(`/${formatRoleToUrl(role.nombre)}`) ? 'active' : ''} ${isCompressed ? 'center' : ''}`}
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
