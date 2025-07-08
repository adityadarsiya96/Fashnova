const express = require("express")
const router = express.Router()
const {register,loginUser,logout} = require("../controllers/authController")


router.get("/", function (req, res) {
    res.render("index")
})
router.post("/register",register)
router.post("/login",loginUser)
router.get("/logout",logout)

module.exports = router