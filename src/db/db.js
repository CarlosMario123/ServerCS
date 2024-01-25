const mongoose = require("mongoose");

async function conectarDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/socket", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conexión exitosa a la base de datos");
    } catch (error) {
        console.error("Hubo un error al conectar la base de datos");
        throw error; // Propaga el error para manejarlo desde el llamador
    }
}

module.exports = conectarDB
