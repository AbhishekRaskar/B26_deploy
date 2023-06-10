const express = require("express");
const { UserModel } = require("../Model/user.model");

// jwt token
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

// for hashing password
const bcrypt = require("bcrypt")

require("dotenv").config()


// register
userRouter.post("/register", async (req, res) => {
    // logic
    const { name, email, pass } = req.body;

    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
                res.json({ error: err.message })
            }
            else {
                const user = new UserModel({ name, email, pass: hash })
                await user.save()
            }
        })
        res.json({ msg: "User has been Registered", user: req.body })
    } catch (error) {
        res.json({ error: error.message })
    }
})


// login
userRouter.post("/login", async (req, res) => {
    // logic
    const { pass, email } = req.body;
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(pass, user.pass, (err, result) => {
                if (result) {
                    // estiblished relationship connection here to add new not of perticulau user
                    let token = jwt.sign({ userID: user._id, userName: user.name }, process.env.secret)
                    res.json({ msg: "Logged In....!", token })
                }
                else {
                    res.json({ msg: "Wrong Credentials" })
                }
            })
        }
        else {
            res.json({ msg: "User does not Exist" })
        }
    }
    catch (error) {
        res.json({ error: error.message })
    }
})


module.exports = {
    userRouter
}