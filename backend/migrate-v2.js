const mysql = require('mysql2/promise');
require('dotenv').config();

async function migrate() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'phishing_detection_db',
            port: process.env.DB_PORT || 3306,
        });

        console.log("Adding user_id column to scans table...");
        try {
            await connection.query('ALTER TABLE scans ADD COLUMN user_id INT DEFAULT NULL AFTER id');
            await connection.query('ALTER TABLE scans ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL');
            console.log("Migration successful!");
        } catch (e) {
            if (e.code === 'ER_DUP_COLUMN_NAME') {
                console.log("Column already exists, skipping.");
            } else {
                throw e;
            }
        }

        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error.message);
        process.exit(1);
    }
}

migrate();
