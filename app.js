const express = require ("express")
const app = express()
const cookieParser = require("cookie-parser")
const path = require("path")
const db = require("./config/mongooseConnection")
const ownersRouter = require("./routes/ownersRouter")
const usersRouter = require("./routes/usersRouter")
const productsRouter = require("./routes/productsRouter")
const adminRouter = require("./routes/ownersRouter")
const expressSession = require("express-session")
const flash = require("connect-flash")
const indexRouter = require("./routes/index")
require('dotenv').config()



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(
    expressSession({
        resave: false,
        saveUninitialized:false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash())
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))

app.use("/",indexRouter)
app.use("/owners",ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter);



app.listen(3000)