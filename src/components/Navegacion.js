import { Link } from 'react-router-dom';
import '../css/NavegacionEstilos.css';

export function Navegacion() {
    return (
      <div className="border-0 py-1 px-3 my-2  d-flex ">
        <nav aria-label="breadcrumb p-0 m-0">
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
  