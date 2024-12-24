import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/AxiosInstance";
import "../../css/EstilosPlatos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBackward,
  faBasketShopping,
  faFilter,
  faPlus,
  faSearch,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { capitalizeFirstLetter } from "../../hooks/FirstLetterUp";
import ToastAlert from "../componenteToast/ToastAlert";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, setMesaId } from "../../redux/pedidoSlice";
import {
  CheckmarkDoneOutline,
  RemoveOutline,
  TrashBinOutline,
  TrashOutline,
} from "react-ionicons";

export function Platos() {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pedido = useSelector((state) => state.pedido);
  const navigate = useNavigate();

  // Obtener productos desde la API
  const fetchProductos = async () => {
    dispatch(setMesaId(id));
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

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const habldeVolverMesas = () => {
    // Navegar a Platos.js con el id de la mesa como parámetro
    navigate(`/vender/ventasMesas`);
  };

  const handleAddPlatoPreventa = (producto) => {
    // Añadir el plato para la mesa actual
    dispatch(addItem({ ...producto, mesaId: id }));
  };

  const handleRemovePlatoPreventa = (productoId) => {
    // Eliminar el plato de la mesa actual
    dispatch(removeItem({ id: productoId, mesaId: id }));
  };

  if (loading) return <p>Cargando Platos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="row g-3 vh-60">
      <div className="col-md-12 ">
        <div className="card  shadow-sm p-3">
          <div className="d-flex align-items-center justify-content-between">
            {/* Botón de volver */}
            <button
              className="btn btn-outline-dark d-flex align-items-center"
              onClick={() => habldeVolverMesas()}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Volver
            </button>

            {/* Título de la card */}
            <h5 className="m-0 d-flex align-items-center">
              <FontAwesomeIcon
                icon={faUtensils}
                className="me-2 text-warning"
              />
              Platos para la mesa {id}
            </h5>
          </div>
        </div>
      </div>
      {/* Columna de la cuenta */}

      <div className="col-md-3 d-flex flex-column">
        <div className="card shadow-sm  flex-grow-1">
          {/* Título */}
          <div className="card-header p-3 d-flex justify-content-center align-items-center border-bottom">
            <h4 className="mb-0">Cuenta</h4>
          </div>
          <div className="card-body p-3">
            {/* Verificar si hay productos en la mesa actual */}
            {pedido.mesas[id] && pedido.mesas[id].items.length > 0 ? (
              <>
                {/* Tabla de productos */}
                <div className="table-responsive tabla-scroll">
                  <table className="table table-borderless table-sm">
                    <tbody>
                      {pedido.mesas[id].items.map((item) => (
                        <tr key={item.id} className="plato-row ">
                          <td className="d-flex justify-content-between align-items-center">
                            <div>
                              <span className="d-block fw-bold">
                                {item.nombre}
                              </span>
                              <small>
                                {item.cantidad} x S/.{" "}
                                {Number(item.precio).toFixed(2)}
                              </small>
                            </div>
                          </td>
                          <td className="text-right align-middle">
                            <span>
                              S/.{" "}
                              {Number(item.cantidad * item.precio).toFixed(2)}
                            </span>
                          </td>
                          <td className="align-middle">
                            <button
                              className="btn-sm eliminar-btn"
                              onClick={() => handleRemovePlatoPreventa(item.id)}
                            >
                              <RemoveOutline color={"auto"} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Total */}
                <div className="border-top pt-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="h5">Total</span>
                    <span className="h5 fw-bold text-success">
                      S/.{" "}
                      {pedido.mesas[id].items
                        .reduce(
                          (acc, item) => acc + item.cantidad * item.precio,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                  <small className="text-muted d-block text-end">
                    IGV: S/.{" "}
                    {(
                      pedido.mesas[id].items.reduce(
                        (acc, item) => acc + item.cantidad * item.precio,
                        0
                      ) * 0.18
                    ).toFixed(2)}
                  </small>
                </div>

                {/* Puntos de lealtad */}
                <div className="mt-3">
                  <div className="d-flex justify-content-between">
                    {/* Total de Pedidos */}
                    <div className="bg-light rounded p-2 text-center flex-fill mr-2">
                      <small>Total de Platos</small>
                      <h6 className="text-success mb-0">
                        {pedido.mesas[id].items.length}
                      </h6>
                    </div>
                    {/* Cantidad Total de Productos */}
                    <div className="bg-light rounded p-2 text-center flex-fill ml-2">
                      <small>Cantidad x Plato</small>
                      <h6 className="text-dark mb-0">
                        {pedido.mesas[id].items.reduce(
                          (acc, item) => acc + item.cantidad,
                          0
                        )}
                      </h6>
                    </div>
                  </div>
                </div>

                {/* Botones */}
                {/* <div className="mt-3 d-flex flex-wrap">
                <button className="btn btn-secondary btn-sm mr-2">
                  Reembolso
                </button>
                <button className="btn btn-secondary btn-sm mr-2">
                  Nota Cliente
                </button>
                <button className="btn btn-secondary btn-sm mr-2">
                  Ingresar Codigo
                </button>
              </div> */}
                {/* Botón de Realizar Pedido */}
                <div className="mt-3">
                  <button className=" btn-realizarPedido btn-block w-100 p-3">
                    <CheckmarkDoneOutline
                      color={"auto"}
                      height="30px"
                      width="30px"
                    />{" "}
                    Realizar Pedido
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center text-muted">
                No hay productos en esta mesa.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Columna de los productos */}
      <div className="col-md-9 d-flex flex-column ">
        <div className="card shadow-sm flex-grow-1">
          <div className="card-header d-flex align-items-center justify-content-between bg-white border-bottom py-3">
            <h4 className="mb-0 text-dark ">Platos</h4>
            <div className="d-flex align-items-center gap-2 w-80">
              {/* Botón para cambiar vista */}
              <button
                className="btn btn-primary rounded shadow-sm d-flex align-items-center justify-content-center"
                style={{ height: "38px", minWidth: "130px" }}
              >
                <FontAwesomeIcon icon={faBasketShopping} className="me-2" />
                <span>Inventario</span>
              </button>

              {/* Barra de búsqueda */}
              <div
                className="input-group rounded shadow-sm"
                style={{ flex: 1, height: "38px", width: "auto" }}
              >
                <span className="input-group-text bg-light  d-flex align-items-center">
                  <FontAwesomeIcon icon={faSearch} className="text-primary" />
                </span>
                <input
                  type="text"
                  className="form-control p-2"
                  placeholder="Buscar productos..."
                  style={{ fontSize: "0.9rem", width: "200px" }}
                />
              </div>

              {/* Botón para filtrar */}
              <button
                className="btn btn-outline-secondary rounded shadow-sm d-flex align-items-center justify-content-center"
                style={{ height: "38px", minWidth: "160px" }}
              >
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
                  className="float-left card-platillo  card p-0 mx-2 "
                >
                  <img
                    src={`${BASE_URL}/storage/${producto.foto}`}
                    alt={producto.nombre}
                    className="card-img-top"
                    style={{
                      maxWidth: "auto",
                      maxHeight: "80px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body">
                    <p className="nombre-plato mb-3">
                      {capitalizeFirstLetter(producto.nombre)}
                    </p>
                    <span className="rounded-pill p-1 card-text bg-warning fw-bold precioCard">
                      S/. {producto.precio}
                    </span>
                  </div>
                  <div className="card-footer border-0 w-100 p-1">
                    <button
                      type="button"
                      className="btn-añadir w-100 me-1"
                      onClick={() => handleAddPlatoPreventa(producto)}
                    >
                      <span className="me-2">
                        <FontAwesomeIcon icon={faPlus} />
                      </span>
                      Agregar
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
