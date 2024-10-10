const usersModel =require("./models/usersModel")

class UsersMongoManager {
    static async createUser(user){
        let newUser = await usersModel.create(user)
        return newUser.toJSON()
    }

    static async getUserBy(filter){
        return await usersModel.findOne(filter).lean
    }
}

module.exports= UsersMongoManager;