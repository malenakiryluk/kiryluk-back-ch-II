const jwt = require("jsonwebtoken")
const {config}=require("../config/config.js")

const auth=(req,res,next)=>{
    if (!req.headers.authorization) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`unauthorized-no token`})
    }

    let token = req.headers.authorization.split(" ")[1]
    try {
        req.user=jwt.verify(token, config.SECRET)
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`${error.message}`})
    }

    next()
}

module.exports={auth}