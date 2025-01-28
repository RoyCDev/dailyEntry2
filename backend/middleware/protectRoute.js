import jwt from "jsonwebtoken"
import User from "../models/User.js"

const protectRoute = async (request, response, next) => {
    try {
        const token = request.cookies.jwt;
        if (!token)
            return response.status(401).json({ error: "no token provided" })

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded)
            return response.status(401).json({ error: "invalid token" })

        const user = await User.findById(decoded.userId)
        if (!user)
            return response.status(404).json({ error: "user not found" })

        request.user = user
        next()
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message)
        return response.status(500).json({ error: "Internal server error" })
    }
}

export default protectRoute