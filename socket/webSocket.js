const WebSocket = require("ws");
const validadorToken = require("../src/auth/validatorToken");
const controllerChat = require("./chat/controlador");
const wss = new WebSocket.Server({ port: 3000 });

function conectarSocket() {
  wss.on("connection", (cliente, request) => {
    console.log("usuario conectado al websocket")
    const token = request.headers["sec-websocket-protocol"];

    cliente.on("message", (message) => {
      controllerChat(wss, message, cliente);
    });

    cliente.on("close", (code, reason) => {
      console.log(`Cliente desconectado. Código: ${code}, Razón: ${reason}`);
    });
  });

  wss.on("error", (error) => {
    console.error("Error en el servidor WebSocket:", error);
  });


  wss.on("close", () => {
    console.log("Servidor WebSocket cerrado");
  });

  wss.on("open", () => {
    console.log("Conexión WebSocket establecida");
  });
}

module.exports = conectarSocket;
