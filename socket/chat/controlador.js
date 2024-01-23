const WebSocket = require('ws');
function controllerChat(wss,mensaje,cliente){//funcion que controla el flujo
       // Enviar el mensaje a todos los clientes excepto al que lo envió
       wss.clients.forEach((client) => {
        if (client.readyState == WebSocket.OPEN) {
          client.send(mensaje.toString("utf-8"));
            
        }
      });
}

module.exports = controllerChat;