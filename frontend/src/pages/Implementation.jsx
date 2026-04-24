import React, { useState } from 'react';
import {
  Share2, Code, Database as DbIcon, MonitorSmartphone,
  Server, BrainCircuit, ShieldAlert, Globe, Zap,
  Lock, ArrowRight, ChevronDown, ChevronUp, Terminal, Network
} from 'lucide-react';

const BADGE = ({ color, label }) => (
  <span style={{
    display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: '99px',
    fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.5px',
    textTransform: 'uppercase', fontFamily: 'var(--font-mono)',
    backgroundColor: `${color}22`, color: color, border: `1px solid ${color}44`
  }}>{label}</span>
);

const METHOD_BADGE = ({ method }) => {
  const colors = { POST: '#22d3ee', GET: '#4ade80', PUT: '#f59e0b', DELETE: '#f87171' };
  return <BADGE color={colors[method] || '#94a3b8'} label={method} />;
};

function ApiCard({ method, endpoint, summary, description, requestBody, response, params }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: '1rem',
      transition: 'box-shadow 0.3s',
      boxShadow: open ? '0 0 18px var(--glow-color)' : 'none'
    }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem',
        textAlign: 'left'
      }}>
        <METHOD_BADGE method={method} />
        <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontSize: '0.95rem', flex: 1 }}>{endpoint}</code>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', flex: 2 }}>{summary}</span>
        {open ? <ChevronUp size={18} color="var(--text-secondary)" /> : <ChevronDown size={18} color="var(--text-secondary)" />}
      </button>

      {open && (
        <div style={{ padding: '0 1.25rem 1.25rem', borderTop: '1px solid var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)', margin: '1rem 0', fontSize: '0.9rem', lineHeight: 1.6 }}>{description}</p>

          {params && (
            <>
              <h5 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Query Parameters</h5>
              <div style={{ background: 'var(--bg-primary)', borderRadius: 'var(--radius)', padding: '0.75rem 1rem', marginBottom: '1rem' }}>
                {params.map(p => (
                  <div key={p.name} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    <code style={{ color: 'var(--brand-primary)', minWidth: 100 }}>{p.name}</code>
                    <BADGE color="#f59e0b" label={p.type} />
                    <span style={{ color: 'var(--text-secondary)' }}>{p.desc}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {requestBody && (
            <>
              <h5 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Request Body</h5>
              <pre style={{
                background: 'var(--bg-primary)', borderRadius: 'var(--radius)',
                padding: '0.75rem 1rem', fontSize: '0.82rem',
                color: 'var(--brand-primary)', overflowX: 'auto', marginBottom: '1rem',
                fontFamily: 'var(--font-mono)', lineHeight: 1.6
              }}>{requestBody}</pre>
            </>
          )}

          <h5 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Response</h5>
          <pre style={{
            background: 'var(--bg-primary)', borderRadius: 'var(--radius)',
            padding: '0.75rem 1rem', fontSize: '0.82rem',
            color: '#4ade80', overflowX: 'auto',
            fontFamily: 'var(--font-mono)', lineHeight: 1.6
          }}>{response}</pre>
        </div>
      )}
    </div>
  );
}

function Implementation() {
  return (
    <div className="container" style={{ padding: '4rem 0' }}>

      {/* Hero */}
      <h1 className="text-gradient" style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '3rem' }}>
        System Implementation
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 4rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
        A comprehensive deep-dive into the full-stack architecture, AI training datasets, REST API reference, database schema, and security primitives powering the PhishGuard AI platform.
      </p>

      {/* Tech Stack Cards */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Code size={32} style={{ color: 'var(--brand-primary)' }} /> Technology Stack
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>

          <div className="card" style={{ borderTopColor: 'var(--brand-primary)' }}>
            <MonitorSmartphone size={32} style={{ color: 'var(--brand-primary)', marginBottom: '1rem' }} />
            <h3>Frontend (React + Vite)</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
              SPA built with React 18 and Vite 5. Vanilla CSS custom properties power the theme system. React Router v6 handles client-side navigation with zero full-page reloads.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['React 18', 'Vite 5', 'Lucide Icons', 'React Router v6', 'CSS Variables'].map(t => (
                <BADGE key={t} color="var(--brand-primary)" label={t} />
              ))}
            </div>
          </div>

          <div className="card" style={{ borderTopColor: 'var(--brand-secondary)' }}>
            <Server size={32} style={{ color: 'var(--brand-secondary)', marginBottom: '1rem' }} />
            <h3>Backend (Node.js + Express)</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
              RESTful API built on Express 4.x with full async/await design. CORS-enabled for cross-origin requests. Input sanitized via parameterized queries and regex validators before processing.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['Node.js 20', 'Express 4', 'Axios', 'dotenv', 'cors', 'nodemon'].map(t => (
                <BADGE key={t} color="var(--brand-secondary)" label={t} />
              ))}
            </div>
          </div>

          <div className="card" style={{ borderTopColor: 'var(--brand-success)' }}>
            <BrainCircuit size={32} style={{ color: 'var(--brand-success)', marginBottom: '1rem' }} />
            <h3>AI / ML Engine</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
              Naive Bayes text classifier from the <code>natural</code> NLP library, trained on live phishing feeds, the SpamAssassin corpus, and the Enron Email Dataset. Augmented with heuristic scoring (Shannon entropy, homograph detection, brand impersonation).
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['natural.js', 'BayesClassifier', 'Shannon Entropy', 'Homograph Detection', 'NLP'].map(t => (
                <BADGE key={t} color="var(--brand-success)" label={t} />
              ))}
            </div>
          </div>

          <div className="card" style={{ borderTopColor: 'var(--brand-warning)' }}>
            <DbIcon size={32} style={{ color: 'var(--brand-warning)', marginBottom: '1rem' }} />
            <h3>Database (MySQL)</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
              Persistent relational store via <code>mysql2/promise</code>. Stores scan history, user feedback, and contact submissions with parameterized queries preventing all SQL injection vectors.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['MySQL 8', 'mysql2/promise', 'Connection Pool', 'Parameterized Queries'].map(t => (
                <BADGE key={t} color="var(--brand-warning)" label={t} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Dataset Integration */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Network size={32} style={{ color: 'var(--brand-secondary)' }} /> AI Training Dataset Integration
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[
            { name: 'Phishing.Database Feed', role: 'Malicious Training Data', color: '#f87171', desc: 'Maintained by Mitchell Krog. Active phishing/malware URLs piped directly into the Naive Bayes classifier as negative training samples. Capped at 3,000 vectors for memory efficiency.' },
            { name: 'Alexa Top Sites Array', role: 'Benign Training Data', color: '#4ade80', desc: 'Top 5,000 legitimate globally-trafficked domains used as the positive safe baseline. Teaches the classifier the lexical structure of trustworthy URLs.' },
            { name: 'PhishTank Intelligence', role: 'Verification Proxy', color: '#f59e0b', desc: 'Operated by Cisco Talos. The engine cross-references analyzed domains against PhishTank manually verified malicious endpoints for a second-opinion confirmation check.' },
            { name: 'OpenPhish Global Feeds', role: 'Zero-Day Proxy', color: '#c084fc', desc: 'Autonomous threat intelligence. Domains matching OpenPhish signatures trigger an immediate Ensemble Override and push a Zero-Day threat flag into the analysis payload.' },
            { name: 'SpamAssassin Corpus', role: 'NLP Targeting', color: '#22d3ee', desc: 'Syntactic phishing email pattern templates extracted from the Apache SpamAssassin corpus. Trains the language classifier to detect coercion, financial urgency, and fake invoice patterns.' },
            { name: 'Enron Email Dataset', role: 'Benign NLP Data', color: '#34d399', desc: '~500,000 real corporate emails used to synthesize the safe language baseline. Ensures the NLP engine does not flag standard business communication like HR updates and sprint meetings.' },
          ].map(ds => (
            <div key={ds.name} className="card" style={{ borderLeft: `3px solid ${ds.color}`, padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <h4 style={{ color: 'var(--text-primary)', margin: 0 }}>{ds.name}</h4>
                <BADGE color={ds.color} label={ds.role} />
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{ds.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Data Flow */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Zap size={32} style={{ color: 'var(--brand-primary)' }} /> End-to-End Data Flow
        </h2>
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
            {[
              'User Input', 'Input Validation', 'Rate Limiting', 'Feature Extraction',
              'Heuristic Engine', 'Naive Bayes Classifier', 'Ensemble Scoring',
              'MySQL Persist', 'JSON Response', 'React State Update'
            ].map((step, i, arr) => (
              <React.Fragment key={step}>
                <div style={{
                  background: 'var(--bg-primary)', border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius)', padding: '0.6rem 1rem',
                  fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--brand-primary)',
                  textAlign: 'center'
                }}>{step}</div>
                {i < arr.length - 1 && <ArrowRight size={16} color="var(--border-color)" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Database Schema */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <DbIcon size={32} style={{ color: 'var(--brand-warning)' }} /> Database Schema
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {[
            {
              table: 'scans', color: 'var(--brand-primary)',
              fields: [
                { name: 'id', type: 'INT', note: 'AUTO_INCREMENT PRIMARY KEY' },
                { name: 'input_data', type: 'TEXT', note: 'The raw URL or email body submitted' },
                { name: 'result', type: 'VARCHAR(50)', note: '"Safe" | "Suspicious" | "Phishing Detected"' },
                { name: 'confidence_score', type: 'FLOAT', note: 'ML confidence (0.01–0.99)' },
                { name: 'created_at', type: 'TIMESTAMP', note: 'Auto set on insert' },
              ]
            },
            {
              table: 'contacts', color: 'var(--brand-secondary)',
              fields: [
                { name: 'id', type: 'INT', note: 'AUTO_INCREMENT PRIMARY KEY' },
                { name: 'name', type: 'VARCHAR(255)', note: 'Submitter full name' },
                { name: 'email', type: 'VARCHAR(255)', note: 'Contact email address' },
                { name: 'message', type: 'TEXT', note: 'Free-form inquiry message' },
                { name: 'created_at', type: 'TIMESTAMP', note: 'Auto set on insert' },
              ]
            },
            {
              table: 'feedback', color: 'var(--brand-success)',
              fields: [
                { name: 'id', type: 'INT', note: 'AUTO_INCREMENT PRIMARY KEY' },
                { name: 'scan_id', type: 'INT', note: 'Foreign Key → scans.id' },
                { name: 'user_comment', type: 'TEXT', note: 'User correction or feedback text' },
                { name: 'created_at', type: 'TIMESTAMP', note: 'Auto set on insert' },
              ]
            },
          ].map(({ table, color, fields }) => (
            <div key={table} className="card" style={{ padding: '1.5rem' }}>
              <h4 style={{ fontFamily: 'var(--font-mono)', color, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <DbIcon size={18} /> {table}
              </h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    {['Column', 'Type', 'Notes'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '0.4rem 0.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fields.map(f => (
                    <tr key={f.name} style={{ borderBottom: '1px solid var(--border-color)11' }}>
                      <td style={{ padding: '0.4rem 0.5rem', fontFamily: 'var(--font-mono)', color: 'var(--brand-primary)' }}>{f.name}</td>
                      <td style={{ padding: '0.4rem 0.5rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{f.type}</td>
                      <td style={{ padding: '0.4rem 0.5rem', color: 'var(--text-secondary)' }}>{f.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>

      {/* Security Primitives */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Lock size={32} style={{ color: 'var(--brand-danger)' }} /> Security Architecture
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {[
            { title: 'SQL Injection Prevention', desc: 'All database queries use mysql2 parameterized statements. User-supplied input is never interpolated into raw SQL strings.' },
            { title: 'CORS Policy', desc: 'Express cors() middleware restricts origins. Only trusted frontend domains can interact with the REST API server endpoints.' },
            { title: 'Input Sanitization', desc: 'URL inputs are validated against a strict RFC-compliant regex before processing. Emails are length-capped to prevent DoS via large payload submission.' },
            { title: 'Rate Limiting (Planned)', desc: 'The API Gateway layer is designed to support express-rate-limit middleware to throttle brute-force scanning and DDoS mitigation.' },
            { title: 'Env Variable Isolation', desc: 'All secrets (DB credentials, API keys) are stored in a local .env file loaded through dotenv and never committed to version control.' },
            { title: 'XSS Output Encoding', desc: 'All analysis keywords are transported as plain JSON data and rendered in React, which automatically escapes dangerous HTML characters by default.' },
          ].map(s => (
            <div key={s.title} className="card" style={{ padding: '1.25rem', borderLeft: '3px solid var(--brand-danger)' }}>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1rem' }}>
                <ShieldAlert size={16} style={{ color: 'var(--brand-danger)', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                {s.title}
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Full REST API Reference */}
      <section>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Terminal size={32} style={{ color: 'var(--brand-primary)' }} /> REST API Reference
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span>Base URL:</span>
          <code style={{ color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)', background: 'rgba(0,240,255,0.06)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}>
            {import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api
          </code>
          <span style={{ fontSize: '0.8rem', color: 'var(--brand-success)', fontFamily: 'var(--font-mono)', background: 'rgba(0,255,157,0.08)', padding: '0.15rem 0.5rem', borderRadius: 99, border: '1px solid rgba(0,255,157,0.3)' }}>
            {import.meta.env.VITE_API_BASE_URL ? '● Production' : '● Development'}
          </span>
          &nbsp;— All endpoints accept and return <code>application/json</code>.
        </p>

        <ApiCard
          method="POST"
          endpoint="/api/analyze"
          summary="Submit a URL or email for phishing analysis"
          description="The core detection endpoint. Accepts a raw URL or email body string, runs it through multi-vector heuristic analysis and the Naive Bayes ML classifier, then persists the result to MySQL and returns a full structured verdict payload."
          requestBody={`{
  "input_data": "http://paypal-secure-login.billing.com/update",
  "type": "url"   // "url" | "email"
}`}
          response={`HTTP 200 OK
{
  "id": 42,
  "input_data": "http://paypal-secure-login.billing.com/update",
  "result": "Phishing Detected",
  "confidence_score": 0.91,
  "analysis_details": {
    "in_blocklist": false,
    "subdomain_count": 2,
    "ip_detected": false,
    "ml_classification": "phishing",
    "ml_confidence": 0.87,
    "keywords_found": [
      "Brand Impersonation (paypal)",
      "Excessive Subdomains (2)",
      "Phishing Keywords (login,secure,billing)",
      "SpamAssassin NLP Hits (verify)"
    ]
  }
}`}
        />

        <ApiCard
          method="GET"
          endpoint="/api/history"
          summary="Retrieve recent scan history"
          description="Returns the last 50 scan records from the MySQL scans table, ordered by creation timestamp descending. Used to populate the Dashboard timeline component."
          response={`HTTP 200 OK
[
  {
    "id": 42,
    "input_data": "http://paypal-secure-login.billing.com/update",
    "result": "Phishing Detected",
    "confidence_score": 0.91,
    "created_at": "2026-04-17T03:15:22.000Z"
  },
  {
    "id": 41,
    "input_data": "https://github.com",
    "result": "Safe",
    "confidence_score": 0.04,
    "created_at": "2026-04-17T02:50:10.000Z"
  }
]`}
        />

        <ApiCard
          method="POST"
          endpoint="/api/feedback"
          summary="Submit user correction feedback on a scan"
          description="Allows the user to submit a correction on a historical scan result. Stored in the feedback table keyed to the original scan ID. Intended for use in future model retraining loops."
          requestBody={`{
  "scan_id": 42,
  "user_comment": "This URL was incorrectly flagged as phishing."
}`}
          response={`HTTP 200 OK
{
  "success": true,
  "message": "Feedback received. The ML model will be corrected in future syncs."
}`}
        />

        <ApiCard
          method="POST"
          endpoint="/api/contact"
          summary="Submit a contact form inquiry"
          description="Persists a user-submitted contact inquiry (name, email, message) into the contacts table in MySQL. Validates that all three fields are present before insertion."
          requestBody={`{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "message": "I'd like to request an API key for enterprise integration."
}`}
          response={`HTTP 200 OK
{
  "success": true,
  "message": "Contact form submitted successfully"
}

// Error Response (Missing Fields)
HTTP 400 Bad Request
{
  "error": "All fields are required"
}`}
        />

        <ApiCard
          method="GET"
          endpoint="/api/health"
          summary="(Planned) Backend health check"
          description="A planned monitoring endpoint to report the server uptime, ML engine training status, and database connectivity state. Useful for DevOps and CI/CD pipeline health probes."
          response={`HTTP 200 OK  (Planned)
{
  "status": "healthy",
  "ml_trained": true,
  "db_connected": true,
  "uptime_seconds": 3821
}`}
        />
      </section>

    </div>
  );
}

export default Implementation;
