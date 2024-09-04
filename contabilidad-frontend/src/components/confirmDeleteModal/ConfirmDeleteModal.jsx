import React from "react";
import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ isOpen, onClose, client, id, onDelete }) {

  const confirm = async () => {
    try {
      console.log(`Sending DELETE request to: http://localhost:3000/api/v1/delete-client/${id}`);
      
      const response = await fetch(
        `http://localhost:3000/api/v1/delete-client/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);
      
      onDelete(); // Llama a la función para actualizar la lista de clientes

      onClose(); // Cierra el modal después de eliminar
    } catch (error) {
      console.error("No se ha podido eliminar el cliente", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="confirm-delete-modal">
      <div className="modal-content">
        <h2>Confirmar Eliminación</h2>
        <p>
          {client ? (
            <>
              ¿Estás seguro de que deseas eliminar el cliente{" "}
              <strong>{client.name}</strong>?
            </>
          ) : (
            "¿Estás seguro de que deseas eliminar este cliente?"
          )}
        </p>
        <div className="modal-actions">
          <button className="confirm-button" onClick={confirm}>
            Sí, eliminar
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
