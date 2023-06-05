// Middleware checkMail
const checkMail = (req, res, next) => {
  try {
    const emailParam = req.params.email; // Obtener el email de los parámetros de la ruta
    const userEmail = req.user.email; // Obtener el email del usuario

    if (emailParam !== userEmail) {
      return res.status(403).json({ error: "EMAIL_MISMATCH_403" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = checkMail;
