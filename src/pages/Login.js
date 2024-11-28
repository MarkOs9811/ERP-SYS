import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';  // Importamos react-hook-form
import '../css/EstilosLogin.css';
import ToastAlert from '../components/componenteToast/ToastAlert';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import { faUser,faEye,faEyeSlash } from '@fortawesome/free-regular-svg-icons';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Inicializamos useForm
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    if (errors.email || errors.password) return; // Verifica si hay errores
    setLoading(true);
    try {
      const response = await axios.post('http://erp-api.test/api/login', {
        email: data.email,
        password: data.password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('roles', JSON.stringify(response.data.roles));
        ToastAlert('success', 'Inicio de sesión exitoso');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        ToastAlert('error', 'Credenciales incorrectas');
      }
    } catch (err) {
      ToastAlert('error', err.response ? err.response.data.message : 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid login-container p-0">
      <div className="row w-100 p-0 m-0">
        <div className="col-md-8 login-left p-0">
          <div className="overlay">
            <h1>Fire Wok</h1>
          </div>
        </div>

        <div className="col-md-4 login-right p-5">
          <ToastContainer />
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <h2 className="text-center">Iniciar Sesión</h2>
            
            <div className="mb-4">
              <div className="form-floating mb-4 position-relative">
                <input
                  type="text"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  {...register('email', {
                    required: 'El nombre de usuario es obligatorio',
                    minLength: {
                      value: 3,
                      message: 'El nombre de usuario debe tener al menos 3 caracteres'
                    }
                  })}
                  placeholder=" "
                />
                <label><FontAwesomeIcon icon={faUser} /> Usuario</label>
                {errors.email && (
                  <div className="invalid-feedback d-flex align-items-center">
                    <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />
                    {errors.email.message}
                  </div>
                )}
              </div>

              <div className="form-floating position-relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  {...register('password', {
                    required: 'La contraseña es obligatoria',
                    minLength: {
                      value: 3,
                      message: 'La contraseña debe tener al menos 3 caracteres'
                    }
                  })}
                  placeholder=" "
                />
                <label><FontAwesomeIcon icon={faUnlockKeyhole} /> Contraseña</label>
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer' }}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-secondary" />
                </span>
                {errors.password && (
                  <div className="invalid-feedback d-flex align-items-center">
                    <FontAwesomeIcon icon={faExclamationCircle} className="me-2" />
                    {errors.password.message}
                  </div>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-center align-items-center w-100 m-auto">
              <button type="submit" className="login-form button" disabled={loading}>
                {loading ? 'Iniciando sesión...' : 'Ingresar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
