const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { protectedRoute } = require("./middleware/blog.middlewar")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(cookieParser())

app.use("/api/auth", require("./routers/user.route"))
app.use("/api/blog", protectedRoute, require("./routers/blog.route"))
app.use("*", (req, res) => {
    res.status(404).json({ message: "resource not found" })
})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("mongodb coonected")
    app.listen(process.env.PORT, console.log("server running to port....", process.env.PORT))
})