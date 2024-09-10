import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateDocumentation() {
  const navigate = useNavigate();

  const realizarCompraSinComprobante = async () => {
    try {
      const dataCompraStr = localStorage.getItem("Datos-Compra");
      if (!dataCompraStr) {
        throw new Error("No hay datos de compra en el localStorage");
      }

      const dataCompra = JSON.parse(dataCompraStr);
      console.log("Datos de compra:", dataCompra);

      // Verificar el tipo de datos antes de enviarlo
      const totalPrice = parseFloat(dataCompra.totalPrice);
      if (isNaN(totalPrice) || totalPrice <= 0) {
        console.error("Error en la validación de totalPrice:", totalPrice);
        throw new Error("Total Price no es válido");
      }

      console.log(typeof totalPrice)
      // Operación de compra
      const purchaseResponse = await axios.post(
        "http://localhost:3000/api/v1/create-purchase",
        {
          providerId: Number(dataCompra.providerId),
          productId: Number(dataCompra.productId),
          quantity: Number(dataCompra.quantity),
          price: parseFloat(totalPrice), // Asegúrate de enviar el precio como decimal
          date: new Date(dataCompra.date).toISOString(),
        }
      );

      console.log("Respuesta de la compra:", purchaseResponse.data);

      if (!purchaseResponse.data.status) {
        throw new Error("Error al crear la compra");
      }

      // Operación de movimiento
      const movimientoResponse = await axios.post(
        "http://localhost:3000/api/v1/create-movement",
        {
          amount: totalPrice,
          type: "Egreso",
          description: "Compra sin comprobante",
          cashboxId: 42,
        }
      );

      console.log("Respuesta del movimiento:", movimientoResponse.data);

      if (!movimientoResponse.data.status) {
        throw new Error("Error al crear el movimiento");
      }

      // Actualización de la caja
      const updateResponse = await axios.post(
        "http://localhost:3000/api/v1/update-out-balance",
        {
          cashboxId: 42,
          amount: totalPrice,
        }
      );

      console.log("Respuesta de actualización de saldo:", updateResponse.data);

      if (!updateResponse.data.status) {
        throw new Error("Error al actualizar el saldo de la caja");
      }

      // Limpiar datos del localStorage si todo fue exitoso
      localStorage.removeItem("Datos-Compra");

      navigate("/dash-admin-page/admin-caja");
    } catch (error) {
      console.error("Error en el proceso de compra:", error.message);
      // Opcional: Mostrar mensaje de error al usuario
    }
  };

  const realizarCompraConComprobante = () => {
    // Implementar funcionalidad para compra con comprobante
  };

  return (
    <div>
      <input type="file" />
      <button onClick={realizarCompraConComprobante}>
        Confirmar Compra con Comprobante
      </button>
      <button onClick={realizarCompraSinComprobante}>
        Confirmar Compra Sin Comprobante
      </button>
    </div>
  );
}

export default UpdateDocumentation;


