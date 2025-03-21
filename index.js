const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { protectedRoute } = require("./middleware/blog.middlewar")
const path = require("path");
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(express.static("dist"));
app.use(cors({ origin: "https://task-home.onrender.com", credentials: true }))
app.use(cookieParser())

app.use("/api/auth", require("./routers/user.route"))
app.use("/api/blog", protectedRoute, require("./routers/blog.route"))
app.use("*", (req, res) => {
    // res.status(404).json({ message: "resource not found" })
    res.sendFile(path.join(__dirname, "dist", "index.html"));

})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("mongodb coonected")
    app.listen(process.env.PORT, console.log("server running to port....", process.env.PORT))
})