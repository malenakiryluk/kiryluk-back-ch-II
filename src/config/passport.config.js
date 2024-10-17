const passport=require("passport")
const local =require("passport-local")
const UsersManager = UsersMongoManager=require("../dao/UsersMongoManager")
const generaHash = require("../utils")
const validaHash = require("../utils")


const initPassport=()=>{

    passport.use("registro", 
        new local.Strategy(
            {
                passReqToCallback: true, 
                usernameField: "email"
            },
            async(req, username, password, done)=>{
                try {
                    let {name}=req.body
                    if(!name){
                        return done(null, false)
                    }
                    let existe=await UsersManager.getUserBy({email:username})
                    if(existe){
                        return done(null, false)
                    }

                    password=generaHash(password)

                    let newUser=await UsersManager.createUser ({name, email: username, password})
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
                    let user = await UsersManager.getUserBy({email:username})
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

}



module.exports={initPassport}