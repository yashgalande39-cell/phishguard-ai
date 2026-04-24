import React from 'react';
import { Target, ShieldCheck, Cpu, Code2, Network, Anchor, Server, Webhook, Activity } from 'lucide-react';

function About() {
  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      
      {/* Header */}
      <h1 className="text-gradient" style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '3rem' }}>About PhishGuard AI</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 4rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
        Engineered as a definitive safeguard against modern digital deception. PhishGuard AI is an advanced, multi-modal threat intelligence platform designed to dynamically classify zero-day phishing vectors.
      </p>

      {/* Mission Objective */}
      <section style={{ marginBottom: '5rem' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '3rem', borderTop: '2px solid var(--brand-primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <Target size={36} style={{ color: 'var(--brand-primary)' }} />
            <h2 style={{ margin: 0, fontSize: '2.2rem' }}>Mission Statement</h2>
          </div>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>MIT-ADT University (PBL Initiative)</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8' }}>
            The conceptualization and active development of PhishGuard AI began as a core component of our Project Based Learning (PBL) curriculum within the Department of Computer Science & Engineering. Our objective was to deviate from standard academic software development and instead construct a live, production-grade cybersecurity tool capable of dissecting the semantic and structural anatomy of malicious payloads. We aim to secure the human element—the most vulnerable link in any computational system—by utilizing deep machine learning to automate the burden of threat verification.
          </p>
        </div>
      </section>

      {/* Grid Information Framework */}
      <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.2rem' }}>Architectural Foundations</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
        
        <div className="card" style={{ display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease' }}>
          <Anchor size={40} style={{ color: 'var(--brand-danger)', marginBottom: '1.5rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>The Ephemeral Threat</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Threat actors no longer rely on static infrastructure. Modern phishing domains are generated automatically, utilized for less than 48 hours, and discarded before global blacklists (like Google SafeBrowsing) can index them. This ephemeral nature renders traditional signature-based blocklists dangerously obsolete for end-users facing targeted attacks.
          </p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease' }}>
          <Cpu size={40} style={{ color: 'var(--brand-success)', marginBottom: '1.5rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Heuristic Machine Learning</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            By shifting from static string-matching to dynamic algorithmic heuristics, our system doesn't just read the link—it attempts to understand the intent behind it. We weigh character entropy, deep subdomain nesting, psychological sentiment parsing, and protocol mismatches against a continuously retrained probabilistic model.
          </p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease' }}>
          <Code2 size={40} style={{ color: 'var(--brand-primary)', marginBottom: '1.5rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Scalable Full-Stack Engineering</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Built using a strict decoupled architecture. The frontend relies on React for blazing-fast cryptographic TLS interaction, while the API gateway handles high-load asynchronous traffic scaling via Node.js/Express. Results and telemetry are piped cleanly into relational MySQL clusters, ensuring forensic retention without bottlenecking user processing vectors.
          </p>
        </div>
      </div>

      {/* Internal & External API Routing Vectors */}
      <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.2rem' }}>API & Integration Vectors</h2>
      <section style={{ marginBottom: '5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Server size={24} style={{ color: 'var(--brand-primary)' }} /> Core Infrastructure API
            </h3>
            <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)' }}>
              <li><strong style={{ color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)' }}>POST /api/analyze</strong>: The primary threat-parsing endpoint. Receives raw URL strings or Email bodies from the React client, runs multi-vector heuristic bounds, executes the Naive Bayes ML classifiers, and returns JSON-formatted boolean confidence strings.</li>
              <li><strong style={{ color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)' }}>GET /api/history</strong>: Telemetry stream endpoint. Polls the MySQL instances to return the 50 most recent structural scans, populating the live SOC Dashboard.</li>
            </ul>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Activity size={24} style={{ color: 'var(--brand-warning)' }} /> Feedback Loop API
            </h3>
            <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)' }}>
              <li><strong style={{ color: 'var(--brand-warning)', fontFamily: 'var(--font-mono)' }}>POST /api/feedback</strong>: Human Verification loop. Allows the end-user to report statistical anomalies or false positives to the database. Future system retrains check this endpoint to structurally adjust the ML model weights.</li>
              <li><strong style={{ color: 'var(--brand-warning)', fontFamily: 'var(--font-mono)' }}>POST /api/contact</strong>: Administrative bridge allowing external developer/contractor inquiries to formally write to the secure contacts database table natively.</li>
            </ul>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Webhook size={24} style={{ color: 'var(--brand-danger)' }} /> External Training APIs
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', lineHeight: '1.6' }}>
              To initialize the algorithmic arrays before the Express server runs, our Node.js pipeline utilizes <code>axios</code> to hit raw external file endpoints:
            </p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: 'var(--text-secondary)', gap: '0.5rem', display: 'flex', flexDirection: 'column' }}>
              <li><strong>Phishing Database Repositories:</strong> Asynchronous GET requests pull large textual sets of verified malicious URLs to weight the ML threat-matrices.</li>
              <li><strong>Alexa Top Sites Extraction:</strong> Asynchronous GET requests to fetch global legitimate domains to mathematically limit the engine's False-Positive ratio on legitimate sites.</li>
            </ul>
          </div>

        </div>
      </section>

      <section>
        <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.03)', padding: '3rem', borderRadius: 'var(--radius)', border: '1px dashed var(--border-color)', textAlign: 'center' }}>
          <ShieldCheck size={48} style={{ margin: '0 auto 1.5rem', color: 'var(--brand-primary)' }} />
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Committed to Digital Integrity</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '0 auto 2rem', maxWidth: '650px', lineHeight: '1.7' }}>
            We believe that safety online should be deterministic, immediate, and accessible. PhishGuard AI is an evolving intelligence meant to continuously adapt against adversarial machine learning tools, guaranteeing that as attacks get smarter, our defenses remain impenetrable.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/" className="btn btn-primary">Try Live Detection →</a>
            <a href="/research" className="btn btn-outline">Read Our Research →</a>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;
