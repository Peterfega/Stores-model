const mongoose = require('mongoose')

const dbConnect = () => {
    const db_uri = process.env.DB_URI
    mongoose.set('strictQuery', false)
    mongoose.connect(db_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, res) => {
        if(!err) {
            console.log("CONEXION A MONGO: ACTIVA");
        }else {
            console.log("ERROR al establecer conexión a la BD");
            console.log(err)
        }
    })
}

module.exports = dbConnect;