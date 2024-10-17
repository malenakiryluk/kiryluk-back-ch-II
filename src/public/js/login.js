const inputEmail = document.getElementById("email")
const inputPassword = document.getElementById("password")
const btnSubmit = document.getElementById("btnSubmit")

btnSubmit.addEventListener("click", async(e)=>{

    e.preventDefault()

    let email = inputEmail.value
    let password = inputPassword.value

    if(!email || !password){
        alert("datos incompletos")
        return 
    }

    console.log(email, password);

    const body= {email, password}

    let response=await fetch("/api/sessions/login", {
        method:"post", 
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
    })

    if(response.status>=400){
        let {error}=await response.json()
        alert(error)
        return 
    }else{
        let datos=await response.json()
        console.log(datos)
        // localStorage.setItem("token", datos.token)
        window.location.href=`/products`
    }
    
})