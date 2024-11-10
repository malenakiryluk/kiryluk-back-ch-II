const express = require("express");
//const fs = require("fs");
const { router:productRouter } = require("./router/products.router.js");
const { router:cartRouter } = require("./router/carts.routers");
const { router:viewsRouter }= require("./router/views.router.js")
const { router:sessionsRuter }= require("./router/sessions.router.js")
const engine=require('express-handlebars').engine
const path=require('path');
const {Server} = require("socket.io");
const connDB=require('./connDB.js');
const {config} = require("./config/config.js")
const {auth} = require("./middleware/auth.js")
const passport=require("passport")
const cookieParser=require("cookie-parser")
const {initPassport} = require("./config/passport.config.js")

//const { Server } = require("http");
let io;

//const PORT=;

const app=express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'./views'));
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
initPassport()
app.use(passport.initialize())
app.use(cookieParser())
app.use(express.static("./src/public"))

app.use("/api/products", passport.authenticate('current',{session:false}), productRouter);
app.use("/api/carts",passport.authenticate('current',{session:false}), cartRouter);

app.use("/api/sessions", sessionsRuter);
app.use("/", viewsRouter);

app.get("/", (req, res)=>{

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('Home Page');

})


const server =app.listen(config.PORT , ()=>console.log(`servidor activo en puerto ${config.PORT}`));
io=new Server(server);

connDB();
