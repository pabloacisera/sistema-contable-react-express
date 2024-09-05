import { Router } from "express";
import { createUser, loginUser } from "../controllers/user.controllers.js";
import { createClient, deleteClientById, getAllClientByUserId } from "../controllers/client.controller.js";
import { createProviders, deleteProviderById, getAllProvider } from "../controllers/prov.controller.js";

const router = Router()

router.post("/create_user", createUser)
router.post("/login_user", loginUser)

//crear y listar clientes

router.post("/create-client", createClient)
router.get("/get-client-by-user-id/:userId", getAllClientByUserId)
router.delete("/delete-client/:id", deleteClientById)

//crear y listas proveedores

router.post("/create-prov", createProviders)
router.get("/get-all-prov", getAllProvider)
router.delete("/delete-prov/:id", deleteProviderById)

export default router