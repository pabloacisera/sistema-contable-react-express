import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createMovement = async (req, res) => {
    const { amount, type, description, cashboxId } = req.body;

    try {
        const movement = await prisma.movement.create({
            data: { // Agrega `data` aquí
                amount: parseFloat(amount),
                type: type,
                description: description,
                cashboxId: parseInt(cashboxId),
            }
        });
        
        return res.status(200).json({
            status: true,
            data: movement
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Error interno en el servidor'
        });
    }
};
