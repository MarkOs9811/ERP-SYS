import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Importa axios
import '../css/EstilosLogin.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Realiza la solicitud de inicio de sesión con axios
      const response = await axios.post('http://erp-api.test/api/login', {
        email,
        password
      });

      // Si la respuesta es exitosa, guarda el token en localStorage
      if (response.data.token)
         {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/');

        } else {
            setError('Error en las credenciales o en la respuesta del servidor');
        }
    } catch (err) {
      // Maneja errores de red o de servidor
      setError(err.response ? err.response.data.message : 'Error al conectar con el servidor');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Iniciar Sesión</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};
