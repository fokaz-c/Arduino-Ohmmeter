import {IDataService, SensorData} from "../interfaces/IDataService";
import {IHardwareRepository} from "../interfaces/IHardwareRepository";
import {GlobalEmitter} from "../main";
import {DataRecievedEvent} from '../models/Events';
import {HardwareOutput} from "../models/HardwareOutput";
import {FinalOutput} from "../models/FinalOutput";

export class DataService implements IDataService {
    private readonly repository: IHardwareRepository;

    constructor(repository: IHardwareRepository) {
        this.repository = repository;
        console.log("Setting up event listener for DataRecievedEvent");
        GlobalEmitter.on(DataRecievedEvent.toString(), this.handleGetSensorData.bind(this));
    }

    async getLatestReadings(limit: number = 10): Promise<SensorData[]> {
        const readings = await this.repository.getReadings(limit);
        return readings.map(reading => ({
            voltage: reading.OutputVoltage,
            resistance: reading.Resistance,
        }));
    }

    public async handleGetSensorData(event: DataRecievedEvent): Promise<void> {
        const sensorData: SensorData = event.getData();
        console.log('Received sensor data:', sensorData);
        await this.saveReading(sensorData);
    }


    async saveReading(data: SensorData): Promise<void> {
        try {
            console.log('Saving reading:', data);
            const hardwareOutputId = await this.repository.saveHardwareOutput({
                OutputVoltage: data.voltage,
                Resistance: data.resistance,
            } as Omit<HardwareOutput, 'ID'>);

            console.log('Saved hardware output with ID:', hardwareOutputId);
            await this.repository.saveFinalOutput(hardwareOutputId);

            // Remove this line to prevent the recursive loop
            // GlobalEmitter.emit(DataRecievedEvent.toString(), new DataRecievedEvent(data));
        } catch (error) {
            console.error('Error saving reading:', error);
            throw error;
        }
    }
}