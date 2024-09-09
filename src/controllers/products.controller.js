import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CreateProduct = async (req, res) => {
  const { name, description, price, stock, providerId } = req.body;

  console.log(req.body);

  // Verifica que providerId esté presente y sea un número
  if (!providerId || isNaN(providerId)) {
    return res.status(400).json({
      status: false,
      message: "El ID del proveedor no es válido",
    });
  }

  // Verifica que los campos obligatorios estén presentes
  if (!name || !price ) {
    return res.status(400).json({
      status: false,
      message: "Faltan datos necesarios para crear el producto",
    });
  }

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        providerId: parseInt(providerId, 10),
      },
    });

    return res.status(200).json({
      status: true,
      data: newProduct,
    });
  } catch (error) {
    console.error("Error interno en el servidor", error);
    return res.status(500).json({
      status: false,
      message: "Error en el servidor",
    });
  }
};

export const getAllProductsByProvId = async (req, res) => {
  const providerId = req.params.id;

  try {
    // Consulta los productos asociados al proveedor
    const response = await prisma.product.findMany({
      where: {
        providerId: parseInt(providerId, 10),
      },
    });

    console.log(response);

    // Verifica si se encontraron productos
    if (response.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No se encontraron productos para el proveedor dado.",
      });
    }

    // Devuelve los productos encontrados
    return res.status(200).json({
      status: true,
      response,
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return res.status(500).json({
      status: false,
      message: "Error al obtener productos.",
      error: error.message,
    });
  }
};

export const DeleteProductById = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  console.log(id);

  try {
    // Intenta eliminar el producto
    const deletedProduct = await prisma.product.delete({
      where: { id: id },
    });

    // Si el producto se elimina correctamente, responde con éxito
    return res
      .status(200)
      .json({ message: "Producto eliminado con éxito", deletedProduct });
  } catch (error) {
    // Manejo de errores
    if (error.code === "P2025") {
      // Código de error de Prisma para "Registro no encontrado"
      return res.status(404).json({ error: "Producto no encontrado" });
    } else {
      console.error("Error al eliminar el producto:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

export const getProductForAdmin = async (req, res) => {
  try {
    const products = await prisma.product.findMany(); // No es necesario .then(response => response.data)
    
    if (!products || products.length === 0) {
      return res.status(200).json({ status: false, message: 'No se ha encontrado productos' });
    }
    
    return res.status(200).json({ status: true, products });
  } catch (error) {
    return res.status(500).json({ status: false, message: 'Error interno en el servidor' });
  }
};


export const getOneProductById = async (req, res) => {
  const { id } = req.params; // Obtener el ID desde los parámetros de la URL

  try {
    const product = await prisma.product.findFirst({
      where: { id: Number(id) }, // Asegúrate de convertir el id a número si es necesario
    });

    if (!product) {
      return res.status(400).json({ status: false, message: 'No se pudo encontrar el producto con ese id' });
    }

    return res.status(200).json({ status: true, data: product });
  } catch (error) {
    return res.status(500).json({ status: false, message: 'Error interno en el servidor' });
  }
};
