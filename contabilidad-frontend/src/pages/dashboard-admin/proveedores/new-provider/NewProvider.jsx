import React, { useState } from "react";
import "./NewProvider.css";
import { json, useNavigate } from "react-router-dom";

const NewProvider = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    company: "",
    name: "",
    cuit: "",
    location: "",
    address: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch("http://localhost:3000/api/v1/create-prov", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const result = await response.json();
  
      if (result.status) {
        console.log('Proveedor creado: ', result.data); // Aquí accedes a 'data' correctamente
        alert('Proveedor creado exitosamente')
        navigate("/dash-admin-page/admin-proveedores");
      } else {
        console.error('Error al crear cliente:', result.message);
        alert('No se ha podido crear proveedor')
      }
  
      setLoading(false);
    } catch (error) {
      console.error("Error al crear el cliente", error);
      setLoading(false);
    }
  };
  
  return (
    <div className="crear-cliente-container">
      <h4>Crear Proveedor</h4>
      <form onSubmit={handleSubmit} className="create-client-form">
        <div className="form-group">
          <label htmlFor="company">Empresa</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cuit">CUIT</label>
          <input
            type="number"
            id="cuit"
            name="cuit"
            value={formData.cuit}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Ubicación</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Crear Proveedor
        </button>
      </form>
    </div>
  );
};

export default NewProvider;
