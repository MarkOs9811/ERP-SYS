import { Link } from 'react-router-dom';
import '../css/NavegacionEstilos.css';

export function Navegacion() {
    return (
      <div className="card border-0 p-4 my-3 shadow-sm rounded">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
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
  