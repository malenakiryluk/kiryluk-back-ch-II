//const fs=require("fs")
const productsModel = require("./models/productsModels")

class ProductMongoManager {
    //static path;

    static async getProduct(page, limit, sort,cat){
        return await productsModel.paginate({},{lean:true})
    }
 
    static async getProductBy(filter={}){
        return await productsModel.findOne(filter).lean()
    }


    static async addProduct(product={}){

        let newProduct=await productsModel.create(product)
        return newProduct.toJSON()
       
    }

    static async deleteProduct(pid){
        return await productsModel.findByIdAndDelete(pid,{new:true}).lean()
    }

    static async modifyProduct(pid, pAModificar){
        return await productsModel.findByIdAndUpdate(pid, pAModificar, {new:true}).lean()
    }



}




module.exports=ProductMongoManager;
