
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createPurchase = async(req, res) => {
    const { providerId, productId, quantity, totalPrice, date } = req.body;

    try {
        const purchase = await prisma.purchase.create({
            data: {
                providerId: Number(providerId),
                productId: Number(productId),
                quantity: Number(quantity),
                price: Number(totalPrice),  // Asegúrate de que el campo correcto sea `price`
                date: new Date(date), // Convierte la fecha a formato Date si es necesario
            },
        });

        return res.status(200).json({
            status: true,
            data: purchase,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Error interno en el servidor',
        });
    }
};
