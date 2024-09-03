import React from 'react'
import "./home.css"
import "../../../public/font/font.css"
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
        <h1>Mi app de contabilidad</h1>
        <div className='container'>
            <div className='img-banner'>
                <img src="/imagenes/banner.jpg" alt="Banner principal" />
            </div>
           <div className='container-banner'>
                <h4>
                    Para utilizar las funciones de la app <Link to="/register">Regístrese</Link> o <Link to="/login">Ingrese</Link> con su cuenta
                </h4>
           </div>
        </div>
        <div className='container-sections'>
            <div className='contabilidad'>
                <img src="/imagenes/calculadora.jpg" alt="Calculadora" />
                <p>
                    La sección de contabilidad permite realizar diversas actividades financieras como gestionar ingresos y egresos, generar reportes financieros, calcular impuestos, y llevar un seguimiento detallado de todas las transacciones contables de tu negocio.
                </p>
            </div>
            <div className='clientes'>
                <img src="/imagenes/clientes.jpg" alt="Clientes" />
                <p>
                    La sección de gestión de clientes facilita la administración de la información de tus clientes, incluyendo el registro y seguimiento de datos personales, historial de transacciones, y gestión de la comunicación con cada cliente para mejorar el servicio y las relaciones.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Home
