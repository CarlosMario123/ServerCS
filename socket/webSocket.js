const WebSocket = require("ws");
const validadorToken = require("../src/auth/validatorToken");
const controllerChat = require("./chat/controlador");
const wss = new WebSocket.Server({ port: 3000 });

function conectarSocket() {
  wss.on("connection", (cliente) => {
    console.log("usuario conectado al websocket")
  
    cliente.on("message", (message) => {
  
      controllerChat(wss, message, cliente);
    });

    cliente.on("close", (code, reason) => {
      console.log(`Cliente desconectado. Código: ${code}, Razón: ${reason}`);
    });
  });

 


}

module.exports = conectarSocket;
