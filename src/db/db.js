/* Importamos mongoose que nos permitirá conectarnos a la base de datos de MongoDB y crear esquemas, entre otras funcionalidades */
const mongoose = require("mongoose");

async function conectarDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/socket", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conexión exitosa a la base de datos");
    } catch (error) {
        console.log("Hubo un error al conectar la base de datos");
        console.error(error);
    }
}

module.exports = conectarDB;
