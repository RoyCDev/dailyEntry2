import { Router } from "express"
import authRoutes from "./auth.js"
import journalRoutes from "./journal.js"
import goalRoutes from "./goal.js"

const router = Router()
router.use("/v1/auth", authRoutes)
router.use("/v1/journals", journalRoutes)
router.use("/v1/goals", goalRoutes)

export default router