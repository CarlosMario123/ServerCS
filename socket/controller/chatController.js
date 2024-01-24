
class ChatController {
    constructor(io) {
      this.io = io;
    }
  
    handleConnection(socket) {
       
      socket.on("chat:join", (room) => {
        this.joinRoom(socket, room)
      });
      socket.on("chat:leave", (room) => {
        this.leaveRoom(socket, room)
      } );
      socket.on("chat:send", (data) => {
        this.sendMessage(socket, data);
      })
      
      socket.on("disconnect", () => {
        console.log(`Usuario desconectadokljkljkljkljkljkl: ${socket.id}`);
      });
    }
  
    joinRoom(socket, room) {
      console.log("uniendo...")
      socket.join(room);
      this.io.to(room).emit("chat:system", `${socket.id} se unió a la sala ${room}`);
    }
  
    leaveRoom(socket, room) {
      socket.leave(room);
      this.io.to(room).emit("chat:system", `${socket.id} abandonó la sala ${room}`);
    }
  
    sendMessage(socket, data) {
      this.io.to(data.room).emit("chat:message", { user: socket.id, message: data.message });
    }
  }
  
  module.exports = ChatController;
  