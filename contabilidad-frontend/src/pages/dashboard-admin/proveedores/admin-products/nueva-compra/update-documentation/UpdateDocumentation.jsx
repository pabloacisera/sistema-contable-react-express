import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateDocumentation() {

  const navigate = useNavigate()

  const [dataCompra, setDataCompra] = useState(null);
  const [dataMovement, setDataMovement] = useState(null);

  //guardar id de compra creada e id de movimeinto creado
  const [idCompra, setIdCompra] = useState(0);
  const [idMovement, setIdMovement] = useState(0);

  const extraerDatos = () => {
    // Extraer Datos-Compra desde el localStorage y parsearlos
    let dataCompra = localStorage.getItem("Datos-Compra");
    if (dataCompra) {
      let dataJson = JSON.parse(dataCompra);
      setDataCompra(dataJson);
      console.log("Datos-Compra:", dataJson);
    } else {
      console.log("No se encontraron datos de compra.");
    }

    // Extraer Datos-Movimiento desde el localStorage y parsearlos
    let dataMovimiento = localStorage.getItem("Datos-Movimiento");
    if (dataMovimiento) {
      let dataMovJson = JSON.parse(dataMovimiento);
      setDataMovement(dataMovJson);
      console.log("Datos-Movimiento:", dataMovJson);
    } else {
      console.log("No se encontraron datos de movimiento.");
    }
  };

  //guardar la compra

  const guardarCompra = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/create-purchase",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataCompra),
        }
      );
      const data = await response.json();

      if (data && data.status) {
        const id = data.data.id; // Asegúrate de que "id" sea el nombre correcto
        setIdCompra(id); // Guarda el ID en el estado
        console.log("ID de la compra:", id);
      } else {
        console.log("Error al recibir los datos de la compra");
      }

      return data;
    } catch (error) {
      throw new Error("No se ha podido enviar los datos de compra", error);
    }
  };

  const guardarMovimiento = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/create-movement",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataMovement),
        }
      );

      const data = await response.json();

      if (data && data.status) {
        const id = data.data.id;
        setIdMovement(id);
        console.log("Id del movimiento: ", idMovement);
      }

      return data;
    } catch (error) {
      throw new Error("No se ha podido enviar datos de movimiento", error);
    }
  };

  const confirmarCompraSinComprobante = async () => {
    extraerDatos();

    // Asegúrate de que `dataCompra` y `dataMovement` tienen datos válidos antes de proceder
    if (!dataCompra || !dataMovement) {
      console.error("Datos de compra o movimiento no están disponibles.");
      return;
    }

    try {
      const compraData = await guardarCompra();

      if (compraData && compraData.status) {
        // Solo guardar el movimiento si la compra fue exitosa
        const movimientoData = await guardarMovimiento(); //luego de guardar movimiento se guardar el documento

        if (movimientoData && movimientoData.status) {
          console.log("Movimiento guardado exitosamente.");
        } else {
          console.error("Error al guardar el movimiento.");
        }
      } else {
        console.error("Error al guardar la compra.");
      }
    } catch (error) {
      console.error("Error en confirmarCompra:", error);
    }
  };





  const cancelar =()=>{
    localStorage.removeItem('Datos-Compra')
    localStorage.removeItem('Datos-Movimiento')
    navigate("/dash-admin-page/admin-proveedores")
  }



  return (
    <div>
      <input type="file" name="doc" id="doc" />
      <button >Confirmar Compra</button>
      <button onClick={confirmarCompraSinComprobante}>Comprar sin comprobante</button>
      <button onClick={cancelar}>Cancelar</button>
    </div>
  );
}

export default UpdateDocumentation;
