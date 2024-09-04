import React from "react";
import { Link } from "react-router-dom";
import "./NabvarUser.css";
import "../../public/font/font.css";

function DashboardUserNavBar() {
  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/dash-user-page/">Mis Clientes</Link>
          </li>
          <li>
            <Link to="/dash-user-page/admin-products">Productos</Link>
          </li>
          <li>
            <Link to="/dash-user-page/admin-sales">Ventas</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default DashboardUserNavBar;
