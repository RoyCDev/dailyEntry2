import { z } from "zod"

const signUpSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z
        .string()
        .min(6, "Password must have at least 6 characters")
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/, "Password must have at least 1 uppercase, 1 lowercase, and a number")
})

const loginSchema = z.object({
    username: z.string().nonempty(),
    password: z.string().nonempty()
})

export { signUpSchema, loginSchema }