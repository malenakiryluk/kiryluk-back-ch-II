const passport=require("passport")
const local =require("passport-local")
const passportJWT = require("passport-jwt")
const generaHash = require("../utils")
const validaHash = require("../utils")
const {config} =require("./config.js")
const usersService = require("../services/Users.service")


const searchToken= req=>{
    let token = null

    if (req.cookies.tokenCookie) {
        token= req.cookies.tokenCookie
    }

    return token
}

const initPassport=()=>{

    passport.use("registro", 
        new local.Strategy(
            {
                passReqToCallback: true, 
                usernameField: "email"
            },
            async(req, username, password, done)=>{
                try {
                    let {first_name, last_name, age, cart, role}=req.body
                    if(!first_name || !last_name || !age || !cart || !role){
                        return done(null, false)
                    }
                    let existe=await usersService.getUserBy({email:username})
                    if(existe){
                        return done(null, false)
                    }

                    password=generaHash(password)

                    let newUser=await usersService.createUser ({first_name, last_name, email: username, password, age, cart, role})
                    return done(null, newUser)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use("login",
        new local.Strategy(
            {
                usernameField: "email"
            },
            async (username, password, done)=>{
                try {
                    let user = await usersService.getUserBy({email:username})
                    if (!user) {
                        return done(null, false)
                    }
                    if (!validaHash(password, user.password)) {
                        return done(null, false)
                    }

                    delete user.password
                    return done(false, user)

                } catch (error) {
                    return done(error)
                }
            }
        )
        
    )

    passport.use("current",
        new passportJWT.Strategy(
            {
                secretOrKey: config.SECRET,
                jwtFromRequest: new passportJWT.ExtractJwt.fromExtractors([searchToken])
            },
            async (user, done)=>{
                try {
                    return done(null,user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

}



module.exports={initPassport}