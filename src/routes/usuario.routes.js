const { Router } = require("express");
const { login,registro } = require("../controllers/usuario.controller");
const Usuario = require('../models/usuario.model');

const routerUsuario = Router();
// Método GET para obtener todos los usuarios
routerUsuario.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find({ deleted: false });
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
});

// Método GET para obtener un usuario por ID
routerUsuario.get("/:id", async (req, res) => {
  const usuarioId = req.params.id;

  try {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
});



// Método POST para crear un nuevo usuario
routerUsuario.post("/",registro);

routerUsuario.post('/login',login)



module.exports = routerUsuario;
