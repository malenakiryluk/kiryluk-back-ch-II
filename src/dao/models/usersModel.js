const mongoose=require("mongoose")

const usersModel=mongoose.model(
    "users",
    new mongoose.Schema(
        {
            first_name:String,
            last_name:String,
            email:{
                type:String,
                unique:true
            },
            age:Number,
            password:String,
            cart:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "carts"
            },
            role:{
                type:String,
                default:"user"
            }

        },
        {
            timestamps:true
        }
    )
)

module.exports=usersModel