import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

export interface SensorData {
    resistance: number;
    voltage: number;
}

export class HardwareService {
    private serialPort: SerialPort;
    private parser: ReadlineParser;
    private latestData: SensorData | null = null;

    constructor(port: string, baudRate: number = 9600) {
        this.serialPort = new SerialPort({
            path: port,
            baudRate: baudRate
        });
        this.parser = new ReadlineParser({ delimiter: '\n' });

        this.serialPort.pipe(this.parser);
        this.setupListeners();
    }

    private setupListeners(): void {
        this.parser.on('data', (data: string) => {
            try {
                const parsedData = JSON.parse(data) as SensorData;
                this.latestData = parsedData;
                //console.log('Received data from Arduino:', parsedData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        });

        this.serialPort.on('open', () => {
            console.log('Serial port opened');
        });

        this.serialPort.on('error', (error: Error) => {
            console.error('Serial port error:', error.message);
        });
    }

    public getLatestData(): SensorData | null {
        return this.latestData;
    }
}