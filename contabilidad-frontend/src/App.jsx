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
import Productos from "./pages/dashboard-user/productos/Productos";
import Ventas from "./pages/dashboard-user/ventas/Ventas";
import Clientes from "./pages/dashboard-user/clientes/Clientes";
import CrearCliente from "./pages/dashboard-user/clientes/CrearCliente";
import NewProvider from "./pages/dashboard-admin/proveedores/new-provider/NewProvider";
import { ProtectedRoute } from "./utility/protected-route/ProtectedRoute";
import Caja from "./pages/dashboard-admin/caja/Caja";
import VerProductos from "./pages/dashboard-admin/proveedores/admin-products/ver-producto/VerProductos";
import CrearProducto from "./pages/dashboard-admin/proveedores/admin-products/crear-producto/CrearProducto"

function DashboardAdminLayout() {
  return (
    <>
      <DashboardNavBar />
      <Routes>
        <Route path="admin-caja" element={<Caja />} />
        <Route path="admin-libro" element={<Libro />} />
        <Route path="admin-compra" element={<Compra />} />
        <Route path="admin-venta" element={<Venta />} />
        <Route path="admin-proveedores" element={<Provedores />} />
        <Route path="new-provider" element={<NewProvider />} />
        <Route path="new-product/:id" element={<CrearProducto />} />
        <Route path="view-product/:id" element={<VerProductos />} />
        <Route path="view-all-products" element={<Productos />} />

      </Routes>
    </>
  );
}

function DashboardUserLayout() {
  return (
    <>
      <DashboardUserNavBar />
      <Routes>
        <Route path="" element={<Clientes />} />
        <Route path="create-clients" element={<CrearCliente />} />
        <Route path="user-products" element={<Productos />} />
        <Route path="user-sales" element={<Ventas />} />
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


        <Route path="/dash-user-page/*" element={<ProtectedRoute><DashboardUserLayout /></ProtectedRoute>} />
        <Route path="/dash-admin-page/*" element={<ProtectedRoute><DashboardAdminLayout /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
