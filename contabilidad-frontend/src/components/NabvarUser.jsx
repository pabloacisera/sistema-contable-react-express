import React from "react";
import { Link } from "react-router-dom";
import "./NabvarUser.css";
import "../../public/font/font.css";
import { useNavigate } from "react-router-dom";

function DashboardUserNavBar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/dash-user-page/">Mis Clientes</Link>
          </li>
          <li>
            <Link to="/dash-user-page/user-products">Productos</Link>
          </li>
          <li>
            <Link to="/dash-user-page/user-sales">Ventas</Link>
          </li>
          <li className="logout">
            <button onClick={logout}>Salir</button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default DashboardUserNavBar;
