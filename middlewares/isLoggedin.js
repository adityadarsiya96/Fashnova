const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports = async function (req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    req.flash("error", "You need to login first"); 
    return res.redirect("/");
  }

  try {
    // @ts-ignore
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await userModel.findOne({ email: decoded.email }).select("-password");

    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/");
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("JWT error:", err);
    req.flash("error", "Something went wrong");
    res.redirect("/");
  }
};
