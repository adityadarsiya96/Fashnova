const mongoose =require("mongoose")


const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        default:[]
    }],
    orders:{
        type:Array,
        ref:"product"
    },
    contact:Number,
    picture:String,
    password:String,
    address:String


})

module.exports = mongoose.model("user",userSchema)