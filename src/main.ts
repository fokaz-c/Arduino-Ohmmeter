import express, { Request, Response } from 'express';
import usersRouter from './routes/ResistanceRoutes';
import cors from 'cors';
import {EventEmitter} from 'node:events'
import { IHardwareRepository } from './interfaces/IHardwareRepository';
import { HardwareRepository } from './repository/HardwareRepository';
import pool from './database/database';
import { DataService } from './services/DataService';

export const GlobalEmitter:EventEmitter = new EventEmitter();

export const repository:IHardwareRepository = new HardwareRepository(pool);
const dataService:DataService = new DataService(repository);

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use('/api', usersRouter);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});

