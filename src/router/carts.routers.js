const { Router } =require("express");
const router = Router();

const CartManager = CartMongoManager=require("../dao/CartMongoManager.js");
const ProductManager = ProductMongoManager =require("../dao/ProductMongoManager.js");
const { isValidObjectId } = require("mongoose");

//CartManager.path = "./src/data/carts.json"; 

router.get("/", async (req, res) =>{
    let cart
    try {
        cart = await CartManager.getCart();
        
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json(
            {
                error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle: `${error.message}`
            }
        )
    }

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({payload:cart});
})

router.get("/:cid", async(req, res) => {

    let {cid}=req.params
    if(!isValidObjectId(cid)){

        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`el id debe ser valido`})
    }

    try {
        let cart=await CartManager.getCartBy({_id:cid})
        if (!cart) {
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`no exites un carrito con el id indicado`})
        }
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:cart});
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }

})

router.post("/", async(req,res) =>{

    try {
        cart=await CartManager.createCarrito()
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({cart});
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }

    

    /*let { id } = req.body
    if (!id || typeof id !== 'number') {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Por favor ingresa un ID que tiene que ser de tipo numerico`})
    }

    let products = await ProductManager.getProduct()
    let index = products.findIndex(p=>p.id === id)

    if(index === -1){
        throw new Error(`no existe el id ${id}`)

    }

    let productToAdd = {...products[index]}

    try {
        await CartManager.createCarrito(productToAdd)
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({productToAdd});
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
        
    }*/

})

router.post("/:cid/product/:pid", async(req, res) =>{

    let { cid, pid } = req.params
    if (!isValidObjectId(cid)|| !isValidObjectId(pid)) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Los id's deben ser validos`})
        
    }

    let cart = await CartManager.getCartBy({_id:cid})
    if (!cart) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`no existe un carrito con id ${cid}`})
    }

    let product = await ProductManager.getProductBy({_id:pid})
    if (!product) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`no existe un producto con id ${pid}`})
    }

    let indiceProduct = cart.products.findIndex(p=>p.product._id==pid)
    if (indiceProduct===-1) {
        cart.products.push({
            product:pid,
            quantity:1
        })
        
    }else{
        cart.products[indiceProduct].quantity++
    }
    
    cart = await CartManager.addToCart(cid, cart)
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:cart});

})

router.delete("/:cid/product/:pid",async(req,res)=>{
    let { cid, pid }= req.params
    console.log(cid, pid)
    if (!isValidObjectId(cid)|| !isValidObjectId(pid)) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Los id's deben ser validos`})
        
    }

    let cart = await CartManager.getCartBy({_id:cid})
    if (!cart) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`no existe un carrito con id ${cid}`})
    }
   // let product = await ProductManager.getProductBy({_id:pid})
   /* if (!product) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`no existe un producto con id ${pid}`})
    }*/

    let indiceProduct = cart.products.findIndex(p=>p.product._id==pid)
    if(indiceProduct === -1){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`no existe un producto con id ${pid} en este carriro`})
    }else{
        cart.products.splice(indiceProduct,1)
    }

    cart = await CartManager.addToCart(cid, cart)
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:cart});
})

router.delete("/:cid", async(req,res)=>{

    let {cid}=req.params
    if (!isValidObjectId(cid) || !cid) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`el id ${cid} no es valido`})
    }
    try {
        let cart=await CartManager.getCartBy({_id:cid})
        cart.products=[]
        console.log(cart);
        await CartManager.addToCart(cid,cart)
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"el carrito fue vaciado con exito"});

    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }
})

router.put("/:cid", async(req,res)=>{
    let {cid}=req.params
    let {products} = req.body
    if(!isValidObjectId(cid)){

        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`el id debe ser valido`})
    }
    if (!products) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`el objeto debe tener contenido`})
    }
    try {
        let cart = await CartManager.getCartBy({_id:cid})
        if (!cart) {
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`no exites un carrito con el id indicado`})
        }
        cart.products=[]
        // products.forEach(async p => {
        for(let i=0; i<products.length; i++){
            
            console.log(products[i])
            let product = await ProductManager.getProductBy({_id:products[i].product})
            if (!product) {
                res.setHeader('Content-Type','application/json');
                return res.status(400).json({error:`producto con id ${products[i].product} no existente`})
            }
            cart.products.push({
                product:products[i].product,
                quantity:products[i].quantity
    
            })
        }
            
        // });
        console.log({cart});
        cart=await CartManager.addToCart(cid,cart)
        //console.log(products);
        console.log({cart})
        if(cart.modifiedCount>0){
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({payload:`Cart ${cid} actualizado...!!!`});
            //console.log(cart.products);
        }else{
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`No se ha podido llevar a cabo la modificación. Verifique`})
        }
        
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
        
    }
})// en este punto no llegue a comprender exactamente que pedia la consigna

router.put("/:cid/product/:pid", async(req,res)=>{
    let {cid, pid}=req.params
    let { quantity }= req.body
    if(!isValidObjectId(cid)|| !isValidObjectId(pid)){

        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`el id debe ser valido`})
    }
    let cart = await CartManager.getCartBy({_id:cid})
    if (!cart) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`no existe un carrito con id ${cid}`})
    }

    let indiceProduct = cart.products.findIndex(p=>p.product._id==pid)
    if(indiceProduct === -1){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`no existe un producto con id ${pid} en este carriro`})
    }else{
        cart.products[indiceProduct].quantity = quantity
    }

    try {
        cart = await CartManager.addToCart(cid, cart)
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:cart});
        
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle:`${error.message}`
            }
        )
    }
    

})

module.exports={ router };
