import React, { useState, useEffect } from "react";
import "../proveedores/global.css";
import { formatDate } from "../../../utility/date-format/dateFormat";

function Caja() {
  const [primerSaldo, setPrimerSaldo] = useState(0);
  const [cashInBox, setCashInBox] = useState(0);
  const [dateInBox, setDateInBox] = useState("");
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    const obtenerSaldoDesdeBackend = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/get-balance",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (data.status) {
          setCashInBox(Number(data.response.balance) || 0);
          setDateInBox(formatDate(data.response.date));
        } else {
          console.error("No se ha encontrado registro.");
        }

        await getMovements();
      } catch (error) {
        console.error("Error al obtener datos del servidor:", error);
      }
    };

    obtenerSaldoDesdeBackend();
  }, []);

  const obtenerSaldo = (event) => {
    const saldo = parseFloat(event.target.value);
    setPrimerSaldo(isNaN(saldo) ? 0 : saldo);
  };

  const cargarSaldoInicial = async () => {
    const date = new Date();
    const formattedDate = date.toISOString();

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

      const data = await response.json();
      if (data.status) {
        setCashInBox(Number(data.balance) || 0);
        setDateInBox(formatDate(data.date));
      }
      setPrimerSaldo("");
    } catch (error) {
      console.error("No se ha podido obtener respuesta del servidor: ", error);
    }
  };

  const getMovements = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/get-all-movement",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMovements(data.response || []);
      } else {
        console.error(
          "Error en la respuesta del servidor:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("No se ha podido consultar los movimientos:", error);
    }
  };

  return (
    <>
      <div className="container-saldo">
        <h3>Saldo de caja</h3>
        <input
          name="balance"
          type="number"
          placeholder="Ingrese un monto"
          onChange={obtenerSaldo}
          value={primerSaldo || ""}
        />
        <button onClick={cargarSaldoInicial}>Cargar Saldo Inicial</button>
        <button>Ingresar saldo</button>
        <button>Retirar saldo</button>
        <div className="saldo">
          ${cashInBox !== null && !isNaN(cashInBox)
            ? cashInBox.toFixed(2)
            : "0.00"}
        </div>
        <p>Última actualización:</p>
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
                  className={movement.type === "Egreso" ? "row-egreso" : "row-ingreso"}
                >
                  <td>{formatDate(movement.date)}</td>
                  <td className="movement-color" >
                    {movement.type === "Egreso" ?  "-" + "$"  : "+" + "$"}
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
