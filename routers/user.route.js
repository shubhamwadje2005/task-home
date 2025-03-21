const auth = require("../controller/user.controller")

const route = require("express").Router()

route
    .post("/register", auth.userregister)
    .post("/login", auth.userlogin)
    .post("/logout", auth.userlogout)

module.exports = route