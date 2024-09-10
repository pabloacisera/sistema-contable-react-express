import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createPurchase = async (req, res) => {
    console.log('Request Body:', req.body); // Imprime el cuerpo de la solicitud
    
    const { providerId, productId, quantity, price, date } = req.body;

    console.log('Total Price Received:', price); // Imprime el precio recibido

    try {
        // Verifica el tipo de dato de price
        if (typeof price !== 'number') {
            throw new Error('El tipo de precio no es válido');
        }

        // Convierte price a número decimal si es una cadena
        const priceDecimal = parseFloat(price);
        if (isNaN(priceDecimal) || priceDecimal <= 0) {
            throw new Error('El precio no es válido');
        }

        if (!providerId || !productId || !quantity || !date) {
            throw new Error('Faltan datos necesarios');
        }

        // Crea la compra en la base de datos
        const purchase = await prisma.purchase.create({
            data: {
                providerId: Number(providerId),
                productId: Number(productId),
                quantity: Number(quantity),
                price: priceDecimal,
                date: new Date(date),
            },
        });

        return res.status(201).json({
            status: true,
            data: purchase,
        });

    } catch (error) {
        console.error('Error en la creación de compra:', error.message);
        return res.status(500).json({
            status: false,
            message: error.message || 'Error interno en el servidor',
        });
    }
};
