require("dotenv").config();
const jwt = require("jsonwebtoken")
const {handleHttpError} = require("../utils/handleError.js")

/**
 * El objeto del usuario
 * @param {*} user 
 */
const tokenSign = async (user) => {
    const sign = jwt.sign(
        {
            email: user.email,
            tipo_usuario : user.tipo_usuario
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h"
        }
    )
    return sign
}

/**
 * Token se sesión
 * @param {*} tokenJwt 
 */
const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, process.env.JWT_SECRET);
    }catch(err) {
        handleHttpError(err, "ERROR_WITH_TOKEN")
        console.log(err)
    }
}

module.exports = { tokenSign, verifyToken }