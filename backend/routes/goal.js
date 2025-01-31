import { Router } from "express";
import protectRoute from "../middleware/protectRoute.js"
import { createGoal, getGoals, updateGoal, deleteGoal } from "../controllers/goal.js";
import { goalSchema } from "shared"
import validateData from "../middleware/validateData.js"

const router = Router()
router.post("/", protectRoute, validateData(goalSchema), createGoal)
router.get("/", protectRoute, getGoals)
router.put("/:id", protectRoute, validateData(goalSchema), updateGoal)
router.delete("/:id", protectRoute, deleteGoal)

export default router;