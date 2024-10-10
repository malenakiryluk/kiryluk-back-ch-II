const fs=require("fs")
//const productsModel = require("./models/productsModels")

class ProductManager {
    static path;

    static async getProduct(){
        //return await productsModel.find().lean()

        if(fs.existsSync(this.path)){
            let products=JSON.parse(await fs.promises.readFile(this.path, {encoding:"utf-8"}))
            return products 
        }else{
            return []
        }


    }

   /* static async getProductBy(filter={}){
        return await productsModel.findOne(filter).lean()
    }*/

    static async addProduct(product={}){

        //let newProduct = await productsModel.create(product)
       // return newProduct.toJSON()
         let products=await this.getProduct()
        let id=1
        if(products.length>0){
            id=Math.max(...products.map(d=>d.id))+1
        }

        let nuevoProduct={
            id, 
            ...product
        }

        products.push(nuevoProduct)

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 5))

        return nuevoProduct

    }

    static async deleteProduct(pid){
        //return await productsModel.findByIdAndDelete(pid,{new:true}).lean()

       let products=await this.getProduct()
        let iProduct=products.findIndex(p=>p.id===pid)
        if(iProduct===-1){
            throw new Error(`no existe el id ${pid}`)
        }
        let cantidad0=products.length
        products=products.filter(p=>p.id!==pid)   
        let cantidad1=products.length
       
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 5))

        return cantidad0-cantidad1


    }

    static async modifyProduct(pid, pAModificar={}){
        //return await productsModel.findByIdAndUpdate(pid, pAModificar, {new:true}).lean()

       let products=await this.getProduct()
        let iProduct=products.findIndex(p=>p.id===pid)
        if(iProduct===-1){
            throw new Error(`no existe el id ${id}`)
        }

        products[iProduct]={
            ...products[iProduct],
            ...pAModificar
        }

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 5))


    }



}




module.exports=ProductManager;
