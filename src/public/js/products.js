//const ProductManager = ProductMongoManager=require("../../dao/ProductMongoManager");
const productConteiner = document.getElementById('productConteiner')

const addToCart= async(prodID)=>{
    console.log({prodID});
    let respuesta = await fetch(`/api/carts/66dfa0f34c7548ba9c91733a/product/${prodID}`,{
       method:"put"
    })
    //disclaimer: al no tener un sistema de login dejo hardcodeado el carrito para que 
    //siempre se agregue a ese. Sigo las indicaciones del profe.
    console.log(respuesta.status);
 }

const getProducts=async()=>{

    let params=new URLSearchParams(location.search)
    let page=params.get("page")
    let limit =params.get("limit")
    let sort =params.get("sort")
    if(!page || isNaN(Number(page))){
        page=1
    }
    if(!limit || isNaN(Number(limit))){
        limit=10
    }
    if (!sort || sort ==! 1 || sort==! -1) {
        sort=-1
    }

    let respuesta=await fetch(`/api/products?page=${page}&limit=${limit}&sort=${sort}`, {
        // headers:{
        //     "Authorization": `Berearer ${localStorage.getItem("token")}`
        // }
    })
    let products =await respuesta.json()
    console.log(products);
    
    products.payload.products.forEach(p=>{
        let liProduct=document.createElement("li")
        liProduct.innerHTML=`<h3> titulo: ${p.title}</h3>
                            <h3>descripcion: ${p.description}</h3>
                            <h3>precio: ${p.price}</h3>
                            <h3>stock: ${p.stock}</h3>
                            <h3>categoria: ${p.category}</h3>
                            <h3>codigo: ${p.code}</h3>
                           <button onclick="addToCart(${p._id})">agregar al carrito</button>`
        productConteiner.append(liProduct)
    })
    //const products = await ProductManager.getProduct()
   /* products.products= products.docs
    delete products.docs
    delete products.totalDocs
    
    
    for (let i = 0; i < products.products.length; i++) {
        let liProduct= document.createElement('li')
            liProduct.className=`li`
            liProduct.innerHTML=`<h3> titulo: ${products.products[i].title}</h3>
                            <h3> descripcion: ${products.products[i].description}</h3>
                            <h3> precio: ${products.products[i].price}</h3>
                            <h3> stock: ${products.products[i].stock}</h3>
                            <h3> categoria: ${products.products[i].category}</h3>`
    
        productConteiner.append(liProduct)
    
    }
} */}

getProducts();
