import { z } from "zod"

const goalSchema = z.object({
    description: z.string(),
    priority: z.enum(["high", "mid", "low"]),
    completedAt: z.string().optional()
})

export { goalSchema }