const jwt = require('jsonwebtoken');

const secretKey = 'clave';

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            msg: 'Token no proporcionado'
        });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.usuario = decoded.usuario;
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Error verificando el token'
        });
    }
};

module.exports = {
    authMiddleware
};
