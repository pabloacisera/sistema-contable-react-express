import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CrearProducto.css"; // Asegúrate de que el archivo CSS esté en el mismo directorio

function CrearProducto() {
  const navigate = useNavigate();

  const { id } = useParams(); // Obtiene el id de la URL

  const providerId = id;

  console.log("Este id viene del listado de productos", providerId);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    providerId: providerId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/v1/create-prod`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Corregido aquí
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          price: parseFloat(product.price), // Asegúrate de que el precio sea un número
          stock: parseInt(product.stock, 10), // Asegúrate de que el stock sea un número
          providerId: parseInt(product.providerId, 10),
        }), // Corregido aquí
      });

      const result = await response.json();

      if (result.status) {
        // Corregido aquí
        console.log("Producto creado", result.data);
        alert("Producto creado exitosamente.");
        navigate(`/dash-admin-page/view-product/${providerId}`);
      } else {
        console.error("Error al crear el producto:", result.message);
        alert("No se pudo crear el producto.");
      }
    } catch (error) {
      console.error("Error al enviar el producto:", error);
      alert("Error en la solicitud.");
    }
  };

  return (
    <div className="crear-producto-container">
      <h2>Crear Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            step="0.01"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Crear Producto</button> {/* Corregido aquí */}
      </form>
    </div>
  );
}

export default CrearProducto;
