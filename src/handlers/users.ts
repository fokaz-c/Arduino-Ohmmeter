import { Request, Response } from "express";
import { FinalOutput } from "../models/FinalOutput";
import { HardwareOutput } from "../models/HardwareOutput";


export function getUsers(request: Request, response: Response){

  const x:FinalOutput = new FinalOutput(0,new Date(),0);
  
  response.send(x);
}

export function getUserById(request: Request, response: Response) {
  const y:HardwareOutput = new HardwareOutput(0,0,0);
  response.send(y);
}
