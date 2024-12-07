import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTooltips } from '../hooks/UseToolTips';
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
  faPlateWheat,
  faTruckFast,
} from '@fortawesome/free-solid-svg-icons';
import { faAddressCard, faIdBadge, faCalendarAlt } from '@fortawesome/free-regular-svg-icons';

import axiosInstance from '../api/AxiosInstance';

export function SideBar({ isCompressed }) {
  const location = useLocation();
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const miEmpresa = JSON.parse(localStorage.getItem('miEmpresa')) || {};
  const fotoEmpresa = miEmpresa.logo ? `${BASE_URL}/storage/${miEmpresa.logo}` : null;
  const roles = JSON.parse(localStorage.getItem('roles')) || [];

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
    platos: faPlateWheat,
    'rr-hh': faIdBadge,
    finanzas: faArrowTrendUp,
    'areas-y-cargos': faBuilding,
    configuracion: faCogs,
  };

  const getIconForRole = (roleName) => {
    const roleKey = roleName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/\./g, '-')
      .trim();
    return icons[roleKey] || faHome;
  };

  const cerrarSession = async () => {
    try {
      await axiosInstance.post('/logout', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('roles');
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const formatRoleToUrl = (roleName) => {
    return roleName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/\./g, '-');
  };

  const capitalizeWords = (string) => {
    return string
      ? string.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      : '';
  };

  // Llama al hook para inicializar los tooltips
  useTooltips(roles);

  return (
    <div className={`sidebar ${isCompressed ? 'compressed' : ''}`}>
      <div className="sidebar-header">
        {fotoEmpresa && (
          <img
            src={fotoEmpresa}
            alt="logo empresa"
            className="img-fluid"
            style={{ maxWidth: '60px', borderRadius: '50%', marginLeft: '10px' }}
          />
        )}
        {!isCompressed && <span className="header-title">{capitalizeWords(miEmpresa.nombre)}</span>}
      </div>
      <hr className="mx-3 text-secondary" />
      <ul className="menu-list">
        <Link to={`/`} className="link-opcion" key="Inicio" data-bs-toggle="tooltip" data-bs-placement="right" title="Inicio">
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
              className={`menu-item my-2 ${
                location.pathname.startsWith(`/${formatRoleToUrl(role.nombre)}`) ? 'active' : ''
              } ${isCompressed ? 'center' : ''}`}
            >
              <FontAwesomeIcon icon={getIconForRole(role.nombre)} className="icon" />
              {!isCompressed && <span>{role.nombre}</span>}
            </li>
          </Link>
        ))}
        <div className="menu-footer d-flex flex-column mt-auto">
          <Link to={'/configuracion'} className="link-opcion">
            <li className={`menu-item ${location.pathname === `/configuracion` ? 'active' : ''} ${isCompressed ? 'center' : ''}`}>
              <FontAwesomeIcon icon={faGear} className="icon" />
              {!isCompressed && <span>Configuración</span>}
            </li>
          </Link>
          <Link onClick={cerrarSession} className="logout-btn link-opcion">
            <li className={`menu-item ${isCompressed ? 'center' : ''}`}>
              <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
              {!isCompressed && <span>Salir</span>}
            </li>
          </Link>
        </div>
      </ul>
    </div>
  );
}
