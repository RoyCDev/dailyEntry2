import { z } from "zod"

const journalSchema = z.object({
    description: z.string(),
    date: z.string().date(),
    mood: z.number().min(1).max(10),
    activities: z.array(z.string())
})

export { journalSchema }