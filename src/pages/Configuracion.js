import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';

export function Configuracion() {
  // Estado para la previsualización de la imagen
  const [logoPreview, setLogoPreview] = useState(null);

  // Configuración de React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Función para manejar el envío del formulario
  const onSubmit = (data) => {
    console.log('Datos del formulario', data);
    // Aquí va la lógica para enviar los datos al servidor
  };

  // Función para manejar la previsualización de la imagen
  const handleImageChange = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // Uso de react-dropzone para gestionar la carga de la imagen
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: handleImageChange,
  });

  return (
    <div className="row mt-4">
      <div className="col-md-12">
        <div className="card border-0 p-4 shadow-sm rounded">
          <h3 className="mb-4">Configuración de la Empresa</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="logo" className="form-label">Logo de la Empresa</label>
              <div {...getRootProps()} className="dropzone border p-4 text-center" style={{ cursor: 'pointer', position: 'relative' }}>
                <input {...getInputProps()} id="logo" name="logo" className="d-none" />
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Logo Previsualizado"
                    className="img-fluid mb-3"
                    style={{
                      maxWidth: '150px',
                      borderRadius: '8px',
                      border: '2px solid #ddd',
                    }}
                  />
                ) : (
                  <div>
                    <p className="text-muted">Haz clic o arrastra para cargar el logo</p>
                    <button type="button" className="btn btn-outline-primary mt-2">Seleccionar archivo</button>
                  </div>
                )}
              </div>
              <p className="text-danger">{errors.logo?.message}</p>
            </div>

            <div className="mb-3">
              <label htmlFor="ruc" className="form-label">RUC</label>
              <input
                type="text"
                id="ruc"
                className="form-control"
                {...register('ruc', { required: 'El RUC es obligatorio' })}
              />
              <p className="text-danger">{errors.ruc?.message}</p>
            </div>

            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre de la Empresa</label>
              <input
                type="text"
                id="nombre"
                className="form-control"
                {...register('nombre', { required: 'El nombre es obligatorio' })}
              />
              <p className="text-danger">{errors.nombre?.message}</p>
            </div>

            <div className="mb-3">
              <label htmlFor="correo" className="form-label">Correo Electrónico</label>
              <input
                type="email"
                id="correo"
                className="form-control"
                {...register('correo', {
                  required: 'El correo es obligatorio',
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                    message: 'Correo electrónico inválido',
                  },
                })}
              />
              <p className="text-danger">{errors.correo?.message}</p>
            </div>

            <div className="mb-3">
              <label htmlFor="numero" className="form-label">Número de Teléfono</label>
              <input
                type="tel"
                id="numero"
                className="form-control"
                {...register('numero', {
                  required: 'El número de teléfono es obligatorio',
                  pattern: {
                    value: /^[0-9]{9}$/,
                    message: 'Número de teléfono inválido',
                  },
                })}
              />
              <p className="text-danger">{errors.numero?.message}</p>
            </div>

            <div className="mb-3">
              <label htmlFor="direccion" className="form-label">Dirección</label>
              <input
                type="text"
                id="direccion"
                className="form-control"
                {...register('direccion', { required: 'La dirección es obligatoria' })}
              />
              <p className="text-danger">{errors.direccion?.message}</p>
            </div>

            <button type="submit" className="btn btn-primary w-100">Actualizar Datos</button>
          </form>
        </div>
      </div>
    </div>
  );
}
