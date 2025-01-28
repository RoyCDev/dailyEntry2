import { Router } from "express";
import { signUp, login, logout } from "../controllers/auth.js";
import validateData from "../middleware/validateData.js";
import { signUpSchema, loginSchema } from "../validators/auth.js"

const router = Router()
router.post("/signup", validateData(signUpSchema), signUp)
router.post("/login", validateData(loginSchema), login)
router.post("/logout", logout)

export default router