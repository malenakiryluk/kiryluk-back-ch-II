const mongoose = require("mongoose")

const ticketsModel=mongoose.model(
    "tickets",
    new mongoose.Schema(
        {
            code:String,
            purchase_datetime:Date,
            amount:Number,
            purchaser:String
        },
        {
            timestamps:true
        }
    )
)

module.exports=ticketsModel;