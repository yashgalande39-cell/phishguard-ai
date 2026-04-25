  # 🛡️ PhishGuard AI — Real-Time Phishing Detection Platform

> An AI-powered, full-stack cybersecurity platform for detecting phishing URLs and malicious emails in real time using Naive Bayes NLP and multi-vector heuristic analysis.

**Developed as a Project Based Learning (PBL) initiative at MIT-ADT University, Department of Computer Science & Engineering.**

---

## 🌟 Features

- 🔍 **Real-time URL & Email Scanner** — Analyze any link or email body instantly
- 🧠 **Naive Bayes ML Classifier** — Trained on PhishTank, OpenPhish, SpamAssassin & Enron datasets
- 📊 **Live Telemetry Dashboard** — Paginated scan history with drill-down detail drawer
- 🔐 **Multi-vector Heuristic Engine** — Shannon entropy, homograph detection, brand impersonation, SPF/DKIM parsing
- 🌗 **Dark / Light Theme** — Persistent theme using localStorage
- 📤 **CSV Export** — Download filtered scan history
- 🔔 **Toast Notifications** — Real-time feedback on contact form submissions
- 📜 **Privacy Policy & Terms of Service** pages

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 5, React Router v6, Vanilla CSS |
| Backend | Node.js 20, Express 4, dotenv, cors, express-rate-limit |
| AI / ML | natural.js (Naive Bayes), Shannon Entropy, NLP Tokenizer |
| Database | MySQL 8, mysql2/promise |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MySQL 8+
- Git

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/phishguard-ai.git
cd phishguard-ai
```

### 2. Set up the Database
```bash
# Log into MySQL and run:
mysql -u root -p < db-setup.sql
```

### 3. Configure the Backend
```bash
cd backend
cp .env.example .env
# Edit .env with your MySQL credentials
npm install
```

### 4. Start the Backend
```bash
node server.js
# Backend runs on http://localhost:5000
# ML engine will initialize and load datasets (takes ~10 seconds)
```

### 5. Start the Frontend
```bash
cd ../frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 📡 API Reference

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/analyze` | Analyze a URL or email for phishing |
| GET | `/api/history` | Fetch last 50 scan records |
| POST | `/api/feedback` | Submit a correction on a scan result |
| POST | `/api/contact` | Submit a contact form inquiry |

---

## 👥 Team

| Name | Role |
|---|---|
| Yash Galande | Team Lead & System Architect |
| Yashkumar Lembhe | AI & Machine Learning Engineer |
| Ram Borkar | Frontend Developer & UX Engineer |
| Ayush Patil | Backend & Database Integrator |

**Faculty Mentor:** Prof. Shraddha Katkar — MIT-ADT University

---

## 📄 License

This project is developed for academic purposes under the MIT-ADT University PBL program. All rights reserved by the project team.
