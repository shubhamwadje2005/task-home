const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.userregister = asyncHandler(async (req, res) => {
    const result = await User.findOne({
        $or:
            [{ email: req.body.email },
            { mobile: req.body.mobile }]
    })
    if (result) {
        return res.status(401).json({ message: "email or mobile already exist" })
    }
    const hash = await bcrypt.hash(req.body.password, 10)
    await User.create({ ...req.body, password: hash })
    res.json({ message: "user register success" })
})
exports.userlogin = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    const result = await User.findOne({
        $or:
            [{ email: username },
            { mobile: username }]
    })
    if (!result) {
        return res.status(401).json({ message: `${username} not found` })
    }

    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(401).json({ message: "invalid password" })
    }

    const token = jwt.sign({ _id: result._id, name: result.name }, process.env.JWT_KEY)
    res.cookie("USER", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: false })
    res.json({
        message: "user login success", result: {
            name: result.name,
            email: result.email,
        }
    })
})
exports.userlogout = asyncHandler(async (req, res) => {
    res.clearCookie("USER")
    res.json({ message: "user logout success" })
})