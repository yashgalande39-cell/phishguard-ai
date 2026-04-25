const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const db = require('./db');
const { initializeMLEngine, analyzeWithML } = require('./ml-engine');
const chatRouter = require('./chat');
const { router: authRouter, authenticateToken } = require('./auth');

const app = express();

// CORS — allow only the Vite dev frontend (update for production)
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
console.log('[Backend] Allowed Origins:', allowedOrigins);
app.use(cors({
    origin: (origin, callback) => {
        console.log('[Backend] CORS Request from Origin:', origin);
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log('[Backend] CORS BLOCKED for Origin:', origin);
            callback(new Error('CORS policy: Not allowed from ' + origin));
        }
    }
}));

app.use(express.json({ limit: '50kb' })); // Prevent huge payloads

// Rate limiter — max 30 requests per minute per IP on the analyze endpoint
const analyzeLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests. Please wait a moment before scanning again.' }
});

// General API limiter
const generalLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
});

app.use('/api/', generalLimiter);

// Chat limiter — 20 AI requests per minute per IP
const chatLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many chat requests. Please wait a moment.' }
});

// Mount routers
app.use('/api/chat', chatLimiter, chatRouter);
app.use('/api/auth', authRouter);

// API Routes

// 1. POST /api/analyze
app.post('/api/analyze', analyzeLimiter, async (req, res) => {
    try {
        const { input_data, type = 'url' } = req.body;
        if (!input_data) {
            return res.status(400).json({ error: "Input data is required" });
        }

        // Input length guard
        if (input_data.length > 10000) {
            return res.status(400).json({ error: "Input is too long. Maximum 10,000 characters allowed." });
        }

        // Basic URL Validation
        if (type === 'url') {
            const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
            const isLocal = /^(https?:\/\/)?(localhost|127\.0\.0\.1)/i.test(input_data);
            const isIp = /^(https?:\/\/)?(\d{1,3}\.){3}\d{1,3}/i.test(input_data);
            
            if (!urlRegex.test(input_data) && !isLocal && !isIp) {
                return res.status(400).json({ error: "Invalid URL Format provided." });
            }
        }

        const analysis = analyzeWithML(input_data, type);
        
        // Serialize analysis details to JSON string for DB persistence
        const detailsJson = JSON.stringify(analysis.details);

        const query = `INSERT INTO scans (input_data, result, confidence_score, details_json) VALUES (?, ?, ?, ?)`;
        const [result] = await db.execute(query, [input_data, analysis.overall_result, analysis.overall_confidence, detailsJson]);

        res.status(200).json({
            id: result.insertId,
            input_data,
            result: analysis.overall_result,
            confidence_score: analysis.overall_confidence,
            analysis_details: analysis.details
        });

    } catch (error) {
        console.error("Error analyzing input:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 1b. POST /api/analyze/secure (Authenticated)
app.post('/api/analyze/secure', authenticateToken, analyzeLimiter, async (req, res) => {
    try {
        const { input_data, type = 'url' } = req.body;
        const userId = req.user.id;

        if (!input_data) return res.status(400).json({ error: "Input data is required" });

        const analysis = analyzeWithML(input_data, type);
        const detailsJson = JSON.stringify(analysis.details);

        const query = `INSERT INTO scans (user_id, input_data, result, confidence_score, details_json) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await db.execute(query, [userId, input_data, analysis.overall_result, analysis.overall_confidence, detailsJson]);

        res.status(200).json({
            id: result.insertId,
            input_data,
            result: analysis.overall_result,
            confidence_score: analysis.overall_confidence,
            analysis_details: analysis.details
        });
    } catch (error) {
        console.error("Error in secure analyze:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 2. GET /api/history
app.get('/api/history', async (req, res) => {
    try {
        const userId = req.query.user_id;
        let query = `SELECT * FROM scans ORDER BY created_at DESC LIMIT 10000`;
        let params = [];

        if (userId) {
            query = `SELECT * FROM scans WHERE user_id = ? ORDER BY created_at DESC LIMIT 10000`;
            params = [userId];
        }

        const [rows] = await db.query(query, params);
        const parsedRows = rows.map(row => ({
            ...row,
            analysis_details: row.details_json ? JSON.parse(row.details_json) : null
        }));
        res.status(200).json(parsedRows);
    } catch (error) {
        console.error("Error fetching history:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 3. POST /api/contact
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const query = `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`;
        await db.execute(query, [name, email, message]);

        res.status(200).json({ success: true, message: "Contact form submitted successfully" });
    } catch (error) {
        console.error("Error submitting contact form:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 4. POST /api/feedback
app.post('/api/feedback', async (req, res) => {
    try {
        const { scan_id, user_comment } = req.body;
        if (!scan_id) {
            return res.status(400).json({ error: "Scan ID is required" });
        }

        const query = `INSERT INTO feedback (scan_id, user_comment) VALUES (?, ?)`;
        await db.execute(query, [scan_id, user_comment || '']);

        res.status(200).json({ success: true, message: "Feedback received. The ML model will be corrected in future syncs." });
    } catch (error) {
        console.error("Error submitting feedback:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 5000;

// Initialize Machine Learning models before accepting connections
initializeMLEngine().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} with ML capabilities enabled`);
    });
});
