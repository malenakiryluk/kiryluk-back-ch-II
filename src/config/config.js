process.loadEnvFile("./src/.env")

const config = {
    PORT:process.env.PORT,
    MONGO_URL:process.env.MONGO_URL,
    DB_NAME:process.env.DB_NAME,
    SECRET_SESSION: process.env.SECRET_SESSION,
    SECRET: process.env.SECRET
}

module.exports={config}