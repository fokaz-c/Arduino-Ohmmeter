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
        await this.saveReading(sensorData);
    }


    async saveReading(data: SensorData): Promise<void> {
        try {
            const hardwareOutputId = await this.repository.saveHardwareOutput({
                OutputVoltage: data.voltage,
                Resistance: data.resistance,
            } as Omit<HardwareOutput, 'ID'>);

            await this.repository.saveFinalOutput(hardwareOutputId);

        } catch (error) {
            throw error;
        }
    }
}