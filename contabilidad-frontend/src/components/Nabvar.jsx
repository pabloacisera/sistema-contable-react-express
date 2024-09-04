import React from 'react';
import { Link } from 'react-router-dom';
import './Nabvar.css'; // Asegúrate de importar el CSS

function DashboardNavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/dash-admin-page/admin-caja">Caja</Link></li>
        <li><Link to="/dash-admin-page/admin-libro">Libro</Link></li>
        <li><Link to="/dash-admin-page/admin-compra">Compra</Link></li>
        <li><Link to="/dash-admin-page/admin-venta">Venta</Link></li>
        <li><Link to="/dash-admin-page/admin-provedores">Proveedores</Link></li>
      </ul>
    </nav>
  );
}

export default DashboardNavBar;