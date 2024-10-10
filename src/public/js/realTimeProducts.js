const socket = io()
const productConteiner = document.getElementById('productConteiner')

socket.on('productosActualizados', productsAct=>{
   productsAct.products= productsAct.docs
   delete productsAct.docs
   delete productsAct.totalDocs
 //  console.log(productsAct);
   productsAct.products.forEach(p => {
      let liProduct= document.createElement('li')
            liProduct.className=`li`
            liProduct.innerHTML=`<h3> titulo: ${p.title}</h3>
                            <h3>descripcion: ${p.description}</h3>
                            <h3>precio: ${p.price}</h3>
                            <h3>stock: ${p.stock}</h3>
                            <h3>categoria: ${p.category}</h3>`
            productConteiner.append(liProduct)

   });
   /*for (let i = 0; i < productsAct.products.length; i++) {
        let liProduct= document.createElement('li')
            liProduct.className=`li`
            liProduct.innerHTML=`<h3> titulo: ${p.title}</h3>
                            <h3>descripcion: ${p.description}</h3>
                            <h3>precio: ${p.price}</h3>
                            <h3>stock: ${p.stock}</h3>
                            <h3>categoria: ${p.category}</h3>
                           `

            productConteiner.append(liProduct)
    
   } */
})





