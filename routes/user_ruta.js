const express = require("express");
const router = express.Router();
const {
  crear_User,
  get_Users,
  get_User,
  get_UserCity,
  upt_User,
  del_User,
  get_Login,
} = require("../controllers/user_control.js");
const {
  validarUsuario,
  validarUsuarioUpdate,
} = require("../validators/user_val.js");
const authMiddleware = require("../middleware/session.js");
const checkRol = require("../middleware/rol.js");
const checkMail = require("../middleware/mail.js"); // Agregado el middleware checkMail

router.post("/", validarUsuario, crear_User);
router.put(
  "/Usuario/:email",
  authMiddleware,
  validarUsuarioUpdate,
  checkRol(["register"]),
  checkMail, // Agregado checkMail antes de upt_User
  upt_User
);
router.delete(
  "/Usuario/:email",
  authMiddleware,
  checkRol(["register"]),
  checkMail, // Agregado checkMail antes de del_User
  del_User
);

router.post("/login", get_Login);
router.get("/Usuario", authMiddleware, checkRol(["anonimo"]), get_Users);
router.get("/Usuario/:email", authMiddleware, checkRol(["anonimo"]), get_User);
router.get(
  "/Usuario/ciudad/:ciudad/Intereses/:intereses",
  authMiddleware,
  checkRol(["comercios"]),
  get_UserCity
);

module.exports = router;