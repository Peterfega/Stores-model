const mongoose = require('mongoose');
const mongooseDelete = require("mongoose-delete");

const comercioEstructura = new mongoose.Schema({
  nombre_comercio: {
    type: String,
    required: true
  },
  cif: {
    type: String,
    required: true,
    unique: true
  },
  direccion: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  telefono: {
    type: String,
    required: true
  }
},
{
    timestamps: true,
    versionKey: false
}
);

comercioEstructura.plugin(mongooseDelete, {overrideMethods: "all"});
const Comercio = mongoose.model('Comercio', comercioEstructura);

module.exports = Comercio;
