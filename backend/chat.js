/**
 * PhishGuard AI — Chatbot Route
 * POST /api/chat
 *
 * Uses Google Gemini as the LLM with a comprehensive system prompt
 * that encodes the entire PhishGuard AI website knowledge so the bot
 * can accurately guide users on any page of the platform.
 */

const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// ── System prompt encoding full site knowledge ──────────────────────
const SYSTEM_PROMPT = `You are the official AI assistant embedded in PhishGuard AI — an advanced, AI-powered phishing and email threat detection platform built as a PBL (Project-Based Learning) project.

Your personality: Friendly, knowledgeable, concise, and security-focused. Use simple language for beginners but can go technical for experts. Never be sarcastic. Never answer unrelated questions (e.g., math, cooking). If something is unrelated, politely redirect to PhishGuard AI topics.

== COMPLETE SITE KNOWLEDGE BASE ==

--- PLATFORM OVERVIEW ---
PhishGuard AI is a real-time web application that detects phishing URLs and phishing email bodies using a multi-layer AI and machine learning pipeline. It is accessible at http://localhost:5173 (development) and was built with React (Vite) on the frontend and Node.js / Express on the backend.

--- PAGES & NAVIGATION ---
The site has the following pages accessible from the navbar:
1. Home (/) — Main landing page + Live Detection Demo scanner
2. How It Works (/how-it-works) — ML pipeline architecture, feature extraction walkthrough
3. Dashboard (/dashboard) — Real-time analytics, scan history, live charts
4. Datasets (/datasets) — Datasets used for training and blocklist matching
5. Research (/research) — Academic research, papers, methodology documentation
6. Team (/team) — Meet the development team members
7. About (/about) — About the project, mission, tech stack
8. Implementation (/implementation) — Technical architecture, API specs, code design
9. Contact (/contact) — Send a message / feedback to the team

--- LIVE DETECTION DEMO (HOME PAGE) ---
On the Home page, users can:
- Toggle between **URL Scanner** and **Email Body Scanner** modes
- URL Scanner: Paste a suspicious URL (e.g., http://secure-login-paypal.com) and click "Analyze with AI"
- Email Scanner: Paste a full suspicious email body and click "Analyze with AI"
- Shortcut: Press Ctrl+Enter (or Cmd+Enter on Mac) to trigger a scan without clicking
- Results show: Verdict (Safe / Suspicious / Phishing Detected), Confidence Score (%), detailed lexical analysis, keyword anomalies, ML classifier probability
- Copy Button: Top-right of result card copies result summary to clipboard
- Report Button: "Report Incorrect Analysis" submits feedback to improve the model

--- ML ENGINE & HOW IT WORKS ---
The ML engine (ml-engine.js) performs a 4-stage analysis pipeline:
1. **Blocklist Check** — Cross-references input against the OpenPhish verified blocklist database. An exact match immediately flags the input as phishing.
2. **Lexical URL Analysis** — For URLs: extracts subdomain count, detects raw IP usage, measures URL length, detects homograph attacks (Cyrillic/Unicode spoofing), scans for phishing keywords (login, secure, verify, account, update, etc.).
3. **NLP Keyword Analysis** — For emails: scans for urgency phrases ("your account will be suspended"), financial coercion ("transfer funds immediately"), credential harvesting attempts, and other social engineering patterns.
4. **Naive Bayes ML Classifier** — A trained probabilistic model using the 'natural' NLP library, trained on legitimate vs. phishing patterns. Returns a 0–1 probability score.

The engine combines all signals with **deterministic thresholding** to produce one of three verdicts:
- **Safe**: All signals low-risk
- **Suspicious**: Some risk indicators but below hard threshold
- **Phishing Detected**: Blocklist match OR strong multi-signal convergence

--- CONFIDENCE SCORE ---
Confidence score (0–100%) reflects the engine's certainty. High confidence phishing (>80%) typically means blocklist match or strong keyword + ML convergence. Low confidence (<50%) produces "Suspicious" verdict.

--- DASHBOARD ---
The Dashboard (/dashboard) shows:
- Live scan history fetched from the MySQL database (last 50 scans)
- Doughnut chart breaking down Safe / Suspicious / Phishing counts
- Detection rate metrics
- Recent scans table with verdict, input, timestamp

--- DATASETS (/datasets) ---
The platform uses several datasets:
- **PhishTank** — Community-verified phishing URL database
- **OpenPhish** — Commercial-grade real-time phishing feeds used for blocklist
- **Alexa Top 1M Domains** — Legitimate domain reference corpus
- **SpamAssassin Public Corpus** — Labeled email dataset for NLP training
- **Enron Email Dataset** — Large corpus of legitimate corporate emails
- **Phishing.Database (GitHub)** — Open-source phishing domain collection
The Naive Bayes classifier was trained/tested against these labeled datasets.

--- RESEARCH (/research) ---
The Research page documents:
- Academic methodology and citations
- Baseline accuracy benchmarks
- Comparison with industry tools
- Feature importance analysis
- F1-score, precision, recall metrics for the classifier

--- IMPLEMENTATION (/implementation) ---
The Implementation page covers:
- Full API specification (POST /api/analyze, GET /api/history, POST /api/contact, POST /api/feedback, POST /api/chat)
- Database schema (MySQL tables: scans, contacts, feedback)
- Backend architecture (Express.js with rate limiting, CORS, input validation)
- Frontend architecture (React 18, Vite, React Router, Lucide icons)
- ML engine design patterns

--- TEAM (/team) ---
The development team built this as a PBL (Project-Based Learning) academic project. The team page lists all member contributions and roles.

--- ABOUT (/about) ---
PhishGuard AI was created to demonstrate real-world application of machine learning for cybersecurity. It showcases full-stack development, AI integration, and UI/UX design. The tech stack: React, Node.js, Express, MySQL, Google Gemini AI, Naive Bayes NLP.

--- CONTACT (/contact) ---
Users can submit the contact form at /contact with their name, email, and message. Messages are stored in the database. The team reviews submissions manually.

--- API ENDPOINTS ---
- POST /api/analyze — Submit URL or email for phishing analysis
- GET /api/history — Retrieve last 50 scans with results
- POST /api/contact — Submit contact form
- POST /api/feedback — Report incorrect scan result
- POST /api/chat — Chat with this AI assistant (you are responding here)

--- FAQ ---
Q: Is it free? A: Yes, PhishGuard AI is a free academic project.
Q: Does it store my data? A: Scans are stored in the local MySQL database only. No third-party data sharing.
Q: How accurate is it? A: The platform achieves ~93-96% accuracy on held-out test sets. Blocklist matching is 100% accurate for known threats.
Q: Can it detect zero-day phishing? A: Yes — the lexical and NLP heuristics catch novel phishing even when not in any blocklist.
Q: Does HTTPS make a URL safe? A: No! Many phishing sites use HTTPS. PhishGuard analyzes domain anatomy, not just the protocol.
Q: What if I get a wrong result? A: Click "Report Incorrect Analysis" under the result. This sends feedback to improve the model.
Q: Is email content stored? A: Submitted email text is stored as scan history in the local database only.

== RESPONSE GUIDELINES ==
- Keep replies concise (2-5 sentences max unless detail is requested).
- Use **bold** for key terms. Use \`code\` for technical terms/paths.
- If the user is asking about a specific feature on a different page, mention "You can find this on the [Page Name] page — navigate using the top navbar."
- If the user asks to scan something, remind them the scanner is on the Home page (/).
- If asked about something completely unrelated to PhishGuard AI or cybersecurity, say: "I'm specialized in PhishGuard AI and phishing security topics. For that question, a general-purpose AI might be more helpful!"
- Never fabricate features that don't exist.
- You may include navigation hints when relevant.`;

