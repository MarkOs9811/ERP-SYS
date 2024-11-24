import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faUser, faEnvelope, faCoins, faClock } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import ToastAlert from '../componenteToast/ToastAlert';

export function UsuarioForm({handleCloseModal}) {  // Desestructurando handleCloseModal de las props

  const [formData, setFormData] = useState({
    tipo_documento: 'DNI',
    numero_documento: '',
    nombres: '',
    apellidos: '',
    correo_electronico: '',
    area: '',
    cargo: '',
    salario: '',
    horario: '',
  });

  const [areas, setAreas] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [horarios, setHorarios] = useState([]);

  // TRAYENDO DATOS DE MI DB CARGO,AREA, Y HORARIO
  useEffect(() => {
    // Función para cargar datos de la API
    const fetchData = async () => {
      try {
        const [areasRes, cargosRes, horariosRes] = await Promise.all([
          axios.get('http://erp-api.test/api/areas'), // Endpoint para áreas
          axios.get('http://erp-api.test/api/cargos'), // Endpoint para cargos
          axios.get('http://erp-api.test/api/horarios'), // Endpoint para horarios
        ]);

        setAreas(areasRes.data); // Guardar las áreas
        setCargos(cargosRes.data); // Guardar los cargos
        setHorarios(horariosRes.data); // Guardar los horarios

      } catch (error) {
        console.error('Error al cargar los datos:', error);

        toast.error('Error al cargar datos para el formulario', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    fetchData();
  }, []); 

  // Manejar el cambio del cargo y consultar el salario
  const handleCargoChange = async (e) => {
    const selectedCargoId = e.target.value;
    setFormData({ ...formData, cargo: selectedCargoId }); // Actualizar el cargo en el estado

    if (selectedCargoId) {
      try {
        // Consultar el salario del cargo seleccionado
        const response = await axios.get(`http://erp-api.test/api/getSalarioCargo/${selectedCargoId}`);
        setFormData({ ...formData, cargo: selectedCargoId, salario: response.data.salario });
      } catch (error) {
        console.error("Error al obtener el salario:", error);
      }
    } else {
      // Si no hay cargo seleccionado, limpia el salario
      setFormData({ ...formData, salario: "" });
    }
  };

  // GUARDAR USUARIOS API
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://erp-api.test/api/storeUsuario', formData);
         
      if (response.data.success) { 
          ToastAlert("success", "Usuario registrado correctamente");
          setTimeout(() => handleCloseModal(), 500);
      } else {
          ToastAlert("error", "Ocurrió un error al registrar");
      }
    

    } catch (error) {
      console.error('Error al enviar el formulario:', error);
  
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        let errorMessages = '';
        
        for (let field in errors) {
          errorMessages += `${errors[field].join(', ')}\n`;
        }
        ToastAlert("error", errorMessages.trim());

      } else {
         ToastAlert("error", "Error al registrar el usuario");
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
            <option value="" disabled>Seleccione un área</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>{area.nombre}</option>
            ))}
          </select>
          <label htmlFor="area">Área</label>
        </div>
      </div>
  
      {/* Cargo */}
      <div className="mb-3">
        <div className="form-floating">
            <select id="cargo" className="form-select" value={formData.cargo} onChange={handleCargoChange} >
                <option value="" disabled>Seleccione un cargo</option>
                {cargos.map((cargo) => (
                  <option key={cargo.id} value={cargo.id}>{cargo.nombre}</option>
                ))}
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
          <select id="horario" className="form-select" value={formData.horario} onChange={(e) => setFormData({ ...formData, horario: e.target.value })}>
            <option value="" disabled>Seleccione un horario</option>
            {horarios.map((horario) => (
              <option key={horario.id} value={horario.id}>{horario.horaEntrada} - {horario.horaSalida}</option>
            ))}
          </select>
          <label htmlFor="horario"><FontAwesomeIcon icon={faClock} className="me-2" />Horario</label>
        </div>
      </div>
  
      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
  );
  
}
