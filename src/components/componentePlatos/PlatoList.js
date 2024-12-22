import {
  faPlus,
  faPowerOff,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";
import axiosInstance from "../../api/AxiosInstance";
import DataTable from "react-data-table-component";
import customDataTableStyles from "../../css/estilosComponentesTable/DataTableStyles";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useTooltips } from "../../hooks/UseToolTips";
import { PlatoEditar } from "./PlatoEdit";
import { Modal } from "react-bootstrap";

export function PlatoList({ search, upDateList }) {
  const [platosList, setPlatosList] = useState([]);
  const [filterPlatos, setFilterPlatos] = useState([]);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const getPlatos = async () => {
    try {
      const response = await axiosInstance.get("/gestionPlatos/getPlatos");
      if (response.data.success) {
        setPlatosList(response.data.platos);
        setFilterPlatos(response.data.platos);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [showModalEditar, setShowModalEditar] = useState(false);
  const [dataPlato, setDataPlato] = useState([]);

  const handleOpenEditar = (dataPlato) => {
    setShowModalEditar(true);
    setDataPlato(dataPlato);
  };

  const handleCloseEditarCat = () => {
    setShowModalEditar(false);
    setDataPlato([]);
    getPlatos();
  };

  // Filtrar registros según búsqueda
  useEffect(() => {
    const result = platosList.filter((plato) => {
      const { nombre, categoria, descripcion, precio } = plato;
      const searchLower = search.toLowerCase();
      return (
        (nombre && nombre.toLowerCase().includes(searchLower)) ||
        (categoria?.nombre &&
          categoria.nombre.toLowerCase().includes(searchLower)) ||
        (descripcion && descripcion.toLowerCase().includes(searchLower)) ||
        (precio && precio.includes(searchLower))
      );
    });
    setFilterPlatos(result);
  }, [search, platosList]);

  useEffect(() => {
    getPlatos();
  }, [upDateList]);

  const columns = [
    {
      name: "Foto",
      selector: (row) => (
        <img
          src={`${BASE_URL}/storage/${row.foto}`}
          alt="Foto del Plato"
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            borderRadius: "5px",
          }}
        />
      ),
      sortable: false, // No tiene sentido ordenar por imagen
      wrap: false,
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
      wrap: true,
    },
    {
      name: "Categoria",
      selector: (row) => row.categoria.nombre,
      sortable: true,
      wrap: true,
    },
    {
      name: "Descripcion",
      selector: (row) => row.descripcion,
      sortable: true,
      wrap: true,
    },
    {
      name: "Precio",
      selector: (row) => "S/." + row.precio,
      sortable: true,
      wrap: true,
    },
    {
      name: "Acciones",
      cell: (row) => {
        const { estado } = row;
        return (
          <div className="d-flex justify-content-around">
            {estado === 1 ? (
              <>
                <button
                  className=" btn-editar me-2"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Editar Plato"
                  onClick={() => handleOpenEditar(row)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>

                <button
                  className="btn-eliminar"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Eliminar Plato"
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </>
            ) : (
              <button
                className="btn btn-outline-success"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Activar Plato"
              >
                <FontAwesomeIcon icon={faPowerOff} />
              </button>
            )}
          </div>
        );
      },
      ignoreRowClick: true,
    },
  ];

  useTooltips(platosList);
  return (
    <div>
      <DataTable
        className="tablaGeneral"
        columns={columns}
        data={filterPlatos}
        pagination
        responsive
        dense
        customStyles={customDataTableStyles}
        fixedHeader
        fixedHeaderScrollHeight="500px"
        striped={true}
        // conditionalRowStyles={conditionalRowStyles} // Estilos condicionales aplicados aquí
        paginationComponentOptions={{
          rowsPerPageText: "Filas por página:",
          rangeSeparatorText: "de",
          selectAllRowsItem: true,
          selectAllRowsItemText: "Todos",
        }}
      />
      {/* // modal para editar un PLATO */}
      <Modal
        show={showModalEditar}
        onHide={handleCloseEditarCat}
        centered
        className="modal-sin-borde"
      >
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Plato</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Pasa handleCloseModal como prop a CATEGORIA */}
          <PlatoEditar
            handleCloseModal={handleCloseEditarCat}
            dataPlato={dataPlato}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
