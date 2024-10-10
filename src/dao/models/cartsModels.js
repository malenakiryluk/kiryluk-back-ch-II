const mongoose = require("mongoose")

const cartsColl= "carts"
const cartsSchema = new mongoose.Schema(
    {
        products: {
            type:[{
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: Number
            }]
        }
    },
    {
        timestamps:true
    }
)

cartsSchema.pre("findOne", function(){
    this.populate("products.product").lean()
})
cartsSchema.pre("find", function(){
    this.populate("products.product").lean()
})

const cartsModel = mongoose.model(
    cartsColl,
    cartsSchema
)

module.exports =cartsModel;