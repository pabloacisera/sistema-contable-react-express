import React, { useCallback, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../pages/TablesStyles.css";
import useFetchProviders from "../proveedores/provider-hook/FetchProvider";
import ConfirmDeleteModal from "../../../components/confirmDeleteModal/ConfirmDeleteModal";

function Provedores() {
  const navigate = useNavigate();
  const { loading, provs, error, fetchProvider } = useFetchProviders();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [provToDelete, setProvToDelete] = useState(null);
  const [provId, setProvId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filtrar proveedores por el término de búsqueda
  const filteredProvs = provs.filter((prov) => {
    // Validar que el campo 'name' exista y que el término de búsqueda no esté vacío
    return (
      prov.name &&
      prov.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  });

  // Paginar los proveedores filtrados
  const paginatedProvs = filteredProvs.slice(currentPage, currentPage + 2);

  // Manejo del cambio en el input de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); // Reiniciar la página al realizar una búsqueda
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 2, filteredProvs.length - 2));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 2, 0));
  };

  useEffect(() => {
    refetchProvs();
  }, [refetchProvs]);

  const crearNuevoProveedor = () => {
    navigate('/dash-admin-page/new-provider')
  }

  return (
    <div>
      <div>
        <i></i>
        <input
          type="text"
          className="search-input-field"
          placeholder="Ingrese un nombre de proveedor"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <button onClick={crearNuevoProveedor} >
          Nuevo Proveedor
      </button>
        <div>
          <table>
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
              {filteredProvs.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    No hay proveedores registrados
                  </td>
                </tr>
              ) : (
                paginatedProvs.map((prov, index) => (
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
          <div>
            <button onClick={prevPage} disabled={currentPage === 0}>
              Anterior
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage + 2 >= filteredProvs.length}
            >
              Siguiente
            </button>
          </div>
        </div>

      <ConfirmDeleteModal
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
