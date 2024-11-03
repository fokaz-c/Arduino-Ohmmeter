import express, { Request, Response } from 'express';
import usersRouter from './routes/users';
import cors from 'cors';
import {EventEmitter} from 'node:events'
import { DataRecievedEvent } from './models/Events';

export const GlobalEmitter:EventEmitter = new EventEmitter();


GlobalEmitter.addListener(DataRecievedEvent.toString(),(data:DataRecievedEvent)=>{
  console.log(data.getData());
});



const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use('/api', usersRouter);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});

