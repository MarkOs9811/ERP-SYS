import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faUser, faEnvelope, faCoins, faClock } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

export function UsuarioForm({ handleCloseModal }) {  // Desestructurando handleCloseModal de las props
  const [formData, setFormData] = useState({
    tipo_documento: 'DNI',
    numero_documento: '',
    nombres: '',
    apellidos: '',
    correo_electronico: '',
    area: '4',
    cargo: '7',
    salario: '',
    horario: 1,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://erp-api.test/api/storeUsuario', formData);
      
      toast.success('Usuario registrado exitosamente', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Cerrar el modal después del registro exitoso
      handleCloseModal();  // Usar handleCloseModal cuando se envíe el formulario

    } catch (error) {
      console.error('Error al enviar el formulario:', error);
  
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        let errorMessages = '';
        
        for (let field in errors) {
          errorMessages += `${errors[field].join(', ')}\n`;
        }
        toast.error(`${errorMessages}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Error al registrar el usuario', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const handleDocumentoChange = (e) => {
    const { value } = e.target;
    if (formData.tipo_documento === 'DNI' && value.length > 8) return;
    if (formData.tipo_documento === 'extranjeria' && value.length > 10) return;
    setFormData({ ...formData, numero_documento: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Tipo de documento */}
      <div className="mb-3">
        <div className="form-floating">
          <select id="tipo_documento" className="form-select" value={formData.tipo_documento} onChange={(e) => setFormData({ ...formData, tipo_documento: e.target.value })}>
            <option value="DNI">DNI</option>
            <option value="extranjeria">Carnet de Extranjería</option>
          </select>
          <label htmlFor="tipo_documento">Tipo de Documento</label>
        </div>
      </div>
  
      {/* Número de documento */}
      <div className="mb-3">
        <div className="form-floating">
          <input type="text" className="form-control" id="numero_documento" value={formData.numero_documento} onChange={handleDocumentoChange} maxLength={formData.tipo_documento === 'DNI' ? 8 : 10} />
          <label htmlFor="numero_documento"><FontAwesomeIcon icon={faIdCard} className="me-2" />Tipo Documento</label>
        </div>
      </div>
  
      {/* Nombres y Apellidos en la misma fila */}
      <div className="mb-3 row">
        <div className="col-md-6">
          <div className="form-floating">
            <input type="text" className="form-control" id="nombres" value={formData.nombres} onChange={(e) => setFormData({ ...formData, nombres: e.target.value })} />
            <label htmlFor="nombres"><FontAwesomeIcon icon={faUser} className="me-2" />Nombres</label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating">
            <input type="text" className="form-control" id="apellidos" value={formData.apellidos} onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })} />
            <label htmlFor="apellidos"><FontAwesomeIcon icon={faUser} className="me-2" />Apellidos</label>
          </div>
        </div>
      </div>
  
      {/* Correo electrónico */}
      <div className="mb-3">
        <div className="form-floating">
          <input type="email" className="form-control" id="correo_electronico" value={formData.correo_electronico} onChange={(e) => setFormData({ ...formData, correo_electronico: e.target.value })} />
          <label htmlFor="correo_electronico"><FontAwesomeIcon icon={faEnvelope} className="me-2" />Correo Electrónico</label>
        </div>
      </div>
  
      {/* Área */}
      <div className="mb-3">
        <div className="form-floating">
          <select id="area" className="form-select" value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })}>
            <option value="4">Administración</option>
            <option value="7">Almacén</option>
            <option value="11">Ventas</option>
          </select>
          <label htmlFor="area">Área</label>
        </div>
      </div>
  
      {/* Cargo */}
      <div className="mb-3">
        <div className="form-floating">
          <select id="cargo" className="form-select" value={formData.cargo} onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}>
            <option value="7">Administrador</option>
            <option value="14">Atención al Cliente</option>
            <option value="15">Almacén</option>
            <option value="16">Contador</option>
          </select>
          <label htmlFor="cargo">Cargo</label>
        </div>
      </div>
  
      {/* Salario */}
      <div className="mb-3">
        <div className="form-floating">
          <input type="number" className="form-control" id="salario" value={formData.salario} onChange={(e) => setFormData({ ...formData, salario: e.target.value })} min="0" step="0.01" />
          <label><FontAwesomeIcon icon={faCoins} className="me-2" />Salario</label>
        </div>
      </div>
  
      {/* Horario */}
      <div className="mb-3">
        <div className="form-floating">
          <input type="number" className="form-control" id="horario" value={formData.horario} onChange={(e) => setFormData({ ...formData, horario: e.target.value })} min="1" />
          <label><FontAwesomeIcon icon={faClock} className="me-2" />Horario</label>
        </div>
      </div>
  
      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
  );
  
}
