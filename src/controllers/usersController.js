const jwt=require("jsonwebtoken")
const {config} = require("../config/config")

const createUser= async(req, res)=>{
    // req.user // lo deja passport.authenticate si todo sale OK
    res.setHeader('Content-Type','application/json');
    return res.status(201).json({payload:`Registro exitoso para ${req.user.first_name}`, usuario:req.user});
}

const loginUser=async(req,res)=>{

    let token =jwt.sign(req.user, config.SECRET, {expiresIn: 3600})
    res.cookie("tokenCookie", token, {httpOnly:true})
    res.setHeader('Content-Type','application/json');
    return res.status(201).json({payload: 'login correcto', logedUser:req.user});
}

const verifyUser=async(req,res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload: 'usuario logeado:', logedUser:req.user});
}

module.exports={createUser, loginUser, verifyUser}