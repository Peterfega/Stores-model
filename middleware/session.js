const { verifyToken } = require("../utils/handleJwt.js")
const { userEstructura } = require("../models");
const {handleHttpError} = require("../utils/handleError.js")

const authMiddleware = async (req, res, next) => {
    try{
        if (!req.headers.authorization) {
            console.log("Porfavor Introduzca el Token de Sesion");
            handleHttpError(res, "ERROR_WITH_TOKEN",401)
            return
        }

        const token = req.headers.authorization.split(' ').pop() 
        const dataToken = await verifyToken(token);
        console.log(dataToken)

        if(!dataToken.email) {
            console.log("El Token Introducido no corresponde con el Usuario");
            handleHttpError(res, "ERROR_WITH_TOKEEN",409);
            return
        }

        const user = await userEstructura.findOne({"email":dataToken.email});


        req.user = user 
        next()

    }catch(err){
        console.log("ERROR_WITH_TOKEN")
        handleHttpError(res, "ERROR_WITH_TOKEN",401)
        console.log(err)
    }
}

module.exports = authMiddleware