import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createClient = async (req, res) => {
  const { company, name, cuit, location, address, phone, email, userId } =
    req.body;

  const data = {
    company,
    name,
    cuit: cuit.toString(), // Convierte cuit a entero
    location,
    address,
    phone: phone.toString(), // Convierte phone a entero
    email,
    userId,
  };
 
  console.log(data);

  try {
    const createdClient = await prisma.client.create({
      data: data,
    });
    if (!createdClient) {
      return res.status(400).json({
        status: false,
        message: "No se ha podido crear el cliente",
      });
    }
    return res.status(200).json({
      status: true,
      data: createdClient,
    });
  } catch (error) {
    console.error("Error interno del servidor:", error);
    return res.status(500).json({
      status: false,
      message: "Error en el servidor",
    });
  }
};

export const getAllClientByUserId = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  try {
    const dataClients = await prisma.client.findMany({
      where: {
        userId: userId,
      },
    });
    if (!dataClients || dataClients.length === 0) {
      return res.status(200).json({ status: true, data: [] });
    }
    return res.json({
      status: true,
      data: dataClients,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener clientes",
    });
  }
};

export const deleteClientById = async (req, res) => {
  const { id } = req.params;
  console.log("Se ha recibido en backend el siguiente id: ", id);

  try {
    // Asegúrate de que `id` es una cadena que Prisma puede manejar
    if (!id) {
      return res.status(400).json({ message: "ID no proporcionado" });
    }

    const deleteClient = await prisma.client.delete({
      where: { id: Number(id) }, // Asegúrate de que el ID es del tipo correcto
    });
    
    if (!deleteClient) {
      return res.status(400).json({
        message: "No se ha podido eliminar el cliente",
      });
    }
    res.status(200).json({ message: `Cliente con id ${id} eliminado correctamente` });
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    res.status(500).json({ error: "Error al eliminar el cliente" });
  }
};

