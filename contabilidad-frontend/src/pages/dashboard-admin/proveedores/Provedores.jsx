import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Proveedores.css"

function Provedores() {
  const navigate = useNavigate();

  const [provs, setProvs] = useState([]);

  return (
    <div className="provs-container">
      <button className="new-prov-button">
        <Link to="/dash-admin-page/new-provider" className="button-link">
          Nuevo Proveedor
        </Link>
      </button>

      <div className="table-container">
        <table className="provs-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Empresa</th>
              <th>CUIT</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {provs.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-provs-message">
                  No hay proveedores registrados
                </td>
              </tr>
            ) : (
              provs.map((prov, index) => (
                <tr key={index}>
                  <td>{prov.nombre}</td>
                  <td>{prov.empresa}</td>
                  <td>{prov.cuit}</td>
                  <td>{prov.direccion}</td>
                  <td>{prov.telefono}</td>
                  <td>{prov.email}</td>
                  <td>
                    {/* Aquí irían los botones de acciones para cada proveedor */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Provedores;