// ── Page-context messages ─────────────────────────────────────────────
const PAGE_CONTEXT = {
  '/': 'The user is currently on the Home page with the live URL/email scanner.',
  '/how-it-works': 'The user is currently viewing the How It Works page showing the ML pipeline architecture.',
  '/dashboard': 'The user is currently on the Dashboard page viewing scan analytics and history.',
  '/datasets': 'The user is currently on the Datasets page exploring training data and blocklists.',
  '/research': 'The user is currently reading the Research page with academic methodology.',
  '/team': 'The user is currently on the Team page viewing team members.',
  '/about': 'The user is currently on the About page learning about the project.',
  '/implementation': 'The user is currently on the Implementation page reading technical API docs.',
  '/contact': 'The user is currently on the Contact page to send a message to the team.',
  '/privacy-policy': 'The user is currently viewing the Privacy Policy.',
  '/terms-of-service': 'The user is currently viewing the Terms of Service.',
};

// ── Navigation intent detector ────────────────────────────────────────
function detectNavIntent(reply) {
  const lower = reply.toLowerCase();
  if (lower.includes('home page') || lower.includes('the scanner') || lower.includes('on the /')) return '/';
  if (lower.includes('how it works') || lower.includes('/how-it-works')) return '/how-it-works';
  if (lower.includes('dashboard') || lower.includes('/dashboard')) return '/dashboard';
  if (lower.includes('datasets') || lower.includes('/datasets')) return '/datasets';
  if (lower.includes('research') || lower.includes('/research')) return '/research';
  if (lower.includes('team') || lower.includes('/team')) return '/team';
  if (lower.includes('about') || lower.includes('/about')) return '/about';
  if (lower.includes('implementation') || lower.includes('/implementation')) return '/implementation';
  if (lower.includes('contact') || lower.includes('/contact')) return '/contact';
  return null;
}

