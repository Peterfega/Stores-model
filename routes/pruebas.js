const express = require("express");
const router = express.Router();
const { getPruebas, createUser, get_Users, get_User, upt_User, del_User } = require("../controllers/pruebas");
const { validatorCreatePrueba, validatorGetPrueba, validatorUpdatePrueba } = require("../validators/pruebas");
//const checkEmail = require("../middlewares/checkEmail");

router.get("/", (req, res) => {
    res.send("helloWorld");
});

router.post("/", (req, res) => {
    res.send(req.body);
});

router.post("/controller", getPruebas);

router.post("/users", validatorCreatePrueba, createUser);

router.get("/users", get_Users);

router.get("/users/:email", validatorGetPrueba, get_User);

router.put("/users/:email", validatorUpdatePrueba, upt_User);

router.delete("/users/:email", validatorGetPrueba, del_User);

module.exports = router;