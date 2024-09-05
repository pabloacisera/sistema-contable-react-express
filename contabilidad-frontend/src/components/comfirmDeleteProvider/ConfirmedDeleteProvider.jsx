import React from "react";

function ConfirmedDeleteProvider({isOpen, onClose, prov, id, onDelete}) {
  const confirm = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/delete-prov/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log("Response data: ", data);

      onDelete();

      onClose();
    } catch (error) {
      console.error("no se ha podido eliminar el proveedor", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="confirm-delete-modal">
      <div className="modal-content">
        <h2>Confirmar Eliminación</h2>
        <p>
          {prov ? (
            <>
              ¿Estás seguro de que deseas eliminar el proveedor{" "}
              <strong>{prov.name}</strong>?
            </>
          ) : (
            "¿Estás seguro de que deseas eliminar este proveedor?"
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

export default ConfirmedDeleteProvider;
