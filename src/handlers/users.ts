// handlers/users.ts
import { Request, Response } from "express";
import { FinalOutput } from "../models/FinalOutput";
import { HardwareOutput } from "../models/HardwareOutput";
import { HardwareService } from "../services/HardwareService";

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
        
        const finalOutput = new HardwareOutput(
            12,
            sensorData.voltage,
            sensorData.resistance,
        );
        
        res.json(finalOutput);
    } catch (error) {
        console.error('Error reading from COM4:', error);
        res.status(500).json({
            error: 'Failed to get sensor data',
            message: error instanceof Error ? error.message : 'Unable to read from COM4'
        });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const y = new HardwareOutput(0, 0, 0);
        res.json(y);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to get user by ID',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};