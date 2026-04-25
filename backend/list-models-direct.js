const axios = require('axios');
require('dotenv').config();

async function testKey() {
    const key = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1/models?key=${key}`;
    
    try {
        const res = await axios.get(url);
        console.log("Available models:", res.data.models.map(m => m.name));
    } catch (e) {
        console.error("Error listing models:", e.response?.data || e.message);
    }
}

testKey();
