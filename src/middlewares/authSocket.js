const jwt = require('jsonwebtoken');
const secretJWT = "clave";

const authenticateSocket = (socket, next) => {
    try {
    console.log("entro")
        const token = socket.handshake.query.token;
        jwt.verify(token, secretJWT, (err, decoded) => {
         
                console.log("sin error de auth");
                next();

        });
    } catch (error) {
        console.log("con error de auth");
        next(error);
    }
}

module.exports = authenticateSocket;
