const express = require("express")
const router = express.Router();
const { crear_Comercio, get_Comercios, get_Comercio, upt_Comercio, del_Comercio } = require("../controllers/comercio_control.js");
const { comercioValidator,comercioValidatorUpdate} = require("../validators/comercio_val.js");
const authMiddleware = require("../middleware/session.js");
const checkRol = require("../middleware/rol.js")

router.post("/",authMiddleware,checkRol(["admin"]),comercioValidator, crear_Comercio);

router.get("/Comercio", get_Comercios);

router.get("/Comercio/:email",authMiddleware,checkRol(["admin"]), get_Comercio);

router.put("/Comercio/:email",authMiddleware,checkRol(["admin"]),comercioValidatorUpdate, upt_Comercio);

router.delete("/Comercio/:email",authMiddleware,checkRol(["admin"]), del_Comercio);

module.exports = router;