import { Router } from "express";
import { createUser, loginUser } from "../controllers/user.controllers.js";
import { createClient, deleteClientById, getAllClientByUserId } from "../controllers/client.controller.js";
import { createProviders, deleteProviderById, getAllProvider, getProviderById } from "../controllers/prov.controller.js";
import { CreateProduct, DeleteProductById, getAllProductsByProvId, getProductForAdmin } from "../controllers/products.controller.js";
import { getCashFromBox, createBalance, updateIntoCashFromBox, updateOutCashFromBox } from "../controllers/cashbox.js";

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
router.get('/get-provider-by-id/:id', getProviderById)

//crear y lista productos

router.post("/create-prod", CreateProduct)
router.get("/view-products/:id", getAllProductsByProvId)
router.delete("/delete-product/:id", DeleteProductById)
router.get('/get-all-products-for-admin', getProductForAdmin)


//crear y actualizar saldo de caja

router.post('/create-balance', createBalance)
router.get('/get-balance', getCashFromBox)
router.post('/update-into-balance', updateIntoCashFromBox)
router.post('/update-out-balance', updateOutCashFromBox)

export default router 