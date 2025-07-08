const mongoose = require("mongoose");
require("dotenv").config();
const dbgr = require("debug")("development:mongoose");


const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error(" MONGODB_URI is not defined. Check your .env or environment settings.");
}


mongoose.connect(uri)
  .then(() => dbgr(" MongoDB connected"))
  .catch((err) => dbgr(" MongoDB connection error:", err));
module.exports = mongoose.connection;