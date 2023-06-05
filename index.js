require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnectNoSql = require("./config/mongo");
const { sequelize, dbConnectMySql } = require("./config/mysql");

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api", require("./routes"))

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Conexión al puerto " + port + ": ACTIVA")
})

if (process.env.ENGINE_DB === 'nosql') {
    dbConnectNoSql() 
    console.log("Estado de conexión: ACTIVA\n   _____                         .___       __        ___.                          \n _/ ____|____   _________      __| _/____ _/  |______ |_ |__ _____    ______ ____   \n |   __|/ __ | / ___|__  |    / __ ||__  ||   __|__  | | __ ||__  |  /  ___// __ |  \n  |  | |  ___// /_/  > __ |_ / /_/ | / __ ||  |  / __ || |_| |/ __ |_|___ ||  ___/  \n  |__|  |___  >___  (____  / |____ |(____  /__| (____  /___  (____  /____  >|___  > \n            |/_____/     |/       |/     |/          |/    |/     |/     |/     |/  ");
} else {
    dbConnectMySql() 
    sequelize.sync()
}

module.exports = app