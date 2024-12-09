import { Link, useLocation } from 'react-router-dom';
import '../css/NavegacionEstilos.css';

export function Navegacion() {
  const location = useLocation(); // Obtiene la ubicación actual
  const pathnames = location.pathname.split('/').filter((x) => x); // Divide la ruta en segmentos

  // Mapea las rutas a nombres amigables
  const routeNames = {
    '': 'Inicio',
    productos: 'Productos',
    registro: 'Registro',
    transferencia: 'Transferencia',
    solicitud: 'Solicitud',
    movimientos: 'Movimientos',
    kardex: 'Kardex',
    reportes: 'Reportes',
    ajustes: 'Ajustes',
  };

  return (
    <div className="card d-flex border-none rounded-0 p-3 shadow-sm">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb p-0 mb-0 d-flex">
          {pathnames.length === 0 ? (
            <li className="breadcrumb-item active" aria-current="page">
              <strong>{routeNames['']}</strong>
            </li>
          ) : (
            <>
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none text-primary">
                  <strong>{routeNames['']}</strong>
                </Link>
              </li>
              {pathnames.map((pathname, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                return isLast ? (
                  <li
                    key={to}
                    className="breadcrumb-item active"
                    aria-current="page"
                  >
                    <strong>{routeNames[pathname] || pathname}</strong>
                  </li>
                ) : (
                  <li key={to} className="breadcrumb-item">
                    <Link to={to} className="text-decoration-none text-primary">
                      <strong>{routeNames[pathname] || pathname}</strong>
                    </Link>
                  </li>
                );
              })}
            </>
          )}
        </ol>
      </nav>
    </div>
  );
}
