
const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreatePrueba = [
    check("name").exists().notEmpty(), 
    check("age").exists().notEmpty(),
    check("email").exists().notEmpty(),
    check("password").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];


const validatorGetPrueba = [
    check("email").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorUpdatePrueba = [
    check("email").exists().notEmpty(),
    check("newEmail").optional(),
    check("name").optional(), 
    check("age").optional(),
        (req, res, next) => {
    return validateResults(req, res, next);
}
];

module.exports = { validatorCreatePrueba, validatorGetPrueba, validatorUpdatePrueba };