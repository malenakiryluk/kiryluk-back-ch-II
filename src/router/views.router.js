const {Router}=require('express');
const router=Router()
const auth = require("../middleware/auth.js")

const ProductManager = ProductMongoManager = require("../dao/ProductMongoManager");
const CartManager = CartMongoManager=require("../dao/CartMongoManager.js");


router.get("/", async(req, res)=>{

    res.setHeader('Content-Type','text/html');
    res.status(200).render('home');

})

router.get("/login", async(req, res)=>{

    res.setHeader('Content-Type','text/html');
    res.status(200).render('login');

})
router.get("/register", async(req, res)=>{

    res.setHeader('Content-Type','text/html');
    res.status(200).render('register');

})
router.get("/products", auth, async(req, res)=>{

    res.setHeader('Content-Type','text/html');
    res.status(200).render('products');

})

router.get("/realtimeproducts", (req, res)=>{

    res.setHeader('Content-Type','text/html');
    return res.status(200).render('realTimeProducts');
})

router.get("/carts/:cid", async(req,res)=>{
    let {cid}=req.params
    let cart = await CartManager.getCartBy({_id:cid})
    let cartProducts = cart.products
    res.setHeader('Content-Type','text/html');
    return res.status(200).render('carts',{
        cartProducts
    });
})

module.exports={router}