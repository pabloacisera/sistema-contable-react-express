import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import DashboardNavBar from "./components/Nabvar";
import Libro from "./pages/dashboard-admin/libro/Libro";
import Compra from "./pages/dashboard-admin/compra/Compra";
import Venta from "./pages/dashboard-admin/venta/Venta";
import Provedores from "./pages/dashboard-admin/proveedores/Provedores";
import DashboardUserNavBar from "./components/NabvarUser";
import Clientes from "./pages/dashboard-user/clientes/Clientes";
import Productos from "./pages/dashboard-user/productos/Productos";
import Ventas from "./pages/dashboard-user/ventas/Ventas"

function DashboardAdminLayout() {
  return (
    <>
      <DashboardNavBar />
      <Routes>
        <Route path="admin-libro" element={<Libro />} />
        <Route path="admin-compra" element={<Compra />} />
        <Route path="admin-venta" element={<Venta />} />
        <Route path="admin-provedores" element={<Provedores />} />
      </Routes>
    </>
  );
}

function DashboardUserLayout() {
  return (
    <>
      <DashboardUserNavBar />
      <Routes>
        <Route path="user-clients" element={ <Clientes /> } />
        <Route path="user-products" element={ <Productos /> } />
        <Route path="user-sales" element={ <Ventas /> } />
      </Routes>
    </>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dash-user-page" element={<DashboardUserLayout />} />
        <Route path="/dash-admin-page" element={<DashboardAdminLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
