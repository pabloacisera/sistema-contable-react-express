import React, { useState } from 'react'
import './Login.css';
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};

const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);

    
};

return (
    <div className="form-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            
            <label htmlFor="password">Contraseña</label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            
            <button type="submit">Iniciar Sesión</button>

            <p>Aun no tienes una cuenta? <Link to="/register">Registrate</Link></p>
        </form>
    </div>
);
}

export default Login