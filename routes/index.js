const express = require("express")
const router = express.Router()
const isLoggedin = require("../middlewares/isLoggedin")
const productModel = require("../models/productModel")
const userModel = require("../models/userModel")

router.get("/",function(req,res){
    let error = req.flash("error")
    res.render("index",{error})
})
router.get("/shop",isLoggedin,async function(req,res){
    let products = await productModel.find()
    res.render("shop",{ products})
})
router.get("/buynow/:id",isLoggedin,async function(req,res){
    console.log("user is ",req.user)
    const productid = req.params.id
    let product = await productModel.findById(productid)
    res.render('cart',{product})
    

})
router.get("/placeorder/:id",isLoggedin,async function(req,res){
    const productid = req.params.id
    let product = await productModel.findById(productid)
    res.render('place-order',{product})
    

})
router.post("/placeorder/:id",isLoggedin,async function(req,res){
    const { productId, address } = req.body;
  const userId = req.user._id; 


  const product = await productModel.findById(productId);
  if (!product) return res.status(404).send("Product not found");

  await userModel.findByIdAndUpdate(userId, { address });


  res.render("thanks");
    

})



router.get("/logout",isLoggedin,function(req,res){
     res.render("index")
})

module.exports = router;