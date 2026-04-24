import React from 'react';
import { Database, Network, Share2, GitPullRequest, ExternalLink, ShieldCheck, Mail, DatabaseZap, BookOpen, Quote } from 'lucide-react';

function Datasets() {
  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <h1 className="text-gradient" style={{ marginBottom: '1rem', fontSize: '3rem' }}>Machine Learning Datasets</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 1.5rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
        The efficacy of any AI prediction model is inherently tied to the structural integrity and volume of its training data. Below is the comprehensive index of the open-source datasets, repositories, and APIs utilized to continuously train the PhishGuard AI classification matrices, identifying deep patterns in malicious URLs and deceptive Email NLP constructs.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '4rem' }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: '2rem', color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)' }}>5M+</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Malicious URLs Indexed</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: '2rem', color: 'var(--brand-success)', fontFamily: 'var(--font-mono)' }}>500k+</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Safe Benign Baselines</span>
        </div>
      </div>

      {/* Primary URL Datasets */}
      <section style={{ marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
          <DatabaseZap style={{ color: 'var(--brand-primary)' }} size={32} /> Primary Threat Vectors (URLs)
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          
          <a href="https://github.com/mitchellkrogza/Phishing.Database" target="_blank" rel="noreferrer" className="card" style={{ display: 'flex', gap: '1.5rem', transition: 'all 0.3s ease' }}>
            <div style={{ background: 'rgba(0, 240, 255, 0.1)', padding: '1rem', borderRadius: '12px', height: 'max-content' }}>
              <GitPullRequest size={36} style={{ color: 'var(--brand-primary)' }} />
            </div>
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '1.4rem' }}>
                Phishing.Database Feed <ExternalLink size={18} style={{ color: 'var(--text-secondary)' }} />
              </h3>
              <span className="feature-pill" style={{ display: 'inline-block', padding: '0.2rem 0.8rem', fontSize: '0.75rem', backgroundColor: 'rgba(255, 42, 95, 0.1)', color: 'var(--brand-danger)', marginBottom: '1rem', border: '1px solid rgba(255, 42, 95, 0.3)' }}>MALICIOUS TRAINING DATA</span>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Maintained by Mitchell Krog, this massively crowdsourced repository aggregates millions of active phishing, malware, and ransomware links. We pipe this directly into our Naive Bayes model to teach it the algorithmic lexical structures (domain spoofing, hyphens, subdomains) of hostile URLs.
              </p>
            </div>
          </a>

          <a href="https://github.com/Kikobeats/top-sites" target="_blank" rel="noreferrer" className="card" style={{ display: 'flex', gap: '1.5rem', transition: 'all 0.3s ease' }}>
            <div style={{ background: 'rgba(0, 255, 157, 0.1)', padding: '1rem', borderRadius: '12px', height: 'max-content' }}>
              <ShieldCheck size={36} style={{ color: 'var(--brand-success)' }} />
            </div>
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '1.4rem' }}>
                Alexa Top Sites Array <ExternalLink size={18} style={{ color: 'var(--text-secondary)' }} />
              </h3>
              <span className="feature-pill" style={{ display: 'inline-block', padding: '0.2rem 0.8rem', fontSize: '0.75rem', backgroundColor: 'rgba(0, 255, 157, 0.1)', color: 'var(--brand-success)', marginBottom: '1rem', border: '1px solid rgba(0, 255, 157, 0.3)' }}>BENIGN TRAINING DATA</span>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                To prevent our AI from throwing 'False Positives', we must train it on safe domains. This programmatic repository routinely fetches the top domains globally, providing our baseline heuristics for what a legitimate, highly-trafficked enterprise network structure looks like.
              </p>
            </div>
          </a>

          <a href="https://phishtank.org/" target="_blank" rel="noreferrer" className="card" style={{ display: 'flex', gap: '1.5rem', transition: 'all 0.3s ease' }}>
            <div style={{ background: 'rgba(255, 176, 0, 0.1)', padding: '1rem', borderRadius: '12px', height: 'max-content' }}>
              <Database size={36} style={{ color: 'var(--brand-warning)' }} />
            </div>
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '1.4rem' }}>
                PhishTank Intelligence <ExternalLink size={18} style={{ color: 'var(--text-secondary)' }} />
              </h3>
              <span className="feature-pill" style={{ display: 'inline-block', padding: '0.2rem 0.8rem', fontSize: '0.75rem', backgroundColor: 'rgba(255, 176, 0, 0.1)', color: 'var(--brand-warning)', marginBottom: '1rem', border: '1px solid rgba(255, 176, 0, 0.3)' }}>VERIFICATION PROXY</span>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Operated by Cisco Talos, PhishTank enables us to verify live URLs in real-time. If our machine learning engine flags an ambiguous domain, our system architecture attempts to cross-reference the URL with PhishTank's manually verified API endpoints.
              </p>
            </div>
          </a>

          <a href="https://openphish.com/" target="_blank" rel="noreferrer" className="card" style={{ display: 'flex', gap: '1.5rem', transition: 'all 0.3s ease' }}>
            <div style={{ background: 'rgba(255, 42, 95, 0.1)', padding: '1rem', borderRadius: '12px', height: 'max-content' }}>
              <Network size={36} style={{ color: 'var(--brand-danger)' }} />
            </div>
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '1.4rem' }}>
                OpenPhish Global Feeds <ExternalLink size={18} style={{ color: 'var(--text-secondary)' }} />
              </h3>
              <span className="feature-pill" style={{ display: 'inline-block', padding: '0.2rem 0.8rem', fontSize: '0.75rem', backgroundColor: 'rgba(255, 42, 95, 0.1)', color: 'var(--brand-danger)', marginBottom: '1rem', border: '1px solid rgba(255, 42, 95, 0.3)' }}>ZERO-DAY PROXY</span>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                A fully autonomous zero-day threat detection feed. By comparing extracted elements (HTML, visual brand manipulation, and target IPs) against OpenPhish patterns, we enforce deep structural URL analysis before deciding to execute our local algorithm.
              </p>
            </div>
          </a>

        </div>
      </section>

      {/* NLP Email Datasets */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
          <Mail style={{ color: 'var(--brand-primary)' }} size={32} /> Social Engineering & NLP (Emails)
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          
          <a href="https://spamassassin.apache.org/old/publiccorpus/" target="_blank" rel="noreferrer" className="card" style={{ display: 'flex', gap: '1.5rem', transition: 'all 0.3s ease' }}>
            <div style={{ background: 'rgba(0, 240, 255, 0.1)', padding: '1rem', borderRadius: '12px', height: 'max-content' }}>
              <Share2 size={36} style={{ color: 'var(--brand-primary)' }} />
            </div>
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '1.4rem' }}>
                SpamAssassin Public Corpus <ExternalLink size={18} style={{ color: 'var(--text-secondary)' }} />
              </h3>
              <span className="feature-pill" style={{ display: 'inline-block', padding: '0.2rem 0.8rem', fontSize: '0.75rem', backgroundColor: 'rgba(0, 240, 255, 0.1)', color: 'var(--brand-primary)', marginBottom: '1rem', border: '1px solid var(--border-color)' }}>NLP TARGETING</span>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                To train the psychological sentiment engine for analyzing emails, we extract syntactic relationships from the renowned Apache SpamAssassin corpus. It provides highly diverse permutations of fraud, fake invoices, and coercion templates.
              </p>
            </div>
          </a>
          
          <a href="https://www.cs.cmu.edu/~enron/" target="_blank" rel="noreferrer" className="card" style={{ display: 'flex', gap: '1.5rem', transition: 'all 0.3s ease' }}>
            <div style={{ background: 'rgba(0, 255, 157, 0.1)', padding: '1rem', borderRadius: '12px', height: 'max-content' }}>
              <ShieldCheck size={36} style={{ color: 'var(--brand-success)' }} />
            </div>
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '1.4rem' }}>
                Enron Email Dataset <ExternalLink size={18} style={{ color: 'var(--text-secondary)' }} />
              </h3>
              <span className="feature-pill" style={{ display: 'inline-block', padding: '0.2rem 0.8rem', fontSize: '0.75rem', backgroundColor: 'rgba(0, 255, 157, 0.1)', color: 'var(--brand-success)', marginBottom: '1rem', border: '1px solid rgba(0, 255, 157, 0.3)' }}>BENIGN NLP DATA</span>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Containing roughly 500,000 emails generated organically by real employees over years, the Enron dataset is the gold standard for training Machine Learning to recognize what 'normal', non-malicious corporate communication looks like.
              </p>
            </div>
          </a>

        </div>
      </section>

      {/* Verified Academic Resources */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
          <BookOpen style={{ color: 'var(--brand-warning)' }} size={32} /> Verified Resources & Citations
        </h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
          The architecture and algorithmic weighting of the PhishGuard project draw heavily from established cybersecurity frameworks and organizational data threat reports.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
          
          <div className="card" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            <Quote size={28} style={{ color: 'var(--text-secondary)', flexShrink: 0, marginTop: '0.2rem' }} />
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Verizon Data Breach Investigations Report (DBIR)</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                The DBIR acts as our primary foundational argument for the necessity of NLP email scanning, demonstrating statistically that over 36% of all recorded global data breaches involved direct phishing or pretexting social engineering tactics.
              </p>
              <a href="https://www.verizon.com/business/resources/reports/dbir/" target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: 'var(--brand-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                Access Objective Report <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="card" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            <Quote size={28} style={{ color: 'var(--text-secondary)', flexShrink: 0, marginTop: '0.2rem' }} />
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>APWG (Anti-Phishing Working Group) Trends</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                Used to verify the velocity of brand impersonation. APWG datasets validate our `Heuristic ML Engine` threshold parameters by confirming what percentile of phishing attacks utilize targeted subdomains versus randomized homographs.
              </p>
              <a href="https://apwg.org/trendsreports/" target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: 'var(--brand-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                Access APWG Archive <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="card" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            <Quote size={28} style={{ color: 'var(--text-secondary)', flexShrink: 0, marginTop: '0.2rem' }} />
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>CISA Shields Up Initiative</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                The United States Cybersecurity and Infrastructure Security Agency's official definitions of malicious IOCs (Indicators of Compromise) are directly parsed into our fallback deterministic checks.
              </p>
              <a href="https://www.cisa.gov/stopransomware/phishing" target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: 'var(--brand-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                Access CISA Directives <ExternalLink size={14} />
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Datasets;
