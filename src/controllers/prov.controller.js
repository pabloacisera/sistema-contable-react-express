import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProviders = async (req, res) => {
  const { company, name, cuit, location, address, phone, email } = req.body;

  const data = {
    company,
    name,
    cuit: cuit.toString(), // Convierte cuit a entero
    location,
    address,
    phone: phone.toString(), // Convierte phone a entero
    email,
  };

  console.log(data);

  try {
    const createdProvider = await prisma.provider.create({
      data: data,
    });

    if (!createdProvider) {
      return res.status(400).json({
        status: false,
        message: "No se ha podido crear el proveedor",
      });
    }

    return res.status(200).json({
      status: true,
      data: createdProvider,
    });
  } catch (error) {
    console.error("Error interno del servidor", error);
    return res.status(500).json({
      status: false,
      message: "Error en el servidor",
    });
  }
};

export const getAllProvider = async (req, res) => {
  try {
    const dataProviders = await prisma.provider.findMany();

    if (!dataProviders && dataProviders.lenght === 0) {
      return res.status(200).json({
        status: true,
        data: [],
      });
    }

    return res.json({
      status: true,
      data: dataProviders,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener proveedores",
    });
  }
};

export const deleteProviderById = async (req, res) => {
  const { id } = req.params;
  console.log("Se ha recibido del backend el siguiente id: ", id);

  try {
    if (!id) {
      return res.status(400).json({
        message: "Id no proporcionado",
      });
    }

    const deleteProvider = await prisma.provider.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deleteProvider) {
      return res.status(400).json({
        message: "No se ha podido eliminar el cliente",
      });
    }

    return res.status(200).json({
      messge: `Cliente con id ${id} eliminado correctamente`,
    });
  } catch (error) {
    console.error("Error al eliminar el cliente: ", error);
    res.status(500).json({ error: "Error al eliminar cliente" });
  }
};

export const getProviderById = async (req, res) => {
  const { id } = req.params;

  try {
    const provider = await prisma.provider.findUnique({
      where: { id: parseInt(id, 10) }, // Asegúrate de convertir el ID a número
    });

    if (!provider) {
      return res
        .status(404)
        .json({ status: false, message: "No se ha encontrado el proveedor" });
    }

    return res.status(200).json({ status: true, data: provider });
  } catch (error) {
    console.error("Error en el servidor:", error);
    return res
      .status(500)
      .json({ status: false, message: "Error interno en el servidor" });
  }
};
