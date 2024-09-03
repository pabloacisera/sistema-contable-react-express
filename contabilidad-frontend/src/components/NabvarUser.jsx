import React from 'react';
import { Link } from 'react-router-dom';
import './NabvarUser.css'; 
import '../../public/font/font.css'

function DashboardUserNavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/user-clients">Clientes</Link></li>
        <li><Link to="/admin-products">Productos</Link></li>
        <li><Link to="/admin-sales">Ventas</Link></li>
      </ul>
    </nav>
  );
}

export default DashboardUserNavBar;
