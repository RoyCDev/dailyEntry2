import { Router } from "express";
import { signUp, login, logout, authCheck } from "../controllers/auth.js";
import protectRoute from "../middleware/protectRoute.js"
import validateData from "../middleware/validateData.js";
import { signUpSchema, loginSchema } from "../validators/auth.js"

const router = Router()
router.post("/signup", validateData(signUpSchema), signUp)
router.post("/login", validateData(loginSchema), login)
router.post("/logout", logout)
router.get("/check", protectRoute, authCheck)

export default router