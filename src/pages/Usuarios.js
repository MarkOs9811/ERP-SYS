// src/pages/Usuarios.js
import React from 'react';
import { UsuariosList } from '../components/componenteUsuario/UsuarioList';
import { UsuarioForm } from '../components/componenteUsuario/UsuarioForm';

export function Usuarios() {
  return (
      <div className='row m-4'>
        <div className='col-md-8'>
            <div className='card p-3 border-0'>
                <UsuariosList />  
            </div>
        </div>
        <div className='col-md-4'>
            <div className='card p-3  border-0'>
                <UsuarioForm />  
            </div>
        </div>
      </div>
  );
}
