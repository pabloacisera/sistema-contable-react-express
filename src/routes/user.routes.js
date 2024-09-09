import { Router } from "express";
import multer from "multer";
import { createUser, loginUser } from "../controllers/user.controllers.js";
import { createClient, deleteClientById, getAllClientByUserId } from "../controllers/client.controller.js";
import { createProviders, deleteProviderById, getAllProvider, getProviderById } from "../controllers/prov.controller.js";
import { CreateProduct, DeleteProductById, getAllProductsByProvId, getOneProductById, getProductForAdmin } from "../controllers/products.controller.js";
import { getCashFromBox, createBalance, updateIntoCashFromBox, updateOutCashFromBox } from "../controllers/cashbox.js";
import { createPurchase } from "../controllers/purchase.controller.js";
import { createMovement, getAllMovement } from "../controllers/movement.controller.js";
import { createDocument } from "../controllers/documents.controller.js";

const router = Router()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/create_user", createUser)
router.post("/login_user", loginUser)

//crear y listar clientes

router.post("/create-client", createClient)
router.get("/get-client-by-user-id/:userId", getAllClientByUserId)
router.delete("/delete-client/:id", deleteClientById)

//crear y listas proveedores

router.post("/create-prov", createProviders)//crear nuevo proveedor
router.get("/get-all-prov", getAllProvider)//traer todos los proveedores
router.delete("/delete-prov/:id", deleteProviderById)//borrar proveedor por id
router.get('/get-provider-by-id/:id', getProviderById)//traer los datos de un proveedor

//crear y lista productos

router.post("/create-prod", CreateProduct)//crear nuevo producto
router.get("/view-products/:id", getAllProductsByProvId)//ver los productos que le pertenecen a un id
router.delete("/delete-product/:id", DeleteProductById)//borrar por id
router.get('/get-all-products-for-admin', getProductForAdmin)//ver todos los productos
router.get('/get-one-product-by-id/:id', getOneProductById)//obtener el producto por id del mismo


//crear y actualizar saldo de caja

router.post('/create-balance', createBalance)//cargar saldo inciail
router.get('/get-balance', getCashFromBox)//devolver el saldo
router.post('/update-into-balance', updateIntoCashFromBox)//actualizar saldo
router.post('/update-out-balance', updateOutCashFromBox)//retirar saldo

//crear y lista comprar
router.post('/create-purchase', createPurchase)

//crear y listar movimientos
router.post('/create-movement', createMovement )
router.get('/get-all-movement', getAllMovement)

//crear documentos
router.post('/create-document', upload.single('document'), createDocument);


export default router 