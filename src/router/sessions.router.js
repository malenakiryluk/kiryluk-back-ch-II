const { Router }=require('express');
const router=Router()
const passport=require("passport")
const {createUser, loginUser, verifyUser}=require("../controllers/usersController")

router.get('/error', async (req, res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(401).json({error:`error al autenticar`})
})

router.post(
    '/registro', 
    passport.authenticate("registro", {session: false, failureRedirect:"/api/sessions/error"}),
    createUser)

router.post('/login', 
    passport.authenticate("login", {session:false, failureRedirect: "api/sessions/error"}),
    loginUser)

router.post('/current',
    passport.authenticate("current", {session:false, failureRedirect:"api/sessions/error"}),
    verifyUser)


module.exports={router}