const jwt = require("jsonwebtoken")
const {config}=require("../config/config.js")

const auth=(req,res,next)=>{
    if (!req.cookies.tokenCookie) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`unauthorized - no hay user logeado`})
    }

    let token = req.cookies.tokenCookie
    try {
        req.user=jwt.verify(token, config.SECRET)
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`${error.message}`})
    }

    next()
}

module.exports={auth}