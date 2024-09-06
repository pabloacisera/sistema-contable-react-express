import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Proveedores.css";
import useFetchProviders from "../proveedores/provider-hook/FetchProvider";
import ConfirmDeleteProvider from "../../../components/comfirmDeleteProvider/ConfirmedDeleteProvider";
import Spinner from "../../../components/spinner/Spinner";

function Provedores() {
  const navigate = useNavigate();

  // Desestructurar como objeto
  const { loading, provs, error, fetchProvider } = useFetchProviders();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [provToDelete, setProvToDelete] = useState(null);
  const [provId, setProvId] = useState(null);

  const refetchProvs = useCallback(() => {
    fetchProvider();
  }, [fetchProvider]);

  const openModal = (prov) => {
    setProvToDelete(prov);
    setProvId(prov.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProvToDelete(null);
  };

  const verProductos = (id) => {
    console.log("id de proveedor", id);
    navigate(`/dash-admin-page/view-product/${id}`);
  };

  return (
    <div className="provs-container">
      <button className="new-prov-button">
        <Link to="/dash-admin-page/new-provider" className="button-link">
          Nuevo Proveedor
        </Link>
      </button>

      {loading ? (
        <Spinner />
      ) : (
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
              {provs.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-provs-message">
                    No hay proveedores registrados
                  </td>
                </tr>
              ) : (
                provs.map((prov, index) => (
                  <tr key={index}>
                    <td>{prov.name}</td>
                    <td>{prov.company}</td>
                    <td>{prov.cuit}</td>
                    <td>{prov.address}</td>
                    <td>{prov.phone}</td>
                    <td>{prov.email}</td>
                    <td>
                      <button>Editar</button>
                      <button onClick={() => openModal(prov)}>Eliminar</button>
                      <button onClick={() => verProductos(prov.id)}>
                        Productos
                      </button>
                    </td>
                  </tr>
                )) 
              )}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDeleteProvider
        isOpen={isModalOpen}
        onClose={closeModal}
        prov={provToDelete}
        id={provId}
        onDelete={refetchProvs}
      />
    </div>
  );
}

export default Provedores;
