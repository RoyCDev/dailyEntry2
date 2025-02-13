import { z } from "zod"

const journalSchema = z.object({
    description: z.string().nonempty("Journal entry is empty"),
    date: z.coerce.date(),
    mood: z.number().min(1).max(5),
    activities: z.array(z.string()).optional()
})

export { journalSchema }