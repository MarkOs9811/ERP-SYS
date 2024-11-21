
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component'; // Importamos el DataTable
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';


export function UsuariosList() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://erp-api.test/api/usuarios')
      .then((response) => {
        if (response.data.success) {
          setUsuarios(response.data.data);
        } else {
          setError('No se pudo obtener los usuarios');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Hubo un error al cargar los datos');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>{error}</p>;

  // Definir las columnas de la tabla
  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      width: '70px', // Ancho específico para la columna ID
      wrap: true, // Ajusta el contenido si excede el ancho
    },
    {
      name: 'Usuario',
      selector: row => row.email,
      sortable: true,
      minWidth: 'auto', // Establece un ancho mínimo
      wrap: true,
    },
    {
      name: 'Nombre y Apellidos',
      selector: row => (
        <div>
          <div>
            {row.empleado.persona.nombre} {row.empleado.persona.apellidos}
          </div>
          <small className='badge-user'>
            {row.empleado.persona.correo}
          </small>
        </div>
      ),
      sortable: true,
      minWidth: '250px', // Ancho mínimo para nombres largos
      wrap: true,
    },
    {
      name: 'Telefono',
      selector: row => row.empleado.persona.telefono,
      sortable: true,
      minWidth: 'auto', // Personaliza el ancho
      wrap: true,
    },
    {
      name: 'Documento de Identidad',
      selector: row => row.empleado && row.empleado.persona
        ? row.empleado.persona.documento_identidad
        : 'Documento no disponible',
      sortable: true,
      minWidth: 'auto',
      wrap: true,
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <button className="btn btn-outline-dark m-auto">
          <FontAwesomeIcon icon={faInfo} className="" />
        </button>
      ),
      ignoreRowClick: true, // Evita que estas celdas respondan a eventos de fila
      allowOverflow: true, // Evita que se corte contenido
      width: '115px',
    },
  ];

  return (
    
    <DataTable
      className="tablaGeneral"
      title="Lista de Usuarios"
      columns={columns}
      data={usuarios}
      pagination
      responsive
      dense // Reduce el tamaño vertical de las filas
      noTableHead={false} // Asegura que los encabezados se muestren
      fixedHeader // Hace que el encabezado sea fijo al hacer scroll
      fixedHeaderScrollHeight="500px" // Define la altura máxima del scroll
      subHeaderAlign="left"
      paginationComponentOptions={{
        rowsPerPageText: 'Filas por página:',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
      }}
    />
  
  );
}
