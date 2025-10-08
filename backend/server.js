import express from "express"
import cors from "cors"
import 'dotenv/config'
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoutes.js"
import postRouter from "./routes/postRoutes.js"

// app config
const app = express()
const PORT = process.env.PORT || 4500

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

// db connection
connectDB()

// api endpoints
app.use("/images", express.static("uploads"))
app.use("/api/user", userRouter)
app.use("/api/post", postRouter)

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(PORT, () => {
    console.log('Server started on 4500')
})