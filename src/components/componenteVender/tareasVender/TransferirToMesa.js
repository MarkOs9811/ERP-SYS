import React, { useState } from "react";
import {
  ArrowForwardCircleOutline,
  ArrowRedoOutline,
  CloseCircleOutline,
} from "react-ionicons";

function TransferirMesas({
  show,
  handleCloseModal,
  handleConfirmarTransferencia,
  mesaOrigen,
  setMesaOrigen,
  mesaDestino,
  setMesaDestino,
}) {
  if (!show) return null; // No renderizar si el modal no debe mostrarse.

  return (
    <div className="modal-overlay m-0">
      <div className="contenido-model bg-white p-4 rounded-3 shadow-lg">
        {/* Cabecera del Modal */}
        <div className="modal-header d-flex justify-content-between align-items-center">
          <h3 className="text-center mb-4">Transferir Pedidos</h3>
          <button className="btn ms-auto" onClick={handleCloseModal}>
            <CloseCircleOutline
              color="#007bff"
              width={"40px"}
              height={"40px"}
            />
          </button>
        </div>

        {/* Mesa Origen */}
        <div className="form-floating mb-2">
          <select
            id="mesaOrigen"
            className="form-select"
            value={mesaOrigen}
            onChange={(e) => setMesaOrigen(e.target.value)}
            disabled // Deshabilitado porque ya se establece al idMesa
          >
            <option value="">Elige una mesa</option>
            <option value="1">Mesa 1</option>
            <option value="2">Mesa 2</option>
            <option value="3">Mesa 3</option>
            <option value="4">Mesa 4</option>
            <option value="5">Mesa 5</option>
          </select>
          <label htmlFor="mesaOrigen" className="form-label">
            Mesa Origen
          </label>
        </div>

        {/* Icono de flecha entre las mesas */}

        {/* Mesa Destino */}
        <div className="form-floating">
          <select
            id="mesaDestino"
            className="form-select"
            value={mesaDestino}
            onChange={(e) => setMesaDestino(e.target.value)}
          >
            <option value="">Elige una mesa</option>
            <option value="1">Mesa 1</option>
            <option value="2">Mesa 2</option>
            <option value="3">Mesa 3</option>
            <option value="4">Mesa 4</option>
            <option value="5">Mesa 5</option>
          </select>
          <label htmlFor="mesaDestino" className="form-label">
            Mesa Destino
          </label>
        </div>

        {/* Botón de Confirmar */}
        <div className="text-center mt-4">
          <button
            className="btn btn-primary w-100 p-3"
            onClick={handleConfirmarTransferencia}
          >
            Confirmar Transferencia
            <ArrowRedoOutline
              color="white"
              style={{ fontSize: "20px", marginLeft: "8px" }}
            />
          </button>
        </div>

        {/* Botón de Cancelar */}
        <div className="text-center mt-3">
          <button
            className="btn btn-secondary w-100 p-3"
            onClick={handleCloseModal}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransferirMesas;
