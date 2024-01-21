//long polling ver cuantos hay en clase
//socket io rooms
//pizarra short polling
//Websocket chat alumnos 
const express = require("express");
const http = require("http");
const { Server: SocketServer } = require("socket.io");
const cors = require("cors");
const conectarDB = require("./src/db/db")
const conectarSocket = require("./socket/webSocket")


let clientesConectados= [];

conectarDB()//conexion a mi base de datos

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

const usuarioRoute = require('./src/routes/usuario.routes');
const pizarraRouter = require("./src/routes/pizarraRoute")

app.use('/usuario', usuarioRoute);
app.use("/pizarra",pizarraRouter);


function notificador() {
  // Función que notifica a todos los clientes
  for (const res of clientesConectados) {
    res.send({
      totalAlumnos: clientesConectados.length // Enviamos el total de alumnos
    });
  }
  clientesConectados = []
}

app.get('/conectados', (req, res) => {
  res.status(200).json({
    total: clientesConectados.length
  });
});

app.post('/conectados', (req, res) => {
  // Esta función solo nos servirá para preguntar
  notificador();
  res.status(200).json({ success: true });
});

app.get('/conexion', (req, res) => {
  // Establecer una conexión
  clientesConectados.push(res);

  req.on('close', () => {
    // Manejar la desconexión del cliente
    const index = clientesConectados.indexOf(res);
    if (index !== -1) {
      clientesConectados.splice(index, 1);
      notificador();
    }
  });
});

server.listen(port,()=>{
  console.log(`Escuchando en el servidor ${port}`);
})

conectarSocket()//aca manejamos la conexion websocket
