import { Router } from "express"
import { createJournal, getJournal, updateJournal, deleteJournal, getJournalsByMonth, getJournalByDate } from "../controllers/journal.js"
import protectRoute from "../middleware/protectRoute.js"
import { journalSchema } from "shared"
import validateData from "../middleware/validateData.js"

const router = Router()

router.post("/", protectRoute, validateData(journalSchema), createJournal)
router.get("/:id", protectRoute, getJournal)
router.get("/:year/:month/:day", protectRoute, getJournalByDate)
router.get("/:year/:month", protectRoute, getJournalsByMonth)
router.put("/:id", protectRoute, validateData(journalSchema), updateJournal)
router.delete("/:id", protectRoute, deleteJournal)

export default router;