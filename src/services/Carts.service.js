const CartManager=CartMongoManager=require("../dao/CartMongoManager")

class CartService{
    constructor(DAO){
        this.CartManager=DAO
    }

    async getCart(){
        return await this.CartManager.getCart()
    }

    async getCartBy(filter){
        return await this.CartManager.getCartBy(filter)
    }

    async createCart(){
        return await this.CartManager.createCart()
    }

    async addToCart(cartId, cart){
        return await this.CartManager.addToCart(cartId, cart)
    }
}

const cartService= new CartService(CartManager)
module.exports = cartService

