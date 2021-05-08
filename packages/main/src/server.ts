import express from 'express';
import cors from 'cors';

//import SocketIO from 'socket.io'; //missing export error
import {Server} from 'socket.io';


const expApp = express();
expApp.use(cors());
expApp.get('/ping', (req, res) => {
  res.send('pong');
});

export default function start(): void {
  const server = expApp.listen(8101, ()=> {
    console.log(`started server`);
  });

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  console.log('ws server constructed');
  io.on('connect', (socket)=>{
    console.log('new ws connection.');
    socket.on('disconnect', ()=> {
      console.log('disconnected ws');
    });
  });
}
