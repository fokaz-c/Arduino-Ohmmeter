import {SensorData} from "../models/SensorData";

export interface IDataService {
    saveReading(data: SensorData): Promise<void>;
    //getLatestReadings(repository: IHardwareRepository, limit: number): Promise<SensorData[]>; // Method to get the latest sensor readings
}

export {SensorData};
