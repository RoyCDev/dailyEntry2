import { ZodError } from "zod"

// returns a generic middleware. This way, I don't need to make a separate 
// validate fn for each schema 
const validateData = (schema) => {
    return (request, response, next) => {
        try {
            schema.parse(request.body)
            next()
        } catch (error) {
            return error instanceof ZodError ?
                response.status(400).json({ error: error }) :
                response.status(500).json({ error: "Internal server error" })
        }
    }
}

export default validateData