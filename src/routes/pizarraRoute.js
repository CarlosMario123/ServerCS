const { Router } = require("express");
const {verPizarra,editarPizarra} = require("../controllers/pizzarraController")
const {authMiddleware} = require("../middlewares/auth")
const pizarraRouter = Router();//para encapsular todas la rutas para pizzara

pizarraRouter.get("/",verPizarra);
pizarraRouter.post("/",editarPizarra);

module.exports = pizarraRouter;
