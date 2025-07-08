const express = require("express")
const router = express.Router()
const ownerModel = require("../models/ownerModel")
const {ownerRegister,loginOwner} = require("../controllers/ownerauth")

router.get("/admin",function(req,res){
    res.render("admin")
})
router.post("/register",ownerRegister)
router.post("/login",loginOwner)




module.exports = router