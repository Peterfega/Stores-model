const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const { comercioEstructura } = require("../models");

const crear_Comercio = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await comercioEstructura.create(body);
        res.send(data);
    }
    catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR AL CREAR EL COMERCIO');
    }
}


const get_Comercios = async (req, res)=>{
    try {
        const data = await comercioEstructura.aggregate([]);
        res.send(data);
    }
    catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR AL ENCONTRAR LOS COMERCIO');
    }
};


const get_Comercio = async (req, res)=>{
    try {
        console.log("Wotan")
        const email=req.params.email

        const data = await comercioEstructura.findOne({"email":email});
        res.send(data);
    }
    catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR AL ENCONTRAR el COMERCIO');
    }
};


const upt_Comercio = async (req, res) => {
    try {
        const email=req.params.email
        const data = await comercioEstructura.findOneAndUpdate(
        { email: email },
        req.body,
        { new: true } 
        );
        
        res.send(data);
    }
    catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR AL ACTUALIZAR el COMERCIO');
    }
};


const del_Comercio = async (req, res) => { 
    try {
        const email=req.params.email
        console.log(email)
        const data = await comercioEstructura.delete({"email":email});
        res.send(data);
    }
    catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR AL ELIMINAR el COMERCIO');
    }
};



module.exports = { crear_Comercio, get_Comercios, get_Comercio, upt_Comercio, del_Comercio };