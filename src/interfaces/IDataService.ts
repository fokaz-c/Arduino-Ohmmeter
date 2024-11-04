import {SensorData} from "../models/SensorData";

export interface IDataService {
    saveReading(data: SensorData): Promise<void>;            // Method to save a reading
    getLatestReadings(limit?: number): Promise<SensorData[]>; // Method to get the latest sensor readings
}

export {SensorData};
