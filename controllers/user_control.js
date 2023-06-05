const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const { userEstructura } = require("../models");

const {encrypt,compare} = require("../utils/handleBrcrypt.js")
const { tokenSign } = require("../utils/handleJwt.js")



const crear_User = async (req, res) => {
    try {
        const body = matchedData(req);
        const email=req.params.email
        const user = await userEstructura.findOne({"email":email});

        if(!user){
            const passwordHash = await encrypt(req.body.password);
            req.body.password = passwordHash;
            const data = await userEstructura.create(req.body);
            res.send(data);
        }else{
            console.log("USUARIO CON MISMO CORREO YA CREADO")
            console.log(err);
            handleHttpError(res, 'USUARIO CON MISMO CORREO YA CREADO');
        }
    }
    catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR AL CREAR EL USUARIO');
    }
};

const get_User = async (req, res)=>{
    try {
        const email=req.params.email

        const data = await userEstructura.findOne({"email":email});
        res.send(data);
    }
    catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR AL ENCONTRAR el USER');
    }
};

const get_Users = async (req, res)=>{
    try {
        const data = await userEstructura.aggregate([]);
        res.send(data);
    }
    catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR AL ENCONTRAR LOS USERS');
    }
};

const get_UserCity = async (req, res)=>{
    try {
        const ciudad = req.params.ciudad;
        const intereses = req.params.intereses;

        const data = await userEstructura.find({"ciudad": ciudad, "recibir_ofertas": true}, { email: 1 });


        res.send(data);
    }
    catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR AL ENCONTRAR el USER');
    }
};


const upt_User = async (req, res) => {
    try {
        const email=req.params.email

        const data = await userEstructura.findOneAndUpdate(
        { email: email },
        req.body,
        { new: true } 
        );
        
        res.send(data);
    }
    catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR AL ACTUALIZAR el USER');
    }
};


const del_User = async (req, res) => {
    try {
        const email=req.params.email
        console.log(email)
        const data = await userEstructura.delete({"email":email});
        res.send(data);
    }
    catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR AL ELIMINAR el USER');
    }
};

const get_Login = async(req,res) => {
    try {
        const email=req.body.email
        const user01 = await userEstructura.findOne({"email":email});

        if(!user01){
            handleHttpError(res, "USER_NOT_EXISTS", 404)
            return
        }

        const check_pass = await compare(req.body.password,user01.password);

        if(check_pass){
            console.log("Contrasena Correcta");

            const token01=await tokenSign(user01)

            const data = {
                _id:user01._id,
                email:user01.email,
                token: token01
            }

            res.send(data)

        }else{
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }

    } catch (error) {
        console.log(error)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
};



module.exports = { crear_User, get_Users, get_User, get_UserCity, upt_User, del_User, get_Login};