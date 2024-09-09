import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function NewPurchase() {

    const navigate = useNavigate()

    const [productForPurchase, setProductForPurchase] = useState(null); // Inicializa como null
    const [idProv, setIdProv] = useState(0);
    const [dataProvider, setDataProvider] = useState(null);

    const [ monto, setMonto] = useState(null)
    const [precioTotal, setPrecioTotal] = useState(0)

    const { id } = useParams();
    console.log('Este id debe ser buscado en base de datos: ', id);

    async function getProductById() {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/get-one-product-by-id/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const data = await response.json();
                setProductForPurchase(data.data);
                console.log('Producto obtenido:', data.data); // Muestra los datos obtenidos
            } else {
                console.error('Error en la respuesta del servidor:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener datos del producto:', error);
        }
    }

    useEffect(() => {
        getProductById();
    }, [id]);

    useEffect(() => {
        if (productForPurchase && productForPurchase.providerId) {
            setIdProv(productForPurchase.providerId);
        }
    }, [productForPurchase]);

    useEffect(() => {
        if (idProv > 0) { // Asegúrate de que idProv tenga un valor válido
            async function fetchProvider() {
                try {
                    const response = await fetch(`http://localhost:3000/api/v1/get-provider-by-id/${idProv}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setDataProvider(data.data); // Ajuste aquí para obtener la propiedad 'data'
                        console.log('Datos del proveedor:', data.data); // Ajuste aquí para mostrar 'data.data'
                    } else {
                        console.error('Error en la respuesta del servidor:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error al obtener datos del proveedor:', error);
                }
            }

            fetchProvider();
        }
    }, [idProv]);

    const handleMonto = (event) => {
        setMonto(event.target.value)
    }

    const handleCalcularTotal = ()=> {
        const resultCalculated = monto * productForPurchase.price
        setPrecioTotal(resultCalculated)
    }

    const confirmarCompra = () => {
        const dataCompra = {
            productId: id,
            providerId: idProv,
            quantity: monto,
            totalPrice: precioTotal,
            date: new Date().toISOString(),
        }
        console.log(dataCompra)

        localStorage.setItem('Datos-Compra', JSON.stringify(dataCompra))

        const dataMovement = {
            amount: precioTotal,
            type: 'Egreso',
            description: `Compra de producto: ${productForPurchase.name}`,
            date: new Date().toISOString(),
            cashboxId: 40,
        }
        console.log(dataMovement)

        localStorage.setItem('Datos-Movimiento', JSON.stringify(dataMovement))

        navigate("/dash-admin-page/update-doc")
    }

    return (
        <div>
            {productForPurchase ? (
                <div>
                    <h2><strong>Producto</strong></h2>
                    <h3>{productForPurchase.name}</h3>
                    <p>{productForPurchase.description}</p>
                    <p>Precio: {productForPurchase.price}</p>
                    {dataProvider ? (
                        <div>
                            <h2>Detalles del Proveedor</h2>
                            <p><strong>Nombre:</strong> {dataProvider.name}</p>
                            <p><strong>Empresa:</strong> {dataProvider.company}</p>
                            <p><strong>CUIT:</strong> {dataProvider.cuit}</p>
                            <p><strong>Dirección:</strong> {dataProvider.address}</p>
                            <p><strong>Teléfono:</strong> {dataProvider.phone}</p>
                        </div>
                    ) : (
                        <p>Cargando datos del proveedor...</p>
                    )}
                </div>
            ) : (
                <p>Cargando producto...</p>
            )}
            <div>
                <h5>Ingrese cantidad que desea adquirir</h5>
                <input type="number" name='monto' value={monto} onChange={handleMonto} />
                <button onClick={handleCalcularTotal} >calcular</button>
                <h4>Precio Total: ${precioTotal}</h4>
            </div>

            <button onClick={confirmarCompra} >Siguiente</button>
        </div>
    );
}

export default NewPurchase;
