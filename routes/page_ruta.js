const express = require("express");
const router = express.Router();
const {
  request_Page,
  get_Pages,
  get_Page,
  get_Page_City,
  get_Page_Cityact,
  upt_Page,
  upt_PageVote,
  del_Page,
} = require("../controllers/page_control.js");
const {
  paginaValidation,
  paginaValidationUpdate,
  paginaValidationUpdateVotar,
} = require("../validators/page_val.js");
const authMiddleware = require("../middleware/session.js");
const checkRol = require("../middleware/rol.js");
const checkPropietario = require("../middleware/propietario.js"); 

router.post(
  "/",
  authMiddleware,
  checkRol(["comercios"]),
  paginaValidation,
  request_Page
);

router.get("/Pagina", get_Pages);

router.get("/Pagina/Ciudad/:ciudad", get_Page_City);
router.get(
  "/Pagina/Ciudad/:ciudad/Actividad/:actividad",
  get_Page_Cityact
);
router.get("/Pagina/:url", get_Page);

router.put(
  "/Pagina/actualizar/:url",
  authMiddleware,
  checkRol(["comercios"]),
  checkPropietario,
  paginaValidationUpdate,
  upt_Page
);

router.delete(
  "/Pagina/:url",
  authMiddleware,
  checkRol(["comercios"]),
  checkPropietario,
  del_Page
);

router.put(
  "/Pagina/Votacion/:url",
  authMiddleware,
  checkRol(["register"]),
  paginaValidationUpdateVotar,
  upt_PageVote
);

module.exports = router;

