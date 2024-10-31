const UsersManager=UsersMongoManager =require("../dao/UsersMongoManager")

class UsersService{
    constructor(DAO){
        this.UsersManager=DAO
    }

    async createUser(user){
        return await this.UsersManager.createUser(user)
    }

    async getUserBy(filter){        
        return await this.UsersManager.getUserBy(filter)
    }
}

const usersService = new UsersService(UsersManager)
module.exports = usersService