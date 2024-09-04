import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../../components/spinner/Spinner";
import ConfirmDeleteModal from "../../../components/confirmDeleteModal/ConfirmDeleteModal";
import useFetchClients from "../../dashboard-user/clientes/hook/FetchClients";
import "./Clientes.css";

function Clientes() {
  const navigate = useNavigate();
  const { loading, clients, error, fetchClients } = useFetchClients();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [clientId, setClientId] = useState(null);

  // Función para actualizar la lista de clientes
  const refetchClients = useCallback(() => {
    fetchClients();
  }, [fetchClients]);

  const openModal = (client) => {
    setClientToDelete(client);
    setClientId(client.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setClientToDelete(null);
  };

  const generarVenta = (id) => {
    console.log("id de cliente: ", id);
    navigate(`/dash-user-page/user-sales/${id}`);
  };

  return (
    <div className="clientes-container">
      <button className="new-client-button">
        <Link to="/dash-user-page/create-clients" className="button-link">
          Nuevo Cliente
        </Link>
      </button>

      <div className="table-container">
        {loading ? (
          <Spinner />
        ) : error ? (
          <p>Error al cargar clientes.</p>
        ) : clients.length === 0 ? (
          <p className="no-clients-message">No hay clientes aún.</p>
        ) : (
          <table className="clients-table">
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
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.company}</td>
                  <td>{client.cuit}</td>
                  <td>{client.address}</td>
                  <td>{client.phone}</td>
                  <td>{client.email}</td>
                  <td>
                    <button>Editar</button>
                    <button onClick={() => openModal(client)}>Eliminar</button>
                    <button onClick={() => generarVenta(client.id)}>
                      Generar Venta
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        client={clientToDelete}
        id={clientId}
        onDelete={refetchClients} // Pasa la función para actualizar la lista
      />
    </div>
  );
}

export default Clientes;
