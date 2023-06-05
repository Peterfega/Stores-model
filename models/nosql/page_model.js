const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

let paginaEstructura = null;

try {
  const existingSchema = mongoose.model('Pagina').schema;
  paginaEstructura = existingSchema.clone();
} catch {
  paginaEstructura = new mongoose.Schema({
    url: {
      type: String,
      required: true,
    },
    ciudad: {
      type: String,
      required: true,
    },
    actividad: {
      type: String,
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
    resumen: {
      type: String,
      required: true,
    },
    textos_body: {
      type: String,
      required: true,
    },
    fotos_body: {
      type: String,
      required: true,
    },
    email_propietario: {
      type: String,
      required: true,
    },
    datos_no_modificables: {
      scoring: {
        type: String,
        required: true,
      },
      puntuacion: {
        type: [Number],
        required: true,
        default: [],
      },
      resenas: {
        type: [String],
        required: true,
        default: [],
      },
    },
  }, {
    timestamps: true,
    versionKey: false,
  });
}

paginaEstructura.plugin(mongooseDelete, { overrideMethods: 'all' });

const Pagina = mongoose.models.Pagina || mongoose.model('Pagina', paginaEstructura);

module.exports = Pagina;
