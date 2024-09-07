import React, { useEffect, useState } from "react";
import "./Productos.css"

function Productos() {
  const [allProducts, setAllProducts] = useState([]);
  const [providers, setProviders] = useState({}); // Estado para almacenar los proveedores por ID

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

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Proveedor</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>$ {product.price}</td>
              <td>{product.stock}</td>
              <td>{providers[product.providerId] || "Cargando..."}</td>{" "}
              {/* Mostramos el nombre del proveedor o "Cargando..." */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Productos;
