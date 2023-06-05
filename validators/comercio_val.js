const { check } = require('express-validator');
const validateResults = require("../utils/handleValidator");

const comercioValidator = [
    check('nombre_comercio', 'El nombre del comercio es requerido').notEmpty(),
    check('cif', 'El CIF es requerido').notEmpty(),
    check('direccion', 'La dirección es requerida').notEmpty(),
    check('email', 'El email es requerido').isEmail(),
    check('telefono', 'El teléfono es requerido').notEmpty(),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];


const comercioValidatorUpdate = [
    check('nombre_comercio').optional(),
    check('direccion').optional(),
    check('telefono').optional(),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = {comercioValidator ,comercioValidatorUpdate} ;
