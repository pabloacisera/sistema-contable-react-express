import React, { useEffect, useState } from 'react';
import { useNavigate }  from 'react-router-dom'
import './CrearCliente.css';
import Spinner from '../../../components/spinner/Spinner'; // Importa el spinner si lo tienes

function CrearCliente() {

  const navigate = useNavigate()

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('user');
    
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setUserId(parsedData.id);
        console.log(parsedData.id); // Aquí puedes utilizar el userId como necesites
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    }
  }, []);

  const [formData, setFormData] = useState({
    company: '',
    name: '',
    cuit: '',
    location: '',
    address: '',
    phone: '',
    email: '',
    userId: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({ ...formData, userId });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/v1/create-client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.status) {
        console.log("Cliente creado:", result.data);
        navigate("/dash-user-page")
      } else {
        console.error("Error al crear cliente:", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crear-cliente-container">
      <h4>Crear Cliente</h4>
      {loading && <Spinner />} {/* Muestra el spinner mientras se carga */}
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
        <button type="submit" className="submit-button">Crear Cliente</button>
      </form>
    </div>
  );
}

export default CrearCliente;
