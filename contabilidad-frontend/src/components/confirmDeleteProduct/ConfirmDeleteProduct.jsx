import React from "react";
import "./deleteProduct.css";

function ConfirmedDeleteProduct({ isOpen, onClose, product, id, onDelete }) {
  const confirm = async () => {
    if (!id) {
      console.error("ID del producto es undefined.");
      return;
    }

    console.log("El ID que se va a eliminar es:", id); // Verificar si el ID es correcto

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/delete-product/${id}`,
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

      onDelete(); // Refrescar la lista de productos
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error("No se ha podido eliminar el producto", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="confirm-delete-modal">
      <div className="modal-content">
        <h2>Confirmar Eliminación</h2>
        <p>
          {product ? (
            <>
              ¿Estás seguro de que deseas eliminar el producto{" "}
              <strong>{product.name}</strong>?
            </>
          ) : (
            "¿Estás seguro de que deseas eliminar este producto?"
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

export default ConfirmedDeleteProduct;
