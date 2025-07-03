const mongoose =require("mongoose")


const ownerSchema = new mongoose.Schema({
    fullname:{
        type:String,
        minLength:3,
        trim:true,
    },
    product:{
        type:Array,
        default:[],
    },
    gstin:String,

    contact:Number,
    picture:String

})

module.exports = mongoose.model("owner",ownerSchema)