import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Provedores() {
  const navigate = useNavigate();

  
  const generarProducto = (id) => {
    console.log("id de prov: ", id);
    navigate(`/dash-user-page/user-products/${id}`);
  };

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
              
            </tbody>
          </table>
      </div>
    </div>
  );
}


export default Provedores