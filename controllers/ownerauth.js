const express = require("express")
const router = express.Router()
const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")
const { genTokenOwner } = require("../utils/generateToken")
const productModel = require("../models/productModel")
const ownerModel = require("../models/ownerModel")

module.exports.ownerRegister = async function (req, res) {
    try {
        let { email, password, fullname, gstin } = req.body;
        let user = await ownerModel.findOne({ email: email })
        if (user) return res.status(401).send("You already have an admin account please login ")
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) {
                    res.send("Some error occured")
                }
                else {
                    let owner = await ownerModel.create({
                        email,
                        fullname,
                        password: hash,
                        gstin,

                    })
                    let token = genTokenOwner(owner)
                    res.cookie("token", token)

                    res.render("createproduct")

                }
            })
        })

    }
    catch (err) {
        res.send(err.message)
    }



}

module.exports.loginOwner = async function (req, res) {

    let { email, password } = req.body;
    let owner = await ownerModel.findOne({ email: email })
    console.log(email)
    if (!owner || !owner.password) return res.send("Email or password incorrect")

    bcrypt.compare(password, owner.password, async function (err, result) {
        if (result) {
            let token = genTokenOwner(owner)
            res.cookie("token", token)


            res.render("createproduct")


        }
        else {
            return res.send("Email or Password incorrect")

        }


    })


}
