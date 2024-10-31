const { Router } =require("express");
const router = Router();
const  ProductManager = ProductMongoManager = require("../dao/ProductMongoManager");
const { isValidObjectId } = require("mongoose");
const {getProduct, getProductBy, addProduct, modifyProduct, deleteProduct}=require("../controllers/productsController")

//ProductManager.path ="./src/data/products.json";

router.get ("/", getProduct)

router.get("/:pid", getProductBy)

router.post("/", addProduct)

router.put("/:pid", modifyProduct)

router.delete("/:pid", deleteProduct)

module.exports={ router };

