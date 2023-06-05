const { check } = require('express-validator');
const validateResults = require("../utils/handleValidator");

const validarUsuario = [
  check('tipo_usuario')
    .isIn(['admin', 'register', 'anonimo', 'comercios'])
    .withMessage('Tipo de usuario no válido'),
  check('nombre').notEmpty().withMessage('El nombre es requerido'),
  check('email')
    .isEmail()
    .withMessage('El email debe ser válido')
    .notEmpty()
    .withMessage('El email es requerido'),
  check('password').notEmpty().withMessage('La contraseña es requerida'),
  check('edad')
    .isInt({ min: 0 })
    .withMessage('La edad debe ser un número entero mayor o igual a cero')
    .notEmpty()
    .withMessage('La edad es requerida'),
  check('ciudad').notEmpty().withMessage('La ciudad es requerida'),
  check('intereses').notEmpty().withMessage('Los intereses son requeridos'),
  check('recibir_ofertas').isBoolean().withMessage('Recibir ofertas debe ser un valor booleano'),

  (req, res, next) => {
    return validateResults(req, res, next);
}
];


const validarUsuarioUpdate = [
    check('nombre').optional(),
    check('edad').isInt({ min: 0 }).optional(),
    check('ciudad').optional(),
    check('intereses').optional(),
    check('recibir_ofertas').optional().isBoolean(),

    (req, res, next) => {
      return validateResults(req, res, next);
  }
  ];

module.exports = {validarUsuario ,validarUsuarioUpdate} ;