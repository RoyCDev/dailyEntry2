import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import routes from "./routes/index.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use("/api/", routes)

app.listen(PORT, () => {
    console.log("Connected to port", PORT)
    connectDB()
})