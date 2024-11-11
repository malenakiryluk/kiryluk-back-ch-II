const { Router } =require("express");
const router = Router();

const {getCart, getCartBy, createCart, addProductToCart, deleteProductFromCart, deleteCartContent, replaceCartContent, replaceQuantity, buyCart}=require("../controllers/cartController.js")


router.get("/", getCart)

router.get("/:cid", getCartBy)

router.post("/", createCart)

router.post("/:cid/product/:pid", addProductToCart)

router.delete("/:cid/product/:pid",deleteProductFromCart)

router.delete("/:cid", deleteCartContent)

router.put("/:cid", replaceCartContent)

router.put("/:cid/product/:pid", replaceQuantity)

router.post("/:cid/purchase", buyCart)

module.exports={ router };
