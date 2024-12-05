import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/AxiosInstance";
import '../../css/EstilosMesas.css';

export function MesasList() {
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para navegar entre componentes

  const fetchMesas = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/vender/getMesas");
      if (response.data.success) {
        setMesas(response.data.mesas);
      } else {
        setError("No se pudo obtener las mesas");
      }
    } catch (err) {
      setError("Hubo un error al cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMesas();
  }, []);

  const handleMesaClick = (id) => {
    // Navegar a Platos.js con el id de la mesa como parámetro
    navigate(`/vender/platos/${id}`);
  };

  if (loading) return <p>Cargando mesas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Mesas</h3>
      <div className="mesas-container">
        {mesas.map((mesa) => (
          <button
            key={mesa.id}
            className="mesa-card m-3"
            onClick={() => handleMesaClick(mesa.id)} // Manejar el clic
          >
            <h5 className="mesa-numero">Mesa {mesa.numero}</h5>
            <p>
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: mesa.estado = 1 ? "#10ba82" : "red",
                }}
              ></span>{" "}
              {mesa.estado = 1 ? "Disponible" : "Ocupado"}
            </p>
            <p>Piso: {mesa.piso}</p>
            <p>Capacidad: {mesa.capacidad}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
