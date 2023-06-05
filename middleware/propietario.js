const { paginaEstructura } = require("../models");

const checkPropietario = async (req, res, next) => {
  try {
    const url = req.params.url; // Obtener la URL de la página
    const userEmail = req.user.email; // Obtener el email del usuario desde el token

    const data = await paginaEstructura.findOne({"url":url});

    if(data["email_propietario"]!=userEmail){
      return res.status(403).json({ error: "OWNER_MISMATCH_403" });
    }

    next();
  } catch (err) {
    console.log('Error en el middleware checkPropietario:', err);
    return res.status(500).json({
      error: err.message,
      url: req.params.url,
      userEmail: req.user.email
    });
  }
};

module.exports = checkPropietario;



