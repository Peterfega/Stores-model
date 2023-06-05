const { check } = require('express-validator');
const validateResults = require("../utils/handleValidator");

const paginaValidation = [
  check('url','La url es requerida').notEmpty(),
  check('ciudad',"La ciudad es requerida").notEmpty(),
  check('actividad',"La actividad es requerida").notEmpty(),
  check('titulo',"El Titulo es requerido").notEmpty(),
  check('resumen',"El resumen es requerido").notEmpty(),
  check('textos_body',"El text body es requerido").notEmpty(),
  check('fotos_body',"fotos_body es requerido").notEmpty(),
  check('datos_no_modificables.scoring',"Dato Obligatorio").notEmpty(),
  check('datos_no_modificables.puntuacion',"Dato Obligatorio").notEmpty().isNumeric(),
  check('datos_no_modificables.resenas',"Dato Obligatorio").isArray(),
  check('email_propietario', 'El email del propietario es requerido').notEmpty(),
  
  (req, res, next) => {
      return validateResults(req, res, next);
  }

];

const paginaValidationUpdate = [
    check('url').optional(),
    check('ciudad').optional(),
    check('actividad').optional(),
    check('titulo').optional(),
    check('resumen').optional(),
    check('textos_body').optional(),
    check('fotos_body').optional(),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const paginaValidationUpdateVotar = [
    check('puntuacion').optional(),
    check('resenas').optional(),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = {
  paginaValidation,
  paginaValidationUpdate,
  paginaValidationUpdateVotar
};
