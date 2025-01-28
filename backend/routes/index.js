import { Router } from "express"
import authRoutes from "./auth.js"
import journalRoutes from "./journal.js"

const router = Router()
router.use("/v1/auth", authRoutes)
router.use("/v1/journals", journalRoutes)

export default router