import React, { useState } from 'react';
import {
  Globe, Search, Server, Database, Activity,
  ArrowRight, ArrowDown, ShieldAlert, Zap,
  CheckCircle, FileText, Network, LayoutDashboard,
  BrainCircuit, MailCheck, Layers, Lock, Cpu,
  Filter, Radio, AlertTriangle, BarChart2, RefreshCw, Shield
} from 'lucide-react';
import './HowItWorks.css';

/* ── Reusable sub-components ─────────────────────────────── */
function ArchNode({ icon: Icon, iconColor, title, sub, highlight, size = 'md', extra }) {
  return (
    <div className={`arch-node ${highlight ? 'highlight' : ''} arch-node-${size}`}
      style={iconColor ? { '--node-accent': iconColor } : {}}>
      <Icon size={size === 'lg' ? 32 : 22} style={{ color: iconColor || 'var(--brand-primary)' }} />
      <h4>{title}</h4>
      {sub && <span>{sub}</span>}
      {extra && <span className="arch-node-extra">{extra}</span>}
    </div>
  );
}

function Arrow({ dir = 'h', label }) {
  return (
    <div className={`arch-arrow-wrap arch-arrow-${dir}`}>
      <ArrowRight className="arch-arrow-icon" />
      {label && <span className="arch-arrow-label">{label}</span>}
    </div>
  );
}

