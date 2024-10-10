const inputName= document.getElementById("name")
const inputEmail= document.getElementById("email")
const inputPassword= document.getElementById("password")
const btnSubmit= document.getElementById("btnSubmit")
const divNotes= document.getElementById("notes")

btnSubmit.addEventListener("click", async (e)=>{
    e.preventDefault()
    let name = inputName.value
    let email = inputEmail.value
    let password = inputPassword.value

    if (!name || !email || !password) {
        divNotes.textContent="complete los datos"
        setTimeout(() => {
            divNotes.textContent=""
        }, 4000);
    }

    let body = {
        name, email, password
    }
    let response = await fetch("api/sessions/registro",{
        method:"post",
        headers:{
            "Content-Type":"aplication/json"
        },
        body:JSON.stringify(body)
    }) 

    let datos=await response.json()
    if (response.status>=400) {
        divNotes.textContent=datos.error 
    }else{
        window.location.href=`/login?mensaje=registro exitodo para ${datos.newUser.email}`
    }
})
