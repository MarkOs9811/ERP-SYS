import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/AxiosInstance";
import DataTable from "react-data-table-component";
import "../../css/EstilosPlatos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBackward, faUtensils } from "@fortawesome/free-solid-svg-icons";

export function Platos() {
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

  if (loading) return <p>Cargando Platos...</p>;
  if (error) return <p>{error}</p>;

  const habldeVolverMesas = () => {
    // Navegar a Platos.js con el id de la mesa como parámetro
    navigate(`/vender/`);
  };

  const columns = [
    {
      name: "",
      cell: () => (
        <div className="row platosTabla">
          {currentProducts.map((producto) => (
            <div
              key={producto.id}
              className="col-md-3 col-sm-6 my-2 d-flex align-items-stretch" // Asegura altura uniforme
            >
              <div className="card w-100"> {/* Ajusta el ancho completo */}
                <img
                  src={producto.stock} // Cambia si el campo no es correcto
                  alt={producto.nombre}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text">Precio: S/. {producto.precio}</p>
                  <button className="btn btn-primary btn-sm">Agregar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];
  

  return (
    
      <div className="row  vh-auto">
        <div className="col-md-12 mb-3">
        <div className="card p-3">
            <div className="d-flex align-items-center justify-content-between">
                {/* Botón de volver */}
                <button className="btn btn-outline-dark d-flex align-items-center" onClick={() => habldeVolverMesas()}>
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Volver
                </button>

                {/* Título de la card */}
                <h5 className="m-0 d-flex align-items-center">
                <FontAwesomeIcon icon={faUtensils} className="me-2 text-warning" />
                Platos para la mesa {id}
                </h5>
            </div>
            </div>

        </div>
        {/* Columna de la cuenta */}
        <div className="col-md-3  d-flex flex-column">
          <div className="card p-3 flex-grow-1">
            <h4>Cuenta</h4>
            <ul>
              <li>Plato 1: $10</li>
              <li>Plato 2: $15</li>
              <li>Total: $25</li>
            </ul>
          </div>
        </div>

        {/* Columna de los productos */}
        <div className="col-md-9 d-flex flex-column">
          <div className="card p-3 flex-grow-1 ">
            <h4>Productos Disponibles</h4>
            <div className="datatable-container">
              <DataTable
                columns={columns}
                data={[{ id: "grilla" }]} // Fake row para evitar conflictos con DataTable
                pagination
                paginationServer
                fixedHeaderScrollHeight="800px"
                striped={true}
                paginationTotalRows={productos.length}
                paginationRowsPerPageOptions={[4, 8, 12]}
                onChangePage={(page) => setCurrentPage(page)}
                onChangeRowsPerPage={(newRowsPerPage) =>
                  setRowsPerPage(newRowsPerPage)
                }
                responsive
              />
            </div>
          </div>
        </div>
      </div>
  );
}
