const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const { paginaEstructura } = require("../models");
const { userEstructura } = require("../models");

const request_Page = async (req, res) => {
    try {
      const userEmail = req.user.email; // Obtener el email del usuario a través del token
  
      const body = matchedData(req); // Obtener los datos validados del cuerpo de la solicitud
  
      const data = await paginaEstructura.create(body);
      res.send(data);
    } catch (err) {
      console.log(err);
      handleHttpError(res, "ERROR AL CREAR EL PAGINA");
    }
};
  

const get_Page = async (req, res)=>{
    try {
        console.log("Wotan")
        const url=req.params.url

        const data = await paginaEstructura.findOne({"url":url});
        res.send(data);
    }
    catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR AL ENCONTRAR el PAGINA');
    }
};

const get_Pages = async (req, res)=>{
    try {
        const data = await paginaEstructura.aggregate([]);
        res.send(data);
    }
    catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR AL ENCONTRAR LOS PAGINA');
    }
};

const get_Page_City = async (req, res)=>{
    try {
        console.log("Wotan")
        const ciudad=req.params.ciudad

        const data = await paginaEstructura.find({"ciudad": ciudad});

        res.send(data);
    }
    catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR AL ENCONTRAR el PAGINA');
    }
};

const get_Page_Cityact = async (req, res)=>{
    try {
        console.log("Wotan")
        const ciudad=req.params.ciudad
        const actividad=req.params.actividad

        const data = await paginaEstructura.find({"ciudad": ciudad, "actividad": actividad}).sort("datos_no_modificables.scoring");

        res.send(data);
    }
    catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR AL ENCONTRAR el PAGINA');
    }
};


const upt_Page = async (req, res) => { 
    try {
        const userEmail = req.user.email;
        console.log(userEmail);
        //const data2 = await userEstructura.findOne({"email":email});
        //res.send(data);

        const url=req.params.url
        const data = await paginaEstructura.findOneAndUpdate(
        { url: url },
        req.body,
        { new: true } 
        );
        
        res.send(data);
    }
    catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR AL ACTUALIZAR el PAGINA');
    }
};

const upt_PageVote = async (req, res) => {
    try {
        const url = req.params.url;
        const resena = req.body.datos_no_modificables.resenas[0];
        const puntuacion = req.body.datos_no_modificables.puntuacion[0];
        let data = null;

        if(resena){
            data = await paginaEstructura.findOneAndUpdate(
                { url: url },
                { $push: { 'datos_no_modificables.resenas': resena } },
                { new: true }
            );
        }
 
        if(puntuacion){
            data = await paginaEstructura.findOneAndUpdate(
                { url: url },
                { $push: { 'datos_no_modificables.puntuacion': puntuacion } },
                { new: true }
            );
        }

        res.send(data);
    } catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR AL ACTUALIZAR el PAGINA');
    }
};



const del_Page = async (req, res) => {
    try {
        const url=req.params.url
        console.log(url)
        const data = await paginaEstructura.delete({"url":url});
        res.send(data);
    }
    catch (err) {
        console.log(err);
        handleHttpError(res, 'ERROR AL ELIMINAR el PAGINA');
    }
};



module.exports = { request_Page, get_Pages,get_Page_City, get_Page_Cityact,get_Page, upt_Page,upt_PageVote, del_Page };