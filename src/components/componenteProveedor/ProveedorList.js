import { useEffect, useState } from "react";
import axiosInstance from "../../api/AxiosInstance";
import ToastAlert from "../componenteToast/ToastAlert";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faEdit, faPlus, faPowerOff, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import customDataTableStyles from "../../css/estilosComponentesTable/DataTableStyles";

export function ProveedorList({ search, updateList }) {
    const [proveedores, setProveedores] = useState([]);
    const [filterProveedores, setFilterProveedores] = useState([]);

    // Define los colores y estilos condicionales
    const rowColors = ['#4caf50', '#f44336', '#2196f3', '#ff9800']; // Colores alternados
    const conditionalRowStyles = [
        {
            when: (row) => row,
            style: (row) => {
                const index = row.id % rowColors.length; // Alterna colores según el ID
                return {
                    borderLeftColor: rowColors[index],
                };
            },
        },
    ];

    // Función para obtener proveedores
    const getProveedores = async () => {
        try {
            const response = await axiosInstance.get('/proveedores/getProveedores');
            if (response.data.success) {
                setProveedores(response.data.proveedor);
                setFilterProveedores(response.data.proveedor);
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log('error de conexión');
        }
    };

    // Filtrar registros según búsqueda
    useEffect(() => {
        const result = proveedores.filter((proveedore) => {
            const { nombre, numero_documento, telefono, direccion, email } = proveedore;
            const searchLower = search.toLowerCase();
            return (
                (nombre && nombre.toLowerCase().includes(searchLower)) ||
                (numero_documento && numero_documento.toLowerCase().includes(searchLower)) ||
                (telefono && telefono.toLowerCase().includes(searchLower)) ||
                (direccion && direccion.toLowerCase().includes(searchLower)) ||
                (email && email.toLowerCase().includes(searchLower))
            );
        });
        setFilterProveedores(result);
    }, [search, proveedores]);

    // Llamar función para obtener proveedores al montar el componente
    useEffect(() => {
        getProveedores();
    }, []);

    // Define columnas
    const columns = [
        {
            name: 'Nombre',
            selector: (row) => row.nombre,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Ruc',
            selector: (row) => row.numero_documento,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Telefono',
            selector: (row) => row.telefono,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Email',
            selector: (row) => row.email,
            sortable: true,
            wrap: true,
        },
        {
            name: 'Direccion',
            selector: (row) => {
                const direccion = row.direccion
                    ? row.direccion
                        .toLowerCase()
                        .replace(/\b\w/g, (char) => char.toUpperCase())
                    : '';
                return <small>{direccion}</small>;
            },
            sortable: true,
        },
        {
            name: 'Acciones',
            cell: (row) => {
                const { estado } = row;
                return (
                    <div className="d-flex justify-content-around py-2">
                        {estado == 1 ? (
                            <>
                                <button className="btn-editar me-2">
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                <button className="btn-eliminar me-2">
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
            sortable: true,
            wrap: true,
        },
    ];

    return (
        <div>
            <DataTable
                className="tablaGeneral"
                columns={columns}
                data={filterProveedores}
                pagination
                responsive
                dense
                customStyles={customDataTableStyles}
                fixedHeader
                fixedHeaderScrollHeight="500px"
                striped={true}
                conditionalRowStyles={conditionalRowStyles} // Estilos condicionales aplicados aquí
                paginationComponentOptions={{
                    rowsPerPageText: 'Filas por página:',
                    rangeSeparatorText: 'de',
                    selectAllRowsItem: true,
                    selectAllRowsItemText: 'Todos',
                }}
            />
        </div>
    );
}