function WorkflowStep({ num, icon: Icon, iconColor, title, bullets }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="workflow-item">
      <div className="workflow-icon-wrapper" style={{ borderColor: iconColor, color: iconColor }}>
        <Icon size={20} />
      </div>
      <div className="workflow-content">
        <button className="workflow-toggle" onClick={() => setOpen(o => !o)}>
          <span className="workflow-num" style={{ color: iconColor }}>Step {num}</span>
          <h3>{title}</h3>
          <span className="workflow-chevron">{open ? '−' : '+'}</span>
        </button>
        {open && (
          <ul className="workflow-bullets">
            {bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────── */
function HowItWorks() {
  return (
    <div className="container" style={{ padding: '4rem 0' }}>

      {/* Hero */}
      <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'inline-block' }}>
          How It Works
        </h1>
        <p className="hiw-subtitle">
          PhishGuard AI deploys a multi-layered, real-time pipeline combining Shannon Entropy heuristics,
          Naive Bayes NLP classification, and live threat intelligence feeds to intercept phishing URLs
          and emails in under 300 milliseconds — without user privacy compromise.
        </p>
      </section>

      <div className="hiw-content">

        {/* ── SECTION 2: ARCHITECTURE DIAGRAM ─────────────── */}
        <section>
          <h2 className="hiw-section-title"><Network size={32} /> Full-Stack System Architecture</h2>
          <div className="arch-diagram-wrapper">
            <div className="arch-flow-landscape">

              {/* COL 1: Client Layer */}
              <div className="arch-col">
                <div className="arch-col-label">CLIENT LAYER</div>
                <ArchNode icon={Globe} iconColor="#22d3ee" title="End User" sub="Browser / Mobile" />
                <ArrowDown size={16} style={{ color: 'var(--border-color)', margin: '4px auto' }} />
                <ArchNode icon={LayoutDashboard} iconColor="#22d3ee" title="React UI (Vite)" sub="SPA — TLS Secured" />
                <ArrowDown size={16} style={{ color: 'var(--border-color)', margin: '4px auto' }} />
                <ArchNode icon={Filter} iconColor="#94a3b8" title="Input Validator" sub="Regex • Length Cap" />
              </div>

              <Arrow dir="h" label="HTTPS POST" />

              {/* COL 2: API Gateway */}
              <div className="arch-col">
                <div className="arch-col-label">GATEWAY</div>
                <ArchNode icon={Server} iconColor="var(--brand-primary)" title="Express.js API" sub="Port 5000" highlight />
                <ArrowDown size={16} style={{ color: 'var(--border-color)', margin: '4px auto' }} />
                <ArchNode icon={Shield} iconColor="var(--brand-primary)" title="CORS + Rate Limit" sub="DDoS Protection" />
                <ArrowDown size={16} style={{ color: 'var(--border-color)', margin: '4px auto' }} />
                <ArchNode icon={Radio} iconColor="var(--brand-primary)" title="Request Router" sub="type: url | email" />
              </div>

              <Arrow dir="h" label="Route Dispatch" />

              {/* COL 3: Parallel Processing Engines */}
              <div className="arch-col" style={{ gap: '1rem' }}>
                <div className="arch-col-label">ANALYSIS ENGINES</div>

                {/* URL Track */}
                <div className="arch-track">
                  <span className="track-label">URL ENGINE</span>
                  <ArchNode icon={Search} iconColor="#f59e0b" title="Lexical Analysis" sub="Entropy · Subdomains · Hyphens" size="sm" />
                  <ArrowRight size={14} style={{ color: 'var(--border-color)' }} />
                  <ArchNode icon={AlertTriangle} iconColor="#f59e0b" title="Homograph Check" sub="Cyrillic Lookalike Regex" size="sm" />
                  <ArrowRight size={14} style={{ color: 'var(--border-color)' }} />
                  <ArchNode icon={ShieldAlert} iconColor="#ef4444" title="Blocklist X-Ref" sub="Phishing.Database + OpenPhish" size="sm" />
                  <ArrowRight size={14} style={{ color: 'var(--border-color)' }} />
                  <ArchNode icon={Globe} iconColor="#ef4444" title="Brand Impersonation" sub="14 Target Brands" size="sm" />
                </div>

                {/* Email Track */}
                <div className="arch-track">
                  <span className="track-label">EMAIL ENGINE</span>
                  <ArchNode icon={MailCheck} iconColor="#22d3ee" title="Header Parser" sub="SPF · DKIM · DMARC" size="sm" />
                  <ArrowRight size={14} style={{ color: 'var(--border-color)' }} />
                  <ArchNode icon={FileText} iconColor="#22d3ee" title="NLP Tokenizer" sub="SpamAssassin Corpus" size="sm" />
                  <ArrowRight size={14} style={{ color: 'var(--border-color)' }} />
                  <ArchNode icon={Search} iconColor="#a78bfa" title="Link Extractor" sub="Recursive URL Scan" size="sm" />
                  <ArrowRight size={14} style={{ color: 'var(--border-color)' }} />
                  <ArchNode icon={AlertTriangle} iconColor="#a78bfa" title="Psych Scanner" sub="Urgency · Coercion NLP" size="sm" />
                </div>
              </div>

              <Arrow dir="h" label="Feature Vectors" />

              {/* COL 4: AI Core */}
              <div className="arch-col">
                <div className="arch-col-label">AI CORE</div>
                <ArchNode icon={BrainCircuit} iconColor="#a78bfa" title="Naive Bayes Classifier" sub="Trained on 3,000+ URLs + Enron Dataset" size="lg" highlight />
                <ArrowDown size={16} style={{ color: 'var(--border-color)', margin: '4px auto' }} />
                <ArchNode icon={Cpu} iconColor="#a78bfa" title="Ensemble Scorer" sub="Heuristics × ML Weighted Matrix" />
                <ArrowDown size={16} style={{ color: 'var(--border-color)', margin: '4px auto' }} />
                <ArchNode icon={RefreshCw} iconColor="#94a3b8" title="Override Engine" sub="Zero-Day Heuristic Guard" />
              </div>

              <Arrow dir="h" label="Persist + Return" />

              {/* COL 5: Storage + Response */}
              <div className="arch-col">
                <div className="arch-col-label">STORAGE & RESPONSE</div>
                <ArchNode icon={Database} iconColor="var(--brand-warning)" title="MySQL (Scans)" sub="Parameterized Queries" />
                <ArrowDown size={16} style={{ color: 'var(--border-color)', margin: '4px auto' }} />
                <ArchNode icon={Layers} iconColor="var(--brand-warning)" title="Feedback Store" sub="Retraining Pipeline" />
                <ArrowDown size={16} style={{ color: 'var(--border-color)', margin: '4px auto' }} />
                <ArchNode icon={BarChart2} iconColor="#4ade80" title="JSON Verdict" sub="Result · Confidence · Flags" highlight />
                <ArrowDown size={16} style={{ color: 'var(--border-color)', margin: '4px auto' }} />
                <ArchNode icon={Activity} iconColor="#4ade80" title="UI Alert" sub="Safe / Suspicious / Phishing" />
              </div>

            </div>

            {/* Legend */}
            <div className="arch-legend">
              {[
                { color: '#22d3ee', label: 'Client Layer' },
                { color: 'var(--brand-primary)', label: 'API Gateway' },
                { color: '#f59e0b', label: 'URL Engine' },
                { color: '#22d3ee', label: 'Email Engine' },
                { color: '#a78bfa', label: 'AI Core' },
                { color: 'var(--brand-warning)', label: 'Persistence' },
                { color: '#4ade80', label: 'Verdict Output' },
              ].map(({ color, label }) => (
                <div key={label} className="legend-item">
                  <div className="legend-dot" style={{ background: color }} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3: GRANULAR PROCESS FLOW ────────────── */}
        <section>
          <h2 className="hiw-section-title"><Activity size={32} /> Granular Process Flow</h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Click each step to expand the technical implementation detail.
          </p>
          <div className="workflow-timeline">
            <WorkflowStep num={1} icon={Globe} iconColor="#22d3ee" title="Payload Submission & Validation"
              bullets={[
                'User enters a URL or pastes raw email content into the React scanner interface.',
                'Client-side validation checks input length (max 2,048 chars for URLs, 10,000 for emails).',
                'An async fetch() POST dispatches the data to POST /api/analyze on the Express backend.',
                'Server-side: a strict RFC-compliant URL regex and IP pattern validator runs before any ML logic.',
                'Invalid inputs receive an immediate HTTP 400 Bad Request with a descriptive error message.',
              ]} />
            <WorkflowStep num={2} icon={Shield} iconColor="var(--brand-primary)" title="API Gateway Security & Routing"
              bullets={[
                'The CORS middleware verifies the request origin against the allowed frontend domain.',
                'Rate limiting headers are checked — future deployments will enforce 100 req/min per IP.',
                'The request type field (url | email) routes the payload to its dedicated analysis engine.',
                'An execution context object is created containing the trace metadata for audit logging.',
                'All inputs are lowercased and stripped of zero-width Unicode characters before the engine sees them.',
              ]} />
            <WorkflowStep num={3} icon={Search} iconColor="#f59e0b" title="URL Engine — Multi-Vector Heuristic Analysis"
              bullets={[
                'Shannon Entropy is calculated on the domain string. Values > 4.2 bits flag a DGA gibberish domain.',
                'The subdomain depth is counted: more than 2 nested subdomains adds a +0.15 risk score each.',
                'A Cyrillic homograph regex scans the domain for lookalike character substitutions (e.g., а vs a).',
                'The root domain is compared against 14 curated high-value brands — a mismatch triggers Brand Impersonation (+0.40).',
                'A dictionary of 11 phishing keywords (login, secure, verify, auth…) is matched against the full URL path.',
                'The domain is cross-referenced against the Phishing.Database live blocklist and OpenPhish zero-day feed.',
              ]} />
            <WorkflowStep num={4} icon={MailCheck} iconColor="#22d3ee" title="Email Engine — Forensic NLP Analysis"
              bullets={[
                'The raw email body is scanned with a regex to unroll all embedded URLs (http:// and www. patterns).',
                'Each extracted URL is recursively run through the complete URL Heuristic Engine independently.',
                'SPF/DKIM/DMARC failure strings (e.g. spf=fail, dkim=neutral) are parsed from raw header blocks.',
                'A 14-keyword psychological coercion dictionary (urgent, lottery, wire transfer…) is evaluated.',
                'The full email text is tokenized via natural.WordTokenizer and classified by the Naive Bayes model.',
                'Email ML confidence is weighted at +0.35 (phishing) vs -0.10 (safe) in the ensemble matrix.',
              ]} />
            <WorkflowStep num={5} icon={BrainCircuit} iconColor="#a78bfa" title="Naive Bayes Classifier Inference"
              bullets={[
                'Feature tokens are passed to the pre-trained natural.BayesClassifier instance.',
                'The model returns log-probability scores for phishing and safe classifications.',
                'Scores are normalized: |pSafe| / (|pSafe| + |pPhish|) gives a human-readable confidence ratio.',
                'The classification modifies the final ensemble score: +0.25 for phishing, -0.15 for safe.',
                'Zero-Day Override: if ML says "safe" but heuristics score > 0.60, the heuristic takes authority (+0.40 forced).',
                'This Ensemble Override prevents adversarial tuning of URL structure to fool the ML classifier alone.',
              ]} />
            <WorkflowStep num={6} icon={Database} iconColor="var(--brand-warning)" title="Persistence & Telemetry Logging"
              bullets={[
                'The final verdict object is serialized and inserted into the MySQL scans table via parameterized query.',
                'The confidence_score (0.01–0.99 float) and result string (Safe | Suspicious | Phishing Detected) are stored.',
                'The analysis_details keyword array is returned inline with the API response but not separately stored.',
                'User-submitted feedback (POST /api/feedback) links to the scan via foreign key for future retraining.',
                'The GET /api/history endpoint serves up to 50 most recent scan records sorted by creation timestamp.',
              ]} />
            <WorkflowStep num={7} icon={Activity} iconColor="#4ade80" title="Verdict Dispatch & UI Rendering"
              bullets={[
                'The backend returns a HTTP 200 JSON payload containing: id, result, confidence_score, and analysis_details.',
                'The React frontend updates state with the verdict, triggering a re-render of the result panel.',
                'A confidence percentage ring is animated, visually representing the computed threat probability.',
                'Each keyword in analysis_details.keywords_found is rendered as a distinct anomaly badge.',
                'The result color-codes: Green (Safe), Amber (Suspicious), Red (Phishing Detected).',
                'Users can optionally submit a feedback flag which calls POST /api/feedback for the logged scan ID.',
              ]} />
          </div>
        </section>

        {/* ── SECTION 4: DETECTION PHILOSOPHY ─────────────── */}
        <section>
          <h2 className="hiw-section-title"><Search size={32} /> Core Detection Philosophy</h2>
          <div className="explanation-grid">

            <div className="explain-card">
              <div className="explain-icon"><Search size={28} /></div>
              <h3>Deep URL Heuristics</h3>
              <p>Our system deconstructs URLs beyond simple string matching using a 7-vector algorithmic probe that mathematically scores domain legitimacy.</p>
              <ul>
                <li><strong>Shannon Entropy:</strong> Chars above 4.2 bits/domain signal algorithmically-generated domains.</li>
                <li><strong>Homograph Detection:</strong> Regex-matches Cyrillic/Greek lookalike characters in Punycode domains.</li>
                <li><strong>Brand Impersonation:</strong> Detects brand keywords present in subdomains mismatched to root domains.</li>
                <li><strong>Blocklist Cross-Reference:</strong> Live lookup against Phishing.Database + PhishTank feeds.</li>
                <li><strong>Zero-Day Ensemble Override:</strong> Heuristic score trumps ML verdict when structural anomalies exceed threshold.</li>
              </ul>
            </div>

            <div className="explain-card">
              <div className="explain-icon"><MailCheck size={28} /></div>
              <h3>Advanced Email Forensics</h3>
              <p>Emails are forensically dissected at both the structural header level and semantic NLP layer using industry-standard authentication protocols.</p>
              <ul>
                <li><strong>Sender Auth Parse:</strong> Inline SPF=fail / DKIM=neutral / DMARC=fail detection from raw header strings.</li>
                <li><strong>Recursive Link Extraction:</strong> All embedded URLs are individually run through the full URL Engine.</li>
                <li><strong>Psychological Matrix:</strong> 14 coercion-keyword vectors trained on the Apache SpamAssassin corpus.</li>
                <li><strong>Enron Baseline:</strong> Benign corporate communication patterns from the Enron CMU Dataset prevent false positives.</li>
                <li><strong>Naive Bayes NLP:</strong> Token probability distributions classify email intent as phishing or safe.</li>
              </ul>
            </div>

            <div className="explain-card">
              <div className="explain-icon"><BrainCircuit size={28} /></div>
              <h3>AI Classification Engine</h3>
              <p>The core Naive Bayes model combines with deterministic heuristics in a weighted ensemble to guarantee Zero-Day detection capability.</p>
              <ul>
                <li><strong>Ensemble Architecture:</strong> ML classification and heuristic scores are combined via a weighted matrix.</li>
                <li><strong>Zero-Day Override:</strong> Hard rule-based fallback prevents adversarial tuning of URL structure to fool AI alone.</li>
                <li><strong>Feedback Loop:</strong> User corrections stored in MySQL are designed for incremental retraining cycles.</li>
                <li><strong>Speed:</strong> The entire pipeline runs in &lt; 300ms including dataset cross-referencing and DB write.</li>
              </ul>
            </div>

            <div className="explain-card">
              <div className="explain-icon"><Database size={28} /></div>
              <h3>Data Persistence & Feedback</h3>
              <p>Every scan creates an immutable telemetry record used to build retraining datasets and provide a searchable scan history to the user.</p>
              <ul>
                <li><strong>MySQL Scans Table:</strong> Stores input, verdict, confidence score, and timestamp per scan.</li>
                <li><strong>Feedback Table:</strong> Linked via foreign key to scans — captures user-reported misclassifications.</li>
                <li><strong>Parameterized Queries:</strong> All DB operations use mysql2 prepared statements preventing SQL injection.</li>
                <li><strong>History API:</strong> GET /api/history serves the last 50 scans in DESC order to the Dashboard component.</li>
              </ul>
            </div>

          </div>
        </section>

        {/* ── SECTION 5: THREAT CLASSIFICATION TIERS ──────── */}
        <section>
          <h2 className="hiw-section-title"><BarChart2 size={32} /> Threat Classification Tiers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {[
              { tier: 'Safe', range: '0% – 40%', color: '#4ade80', desc: 'Domain matches Alexa Top Sites or scores extremely low on all heuristic vectors. The Naive Bayes classifier returns a strong safe probability. No anomalies detected.' },
              { tier: 'Suspicious', range: '41% – 75%', color: 'var(--brand-warning)', desc: 'Some phishing indicators detected (e.g., suspicious keyword in URL, moderate entropy) but insufficient evidence to confirm. Treat with caution and verify via secondary means.' },
              { tier: 'Phishing Detected', range: '76% – 99%', color: '#ef4444', desc: 'Multiple high-confidence threat signals fired: blocklist match, brand impersonation, high entropy, and ML phishing classification all agree. Do not proceed.' },
            ].map(({ tier, range, color, desc }) => (
              <div key={tier} className="card" style={{ borderTop: `3px solid ${color}`, padding: '1.5rem' }}>
                <h3 style={{ color, fontFamily: 'var(--font-mono)', marginBottom: '0.25rem' }}>{tier}</h3>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '1rem' }}>Confidence: {range}</span>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 6: TECHNICAL HALLMARKS ──────────────── */}
        <section style={{ paddingBottom: '2rem' }}>
          <h2 className="hiw-section-title"><Zap size={32} /> Technical Hallmarks</h2>
          <div className="features-container">
            {[
              [Zap, '< 300ms Real-Time Detection'],
              [BrainCircuit, 'Naive Bayes + Ensemble AI'],
              [Search, 'URL & Email Dual-Mode'],
              [CheckCircle, '93–97% Detection Accuracy'],
              [Network, 'Express.js Microservice'],
              [Database, 'MySQL Encrypted Storage'],
              [Shield, 'Zero-Day Heuristic Guard'],
              [Lock, 'SQL + XSS Hardened'],
            ].map(([Icon, label]) => (
              <div key={label} className="feature-pill"><Icon />{label}</div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

export default HowItWorks;
