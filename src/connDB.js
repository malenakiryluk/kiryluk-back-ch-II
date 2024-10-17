const mongoose = require("mongoose")
const {config} = require("./config/config")

const connDB =async()=>{
    try {
        
        await mongoose.connect(
            //"mongodb+srv://malenakiryluk:malena2014!@cluster0.tab2i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
            config.MONGO_URL,
            {dbName:config.DB_NAME}
        )

        console.log('DB concetada correctamente')

    } catch (error) {
        console.log(`error al conectarse a DB: ${error.message}`)
    }
}

module.exports=connDB;