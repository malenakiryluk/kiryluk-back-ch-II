const inputFirstName= document.getElementById("first_name")
const inputLastName= document.getElementById("last_name")
const inputEmail= document.getElementById("email")
const inputPassword= document.getElementById("password")
const inputAge= document.getElementById("age")
const btnSubmit= document.getElementById("btnSubmit")
const divNotes= document.getElementById("notes")

btnSubmit.addEventListener("click", async (e)=>{
    e.preventDefault()
    let first_name = inputFirstName.value
    let last_name = inputLastName.value
    let age = inputAge.value
    let email = inputEmail.value
    let password = inputPassword.value


    if (!first_name ||!last_name || !email || !password || !age) {
        divNotes.textContent="complete los datos"
        setTimeout(() => {
            divNotes.textContent=""
        }, 4000);
    }
    
    let body = {
        first_name, last_name, email, password, age
    }
    let response = await fetch("api/sessions/registro",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
    }) 

    let datos=await response.json()
    if (response.status>=400) {
        divNotes.textContent=datos.error 
    }else{
        console.log(datos);
        window.location.href=`/login?mensaje=registro exitoso para ${datos.usuario.username}`
    }
})
