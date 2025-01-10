import React, { useEffect, useState } from "react";
import { faUtensilSpoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../css/estilosComponentesCategoriaPlatos/estilosCategoriaPlatos.css";
import axiosInstance from "../../../api/AxiosInstance";
import { useEstadoAsyn } from "../../../hooks/EstadoAsync";
import { capitalizeFirstLetter } from "../../../hooks/FirstLetterUp";

export function CategoriaPlatos() {
  const [categorias, setCategorias] = useState([]); // Estado para las categorías

  // Función para obtener las categorías
  const fetchCategorias = async () => {
    try {
      const response = await axiosInstance.get(
        "/gestionPlatos/getCategoriaTrue"
      );
      if (response.data?.success && Array.isArray(response.data?.data)) {
        setCategorias(response.data.data); // Ajustar según la estructura real
      } else {
        throw new Error("Error en la estructura de los datos recibidos");
      }
    } catch (err) {
      throw new Error("Error al cargar las categorías");
    }
  };

  // Hook personalizado para manejar la carga
  const { loading, error, execute } = useEstadoAsyn(fetchCategorias);

  // Ejecutar la carga al montar el componente
  useEffect(() => {
    execute(); // Ejecuta la función directamente sin dependencia
  }, []); // Se ejecuta solo una vez al montar

  return (
    <div className="categoria-platos-container">
      {/* Mensaje de carga */}
      {loading && <p>Cargando categorías...</p>}

      {/* Mensaje de error */}
      {error && !loading && <p className="error-message">{error}</p>}

      {/* Mostrar las categorías */}

      {categorias.map((categoria) => (
        <div key={categoria.id} className="categoria-plato-card">
          <div className="categoria-plato-icon">
            <img
              className="img-categoria"
              src={`/images/${categoria.nombre
                .toLowerCase() // Convierte a minúsculas
                .replace(/\s+/g, "-") // Reemplaza espacios por guiones
                .replace(/[^a-z0-9\-]/g, "")}.png`}
              alt={categoria.nombre}
              loading="lazy"
            />
          </div>
          <div className="categoria-plato-text">
            <p>{capitalizeFirstLetter(categoria.nombre)}</p>
          </div>
        </div>
      ))}

      {/* Mensaje cuando no hay categorías */}
      {!loading && !error && categorias.length === 0 && (
        <p>No se encontraron categorías disponibles.</p>
      )}
    </div>
  );
}
