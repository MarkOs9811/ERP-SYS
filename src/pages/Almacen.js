import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; 
import axios from 'axios';
import { AlmacenList } from '../components/componentsAlmacen/AlmacenList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../css/EstilosAlmacen.css';



export function Almacen(){

    const [updateList, setUpdateList] = useState(false);
    const [search,setSearch] = useState('');
    
    const handleCloseModal = () => {
        setUpdateList(prev => !prev);
      };

    return(
        <div className="row">
            <div className='col-md-12 '>
                <div className='card border-0'>
                <div className="card-header d-flex justify-content-between align-items-center">
                    <div className="m-2">
                    <h4 className="card-title mb-0 titulo-card-especial">Almacen</h4>
                    </div>

                    <div className="d-flex align-items-center">
                    <div className="d-flex">
                        <input type="text" placeholder="Buscar..." className="form-control"  value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                        <button className="btn ms-2" >
                            <FontAwesomeIcon icon={faPlus} className="icon" />
                        </button>
                    </div>
                    
                    </div>
                </div>
                <div className='card-body cuerpo-tabla p-0' >
                    <AlmacenList search={search} updateList={updateList} />
                </div>
                </div>
            </div>
        </div>
    );
}