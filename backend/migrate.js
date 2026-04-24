const mysql = require('mysql2/promise');
require('dotenv').config();

async function migrate() {
    let connection;
    try {
        console.log("Connecting to MySQL...");
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'phishing_detection_db'
        });

        // Check if column exists first (compatible with MySQL 5.7+)
        console.log("Checking for details_json column...");
        const [cols] = await connection.query(
            `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
             WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'scans' AND COLUMN_NAME = 'details_json'`,
            [process.env.DB_NAME || 'phishing_detection_db']
        );

        if (cols.length === 0) {
            console.log("Adding details_json column to scans table...");
            await connection.query(`
                ALTER TABLE scans ADD COLUMN details_json TEXT AFTER confidence_score
            `);
        } else {
            console.log("Column already exists, skipping.");
        }

        console.log("✅ Migration complete! details_json column added successfully.");
        process.exit(0);
    } catch (error) {
        if (error.message.includes("Duplicate column")) {
            console.log("✅ Column already exists, skipping migration.");
            process.exit(0);
        }
        console.error("Migration failed:", error.message);
        process.exit(1);
    } finally {
        if (connection) await connection.end();
    }
}

migrate();
