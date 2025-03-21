const blog = require("../controller/blog.controller")
const { patch } = require("./user.route")

const route = require("express").Router()

route
    .post("/create", blog.createBlog)
    .get("/", blog.getBlog)
    .patch("/update/:bid", blog.updateBlog)
    .delete("/delete/:bid", blog.deleteBlog)

module.exports = route