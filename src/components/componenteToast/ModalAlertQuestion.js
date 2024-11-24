import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import '../../css/ModalAlertQuestion.css'; // Importar CSS correctamente

function ModalAlertQuestion({ show, userId,nombre, handleEliminar, handleCloseModal}) {
    
    const handleConfirm = async () => {
        try {
            // Ejecutar la función de eliminación pasando el ID
            const success = await handleEliminar(userId);
            if (success) {
                handleCloseModal(); 
            } else {
                handleCloseModal();
            }
        } catch (error) {
            handleCloseModal(); 
        }
    };
    

  return (
    show && (
      <div className={`modal-overlay ${show ? 'show' : ''}`}> {/* Agregar clase show */}
        <div className="contenido-model bg-white">
          <h3>¿Estás seguro de eliminar este usuario?</h3>
          <h4 className="modal-name-delete">{nombre || 'Nombre no disponible'}</h4>
          <div>
            <button onClick={handleConfirm} className="btn btn-danger  mx-2">
              Confirmar
            </button>
            <button onClick={handleCloseModal} className="btn btn-secondary">
              Cancelar
            </button>
          </div>
        </div>
        
      </div>
    )
  );
}

export default ModalAlertQuestion;
