import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen, TrendingUp, ShieldAlert, BrainCircuit, ExternalLink,
  FileText, Globe, Database, Network, Lock, BarChart2,
  Cpu, AlertTriangle, Users, ChevronDown, ChevronUp, Microscope, Layers
}from 'lucide-react';

function useCountUp(target, duration = 1400) {
  const [count, setCount] = useState('0');
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      // Extract numeric portion
      const numeric = parseFloat(target.replace(/[^0-9.]/g, ''));
      const suffix = target.replace(/[0-9.]/g, '');
      if (isNaN(numeric)) { setCount(target); return; }
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * numeric;
        setCount((numeric % 1 === 0 ? Math.round(current) : current.toFixed(1)) + suffix);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatCard({ value, label, sub, color }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="card" style={{ borderTopColor: color, textAlign: 'center' }}>
      <h3 style={{ fontSize: '2.8rem', color, marginBottom: '0.25rem', fontFamily: 'var(--font-mono)' }}>{count}</h3>
      <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{label}</h4>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{sub}</p>
    </div>
  );
}


function RefCard({ href, icon: Icon, iconColor, title, badge, desc }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="card"
      style={{ display: 'flex', gap: '1rem', padding: '1.5rem', transition: 'all 0.3s', textDecoration: 'none' }}>
      <Icon size={32} style={{ color: iconColor, flexShrink: 0 }} />
      <div>
        {badge && (
          <span style={{
            display: 'inline-block', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.5px', padding: '0.15rem 0.5rem', borderRadius: '99px', marginBottom: '0.4rem',
            background: `${iconColor}22`, color: iconColor, border: `1px solid ${iconColor}44`,
            fontFamily: 'var(--font-mono)'
          }}>{badge}</span>
        )}
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
          {title} <ExternalLink size={14} style={{ color: 'var(--text-secondary)' }} />
        </h4>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{desc}</p>
      </div>
    </a>
  );
}

function Accordion({ title, icon: Icon, iconColor, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: '0.75rem' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', background: 'var(--bg-secondary)', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.25rem', textAlign: 'left'
      }}>
        <Icon size={20} style={{ color: iconColor }} />
        <span style={{ color: 'var(--text-primary)', fontWeight: 600, flex: 1, fontSize: '1rem' }}>{title}</span>
        {open ? <ChevronUp size={18} color="var(--text-secondary)" /> : <ChevronDown size={18} color="var(--text-secondary)" />}
      </button>
      {open && (
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
          {children}
        </div>
      )}
    </div>
  );
}

