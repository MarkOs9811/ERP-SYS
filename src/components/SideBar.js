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

  const customOrder = [
    'ventas',
    'platos',
    'vender',
    'almacen',
    'proveedores',
    'compras',
    'usuarios',
    'finanzas',
    'rr-hh',
    'areas-y-cargos',
    'configuracion',
  ];

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

  const orderedRoles = roles.sort((a, b) => {
    const indexA = customOrder.indexOf(a.nombre.toLowerCase());
    const indexB = customOrder.indexOf(b.nombre.toLowerCase());
    return (indexA !== -1 ? indexA : Infinity) - (indexB !== -1 ? indexB : Infinity);
  });

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
        <div className="accordion border-0 rounded-none" id="main-accordion">
          {orderedRoles.map((role) => {
            const roleUrl = formatRoleToUrl(role.nombre);
            const isActive = location.pathname.startsWith(`/${roleUrl}`);
            const icon = getIconForRole(role.nombre);
            const uniqueId = role.nombre.replace(/\s+/g, '-').toLowerCase(); // Identificador único para acordeón

            if (['rr.hh', 'finanzas'].includes(role.nombre.toLowerCase())) {
              return (
                <div className="accordion-item border-0 rounded-none" key={role.id}>
                  <h2 className="accordion-header" id={`${uniqueId}-heading`}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${uniqueId}-collapse`}
                      aria-expanded="false"
                      aria-controls={`${uniqueId}-collapse`}
                    >
                      <FontAwesomeIcon icon={icon} className="icon" />
                      {!isCompressed && <span className="ms-2">{role.nombre}</span>}
                    </button>
                  </h2>
                  <div
                    id={`${uniqueId}-collapse`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`${uniqueId}-heading`}
                    data-bs-parent="#main-accordion"
                  >
                    <div className="accordion-body p-0">
                      <ul className="submenu-list">
                        {role.nombre.toLowerCase() === 'rr.hh' && (
                          <>
                          <li className="submenu-item"><Link to="/planilla">Planilla</Link></li>
                          <li className="submenu-item"><Link to="/ingreso-a-planilla">Ingreso a Planilla</Link></li>
                          <li className="submenu-item"><Link to="/asistencia">Asistencia</Link></li>
                          <li className="submenu-item"><Link to="/horas-extras">Horas Extras</Link></li>
                          <li className="submenu-item"><Link to="/adelanto-sueldo">Adelanto de Sueldo</Link></li>
                          <li className="submenu-item"><Link to="/vacaciones">Vacaciones</Link></li>
                          <li className="submenu-item"><Link to="/reportes">Reportes</Link></li>
                          <li className="submenu-item"><Link to="/ajustes">Ajustes</Link></li>
                          </>
                        )}
                        {role.nombre.toLowerCase() === 'finanzas' && (
                          <>
                            <li className="submenu-item"><Link to="/informes-financieros">Informes Financieros</Link></li>
                            <li className="submenu-item"><Link to="/libro-diario">Libro Diario</Link></li>
                            <li className="submenu-item"><Link to="/libro-mayor">Libro Mayor</Link></li>
                            <li className="submenu-item"><Link to="/cuentas-por-cobrar">Cuentas por Cobrar</Link></li>
                            <li className="submenu-item"><Link to="/cuentas-por-pagar">Cuentas por Pagar</Link></li>
                            <li className="submenu-item"><Link to="/presupuestacion">Presupuestación</Link></li>
                            <li className="submenu-item"><Link to="/firmar-solicitud">Firmar Solicitud</Link></li>
                            <li className="submenu-item"><Link to="/ajustes">Ajustes</Link></li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                to={`/${roleUrl}`}
                key={role.id}
                className="link-opcion"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                title={role.nombre}
              >
                <li className={`menu-item my-2 ${isActive ? 'active' : ''} ${isCompressed ? 'center' : ''}`}>
                  <FontAwesomeIcon icon={icon} className="icon" />
                  {!isCompressed && <span>{role.nombre}</span>}
                </li>
              </Link>
            );
          })}
        </div>

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
