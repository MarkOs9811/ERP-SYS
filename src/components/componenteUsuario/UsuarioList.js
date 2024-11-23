import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import {  faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { UsuarioEditar } from './UsuarioEditar';
import { Modal } from 'react-bootstrap'; 
import { ToastContainer } from 'react-toastify';


// LOS PROPS SON PARAMETROS QUE SE ESTA RECIEBIENDO EN ESTA FUNCTION COMO "SEARCH" Y "UPDATELIST"
export function UsuariosList({ search, updateList }) {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idUsuario, setIdUsuario] = useState(null);

 
  // Función para obtener usuarios de la API
  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://erp-api.test/api/usuarios');
      if (response.data.success) {
        setUsuarios(response.data.data);
        setFilteredUsuarios(response.data.data);
      } else {
        setError('No se pudo obtener los usuarios');
      }
    } catch (err) {
      setError('Hubo un error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  // Llamar a fetchUsuarios al cargar el componente o al actualizar updateList
  useEffect(() => {
    fetchUsuarios();
  }, [updateList]);


  // funcion efect para filtrar datos de la tabla
  useEffect(() => {
    const result = usuarios.filter((usuario) => {
      const { email, empleado } = usuario;
      const persona = empleado?.persona || {}; // Evita errores si empleado o persona no están definidos
      const { nombre, apellidos, telefono, documento_identidad } = persona;
  
      // Convierte el texto de búsqueda a minúsculas para comparación insensible a mayúsculas
      const searchLower = search.toLowerCase();
  
      // Filtra los usuarios basándose en los campos relevantes
      return (
        (email && email.toLowerCase().includes(searchLower)) || 
        (nombre && nombre.toLowerCase().includes(searchLower)) ||
        (apellidos && apellidos.toLowerCase().includes(searchLower)) ||
        (telefono && String(telefono).toLowerCase().includes(searchLower)) ||
        (documento_identidad && String(documento_identidad).toLowerCase().includes(searchLower))
      );
    });
  
    setFilteredUsuarios(result);
  }, [search, usuarios]);
  
  const handleOpenModalEdit = (id) => {
    setIdUsuario(id);
    setIsModalOpen(true);
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIdUsuario(null);
  };

  const handleUsuarioUpdated = () => {
    // Refresca la lista de usuarios
    fetchUsuarios();
  };

  
  

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>{error}</p>;

  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
      width: '70px',
      wrap: true,
    },
    {
      name: 'USUARIO',
      selector: (row) => row.email || 'No disponible',
      sortable: true,
      wrap: true,
    },
    {
      name: 'NOMBRE Y APELLIDOS',
      selector: (row) => (
        <div>
          <div>
            {row.empleado?.persona?.nombre || 'N/A'} {row.empleado?.persona?.apellidos || 'N/A'}
          </div>
          {row.empleado?.persona?.correo && (
            <small className="badge-user">{row.empleado.persona.correo}</small>
          )}
        </div>
      ),
      sortable: true,
      width: '250px',
      wrap: true,
    },
    {
      name: 'TELEFONO',
      selector: (row) => row.empleado?.persona?.telefono || 'No disponible',
      sortable: true,
      wrap: true,
    },
    {
      name: 'DOC. IDENTIDAD',
      selector: (row) =>
        row.empleado?.persona?.documento_identidad || 'Documento no disponible',
      sortable: true,
      wrap: true,
    },
    {
      name: 'ACCIONES',
      cell: (row) => {
        const { estado } = row;  
    
        return (
          <div className="d-flex justify-content-around">
            {estado === 1 ? (
             
              <>
                <button className=" btn-editar me-2" onClick={() => handleOpenModalEdit(row.id)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="btn-eliminar">
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </>
            ) : (
              
              <button className="btn btn-outline-success">
                <FontAwesomeIcon icon={faPowerOff} />
              </button>
            )}
          </div>
        );
      },
      ignoreRowClick: true,
      width: '115px',
    }
    
  ];

  return (
    <div>
      <DataTable
        className="tablaGeneral"
        columns={columns}
        data={filteredUsuarios}
        pagination
        responsive
        dense
        noTableHead={false}
        fixedHeader
        fixedHeaderScrollHeight="500px"
       
        paginationComponentOptions={{
          rowsPerPageText: 'Filas por página:',
          rangeSeparatorText: 'de',
          selectAllRowsItem: true,
          selectAllRowsItemText: 'Todos',
        }}
      />

      <ToastContainer />
      {/* // modal para editar un usuario */}
      <Modal show={isModalOpen} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Pasa handleCloseModal como prop a UsuarioForm */}
          <UsuarioEditar handleCloseModal={handleCloseModal} idUsuario={idUsuario} onUsuarioUpdated={handleUsuarioUpdated} />
        </Modal.Body>
      </Modal>
      </div>
  );
}
