//const fs=require("fs");
const cartsModel = require("./models/cartsModels");

class CartMongoManager {

    static async getCart(){
        return await cartsModel.find().lean()
    }

    static async getCartBy(filter={}){
        return await cartsModel.findOne(filter).lean()
    }

    static async createCart() {
        let newCart =await cartsModel.create({products:[]})
        return newCart.toJSON()
    };

    static async addToCart(cartId, cart){
        //console.log(cart);
        //console.log(cart.products);
        return await cartsModel.updateOne({_id:cartId},cart)
    }

}



module.exports=CartMongoManager;