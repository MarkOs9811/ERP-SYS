import { Link } from 'react-router-dom';
import '../css/NavegacionEstilos.css';

export function Navegacion() {
    return (
      <div className="card  d-flex border-none rounded-0 p-3 shadow-sm">
        <nav aria-label="breadcrumb ">
          <ol className="breadcrumb p-0 mb-0 d-flex ">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none text-primary">
                <strong>Inicio</strong>
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Sección Actual
            </li>
          </ol>
        </nav>
      </div>

    );
  }
  