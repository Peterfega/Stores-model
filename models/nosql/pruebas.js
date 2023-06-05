const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const pruebasSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        age: {
            type: Number
        },
        email: {
            type: String,
            unique: true
        },
        password:{
            type: String,  
            select: false
        },
        role:{
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)
pruebasSchema.plugin(mongooseDelete, {overrideMethods: "all"});
module.exports = mongoose.model("pruebas", pruebasSchema);