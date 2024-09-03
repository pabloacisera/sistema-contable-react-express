import { Router } from "express";
import { createUser, loginUser } from "../controllers/user.controllers.js";

const router = Router()

router.post("/create_user", createUser)
router.post("/login_user", loginUser)

export default router