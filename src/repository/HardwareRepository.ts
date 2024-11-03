import { Pool, PoolConnection, ResultSetHeader } from 'mysql2/promise';
import { HardwareOutput } from "../models/HardwareOutput";
import { FinalOutput } from "../models/FinalOutput";

 import { IHardwareRepository } from "../repository/IHardwareRepository";


 export class HardwareRepository implements IHardwareRepository {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    private async withTransaction<T>(
        callback: (connection: PoolConnection) => Promise<T>
    ): Promise<T> {
        const connection = await this.pool.getConnection();
        try {
            await connection.beginTransaction();
            const result = await callback(connection);
            await connection.commit();
            return result;
        } catch (error) {
            await connection.rollback();
            throw error; // Re-throwing error for handling upstream
        } finally {
            connection.release();
        }
    }

    async saveHardwareOutput(data: Omit<HardwareOutput, 'id'>): Promise<number> {
        const [result] = await this.pool.execute<ResultSetHeader>(
            'INSERT INTO hardware_output (outputVoltage, resistance) VALUES (?, ?)',
            [data.OutputVoltage, data.Resistance]
        );
        return result.insertId; // Return the ID of the newly inserted record
    }
    

    async saveFinalOutput(hardwareOutputId: number): Promise<void> {
        await this.pool.execute(
            'INSERT INTO finalOutput (hardware_output_id) VALUES (?)',
            [hardwareOutputId]
        );
    }

    async getReadings(
        limit: number = 100
    ): Promise<(HardwareOutput & FinalOutput)[]> {
        const [rows] = await this.pool.execute(`
            SELECT
                ho.*,
                fo.DateTime,
                fo.id as final_output_id
            FROM hardware_output ho
            JOIN finalOutput fo ON ho.id = fo.hardware_output_id
            ORDER BY fo.DateTime DESC
            LIMIT ?
        `, [limit]);
        return rows as (HardwareOutput & FinalOutput)[]; // Cast the result to the combined type
    }
}