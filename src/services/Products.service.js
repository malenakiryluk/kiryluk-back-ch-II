const ProductManager=ProductMongoManager=require("../dao/ProductMongoManager")


class ProductService{
    constructor(DAO){
        this.ProductManager=DAO
    }

    async getProduct(page,limit,sort,cat){
        return await this.ProductManager.getProduct(page,limit,sort,cat)
    }

    async getProductBy(filter){        
        return await this.ProductManager.getProductBy(filter)
    }

    async addProduct(product){        
        return await this.ProductManager.addProduct(product)
    }

    async deleteProduct(pid){        
        return await this.ProductManager.deleteProduct(pid)
    }

    async modifyProduct(pid){        
        return await this.ProductManager.modifyProduct(pid, pAModificar)
    }
}

const productService = new ProductService(ProductManager)
module.exports = productService