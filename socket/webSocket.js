const WebSocket = require("ws");
const validadorToken = require("../src/auth/validatorToken");
const controllerChat = require("./chat/controlador");
const wss = new WebSocket.Server({ port: 4000 });
//crearemos una funcion que sera el corazon de nuestro websocket

function conectarSocket() {
  wss.on("connection", (cliente, request) => {
    const token = request.headers["sec-websocket-protocol"]; //para validar los tokens
    console.log(token)
    if (!validadorToken(token)) {
      // Si no hay token o no es valido , cerrar la conexión
      console.log("Intento de conexión sin token. Cerrando conexión.");
      cliente.close();
      return;
    }
    console.log("cliente accedio al chat");

    cliente.on("message", (message) => {
      //manejar los mensaje que envie un cliente
    
      controllerChat(wss, message, cliente); //permite controlar el envio de chat
    });
  });
}

module.exports = conectarSocket;
