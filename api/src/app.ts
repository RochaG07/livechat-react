import express from 'express'
import { createServer } from 'http';
import { Server, Socket } from "socket.io";

interface IMessage{
  author: string,
  content: string,
}

const app = express();

const httpServer = createServer(app);


const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
}}); 

const messages: IMessage[] = [];

io.on('connection', (socket: Socket) => {
  console.log("Usuário Conectado: "+ socket.id);

  socket.on('login', (username) => {
    socket.emit('previous messages', messages);

    console.log(username);
  });

  socket.on('chat message', (data: IMessage) => {
    messages.push({
      author: data.author,
      content: data.content,
    });

    socket.broadcast.emit('message received', data);
  });

  socket.on('disconnect', () => {
    console.log("Usuário Desconectado: "+ socket.id);
  });

});

httpServer.listen(3333);