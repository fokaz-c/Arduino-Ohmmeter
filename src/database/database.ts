import {createPool, Pool} from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool: Pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "ohmmeter",
    waitForConnections: process.env.DB_WAIT_FOR_CONNECTIONS === 'true',
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10', 10),
    queueLimit: parseInt(process.env.DB_QUEUE_LIMIT || '0', 10),
});

export default pool;