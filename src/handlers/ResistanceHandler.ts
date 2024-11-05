import {Request, Response} from "express";
import {HardwareService} from "../services/HardwareService";
import { DataService } from "../services/DataService";
import { repository } from "../main";


const hardwareService = new HardwareService('COM4', 9600);


export const getRes = async (req: Request, res: Response): Promise<void> => {
    try {
        const sensorData = hardwareService.getLatestData();

        if (!sensorData) {
            res.status(503).json({
                error: 'No sensor data available',
                message: 'Hardware not ready or no data received yet'
            });
            return;
        }

        const finalOutput =
            {
                "Resistance": sensorData.resistance,
                "Voltage": sensorData.voltage
            };

        res.json(finalOutput);
    } catch (error) {
        console.error('Error reading from COM4:', error);
        res.status(500).json({
            error: 'Failed to get sensor data',
            message: error instanceof Error ? error.message : 'Unable to read from COM4'
        });
    }
};

export const getHistoricalData = async (req: Request, res: Response): Promise<void> => {
    try {

        const historicalReadings = await DataService.getLatestReadingsStatic(repository);
        res.status(200).json(historicalReadings);
    } catch (error) {

        console.error('Error fetching historical data:', error);

        const errorMessage = (error as { message?: string }).message || 'Unknown error occurred';
        res.status(500).json({ message: 'Error fetching historical data', error: errorMessage });
    }
};