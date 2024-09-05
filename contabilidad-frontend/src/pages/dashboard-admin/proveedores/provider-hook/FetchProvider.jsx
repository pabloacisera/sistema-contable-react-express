import { useState, useEffect, useCallback } from "react";

const useFetchProviders = () => {
  const [loading, setLoading] = useState(false);
  const [provs, setProvs] = useState([]);
  const [error, setError] = useState(null);

  const fetchProvider = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/get-all-prov",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if(data.status) {
        if(Array.isArray(data.data)) {
            setProvs(data.data)
        } else {
            console.error('La respuesta no contiene un arreglo de proveedores')
            setProvs([])
        }
        setLoading(false)
      } else {
        console.error('Error al obtener los clientes: ', data.message)
        setError('No se pudo obtener los proveedores. Inténtalo más tarde.');
        setLoading(false)
      }

    } catch (error) {
        console.error('Error en el servidor')
        setLoading(false)
    }
  }, []);

  useEffect(()=> {
    fetchProvider()
  }, [fetchProvider])

  return { loading, provs, error, fetchProvider }
};

export default useFetchProviders