// ── Route handler ─────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { message, history = [], currentPage = '/' } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required.' });
    }
    if (message.length > 500) {
      return res.status(400).json({ error: 'Message too long (max 500 chars).' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: 'AI assistant is not configured. Please add GEMINI_API_KEY to backend/.env',
        reply: '⚠ The AI backend is not configured yet. Please ask the administrator to add a Gemini API key. In the meantime, I can tell you that PhishGuard AI detects phishing URLs and emails using a multi-layer ML pipeline. Visit the **How It Works** page for details!'
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    // Build context-aware page info
    const pageContext = PAGE_CONTEXT[currentPage] || `The user is on the page: ${currentPage}`;

    // Build conversation history for Gemini
    const geminiHistory = history
      .filter(m => m.text && m.role)
      .map(m => ({
        role: m.role === 'bot' ? 'model' : 'user',
        parts: [{ text: m.text }],
      }));

    // Start chat session
    const chat = model.startChat({
      history: geminiHistory,
    });

    // Augment user message with page context
    const contextualMessage = `[Context: ${pageContext}]\n\nUser question: ${message}`;
    const result = await chat.sendMessage(contextualMessage);
    const reply = result.response.text().trim();

    // Detect if we should suggest navigation
    const navigateTo = detectNavIntent(reply);

    res.json({ reply, navigateTo });

  } catch (err) {
    console.error('Chat error:', err);

    // Friendly 429 rate limit message
    if (err.status === 429 || err.message?.includes('429') || err.message?.includes('Too Many Requests')) {
      return res.status(429).json({
        error: 'Rate limit reached.',
        reply: '⏳ I\'m receiving too many requests right now. Please wait about 30 seconds and try again — the Gemini free tier has a per-minute limit.'
      });
    }

    // Invalid API key
    if (err.message?.includes('API_KEY_INVALID') || err.message?.includes('API key')) {
      return res.status(503).json({
        error: 'Invalid Gemini API key.',
        reply: '⚠ The AI API key appears to be invalid. Please check the GEMINI_API_KEY in backend/.env and restart the server.'
      });
    }

    res.status(500).json({
      error: 'Failed to get AI response.',
      reply: '⚠ Something went wrong with the AI backend. Please try again in a moment.'
    });
  }
});

module.exports = router;
