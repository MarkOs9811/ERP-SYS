import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/AxiosInstance";
import DataTable from "react-data-table-component";
import "../../css/EstilosPlatos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBackward, faBasketShopping, faBox, faFilter, faPlus, faSearch, faUtensils } from "@fortawesome/free-solid-svg-icons";
import {capitalizeFirstLetter} from "../../hooks/FirstLetterUp";
import ToastAlert from "../componenteToast/ToastAlert";

export function Llevar() {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8); // Ajusta el número de productos por página

  const navigate = useNavigate();


  // Obtener productos desde la API
  const fetchProductos = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/vender/getPlatos");
      if (response.data.success) {
        setProductos(response.data.productos);
      } else {
        setError("No se pudieron obtener los productos.");
      }
    } catch (err) {
      setError("Hubo un error al cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, [id]);

  // Calcular los productos que se muestran en la página actual
  const indexOfLastProduct = currentPage * rowsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - rowsPerPage;
  const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  if (loading) return <p>Cargando Platos...</p>;
  if (error) return <p>{error}</p>;

  

  const handleAddPlatoPreventa = async (id) => {
    try {
        // Envía el ID como parte de la URL
        const response = await axiosInstance.get(`/vender/addPlatosPreVenta/${id}`);
        
        if (response.data.success) {
            alert('Agregado a preventa');
        } else {
            ToastAlert('error', response.data.message);
        }
    } catch (error) {
        ToastAlert('error', 'Error de conexión');
    }
};

  return (
      <div className="row g-3">
        
        {/* Columna de la cuenta */}
        <div className="col-md-3 d-flex flex-column ">
          <div className="card  shadow-sm p-3 flex-grow-1">
            <h4>Cuenta</h4>
            <ul>
              <li>Plato 1: $10</li>
              <li>Plato 2: $15</li>
              <li>Total: $25</li>
            </ul>
          </div>
        </div>

        {/* Columna de los productos */}
        <div className="col-md-9 d-flex flex-column p-0">
            <div className="card shadow-sm  flex-grow-1">
                <div className="card-header d-flex align-items-center justify-content-between bg-white border-bottom py-3">
                    <h4 className="mb-0 text-dark ">Platos</h4>

                    <div className="d-flex align-items-center gap-3 w-50">
                        {/* Botón para cambiar vista */}
                        <button className="btn btn-primary rounded shadow-sm d-flex align-items-center justify-content-center" style={{ height: '38px', minWidth: '130px' }}>
                            <FontAwesomeIcon icon={faBasketShopping} className="me-2"/>
                            <span>Inventario</span>
                        </button>

                        {/* Barra de búsqueda */}
                        <div className="input-group rounded shadow-sm" style={{ flex: 1, height: '38px' }}>
                            <span className="input-group-text bg-light  d-flex align-items-center">
                                <FontAwesomeIcon icon={faSearch} className="text-primary" />
                            </span>
                            <input 
                                type="text" 
                                className="form-control p-2" 
                                placeholder="Buscar productos..."
                                style={{ fontSize: '0.9rem' }}
                            />
                        </div>

                        {/* Botón para filtrar */}
                        <button className="btn btn-outline-secondary rounded shadow-sm d-flex align-items-center justify-content-center" style={{ height: '38px', minWidth: '160px' }}>
                            <FontAwesomeIcon icon={faFilter} className=" me-2" />
                            <span>Categoría</span>
                        </button>
                    </div>
                </div>



                <div className="card-body ">
                    <div className="row g-3 justify-content-start contenedor-platos">
                        {productos.map((producto) => (
                            <button
                                type="button"
                                key={producto.id}
                                className="float-left col-md-2 card-platillo shadow-sm  card p-0 mx-2 "
                                style={{ maxWidth: '300px', minHeight:'180px'}}s
                            >
                                <img
                                    src={`${BASE_URL}/storage/${producto.foto}`}
                                    alt={producto.nombre}
                                    className="card-img-top"
                                    style={{ maxWidth: 'auto', maxHeight: '80px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    <p className="nombre-plato mb-3">{capitalizeFirstLetter(producto.nombre)}</p>
                                    <span className="rounded-pill p-1 card-text bg-warning fw-bold precioCard">
                                        S/. {producto.precio}
                                    </span>
                                </div>
                                <div className="card-footer border-0 w-100 p-1">
                                    <button type="button" className="btn-añadir w-100 me-1" onClick={()=> handleAddPlatoPreventa(producto.id)}>
                                        <span className="me-2"><FontAwesomeIcon icon={faPlus} /></span>Agregar
                                    </button>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
  );
}
