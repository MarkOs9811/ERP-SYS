import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faUser, faEnvelope, faCoins, faClock, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import ToastAlert from '../componenteToast/ToastAlert';
import axiosInstance from '../../api/AxiosInstance';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';

export function UsuarioForm({ handleCloseModal }) {
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
    fotoPerfil: null, // Para manejar la imagen cargada
  });

  const [areas, setAreas] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [fotoPreview, setFotoPreview] = useState(null); // Previsualización de la imagen cargada

  // TRAYENDO DATOS DE LA DB (CARGO, AREA, HORARIO)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [areasRes, cargosRes, horariosRes] = await Promise.all([
          axios.get('http://erp-api.test/api/areas'),
          axios.get('http://erp-api.test/api/cargos'),
          axios.get('http://erp-api.test/api/horarios'),
        ]);
        setAreas(areasRes.data);
        setCargos(cargosRes.data);
        setHorarios(horariosRes.data);
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
    setFormData({ ...formData, cargo: selectedCargoId });

    if (selectedCargoId) {
      try {
        const response = await axios.get(`http://erp-api.test/api/getSalarioCargo/${selectedCargoId}`);
        setFormData({ ...formData, cargo: selectedCargoId, salario: response.data.salario });
      } catch (error) {
        console.error('Error al obtener el salario:', error);
      }
    } else {
      setFormData({ ...formData, salario: '' });
    }
  };

  // GUARDAR USUARIOS API
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post('/storeUsuario', formData);
      if (response.data.success) {
        ToastAlert('success', 'Usuario registrado correctamente');
        setTimeout(() => handleCloseModal(), 500);
      } else {
        ToastAlert('error', 'Ocurrió un error al registrar');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);

      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        let errorMessages = '';
        for (let field in errors) {
          errorMessages += `${errors[field].join(', ')}\n`;
        }
        ToastAlert('error', errorMessages.trim());
      } else {
        ToastAlert('error', 'Error al registrar el usuario');
      }
    }
  };

  // PARA MSOTRAR LA PREVISUALIZACION DE LA IMAGEN
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const objectUrl = URL.createObjectURL(file);
        setFotoPreview(objectUrl);
        setFormData({ ...formData, fotoPerfil: file }); // Guardar el archivo para enviarlo al servidor
      }
    },
  });

  // Manejar cambios en el documento
  const handleDocumentoChange = (e) => {
    const { value } = e.target;
    if (formData.tipo_documento === 'DNI' && value.length > 8) return;
    if (formData.tipo_documento === 'extranjeria' && value.length > 10) return;
    setFormData({ ...formData, numero_documento: value });
  };

  // Usando HOOKS FORM PARA VALIDAR
  const { register, reset, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit}>
      {/* Foto de perfil */}
      <div className="mb-3">
        <label htmlFor="fotoPerfil" className="form-label">Foto de Perfil</label>
        <div
          {...getRootProps()}
          className="dropzone border rounded p-4 text-center justify-center"
          style={{ cursor: 'pointer' }}
        >
          <div className='text-center d-flex w-50 mx-auto p-0'>
            {fotoPreview && (
              <img
                src={fotoPreview}
                alt="Foto Previsualizado"
                className="img-fluid mb-3 mx-auto"
                style={{
                  maxWidth: '150px',
                  borderRadius: '8px',
                  border: '2px solid #ddd',
                }}
              />
            )}
          </div>
          <input {...getInputProps()} id="fotoPerfil" name="fotoPerfil" className="d-none" />
          <button type="button" className="btn btn-outline-primary mt-2">
            Seleccionar archivo
          </button>
          {!fotoPreview && (
            <p className="text-muted mt-3">
              Haz clic o arrastra para cargar el fotoPerfil
            </p>
          )}
        </div>
      </div>

      {/* Tipo de documento */}
      <div className="mb-3">
        <div className="form-floating">
          <select
            id="tipo_documento"
            className="form-select"
            value={formData.tipo_documento}
            onChange={(e) => setFormData({ ...formData, tipo_documento: e.target.value })}
          >
            <option value="DNI">DNI</option>
            <option value="extranjeria">Carnet de Extranjería</option>
          </select>
          <label htmlFor="tipo_documento">Tipo de Documento</label>
        </div>
      </div>

      {/* Número de documento */}
      <div className="mb-3">
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="numero_documento"
            value={formData.numero_documento}
            onChange={handleDocumentoChange}
            maxLength={formData.tipo_documento === 'DNI' ? 8 : 10}
          />
          <label htmlFor="numero_documento"><FontAwesomeIcon icon={faIdCard} className="me-2" />Número de Documento</label>
        </div>
      </div>

      {/* Nombres y Apellidos */}
      <div className="mb-3 row">
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="nombres"
              value={formData.nombres}
              onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
            />
            <label htmlFor="nombres"><FontAwesomeIcon icon={faUser} className="me-2" />Nombres</label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="apellidos"
              value={formData.apellidos}
              onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
            />
            <label htmlFor="apellidos"><FontAwesomeIcon icon={faUser} className="me-2" />Apellidos</label>
          </div>
        </div>
      </div>

      {/* Correo electrónico */}
      <div className="mb-3">
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="correo_electronico"
            value={formData.correo_electronico}
            onChange={(e) => setFormData({ ...formData, correo_electronico: e.target.value })}
          />
          <label htmlFor="correo_electronico"><FontAwesomeIcon icon={faEnvelope} className="me-2" />Correo Electrónico</label>
        </div>
      </div>

      {/* Área */}
      <div className="mb-3">
        <div className="form-floating">
          <select
            id="area"
            className="form-select"
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          >
            <option value="">Seleccione Área</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>{area.nombre}</option>
            ))}
          </select>
          <label htmlFor="area"><FontAwesomeIcon icon={faBuilding} className="me-2" />Área</label>
        </div>
      </div>

      {/* Cargo */}
      <div className="mb-3">
        <div className="form-floating">
          <select
            id="cargo"
            className="form-select"
            value={formData.cargo}
            onChange={handleCargoChange}
          >
            <option value="">Seleccione Cargo</option>
            {cargos.map((cargo) => (
              <option key={cargo.id} value={cargo.id}>{cargo.nombre}</option>
            ))}
          </select>
          <label htmlFor="cargo"><FontAwesomeIcon icon={faCoins} className="me-2" />Cargo</label>
        </div>
      </div>

      {/* Salario */}
      <div className="mb-3">
        <div className="form-floating">
          <input
            type="number"
            className="form-control"
            id="salario"
            value={formData.salario}
            onChange={(e) => setFormData({ ...formData, salario: e.target.value })}
            disabled
          />
          <label htmlFor="salario"><FontAwesomeIcon icon={faCoins} className="me-2" />Salario</label>
        </div>
      </div>

      {/* Horario */}
      <div className="mb-3">
        <div className="form-floating">
          <select
            id="horario"
            className="form-select"
            value={formData.horario}
            onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
          >
            <option value="">Seleccione Horario</option>
            {horarios.map((horario) => (
              <option key={horario.id} value={horario.id}>{horario.horaEntrada}-{horario.horaSalida}</option>
            ))}
          </select>
          <label htmlFor="horario"><FontAwesomeIcon icon={faClock} className="me-2" />Horario</label>
        </div>
      </div>

      {/* Botón de Guardar */}
      <div className="d-flex justify-content-center mt-4">
        <button type="submit" className="btn btn-primary">Registrar Usuario</button>
      </div>
    </form>
  );
}
