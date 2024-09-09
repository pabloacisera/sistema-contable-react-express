import React, { useEffect, useState } from "react";
import "../../dashboard-admin/proveedores/global.css";

function Productos() {
  const [allProducts, setAllProducts] = useState([]);
  const [providers, setProviders] = useState({}); // Estado para almacenar los proveedores por ID
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [currentPage, setCurrentPage] = useState(0); // Estado para la página actual

  // Función para obtener todos los productos
  const getAllProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/get-all-products-for-admin",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.status) {
        setAllProducts(data.products);
        // Para cada producto, buscar su proveedor
        data.products.forEach((product) => {
          getProviderById(product.providerId); // Obtener el proveedor por ID
        });
      } else {
        console.error("No se encontraron productos");
      }
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  // Función para obtener el proveedor por ID
  const getProviderById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/get-provider-by-id/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.status) {
          setProviders((prevProviders) => ({
            ...prevProviders,
            [id]: data.data.company, // Guarda el nombre de la compañía del proveedor en el estado
          }));
        } else {
          console.error("No se encontró el proveedor");
        }
      } else {
        console.error(
          `Error en la respuesta: ${response.status} - ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error al obtener el proveedor:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Filtrado y paginación
  const productsPerPage = 5;

  const filteredProducts = allProducts.filter((product) => {
    return (
      product.name &&
      product.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  });

  const startIndex = currentPage * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); // Reiniciar la página al realizar una búsqueda
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          className="search-input-field"
          placeholder="Ingrese un nombre de producto"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Proveedor</th>
            <th>Venta</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>$ {product.price}</td>
              <td>{product.stock}</td>
              <td>{providers[product.providerId] || "Cargando..."}</td>{" "}
              <button>Venta</button>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={prevPage} disabled={currentPage === 0}>
          Anterior
        </button>
        <button
          onClick={nextPage}
          disabled={
            currentPage >=
            Math.ceil(filteredProducts.length / productsPerPage) - 1
          }
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Productos;
