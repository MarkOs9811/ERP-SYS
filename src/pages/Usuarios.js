import React, { useState } from 'react';
import { UsuariosList } from '../components/componenteUsuario/UsuarioList';
import { UsuarioForm } from '../components/componenteUsuario/UsuarioForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';  // Importamos el Modal de React-Bootstrap
import { ToastContainer } from 'react-toastify';

export function Usuarios() {
  const [showModal, setShowModal] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const [search, setSearch] = useState('');

  // Función para abrir el modal
  const handleOpenModal = () => setShowModal(true);

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setUpdateList(prev => !prev);
  };

  return (
    <div className='row m-4'>
      <div className='col-md-12'>
        <div className='card border-0'>
          <div className="card-header d-flex justify-content-between align-items-center">
            <div className="m-2">
              <h4 className="card-title mb-0">Lista de Usuarios</h4>
            </div>

            <div className="d-flex align-items-center">
              <div className="d-flex">
                <input type="text" placeholder="Buscar..." className="form-control"  value={search}
                  onChange={(e) => setSearch(e.target.value)} />
                  <button className="btn ms-2" onClick={handleOpenModal}>
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                  </button>
              </div>
              
            </div>
          </div>
          <div className='card-body'>
            <UsuariosList search={search} updateList={updateList} />
          </div>
        </div>
      </div>

      {/* Modal para agregar usuario*/}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Pasa handleCloseModal como prop a UsuarioForm */}
          <UsuarioForm handleCloseModal={handleCloseModal} />
        </Modal.Body>
      </Modal>
      
      <ToastContainer />
    </div>
  );
}
