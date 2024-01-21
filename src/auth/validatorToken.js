const jwt = require("jsonwebtoken")

const validarToken = (token)=>{
 // Clave secreta para firmar el token
 const privateKey = "clave";


 //si no token no exite
 if(!token) return false;

 try {
    // Verificar la validez del token
    const decoded = jwt.verify(token, privateKey);

    // En este punto, el token es valido
    return true;
  } catch (error) {
    // El token es inválido o ha expirado
    console.error('Error al validar el token:', error.message);
    return false;
  }
}

module.exports = validarToken;