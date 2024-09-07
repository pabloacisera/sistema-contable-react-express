import React, { useState, useEffect } from "react";
import "./Caja.css";
import { formatDate } from "../../../utility/date-format/dateFormat";

function Caja() {
  const [primerSaldo, setPrimerSaldo] = useState(0); // Inicializar como número
  const [cashInBox, setCashInBox] = useState(0);
  const [dateInBox, setDateInBox] = useState("");

  // Función para obtener el último saldo registrado al montar el componente
  useEffect(() => {
    const obtenerSaldoDesdeBackend = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/get-balance", // Asegúrate de que el endpoint es correcto
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (data.status) {
          // Asegúrate de que balance es un número
          setCashInBox(Number(data.response.balance) || 0);
          setDateInBox(formatDate(data.response.date));
        } else {
          console.error("No se ha encontrado registro.");
        }
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };

    obtenerSaldoDesdeBackend(); // Llamar a la función al montar el componente
  }, []); // [] para que se ejecute solo una vez cuando el componente se monte

  const obtenerSaldo = (event) => {
    const saldo = parseFloat(event.target.value); // Convertir a número
    setPrimerSaldo(isNaN(saldo) ? 0 : saldo); // Manejar caso NaN
  };

  const cargarSaldoInicial = async () => {
    const date = new Date();
    const formattedDate = date.toISOString(); // Renombrar variable para evitar conflicto con la función

    const newBalance = {
      balance: primerSaldo,
      date: formattedDate,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/create-balance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBalance),
        }
      );

      const data = await response.json(); // Obtener JSON correctamente
      if (data.status) {
        // Asegúrate de que balance es un número
        setCashInBox(Number(data.balance) || 0);
        setDateInBox(formatDate(data.date));
      }
      setPrimerSaldo("")
    } catch (error) {
      console.error("No se ha podido obtener respuesta del servidor: ", error);
    }
  };

  const updateIntoCashValue = async () => {
    const date = new Date();
    const formattedDate = date.toISOString();
  
    // Cambiar el cálculo del nuevo saldo
    const newValue = primerSaldo; // Solo enviar el nuevo valor
  
    console.log(newValue);
  
    const newBalance = {
      balance: newValue, // Solo el monto a añadir
      date: formattedDate,
    };
  
    try {
      const response = await fetch("http://localhost:3000/api/v1/update-into-balance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBalance),
      });
  
      const data = await response.json();
      if (data.status) {
        setCashInBox(Number(data.balance) || 0);
        setDateInBox(formatDate(data.date));
      }
      setPrimerSaldo("")
    } catch (error) {
      console.error("Error al actualizar el saldo:", error);
    }
  };  

  const updateOutCashValue = async () => {
    const date = new Date();
    const formattedDate = date.toISOString();
  
    // Cambiar el cálculo del nuevo saldo
    const newValue = primerSaldo; // Solo enviar el nuevo valor
  
    console.log(newValue);
  
    const newBalance = {
      balance: newValue, // Solo el monto a añadir
      date: formattedDate,
    };
  
    try {
      const response = await fetch("http://localhost:3000/api/v1/update-out-balance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBalance),
      });
  
      const data = await response.json();
      if (data.status) {
        setCashInBox(Number(data.balance) || 0);
        setDateInBox(formatDate(data.date));
      }
      setPrimerSaldo("")
    } catch (error) {
      console.error("Error al actualizar el saldo:", error);
    }
  }; 
  
  return (
    <div className="container-saldo">
      <h3>Saldo de caja</h3>
      <input
        name="balance"
        type="number"
        placeholder="Ingrese un monto"
        onChange={obtenerSaldo}
        value={primerSaldo || ""} // Manejar caso NaN y establecer valor como cadena vacía
      />
      <button onClick={cargarSaldoInicial}>Cargar Saldo Inicial</button>
      <button onClick={updateIntoCashValue}>Ingresar saldo</button>
      <button onClick={updateOutCashValue}>Retirar saldo</button>
      <div className="saldo">
        {cashInBox !== null && !isNaN(cashInBox) ? cashInBox.toFixed(2) : "0.00"} {/* Mostrar saldo con 2 decimales */}
      </div>
      <p>Última actualización:</p>
      <div className="fecha">{dateInBox || "Sin actualizar"}</div>{" "}
      {/* Mostrar la fecha formateada */}
    </div>
  );
}

export default Caja;
