import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://erp-api.test/api', // URL base para tus endpoints
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true, // Incluye cookies si tu API las usa
});

// Interceptor de solicitudes para agregar el token de autorización
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtiene el token del almacenamiento local
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Añade el token al header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuestas para manejar errores globalmente
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      alert('Sesión expirada. Por favor, inicia sesión nuevamente.');
      // Redirigir al login si es necesario
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
