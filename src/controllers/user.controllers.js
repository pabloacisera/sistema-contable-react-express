import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export const createUser = async (req, res) => {
  console.log(req.body);
  const { name, email, password, rol } = req.body;

  try {
    const userFound = await prisma.user.findUnique({
      where: { email },
    });

    if (userFound) {
      return res.status(400).json({
        message: "El email ya existe en la base de datos",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        rol,
      },
    });

    const token = jwt.sign(
      {
        id: newUser.id, // Se puede añadir el ID para facilitar autenticaciones futuras
        name: newUser.name,
        email: newUser.email,
        rol: newUser.rol, // Incluyo el rol en el token
      },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(201).json({
      success: true,
      message: "Usuario creado con éxito",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        rol: newUser.rol,
      },
    });
  } catch (error) {
    console.error("Error interno en el servidor", error);
    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export const loginUser = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const userFound = await prisma.user.findUnique({
      where: { email },
    });

    if (!userFound) {
      return res.status(400).json({
        message: "El email ingresado no existe en la base de datos",
      });
    }

    const verifyPass = await bcrypt.compare(password, userFound.password);

    if (!verifyPass) {
      return res.status(400).json({
        message: "La contraseña ingresada no es correcta",
      });
    }

    const token = jwt.sign(
      {
        id: userFound.id,
        name: userFound.name,
        email: userFound.email,
        rol: userFound.rol, // También incluyo el rol aquí
      },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: userFound.id,
        name: userFound.name,
        email: userFound.email,
        rol: userFound.rol,
      },
    });
  } catch (error) {
    console.error("Error interno en el servidor", error);
    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};
