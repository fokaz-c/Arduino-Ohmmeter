import {Pool, PoolConnection, ResultSetHeader, RowDataPacket} from 'mysql2/promise';
import {HardwareOutput} from "../models/HardwareOutput";
import {FinalOutput} from "../models/FinalOutput";
import {IHardwareRepository} from "../interfaces/IHardwareRepository";

interface ReadingRow extends RowDataPacket {
    ID: number; // This should match the ID type from your FinalOutput
    outputVoltage: number;
    resistance: number;
    final_output_id: number;
    DateTime: Date;
}

export class HardwareRepository implements IHardwareRepository {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    private async withTransaction<T>(callback: (connection: PoolConnection) => Promise<T>): Promise<T> {
        const connection = await this.pool.getConnection();
        try {
            await connection.beginTransaction();
            const result = await callback(connection);
            await connection.commit();
            return result;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    async saveHardwareOutput(data: Omit<HardwareOutput, 'ID'>): Promise<number> {
        try {
            const [result] = await this.pool.execute<ResultSetHeader>(
                'INSERT INTO hardware_output (outputVoltage, resistance) VALUES (?, ?)',
                [data.OutputVoltage, data.Resistance]
            );
            return result.insertId; // Ensure this matches your database's insert return type
        } catch (error) {
            console.error('Error saving hardware output:', error); // Log the error
            throw error;
        }
    }

    async saveFinalOutput(hardwareOutputId: number): Promise<void> {
        try {
            await this.pool.execute(
                'INSERT INTO finalOutput (hardware_output_id) VALUES (?)',
                [hardwareOutputId]
            );
        } catch (error) {
            console.error('Error saving final output:', error); // Log the error
            throw error;
        }
    }

    async getReadings(limit: number = 100): Promise<(HardwareOutput & FinalOutput)[]> {
        const [rows] = await this.pool.query<ReadingRow[]>(`
            SELECT 
                ho.ID,          // Use uppercase ID to match your table
                ho.outputVoltage,
                ho.resistance,
                fo.id AS final_output_id,
                fo.DateTime
            FROM hardware_output ho
            INNER JOIN finalOutput fo ON ho.id = fo.hardware_output_id
            ORDER BY fo.DateTime DESC
            LIMIT ?
        `, [limit]);

        return rows.map(row => ({
            ID: row.ID,
            OutputVoltage: row.outputVoltage,
            Resistance: row.resistance,
            HardwareOutputID: row.final_output_id,
            DateTime: row.DateTime
        })) as (HardwareOutput & FinalOutput)[];
    }
}
