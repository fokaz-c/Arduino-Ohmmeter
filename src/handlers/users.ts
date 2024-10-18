import { Request, Response } from "express";
import { FinalOutput } from "../models/FinalOutput";


export function getUsers(request: Request, response: Response){
  const x:FinalOutput = new FinalOutput();
  
  response.send(x);
}

export function getUserById(request: Request, response: Response) {
  response.send([{}]); 
}
