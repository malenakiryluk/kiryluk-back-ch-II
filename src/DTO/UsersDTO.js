class UsersDTO {
    constructor(user) {
        this.firts_name=user.first_name
        this.last_name=user.last_name
        this.email=user.email
        this.age=user.age
        this.cart=user.cart
    }
}

module.exports=UsersDTO;