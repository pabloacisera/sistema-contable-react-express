import React from 'react';
import { Link } from 'react-router-dom';
import './Nabvar.css'; // Asegúrate de importar el CSS

function DashboardNavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/admin-libro">Libro</Link></li>
        <li><Link to="/admin-compra">Compra</Link></li>
        <li><Link to="/admin-venta">Venta</Link></li>
        <li><Link to="/admin-provedores">Provedores</Link></li>
      </ul>
    </nav>
  );
}

export default DashboardNavBar;