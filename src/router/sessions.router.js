const { Router }=require('express');
const router=Router()
const crypto=require("crypto"); 
const UsersManager=UsersMongoManager = require('../dao/UsersMongoManager');
const config = require("../config/config")

router.post('/registro',async (req,res)=>{

    let {name, email, password} = req.body

    if (!name || !email || !password) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`complete los datos por favor`})
    }

    try {
        let exists = await UsersManager.getUserBy({email})
        if (exists) {
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`ya existe un usuario con mail ${email}`})
        }

        password=crypto.createHmac("sha256", config.SECRET).update(password).digest("hex")

        let newUser = await UsersManager.createUser({name, email, password})

        res.setHeader('Content-Type','application/json')
        res.status(201).json({mensaje: "registro exitoso", newUser})
        
    } catch (error) {
        
    }
})


module.exports={router}