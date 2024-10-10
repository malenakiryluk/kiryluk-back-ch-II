const { Router } =require("express");
const router = Router();
const  ProductManager = ProductMongoManager = require("../dao/ProductMongoManager");
const { isValidObjectId } = require("mongoose");

//ProductManager.path ="./src/data/products.json";

router.get ("/", async (req, res) => {

    let { page, limit, sort, cat } = req.query
    sort=Number(sort)

    if (!page || isNaN(Number(page))){
        page = 1
    }
    if (!limit || isNaN(Number(limit))){
        limit = 10
    }
    //if(!cat || typeof cat ==! 'string'){
    //    cat="basketball"
    //}

    if (!sort || sort ==! 1 || sort==! -1) {
        sort=1
    }
    
    try {
        let products = await ProductManager.getProduct(page,limit,sort)
        products.products= products.docs
        delete products.docs
        delete products.totalDocs
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({payload:products});
        
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
})

router.get("/:pid", async(req, res) => {

    let {pid}=req.params
    if(!isValidObjectId(pid)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`ID en formato invalido`})
    }

    try {
        let product=await ProductManager.getProductBy({_id:pid})
        if(!product){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`producto no encontrado con id ${id}`})
        }
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:product});

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

router.post("/", async(req, res) => {
    let {title, description, code, price, status, stock, category}=req.body  
    if(!title || !description || !code || !price || !status || !stock || !category) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Todos los datos solicitados son obligatorios`})
    }
    if (typeof title !== 'string' || typeof description !== 'string' || typeof code !== 'number' || typeof price !== 'number' || typeof status !== 'boolean' || typeof stock !== 'number' || typeof category !=='string') {
        
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Los datos deben ser envidos esn sus formatos correctos`})

    }


    try {
    
        let existe = await ProductManager.getProductBy({code})
        if(existe){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Ya existe un producto con codigo ${code}`});
        }

        let preProd={title, description, code, price, status, stock, category}
        let nuevoProd=await ProductManager.addProduct(preProd)

        let productsAct = await ProductManager.getProduct()
        req.io.emit('productosActualizados', productsAct)

        res.setHeader('Content-Type','application/json');
        return res.status(201).json({nuevoProd});

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

router.put("/:pid", async(req, res) => {

    let {pid}=req.params
    if(!isValidObjectId(pid)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`id en formato invalido`})
    }

    let pAModificar=req.body

    let products;
    try {
        products=await ProductManager.getProduct()
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

    let product=products.find(p=>p.id===pid)
    if(!product){

        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`producto no encontrado con id ${pid}`})
    }


    if(pAModificar.code){
        let existe=products.find(p=>p.code===pAModificar.code && p.id!==pid)
        if(existe){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`ya hay un producto registrado con codigo ${pAModificar.code}`})
        }
    }

    try {
        let productModificado = await ProductManager.modifyProduct(pid,pAModificar)
        if(!productModificado){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`no se ha podido modificar el producto`})
        }
        let productsAct = await ProductManager.getProduct()
        req.io.emit('productosActualizados', productsAct)
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({productModificado});
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

router.delete("/:pid", async(req, res) => {

    let { pid }=req.params
    if(!isValidObjectId(pid)){

        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`id en formato invalido`})
    }


    try {
        let pDeleted=await ProductManager.deleteProduct(pid)
        if(!pDeleted){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`no se ha podido eliminar el producto correcatmente`})
        }
        let productsAct = await ProductManager.getProduct()
        req.io.emit('productosActualizados', productsAct)
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({pDeleted});
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

