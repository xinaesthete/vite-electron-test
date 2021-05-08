import express from 'express';
import cors from 'cors';

const expApp = express();
expApp.use(cors());
expApp.get('/ping', (req, res) => {
  res.send('pong');
});

export default function start(): void {
  expApp.listen(8101, ()=> {
    console.log(`started server`);
  });
}