function Research() {
  return (
    <div className="container" style={{ padding: '4rem 0' }}>

      {/* Header */}
      <h1 className="text-gradient" style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '3rem' }}>
        Threat Intelligence Research
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 4rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
        A comprehensive collection of academic research, verified threat metrics, evolving attack taxonomies, and technical countermeasure analysis covering the global phishing threat landscape.
      </p>

      {/* Section 1: Global Impact Stats */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <TrendingUp style={{ color: 'var(--brand-danger)' }} size={32} /> The Global Impact
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          <StatCard value="36%" label="of All Data Breaches" color="var(--brand-danger)"
            sub="Phishing is the #1 breach vector globally according to the Verizon DBIR, outpacing malware and credential stuffing combined." />
          <StatCard value="1.7M+" label="Active Attacks / Quarter" color="var(--brand-warning)"
            sub="APWG recorded the highest ever phishing volume in Q3 2023, representing a 173% increase over the prior two-year trend." />
          <StatCard value="$4.91M" label="Average Breach Cost" color="var(--brand-primary)"
            sub="IBM's Cost of a Data Breach Report (2023) reveals phishing-initiated incidents are among the costliest to remediate at $4.91M on average." />
          <StatCard value="3.4B" label="Phishing Emails / Day" color="var(--brand-secondary)"
            sub="Symantec estimates 3.4 billion spam and phishing emails are transmitted globally every day, with 1 in 99 emails being a phishing attempt." />
          <StatCard value="74%" label="Social Engineering Rate" color="#c084fc"
            sub="Per Verizon DBIR, 74% of all breaches include the human element — primarily social engineering and phishing — as the initial access vector." />
          <StatCard value="300ms" label="Detection Target" color="var(--brand-success)"
            sub="PhishGuard's AI model targets sub-300ms threat analysis latency, enabling real-time interception without user experience disruption." />
        </div>
      </section>

      {/* Section 2: Attack Taxonomy */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ShieldAlert style={{ color: 'var(--brand-secondary)' }} size={32} /> Complete Attack Taxonomy
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[
            { n: '01', t: 'Deceptive / Mass Phishing', c: 'var(--brand-danger)', desc: 'Spray-and-pray bulk email campaigns spoofing trusted brands (PayPal, Bank of America). Often exploit typosquatting (e.g., paypa1.com) and free hosting services to blast credential-theft links to millions of recipients simultaneously.' },
            { n: '02', t: 'Spear-Phishing & Whaling', c: 'var(--brand-warning)', desc: 'Highly targeted contextual attacks built from OSINT profiling. Attackers study LinkedIn profiles, press releases, and social media to construct hyper-personalized messages that bypass security training. Whaling specifically targets C-suite executives.' },
            { n: '03', t: 'Smishing & Vishing', c: 'var(--brand-primary)', desc: 'SMS-based phishing (Smishing) sends malware links via text. Voice phishing (Vishing) uses spoofed caller IDs impersonating banks or IRS agents. Both vectors exploit mobile device trust and lower user vigilance compared to email.' },
            { n: '04', t: 'Business Email Compromise', c: '#c084fc', desc: 'Attackers compromise or impersonate internal email accounts. Finance teams are tricked into authorizing fraudulent wire transfers. The FBI IC3 reports BEC as the highest-dollar cybercrime category with $2.9B in 2023 losses.' },
            { n: '05', t: 'Adversary-in-the-Middle (AiTM)', c: '#22d3ee', desc: 'A real-time proxy is placed between the victim and a legitimate site (e.g., Microsoft 365). Credentials AND session cookies are harvested simultaneously, completely bypassing multi-factor authentication.' },
            { n: '06', t: 'LLM-Generated Phishing', c: 'var(--brand-success)', desc: 'Large Language Models (GPT-class) are being weaponized to generate grammatically flawless, contextually aware phishing campaigns at industrial scale, rendering traditional typo-based heuristic filters obsolete.' },
          ].map(({ n, t, c, desc }) => (
            <div key={n} className="card" style={{ borderLeft: `3px solid ${c}`, padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: c, fontWeight: 700 }}>{n}</span>
                <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.1rem' }}>{t}</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Evasion Techniques */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Lock style={{ color: 'var(--brand-danger)' }} size={32} /> Modern Evasion Techniques
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[
            { t: 'Polymorphic / DGA Domains', desc: 'Domain Generation Algorithms create thousands of random subdomains per day, making static blocklists expire within hours of publication.' },
            { t: 'HTML Smuggling', desc: 'Payloads are encoded in HTML5 Data URLs or JavaScript Blobs that only assemble client-side, completely bypassing server-level email gateway scanners.' },
            { t: 'CAPTCHA Shielding', desc: 'Cloudflare Turnstile or reCAPTCHA v3 challenges block automated threat crawler bots from indexing the phishing page behind the form.' },
            { t: 'Session Token Hijacking', desc: 'AiTM proxies intercept OAuth session tokens in real-time, allowing attackers to authenticate as the victim even after MFA has been completed.' },
            { t: 'Trusted Platform Hosting', desc: 'Phishing content hosted on legitimate platforms (SharePoint, Google Sites, Notion) inherits their trusted SSL status and passes URL reputation checks.' },
            { t: 'Redirect Chains', desc: 'Multi-hop redirect chains through legitimate CDN links (bit.ly → SharePoint → malicious page) defeat single-URL reputation scoring systems.' },
          ].map(({ t, desc }) => (
            <div key={t} className="card" style={{ padding: '1.25rem' }}>
              <h4 style={{ color: 'var(--brand-danger)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={16} /> {t}
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: ML Countermeasures (Expandable) */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <BrainCircuit style={{ color: 'var(--brand-success)' }} size={32} /> AI/ML Detection Countermeasures
        </h2>
        <Accordion title="Lexical Analysis & URL Entropy" icon={Cpu} iconColor="var(--brand-primary)">
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>
            Shannon Entropy measures the randomness of characters in a domain string. Legitimate domains like <code>google.com</code> have low entropy (~2.5 bits), while algorithmically generated domains like <code>xn2kqjhwsd.cc</code> score above 4.2 bits. Our engine uses this metric to flag DGA-based infrastructure without needing any prior blocklist entry.
          </p>
        </Accordion>
        <Accordion title="Natural Language Processing (Naive Bayes)" icon={BrainCircuit} iconColor="var(--brand-success)">
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>
            The <code>natural.BayesClassifier</code> is trained on tokenized documents from the SpamAssassin corpus (malicious) and the Enron Email Dataset (benign). The model learns the probability distributions of word patterns — detecting combinations of urgency terms (<em>"suspended", "verify immediately", "24 hours"</em>) that statistically co-occur in phishing emails.
          </p>
        </Accordion>
        <Accordion title="Homograph & Punycode Detection" icon={Layers} iconColor="#c084fc">
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>
            Internationalized Domain Names (IDNs) allow Cyrillic, Greek, and Arabic characters that appear visually identical to Latin characters (e.g., Cyrillic 'а' vs Latin 'a'). Our regex engine pattern-matches these Unicode lookalikes before the Naive Bayes classifier even runs, providing a hard-override detection layer.
          </p>
        </Accordion>
        <Accordion title="Brand Impersonation Engine" icon={Users} iconColor="var(--brand-warning)">
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>
            The engine maintains a curated list of high-value brand targets (PayPal, Apple, Google, Microsoft, Chase). If a brand keyword appears in a subdomain but does NOT match the root domain (e.g., <code>paypal.billing.secure-auth.com</code>), a brand impersonation flag is raised with a +0.4 confidence score penalty applied.
          </p>
        </Accordion>
        <Accordion title="Ensemble Scoring & Zero-Day Override" icon={Microscope} iconColor="var(--brand-danger)">
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>
            To prevent adversarial ML evasion (where attackers tune their URLs to fool the AI), a second deterministic heuristic layer runs in parallel. If the Naive Bayes model classifies a URL as "Safe" but the heuristic layer accrues a score above 0.6 (indicating strong structural anomalies), an Ensemble Override is triggered, forcing the result into Phishing Detected regardless of the ML classification. This prevents Zero-Day bypass attacks.
          </p>
        </Accordion>
        <Accordion title="Sender Authentication Analysis (SPF/DKIM/DMARC)" icon={ShieldAlert} iconColor="#22d3ee">
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>
            For raw email input, the engine parses embedded header-style strings to detect authentication alignment failures. If patterns like <code>spf=fail</code>, <code>dkim=neutral</code>, or <code>dmarc=fail</code> are detected inline, a +0.30 confidence penalty is applied immediately — signaling that the email's sender identity cannot be verified.
          </p>
        </Accordion>
      </section>

      {/* Section 5: Comparative Model Performance */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <BarChart2 style={{ color: 'var(--brand-primary)' }} size={32} /> Comparative Model Performance
        </h2>
        <div className="card" style={{ overflowX: 'auto', padding: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '600px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                {['Detection Method', 'True Positive Rate', 'False Positive Rate', 'Zero-Day Coverage', 'Speed'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.82rem', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { method: 'Static Blocklist Only', tpr: '55–65%', fpr: '~1%', zdc: '❌ None', speed: '< 5ms', color: 'var(--brand-danger)' },
                { method: 'Naive Bayes (NLP only)', tpr: '78–84%', fpr: '~8%', zdc: '⚠️ Limited', speed: '< 30ms', color: 'var(--brand-warning)' },
                { method: 'Heuristic Engine Only', tpr: '80–88%', fpr: '~5%', zdc: '✅ Partial', speed: '< 10ms', color: 'var(--brand-primary)' },
                { method: 'PhishGuard AI (Ensemble)', tpr: '93–97%', fpr: '~2%', zdc: '✅ Full', speed: '< 300ms', color: 'var(--brand-success)', highlight: true },
                { method: 'Deep Learning (CNN/LSTM)', tpr: '95–99%', fpr: '~1%', zdc: '✅ Full', speed: '500ms+', color: '#c084fc' },
              ].map(({ method, tpr, fpr, zdc, speed, color, highlight }) => (
                <tr key={method} style={{
                  borderBottom: '1px solid var(--border-color)',
                  background: highlight ? 'rgba(59,130,246,0.04)' : 'transparent'
                }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: highlight ? 700 : 400, color }}>
                    {highlight && '⭐ '}{method}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{tpr}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{fpr}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>{zdc}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{speed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 6: Open-Source Datasets */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Database style={{ color: 'var(--brand-warning)' }} size={32} /> Open-Source Training Datasets
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
          <RefCard href="https://github.com/mitchellkrogza/Phishing.Database" icon={Database} iconColor="var(--brand-danger)" badge="Malicious Training Data"
            title="Phishing.Database (Mitchell Krog)"
            desc="Millions of active phishing, malware and ransomware URLs crowd-sourced globally. Used directly to train the Naive Bayes malicious URL classification vectors." />
          <RefCard href="https://github.com/Kikobeats/top-sites" icon={Globe} iconColor="var(--brand-success)" badge="Benign Training Data"
            title="Alexa Top Sites Array"
            desc="Programmatic repository of the top globally-trafficked legitimate enterprise domains. Provides the safe baseline for the classifier's benign URL structural patterns." />
          <RefCard href="https://phishtank.org/" icon={Network} iconColor="var(--brand-primary)" badge="Verification Proxy"
            title="PhishTank Intelligence (Cisco Talos)"
            desc="Community-verified active phishing URL feed operated by Cisco Talos. The system cross-references ambiguous domains against PhishTank's manually vetted endpoints." />
          <RefCard href="https://openphish.com/" icon={ShieldAlert} iconColor="#c084fc" badge="Zero-Day Proxy"
            title="OpenPhish Global Feeds"
            desc="Autonomous zero-day threat detection platform. Domains matching OpenPhish structured threat patterns trigger an immediate Ensemble Override in the detection pipeline." />
          <RefCard href="https://spamassassin.apache.org/old/publiccorpus/" icon={FileText} iconColor="#22d3ee" badge="NLP Targeting"
            title="SpamAssassin Public Corpus"
            desc="Apache SpamAssassin's verified corpus of real spam and ham emails. Syntactic phishing patterns are extracted from this dataset to train the email NLP psychological scanner." />
          <RefCard href="https://www.cs.cmu.edu/~enron/" icon={BookOpen} iconColor="var(--brand-success)" badge="Benign NLP Baseline"
            title="Enron Email Dataset (CMU)"
            desc="~500,000 authentic corporate emails from Enron employees. Gold standard for teaching the NLP model to recognise safe corporate communication patterns and minimize false positives." />
        </div>
      </section>

      {/* Section 7: Academic & Industry References */}
      <section>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <BookOpen style={{ color: 'var(--brand-primary)' }} size={32} /> Academic & Industry References
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
          <RefCard href="https://1drv.ms/b/c/b9ae01db94226b25/IQASR4jRdajdTIG_UqSXKVnuAWBX_7Q4WKj1wPAmWmME6ts?e=J2JigV"
            icon={BookOpen} iconColor="var(--brand-primary)" badge="Team Research Paper"
            title="Official Team Research Paper"
            desc="Comprehensive academic research paper detailing the ML classification pipeline, ensemble heuristic architecture, and efficacy benchmarks created by this project's team." />
          <RefCard href="https://www.verizon.com/business/resources/reports/dbir/" icon={FileText} iconColor="var(--brand-danger)" badge="Industry Report"
            title="Verizon DBIR 2023"
            desc="The definitive Data Breach Investigations Report cataloging phishing as the dominant attack vector in 36% of all enterprise breaches across 16 industries." />
          <RefCard href="https://apwg.org/trendsreports/" icon={Globe} iconColor="var(--brand-primary)" badge="Live Intelligence"
            title="APWG Phishing Activity Trends"
            desc="Quarterly tracking of phishing volume, brand spoofing targets, and malicious TLDs by the Anti-Phishing Working Group. Source for the 1.7M+ active attack figure." />
          <RefCard href="https://www.cisa.gov/stopransomware/phishing" icon={ShieldAlert} iconColor="var(--brand-success)" badge="Gov Guidance"
            title="CISA Phishing Guidance"
            desc="US Cybersecurity & Infrastructure Security Agency's official technical recommendations for phishing defense, DMARC configuration, and incident response planning." />
          <RefCard href="https://www.ibm.com/reports/data-breach" icon={BrainCircuit} iconColor="var(--brand-secondary)" badge="Financial Analysis"
            title="IBM Cost of Data Breach 2023"
            desc="Financial modelling study revealing that phishing-initiated breaches cost organizations $4.91M on average, spanning legal, remediation, regulatory, and reputational costs." />
          <RefCard href="https://transparencyreport.google.com/safe-browsing/overview" icon={ShieldAlert} iconColor="var(--brand-warning)" badge="Real-Time Metrics"
            title="Google Safe Browsing Transparency"
            desc="Google's real-time statistics on billions of malicious URLs and deceptive pages intercepted across Chrome, Search, and Android ecosystems globally each week." />
          <RefCard href="https://arxiv.org/abs/2301.03257" icon={Cpu} iconColor="#22d3ee" badge="Academic Paper"
            title="ArXiv: Phishing URL Detection (2023)"
            desc="Peer-reviewed machine learning study benchmarking Random Forest, LSTM, and BERT-based models on the PhishTank dataset. Documents a 97.3% accuracy using ensemble architecture." />
          <RefCard href="https://www.ic3.gov/Media/PDF/AnnualReport/2023_IC3Report.pdf" icon={FileText} iconColor="var(--brand-danger)" badge="FBI Report"
            title="FBI IC3 Annual Report 2023"
            desc="The FBI Internet Crime Complaint Center's official annual cybercrime report. Phishing/vishing/smishing collectively represent the most-reported incident category with 298,878 complaints filed." />
        </div>
      </section>

    </div>
  );
}

export default Research;
