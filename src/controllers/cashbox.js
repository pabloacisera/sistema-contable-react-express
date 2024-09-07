import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBalance = async (req, res) => {
  const { balance, date } = req.body;
  try {
    // Crear un nuevo registro en la tabla Cashbox
    const response = await prisma.cashbox.create({
      data: {
        balance,
        date: new Date(date), // Asegurarse de que la fecha sea un objeto Date
      },
    });

    if (!response) {
      return res
        .status(400)
        .json({ message: "No se ha podido crear el nuevo balance" });
    }

    return res.json({
      status: true,
      balance: response.balance, // Devolver balance
      date: response.date, // Devolver fecha
    });
  } catch (error) {
    console.error(error); // Mostrar el error para depuración
    return res.status(500).json({
      status: false,
      message: "Error interno del servidor",
    });
  }
};

export const getCashFromBox = async (req, res) => {
  try {
    const response = await prisma.cashbox.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!response) {
      return res.status(404).json({
        status: false,
        message: "No se ha encontrado registro",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Datos obtenidos",
      response,
    });
  } catch (error) {
    console.error("Error en el servidor", error);
    res.status(500).json({ message: "Error interno en el servidor" });
  }
};

export const updateIntoCashFromBox = async (req, res) => {
  const { balance } = req.body;

  try {
    // 1. Obtener el último registro
    const lastRecord = await prisma.cashbox.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!lastRecord) {
      return res.status(404).json({
        status: false,
        message: "No se ha encontrado ningún registro previo.",
      });
    }

    // 2. Calcular el nuevo saldo
    const newBalance = parseFloat(lastRecord.balance) + parseFloat(balance);

    // 3. Actualizar el registro existente con el nuevo saldo
    const updatedRecord = await prisma.cashbox.update({
      where: {
        id: lastRecord.id, // Usar el ID del registro existente
      },
      data: {
        balance: newBalance, // Actualizar el balance
      },
    });

    // Devolver el saldo actualizado y la fecha de actualización
    return res.status(200).json({
      status: true,
      balance: updatedRecord.balance,
      date: updatedRecord.date,
    });
  } catch (error) {
    console.error("Error al actualizar el saldo:", error);
    return res.status(500).json({
      status: false,
      message: "Error interno en el servidor",
    });
  }
};

export const updateOutCashFromBox = async (req, res) => {
    const { balance } = req.body;
  
    try {
      // 1. Obtener el último registro
      const lastRecord = await prisma.cashbox.findFirst({
        orderBy: {
          createdAt: "desc",
        },
      });
  
      if (!lastRecord) {
        return res.status(404).json({
          status: false,
          message: "No se ha encontrado ningún registro previo.",
        });
      }
  
      // 2. Calcular el nuevo saldo
      const newBalance = parseFloat(lastRecord.balance) - parseFloat(balance);
  
      // 3. Actualizar el registro existente con el nuevo saldo
      const updatedRecord = await prisma.cashbox.update({
        where: {
          id: lastRecord.id, // Usar el ID del registro existente
        },
        data: {
          balance: newBalance, // Actualizar el balance
        },
      });
  
      // Devolver el saldo actualizado y la fecha de actualización
      return res.status(200).json({
        status: true,
        balance: updatedRecord.balance,
        date: updatedRecord.date,
      });
    } catch (error) {
      console.error("Error al actualizar el saldo:", error);
      return res.status(500).json({
        status: false,
        message: "Error interno en el servidor",
      });
    }
  };
  