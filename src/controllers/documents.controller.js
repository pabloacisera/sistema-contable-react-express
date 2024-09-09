import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createDocument = async (req, res) => {
  try {
    const fileName = req.file.originalname;
    const fileType = req.file.mimetype;
    const fileContent = req.file.buffer;  // Buffer del archivo subido
    const { purchaseId, movementId } = req.body;

    // Validaciones
    if (!fileContent || !fileName || !fileType) {
      return res.status(400).json({ message: 'Faltan datos del archivo' });
    }
    if (!purchaseId && !movementId) {
      return res.status(400).json({ message: 'Faltan los IDs de compra o movimiento' });
    }

    // Creación del documento en la base de datos
    const newDocument = await prisma.document.create({
      data: {
        fileName,
        fileType,
        fileContent,
        purchaseId: parseInt(purchaseId, 10),
        movementId: parseInt(movementId, 10),
        uploadedAt: new Date(),
      },
    });

    return res.status(201).json({
      message: 'Documento creado exitosamente',
      data: newDocument,
    });
  } catch (error) {
    console.error('Error al crear el documento:', error);
    return res.status(500).json({ message: 'Error interno del servidor', error });
  }
};
