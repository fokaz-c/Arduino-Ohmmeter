import { Request, Response } from "express";
import { FinalOutput } from "../models/FinalOutput";
import { HardwareOutput } from "../models/HardwareOutput";


export function getUsers(request: Request, response: Response){
  const x:FinalOutput = new FinalOutput();
  
  response.send(x);
}

export function getUserById(request: Request, response: Response) {
  const y:HardwareOutput = new HardwareOutput();
  response.send(y);
}
