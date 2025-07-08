const jwt = require("jsonwebtoken")

const generateToken = (user)=>{
    // @ts-ignore
    return jwt.sign({email:user.email ,id:user._id},process.env.JWT_KEY)
};

module.exports.generateToken = generateToken
const genTokenOwner =(owner)=>{
    // @ts-ignore
    return jwt.sign({email:owner.email,id:owner._id},process.env.JWT_KEY)
}
module.exports.genTokenOwner = genTokenOwner
