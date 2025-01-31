import User from "../models/User.js"
import bcryptjs from "bcryptjs"
import generateToken from "../config/generateToken.js"

const signUp = async (request, response) => {
    const { email, username, password } = request.body
    try {
        const user = await User.findOne({ $or: [{ email }, { username }] })
        if (user?.email === email)
            return response.status(409).json({ error: "email already exists" })

        if (user?.username === username)
            return response.status(409).json({ error: "username already exists" })

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = new User({
            email, username, password: hashedPassword
        })
        await newUser.save()
        generateToken(newUser._id, response)
        return response.status(201).json(newUser)
    }

    catch (error) {
        console.log("Error in signUp controller", error.message);
        return response.status(500).json({ error: "Internal server error" })
    }
}

const login = async (request, response) => {
    const { username, password } = request.body;
    try {
        const user = await User.findOne({ username })
        if (!user || !await bcryptjs.compare(password, user.password))
            return response.status(401).json({ error: "incorrect crendtials" })

        generateToken(user._id, response)
        return response.status(201).json(user)

    } catch (error) {
        console.log("Error in login controller", error.message);
        return response.status(500).json({ error: "Internal server error" })
    }
}

const logout = async (request, response) => {
    try {
        response.clearCookie("jwt")
        return response.status(200).json({ message: "logout successfully" })
    }
    catch (error) {
        console.log("Error in logout controller", error.message);
        return response.status(500).json({ error: "Internal server error" })
    }
}

const authCheck = async (request, response) => {
    try {
        const user = request.user
        return response.status(200).json(user)
    } catch {
        console.log("Error in authCheck controller", error.message);
        return response.status(500).json({ error: "Internal server error" })
    }
}

export { signUp, login, logout, authCheck }