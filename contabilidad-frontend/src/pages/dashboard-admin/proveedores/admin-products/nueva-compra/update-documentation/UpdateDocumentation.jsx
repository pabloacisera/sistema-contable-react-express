import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateDocumentation() {
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [idDeCompra, setIdDeCompra] = useState(null)
  const [idDeMov, setIdDeMov] = useState(null)

  // Prepara datos para guardar la compra
  const handleCompra = () => {
    const data = localStorage.getItem('Datos-Compra');
    
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        const dataToPurchase = {
          providerId: parsedData.providerId,
          productId: parsedData.productId,
          quantity: parsedData.quantity,
          date: parsedData.date,
          price: parsedData.price
        };
        console.log(dataToPurchase);
        return dataToPurchase;
      } catch (error) {
        console.error("Error parsing data from localStorage", error);
      }
    }
    return null;
  };

  // Guardar la compra
  const guardarCompra = async () => {
    const data = handleCompra();
    console.log("Datos preparados para guardar:", data); // <-- Verifica si se están generando los datos
    if (data) {
      try {
        const response = await fetch('http://localhost:3000/api/v1/create-purchase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log("Datos de compra guardados:", result);
          setIdDeCompra(result.data.id)
        } else {
          console.error("Error en la respuesta del servidor:", response.statusText);
        }
      } catch (error) {
        console.error("Error guardando la compra:", error);
      }
    } else {
      console.error("Datos de compra no válidos");
    }
  };

  const handleMovement = () => {
    const data = localStorage.getItem('Datos-Movimiento');

    console.log(data)
  
    if (data) {
      try {
        const parsedData = JSON.parse(data); // Declara parsedData con const
        const dataToMovement = { // Declara dataToMovement con const
          amount: parsedData.amount,
          type: parsedData.type,
          description: parsedData.description,
          date: parsedData.date,
          cashboxId: parsedData.cashboxId
        };
        console.log(dataToMovement);
        return dataToMovement;
      } catch (error) {
        console.error("Error parsing data from localStorage", error);
      }
    }
    return null; // Asegúrate de devolver null en caso de que no haya datos
  };
  

  const guardarMovimiento = async() => {
    const data = handleMovement()
    console.log('Datos de movimiento: ', data)
    if(data){
      try {
        const response = await fetch('http://localhost:3000/api/v1/create-movement',
          { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
        )
        if(response.ok){
          const result = await response.json()
          console.log('Datos de movimiento guardados: ', result)
          setIdDeMov(result.data.id)
        } else {
          console.error("Error en la respuesta del servidor:", response.statusText);
        }
      } catch (error) {
        console.error("Error guardando el movimiento:", error);
      }
    }else {
      console.error("Datos de movimiento no válidos");
    }
  }
  
  const confirmarCompraSinComprobante = async () => {
    console.log("Iniciando compra sin comprobante");
    await guardarCompra();
    console.log("Compra sin comprobante procesada");
    console.log("Iniciando movimiento sin comprabante")
    await guardarMovimiento()
    console.log('Movimiento sin comprobante procesado')
  };
  






  const cancelar = () => {
    localStorage.removeItem("Datos-Compra");
    localStorage.removeItem("Datos-Movimiento");
    navigate("/dash-admin-page/admin-proveedores");
  };

  const handleDocument = (e) => {
    const file = e.target.files[0];
    setDocument(file);
  };

  const guardarCompraConComprobante = async() => {
    console.log("Iniciando compra con comprobante");
  
    // Asegúrate de que la compra y el movimiento se hayan guardado antes de continuar
    await guardarCompra();
    await guardarMovimiento();
    
    // Verifica si idDeCompra y idDeMov se han actualizado correctamente
    if (idDeCompra && idDeMov) {
        if (document) {
            console.log('Documento cargado:', document.name);
            
            const formData = new FormData();
            formData.append('document', document); // Agrega el archivo al formData
            formData.append('purchaseId', idDeCompra);
            formData.append('movementId', idDeMov);
            formData.append('uploadedAt', new Date().toISOString());

            // Aquí envías los datos al backend
            try {
                const response = await fetch('http://localhost:3000/api/v1/create-document', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Documento guardado exitosamente:', result);
                } else {
                    const error = await response.json();
                    console.error('Error al guardar el documento:', error.message);
                }
            } catch (error) {
                console.error('Error en la solicitud de guardar el documento:', error);
            }
        } else {
            console.error('No se ha seleccionado ningún documento');
        }
    } else {
        console.error('No se ha obtenido un idDeCompra o idDeMov válido');
    }
};

  
  

  const confirmarCompraConComprobante = async () => {
    guardarCompraConComprobante()    
  };

  return (
    <div>
      <input type="file" name="doc" id="doc" onChange={handleDocument} />
      <button onClick={confirmarCompraConComprobante}>
        Comprar con comprobante
      </button>
      <button onClick={confirmarCompraSinComprobante}>
        Comprar sin comprobante
      </button>
      <button onClick={cancelar}>Cancelar</button>
    </div>
  );
}

export default UpdateDocumentation;
