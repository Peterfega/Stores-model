const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");


const userEstructura = new mongoose.Schema({
  tipo_usuario: {
    type: String,
    enum: ["admin", "register", "anonimo", "comercios"],
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    required: true
  },
  ciudad: {
    type: String,
    required: true
  },
  intereses: {
    type: String,
    required: true
  },
  recibir_ofertas: {
    type: Boolean,
    default: true
  }
},
{
    timestamps: true,
    versionKey: false
}
);

userEstructura.plugin(mongooseDelete, {overrideMethods: "all"});
module.exports = mongoose.model('usuarios', userEstructura);


