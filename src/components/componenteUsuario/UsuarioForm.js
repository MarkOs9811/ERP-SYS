// src/components/UsuarioForm.js
import React, { useState } from 'react';

export function UsuarioForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    documento_identidad: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    
      <form onSubmit={handleSubmit}>
            <h5>Registrar Usuario</h5>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="documento_identidad" className="form-label">Documento de Identidad</label>
              <input
                type="text"
                className="form-control"
                id="documento_identidad"
                value={formData.documento_identidad}
                onChange={(e) => setFormData({ ...formData, documento_identidad: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary">Guardar</button>
          </form>
    
  );
}
