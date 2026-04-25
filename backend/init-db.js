const mysql = require('mysql2/promise');
require('dotenv').config();
const fs = require('fs');

async function initializeDatabase() {
    try {
        console.log("Connecting to MySQL server without database selected...");
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            port: process.env.DB_PORT || 3306,
            database: process.env.DB_NAME, // Select database immediately
            ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : null
        });

        console.log("Reading db-setup.sql...");
        const sql = fs.readFileSync('../db-setup.sql', 'utf8');
        
        // Execute multiple statements requires multipleStatements: true in mysql2 but can also just split by ';'
        const queries = sql.split(';').filter(q => q.trim() !== '');

        for (let query of queries) {
            console.log("Executing Query:", query.trim().split('\n')[0], "...");
            await connection.query(query);
        }

        console.log("Database & tables initialized successfully!");
        process.exit(0);

    } catch (error) {
        console.error("Initialization Failed:");
        console.error("- Did you enter the correct DB_PASSWORD in the .env file?");
        console.error("- Is your MySQL server running?");
        console.error("Error Details:", error.message);
        process.exit(1);
    }
}

initializeDatabase();
