import pool from '../database/database'; // Ensure this imports your database connection
import { HardwareOutput } from '../models/HardwareOutput';
import { HardwareRepository } from '../repository/HardwareRepository'; // Adjust the path as needed

const hardwareRepository = new HardwareRepository(pool);

async function runTests() {
    try {
        const testData = [
            { OutputVoltage: 5.0, Resistance: 10.0 },
            { OutputVoltage: 3.3, Resistance: 5.0 },
            { OutputVoltage: 12.0, Resistance: 20.0 }
        ];

        for (const data of testData) {
            // Cast the data to match the expected type
            const newOutputId = await hardwareRepository.saveHardwareOutput(data as Omit<HardwareOutput, 'id'>);
            console.log('Inserted hardware output with ID:', newOutputId);

            // Save final output linked to the hardware output
            await hardwareRepository.saveFinalOutput(newOutputId);
            console.log('Saved final output for hardware output ID:', newOutputId);
        }

        // Retrieve and verify readings
        const readings = await hardwareRepository.getReadings(5);
        console.log('Recent Readings:', readings);
    } catch (error) {
        console.error('Error during testing:', error);
    } finally {
        // Close the pool after testing
        await pool.end();
    }
}

runTests();