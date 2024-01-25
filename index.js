//long polling ver cuantos hay en clase
//socket io rooms
//pizarra short polling
//Websocket chat alumnos 
const express = require("express");
const http = require("http");
const  socketio = require("socket.io");
const cors = require("cors");
const ChatController = require("./socket/controller/chatController")
const conectarDB = require("./src/db/db")
const conectarSocket = require("./socket/webSocket")
const usuarioRoute = require('./src/routes/usuario.routes');
const pizarraRouter = require("./src/routes/pizarraRoute")

const authenticateSocket = require("./src/middlewares/authSocket")

async function iniciar(){
  await conectarDB()//conexion a mi base de datos
  let clientesConectados= [];


const app = express();
const port = 8000;
const server = http.createServer(app);
const io =  socketio(server,{
   cors:"*"
})
//io.use(authenticateSocket);//io nos servira auntenticar que solo envie los autenticados

//Aca establecemos conexion con socket io
try {
  const chat = new ChatController(io);
} catch (error) {
  console.error("Error durante la creación de la instancia de ChatController:", error);
}
app.use(cors());
app.use(express.json());



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
}

iniciar()