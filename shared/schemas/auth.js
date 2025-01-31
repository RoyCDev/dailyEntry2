import { z } from "zod"

const signUpSchema = z
    .object({
        username: z.string().nonempty("Please enter a username"),
        email: z.string().email(),
        password: z
            .string()
            .min(6, "Password must have at least 6 characters")
            .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/, "Password must have at least 1 uppercase, 1 lowercase, and a number"),
        confirmPassword: z.string()
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"]
    })

const loginSchema = z.object({
    username: z.string().nonempty("Please enter your username"),
    password: z.string().nonempty("Please enter your password")
})

export { signUpSchema, loginSchema }