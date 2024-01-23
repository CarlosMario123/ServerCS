const jwt = require('jsonwebtoken');
const secretJWT = "clave";

const authenticateSocket= (socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        
        jwt.verify(token, secretJWT, (err, decode) => {
            if (err) {
                next(err);
            }

            socket.user = decode;
            console.log("sin error de auth")
            next();
        });
    } catch (error) { 
        console.log("con error de auth") 
        next(error);
    }
}

module.exports = authenticateSocket
