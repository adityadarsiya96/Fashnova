const express = require("express")
const router = express.Router()
const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")
const { generateToken } = require("../utils/generateToken")
const productModel = require("../models/productModel")
const ownerModel = require("../models/ownerModel")


module.exports.register = async function (req, res) {
    try {
        let { email, password, username } = req.body;
        let user = await userModel.findOne({ email: email })
        if (user) return res.status(401).send("You already have an account please login ")
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) {
                    return res.send(err.message)
                }
                else {
                    let user = await userModel.create({
                        email,
                        username,
                        password: hash,

                    })
                    let token = generateToken(user)
                    res.cookie("token", token)
                    let products = await productModel.find()
                    res.render("shop", { products })
                }
            })
        })

    }
    catch (err) {
        res.send(err.message)
    }



}

module.exports.loginUser = async function (req, res) {

    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email })
    if (!user || !user.password) return res.send("Email or Password incorrect")

    bcrypt.compare(password, user.password, async function (err, result) {
        if (result) {
            let token = generateToken(user)
            res.cookie("token", token)

            let products = await productModel.find()
            res.render("shop", { products })


        }
        else {
            return res.send("Email or Password incorrect")

        }


    })


}

module.exports.logout = function (req, res) {
    res.cookie("token", "")
    res.redirect("/")
}


