import express, { Router } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/user.routes.js";

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

// Register routes
app.use("/api/v1", routes);

app.listen(port, () => {
  console.log("Servidor corriendo en puerto:", port);
});
