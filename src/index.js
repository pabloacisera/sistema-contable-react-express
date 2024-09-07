import express, { Router } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/user.routes.js";
import http from "http"; // Importar http para crear el servidor

//socket.io
import { Server } from "socket.io"; // Cambiar la importación a solo 'Server'

dotenv.config();
const port = process.env.PORT || 3000; // Default port

const app = express();
const router = Router();

// Middleware
app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:5173", // la URL del frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Crear servidor HTTP
const server = http.createServer(app);

// Iniciar Socket.io pasando el servidor HTTP
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // la URL del frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  },
});

// Manejar la conexión de socket
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

// Registrar rutas
app.use("/api/v1", routes);

// Iniciar el servidor
server.listen(port, () => {
  console.log("Servidor corriendo en puerto:", port);
});
