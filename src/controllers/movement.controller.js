import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createMovement = async (req, res) => {
  console.log(req.body);

  const { amount, type, description, cashboxId } = req.body;

  // Verificar si el cashboxId existe
  const cashboxExists = await prisma.cashbox.findUnique({
    where: { id: parseInt(cashboxId) },
  });

  if (!cashboxExists) {
    return res.status(400).json({
      status: false,
      message: "El ID de la caja (cashboxId) no existe",
    });
  }

  try {
    const movement = await prisma.movement.create({
      data: {
        amount: parseFloat(amount),
        type: type,
        description: description,
        cashboxId: parseInt(cashboxId),
      },
    });
    return res.status(200).json({
      status: true,
      data: movement,
    });
  } catch (error) {
    console.error("Error al crear el movimiento:", error);
    return res.status(500).json({
      status: false,
      message: "Error interno en el servidor",
      error: error.message,
    });
  }
};

export const getAllMovement = async (req, res) => {
  try {
    // Ejecuta la consulta para obtener todos los movimientos
    const response = await prisma.movement.findMany();

    // Retorna la respuesta con el estado 200 (OK) y los datos obtenidos
    return res.status(200).json({
      status: true,
      response, // Devuelve los datos obtenidos de la consulta
    });
  } catch (error) {
    // En caso de error, retorna un estado 500 con un mensaje de error
    return res.status(500).json({
      status: false,
      message: "Error interno en el servidor",
      error: error.message, // Incluye el mensaje del error para depuración
    });
  }
};
