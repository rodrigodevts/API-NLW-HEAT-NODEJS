import 'dotenv/config';
import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';

import { router } from './routes';

const app = express();

app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*"
  }
});

io.on("connection",socket => {
  console.log(`Usuario conectado no socket ${socket.id}`);
})


app.use(express.json());
app.use(router);

//Chamdas que deveriam ser feitas pelo front
app.get('/github',(req,res)=>{
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
});

app.get('/signin/callback',(req,res)=>{
  const { code } = req.query;

  return res.json(code);
});

export { serverHttp, io}