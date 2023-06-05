const bcrypt = require("bcrypt")

const encrypt = async(textPlain) =>{
    const hash = await bcrypt.hash(textPlain, 10);
    return hash
};

const compare = async(passwodPlain, hashPassword) =>{
    return await bcrypt.compare(passwodPlain, hashPassword);
};

module.exports = {encrypt,compare}