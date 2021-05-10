import express from 'express';
import cors from 'cors';
import {networkInterfaces} from 'os';
import path from 'path';
//import SocketIO from 'socket.io'; //missing export error
import {Server} from 'socket.io';
import {apiPort} from '@common/network';

export const localExternalIP = (() => ([] as any[]).concat(...Object.values(networkInterfaces()))
  .filter(details => details.family === 'IPv4' && !details.internal)
  .shift().address)();



const expApp = express();
expApp.use(cors());
expApp.get('/ping', (req, res) => {
  res.send('pong');
});


/**
 * Workaround for TypeScript bug
 * @see https://github.com/microsoft/TypeScript/issues/41468#issuecomment-727543400
 */
const env = import.meta.env;
if (env.MODE !== 'development') {
  const publicPath = path.join(__dirname, '../../renderer/dist');
  expApp.use(express.static(publicPath));
} //otherwise use vite devServer


export default function start(): void {
  const server = expApp.listen(apiPort, ()=> {
    console.log(`started server`);
  });

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  console.log('ws server constructed');
  io.on('connect', (socket)=>{
    console.log('new ws connection.');
    socket.on('disconnect', ()=> {
      console.log('disconnected ws');
    });
    socket.emit('set url', localExternalIP);
  });
}
