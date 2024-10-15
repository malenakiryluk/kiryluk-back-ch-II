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
    passport.authenticate("registro", {sessions:false, failureRedirect:"/api/sessions/error"}),
    (req,res)=>{
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({payload: 'registro correcto'});
    }
)

router.post('/login', 
    passport.authenticate("registro", {sessions:false, failureRedirect: "api/sessions/error"}),
    (req,res)=>{

        let token =jwt.sign(req.user, config.SECRET, {expiresIn: 3600})
        
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({payload: 'registro correcto'});
    }
)


module.exports={router}