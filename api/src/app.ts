import express from 'express'
import { createServer } from 'http';
import { Server, Socket } from "socket.io";

interface IMessage{
  key: string,
  author: string,
  content: string,
  sala: string,
}

interface ILogin {
  username: string,
  sala: string,
}

interface IUser {
  socketId: string,
  username: string,
  sala: string,
}

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
}}); 

//Usuários que entram na sala não tem socketid na perspectiva de um usuário presente na sala

const messages: IMessage[] = [];
let usuariosConectados: IUser[] = [];

io.on('connection', (socket: Socket) => {

  socket.on('login', (data: ILogin) => {
    //Designa o client para a sala que foi passada por parêmetro pelo frontend 
    socket.join(data.sala);

    //Guarda no array de usuários logados o usuário recém logado
    usuariosConectados.push({socketId: socket.id, ...data});

    //Envia para para os clientes as mensagens anteriores da mesma sala
    socket.emit('previous messages', messages.filter(message => (message.sala === data.sala)));

    //Envia para para os clientes os usuários logados na mesma sala
    const usuariosDaMesmaSala = usuariosConectados.filter(user => (user.sala === data.sala));
    socket.emit('connected users', usuariosDaMesmaSala);

    //Envia para os clientes de uma sala o usuário recém logado para atualização da listagem de usuários
    socket.to(data.sala).emit('new user', {
      socketId: socket.id,
      username: data.username,
      sala: data.sala,
    });
  });

  socket.on('chat message', (data: IMessage) => {
    //Guarda no array de mesnsagens a mensagem recebida
    messages.push(data);

    //Envia a mensagem para o frontend para ser exibiada aos usuários de uma determinada sala
    socket.to(data.sala).emit('message received', data);
  });

  //Ativado quando o usuário desconecta
  socket.on('disconnect', () => {

    //Envia para o frontend o usuário que deve ser retirado da lista
    const usuarioDesconectado = usuariosConectados.find(usuario => (socket.id === usuario.socketId));

    if(usuarioDesconectado){
      usuariosConectados = usuariosConectados.filter(usuario => (usuario.socketId !== usuarioDesconectado.socketId));

      socket.to(usuarioDesconectado.sala).emit('disconnected user', usuarioDesconectado.socketId);
    }
  });

});

httpServer.listen(3333);