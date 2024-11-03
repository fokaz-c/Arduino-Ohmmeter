import { createPool, Pool } from 'mysql2/promise';

// Create a connection pool
const pool: Pool = createPool({
    host: 'localhost',        // Replace with your MySQL host
    user: 'your_username',    // Replace with your MySQL username
    password: 'your_password', // Replace with your MySQL password
    database: 'hardware_db',   // Replace with your database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Export the connection pool for use in other modules
export default pool;
