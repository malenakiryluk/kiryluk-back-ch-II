const mongoose = require("mongoose")
const paginate = require('mongoose-paginate-v2')

const productsColl= "products"
const productsSchema = new mongoose.Schema(
    {
        title : String, 
        description: String, 
        code: {
            type: Number,
            unique: true
        }, 
        price: Number, 
        status: Boolean, 
        stock: Number, 
        category: String
    },
    {
        timestamps:true

    }
)
productsSchema.plugin(paginate)

const productsModel = mongoose.model(
    productsColl,
    productsSchema
)



module.exports =productsModel;