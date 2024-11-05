import { SensorData } from "../services/HardwareService";

export class DataRecievedEvent{
  private data:SensorData;

  constructor(data:SensorData){
    this.data = data;
  }

  getData = ():SensorData => {
    return this.data;
  }

}