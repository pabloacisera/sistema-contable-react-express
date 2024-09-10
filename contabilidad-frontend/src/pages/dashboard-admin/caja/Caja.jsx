import React, { useState, useEffect } from "react";
import "../proveedores/global.css";
import "./Caja.css";
import { formatDate } from "../../../utility/date-format/dateFormat";

function Caja() {
  const [saldo, setSaldo] = useState(""); // Usar string para el input inicial
  const [cashInBox, setCashInBox] = useState(null);
  const [dateInBox, setDateInBox] = useState(null);
  const [movements, setMovements] = useState([]);

  // Función para obtener el valor del input y actualizar el saldo
  const obtenerSaldo = (event) => {
    const inputValue = event.target.value; // Capturar el valor del input
    setSaldo(inputValue); // Actualizar el estado con el valor ingresado
  };

  // Función para crear el balance
  const cargarSaldoInicial = async (crearBalance) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/create-balance",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(crearBalance),
        }
      );

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      throw new Error("No se ha podido enviar datos al backend");
    }
  };

  // Función que se ejecuta al hacer clic en el botón para cargar saldo
  const handleCargarSaldo = () => {
    const crearBalance = {
      balance: saldo,
      date: new Date().toISOString(),
    };
    cargarSaldoInicial(crearBalance)
      .then((data) => {
        if (data.status) {
          // Actualizar estado con el saldo y la fecha
          setCashInBox(parseFloat(data.response.balance));
          setDateInBox(formatDate(data.response.date));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Obtener saldo actualizado
  const obtenerSaldoActualizado = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/get-balance", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      // Esperar la resolución de la promesa y obtener los datos
      const data = await response.json();
      console.log(data);

      if (data.status) {
        // Actualizar estado con el saldo y la fecha
        setCashInBox(parseFloat(data.response.balance));
        setDateInBox(formatDate(data.response.date));
      }
    } catch (error) {
      console.error("Error al obtener datos del saldo:", error);
    }
  };

  // Obtener movimientos efectuados
  const obtenerMovimientosEfectuados = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/get-all-movement', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      // Esperar la resolución de la promesa y obtener los datos
      const data = await response.json();
      console.log(data);

      if (data.status) {
        setMovements(data.response); // Asumiendo que `data.response` es un array de movimientos
      }
    } catch (error) {
      console.error('Error al obtener movimientos:', error);
    }
  };

  // Llamar a obtenerSaldoActualizado y obtenerMovimientosEfectuados cuando el componente se monta
  useEffect(() => {
    obtenerSaldoActualizado();
    obtenerMovimientosEfectuados();
  }, []);

  return (
    <>
      <div className="container-saldo">
        <h3>Saldo de caja</h3>
        <input
          name="balance"
          type="number"
          placeholder="Ingrese un monto"
          onChange={obtenerSaldo} // Llamar a la función obtenerSaldo con el valor del input
          value={saldo || ""} // Usar el valor de saldo
        />
        <button onClick={handleCargarSaldo}>Cargar Saldo Inicial</button>
        <button>Ingresar saldo</button>
        <button>Retirar saldo</button>
        <div className="saldo">
          $
          {cashInBox !== null && !isNaN(cashInBox)
            ? cashInBox.toFixed(2)
            : "0.00"}
        </div>
        <p>Última carga de saldo:</p>
        <div className="fecha">{dateInBox || "Sin actualizar"}</div>
      </div>
      <div>
        <h3>Movimientos</h3>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Descripción</th>
              <th>Tipo de operación</th>
            </tr>
          </thead>
          <tbody>
            {movements.length > 0 ? (
              movements.map((movement, index) => (
                <tr
                  key={index}
                  className={
                    movement.type === "Egreso" ? "row-egreso" : "row-ingreso"
                  }
                >
                  <td>{formatDate(movement.date)}</td>
                  <td className="movement-color">
                    {movement.type === "Egreso" ? "-" + "$" : "+" + "$"}
                    {movement.amount}
                  </td>
                  <td>{movement.description}</td>
                  <td>{movement.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay movimientos registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Caja;
