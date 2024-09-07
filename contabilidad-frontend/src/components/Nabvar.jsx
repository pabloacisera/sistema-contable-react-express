import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nabvar.css"; // Asegúrate de importar el CSS

function DashboardNavBar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/dash-admin-page/admin-caja">Caja</Link>
        </li>
        <li>
          <Link to="/dash-admin-page/admin-libro">Libro</Link>
        </li>
        <li>
          <Link to="/dash-admin-page/admin-compra">Compra</Link>
        </li>
        <li>
          <Link to="/dash-admin-page/admin-venta">Ventas</Link>
        </li>
        <li>
          <Link to="/dash-admin-page/admin-proveedores">Proveedores</Link>
        </li>
        <li className="logout">
          <button onClick={logout}>Salir</button>
        </li>
      </ul>
    </nav>
  );
}

export default DashboardNavBar;
