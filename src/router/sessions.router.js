const { Router }=require('express');
const router=Router()
const passport=require("passport")
const jwt=require("jsonwebtoken")
const UsersManager=UsersMongoManager = require('../dao/UsersMongoManager');
const config = require("../config/config")

router.get('/error', async (req, res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(401).json({error:`error al autenticar`})
})

router.post(
    '/registro', 
    passport.authenticate("registro", {session: false, failureRedirect:"/api/sessions/error"}),
    (req, res)=>{
        // req.user // lo deja passport.authenticate si todo sale OK
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({payload:`Registro exitoso para ${req.user.nombre}`, usuario:req.user});
    }
)

router.post('/login', 
    passport.authenticate("login", {session:false, failureRedirect: "api/sessions/error"}),
    (req,res)=>{

        let token =jwt.sign(req.user, config.SECRET, {expiresIn: 3600})
        
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({payload: 'registro correcto', usuarioLogueado:req.user, token});
    }
)


module.exports={router}