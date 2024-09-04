import { useState, useEffect, useCallback } from 'react';

const useFetchClients = () => {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);

  const fetchClients = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    if (userId) {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/get-client-by-user-id/${userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();
        if (data.status) {
          if (Array.isArray(data.data)) {
            setClients(data.data);
          } else {
            console.error("La respuesta no contiene un arreglo de clientes");
            setClients([]);
          }
        } else {
          console.error("Error al obtener los clientes:", data.message);
          setClients([]);
        }
      } catch (error) {
        console.error("Error al conectarse al servidor:", error);
        setError(error);
        setClients([]);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("No se encontró el ID de usuario en localStorage");
      setClients([]);
    }
  }, []); // Asegúrate de que las dependencias estén correctamente configuradas

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return { loading, clients, error, fetchClients };
};

export default useFetchClients;
