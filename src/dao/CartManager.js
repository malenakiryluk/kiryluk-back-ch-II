const fs=require("fs");

class CartManager {
    static path;

    static async getCart(){

        if(fs.existsSync(this.path)){
            let cart=JSON.parse(await fs.promises.readFile(this.path, {encoding:"utf-8"}))
            return cart
        }else{
            return []
        }

    }

    static async createCarrito() {

        let cart = await this.getCart();

        let id = 1;
        if (cart.length>0) {
            id =Math.max(...cart.map(c=>c.id))+1
        }

        cart.push({
            id,
            products:[]
        })

        await fs.promises.writeFile(this.path, JSON.stringify(cart, null, 5))
        return id

    };

    static async addToCart(cartId, cart={}){

        let carrito = await this.getCart()
        let indexCart = carrito.findIndex(c=>c.id === cartId)
        if (indexCart=== -1){
            throw new Error(`${id} carrito inexistente`)
            
        }
    

        carrito [indexCart] = cart
        await fs.promises.writeFile(this.path, JSON.stringify(carrito, null, 5))
        return carrito[indexCart]
        
    }





}



module.exports=CartManager;