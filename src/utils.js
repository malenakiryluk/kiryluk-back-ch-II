const bcrypt = require("bcrypt")

const generaHash=password=>bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const validaHash=(pass, hash)=>bcrypt.compareSync(pass, hash)

module.exports=generaHash, validaHash;