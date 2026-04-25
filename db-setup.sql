-- Database setup script
-- Tables will be created in the database specified in your environment variables (e.g., defaultdb)


CREATE TABLE IF NOT EXISTS scans (
    id INT PRIMARY KEY AUTO_INCREMENT,
    input_data TEXT NOT NULL,
    result VARCHAR(50) NOT NULL,
    confidence_score FLOAT NOT NULL,
    details_json TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- If upgrading an existing DB, run this line to add the column:
-- ALTER TABLE scans ADD COLUMN IF NOT EXISTS details_json TEXT AFTER confidence_score;

CREATE TABLE IF NOT EXISTS contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS feedback (
    id INT PRIMARY KEY AUTO_INCREMENT,
    scan_id INT NOT NULL,
    user_comment TEXT,
    reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (scan_id) REFERENCES scans(id) ON DELETE CASCADE
);
