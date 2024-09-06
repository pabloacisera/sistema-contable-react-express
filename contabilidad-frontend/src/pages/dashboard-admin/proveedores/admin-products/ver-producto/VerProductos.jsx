import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./VerProductos.css";
import Spinner from "../../../../../components/spinner/Spinner"; // Importa el spinner
import ConfirmedDeleteProduct from "../../../../../components/confirmDeleteProduct/ConfirmDeleteProduct"; 

const VerProductos = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productId, setProductId] = useState(null);

  // Convierte el id a número antes de pasar a la función getAllProducts
  const getAllProducts = async (id) => {
    try {
      setLoading(true); // Inicia el estado de carga
      const response = await fetch(
        `http://localhost:3000/api/v1/view-products/${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo obtener productos");
      }

      const dataProducts = await response.json();
      if (dataProducts.status) {
        setProducts(dataProducts.response || []);
        setLoading(false);
      } else {
        setError(dataProducts.message || "Error al obtener productos");
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setError(error.message);
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  useEffect(() => {
    getAllProducts(Number(id));
  }, [id]);

  const openModal = (product) => {
    setProductToDelete(product);
    setProductId(product.id); // Verificar que `product.id` no sea `undefined`
    setIsModalOpen(true);
  };
  

  const closeModal = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  const refreshProducts = () => {
    if (id) {
      getAllProducts(Number(id));
    }
  };

  return (
    <div className="products-container">
      <button className="new-product-button">
        <Link to={`/dash-admin-page/new-product/${id}`} className="button-link">
          Agregar Producto
        </Link>
      </button>

      {/* Mostrar spinner si está cargando */}
      {loading ? (
        <Spinner />
      ) : (
        <div className="table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {error ? (
                <tr>
                  <td colSpan="5" className="error-message">
                    {error}
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-products-message">
                    No hay productos registrados
                  </td>
                </tr>
              ) : (
                products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>${Number(product.price).toFixed(2)}</td>
                    <td>{product.stock}</td>
                    <td>
                      <button>Editar</button>
                      <button onClick={() => openModal(product)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmedDeleteProduct
        isOpen={isModalOpen}
        onClose={closeModal}
        product={productToDelete}
        id={productId} // Asegurarse de que este ID sea válido
        onDelete={refreshProducts} // Función para actualizar la lista de productos
      />
    </div>
  );
};

export default VerProductos;
