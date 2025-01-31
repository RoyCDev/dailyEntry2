// returns a generic middleware. This way, I don't need to make a separate 
// validate fn for each schema 
const validateData = (schema) => {
    return (request, response, next) => {
        try {
            schema.parse(request.body)
            next()
        } catch (error) {
            response.status(400).json({ error: error })
        }
    }
}

export default validateData