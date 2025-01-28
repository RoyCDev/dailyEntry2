import jwt from "jsonwebtoken"

const generateToken = (userId, response) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
    response.cookie("jwt", token, {
        maxAge: 24 * 60 * 60 * 1000
    })
}

export default generateToken