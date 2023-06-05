const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const { model_tests } = require("../models");

const getPruebas = async (req, res) => {
    try {
        res.send(req.body);
    }
    catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR PRUEBAS');
    }
}

const createUser = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await pruebasModel.create(body);
        res.send(data);
    }
    catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR AL CREAR EL USUARIO');
    }
}

const get_Users = async (req, res)=>{
    try {
        const data = await pruebasModel.aggregate([]);
        res.send(data);
    }
    catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR AL ENCONTRAR LOS USERS');
    }
};


const get_User = async (req, res)=>{
    try {
        const body = matchedData(req);
        const data = await pruebasModel.findOne({"email":body.email});
        res.send(data);
    }
    catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR AL ENCONTRAR el USER');
    }
};


const upt_User = async (req, res) => {
    try {
        const {email, ...body} = matchedData(req);
        const data = await pruebasModel.findOneAndUpdate({"email":email},body);
        res.send(data);
    }
    catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR AL ACTUALIZAR el USER');
    }
};


const del_User = async (req, res) => {
    try {
        const {email} = matchedData(req);
        const data = await pruebasModel.delete({"email":email});
        res.send(data);
    }
    catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR AL ELIMINAR el USER');
    }
};



module.exports = { getPruebas, createUser, get_Users, get_User, upt_User, del_User };