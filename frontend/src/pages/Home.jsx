import React, { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, ShieldAlert, ShieldQuestion, Loader, MessageSquareWarning, Zap, Shield, Database, LayoutDashboard, BrainCircuit, Activity, Radar, LockKeyhole, Copy, CheckCheck } from 'lucide-react';
import { API_BASE } from '../api';

function Home() {
  const [inputData, setInputData] = useState('');
  const [scanType, setScanType] = useState('url');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = useCallback(async (e) => {
    if (e) e.preventDefault();
    if (!inputData.trim()) return;
    setLoading(true); setResult(null); setError(null); setFeedbackSent(false);
    try {
      const response = await fetch(`${API_BASE}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input_data: inputData, type: scanType })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to analyze');
      setResult(data);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, [inputData, scanType]);

  // Ctrl+Enter / Cmd+Enter keyboard shortcut (#15)
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleAnalyze(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleAnalyze]);

  const handleFeedback = async () => {
    if (!result?.id || feedbackSent) return;
    try {
      await fetch(`${API_BASE}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scan_id: result.id, user_comment: 'False classification reported by user' })
      });
      setFeedbackSent(true);
    } catch (e) { console.error(e); }
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `PhishGuard AI Result\nVerdict: ${result.result}\nConfidence: ${(result.confidence_score * 100).toFixed(0)}%\nInput: ${inputData}`;
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const handleScanTypeChange = (type) => { setScanType(type); setInputData(''); setResult(null); setError(null); };

  const getStatusColor = (r) => r === 'Safe' ? 'var(--brand-success)' : r === 'Suspicious' ? '#eab308' : 'var(--brand-danger)';

  return (
    <div className="home-page">
      {/* Hero */}
      <section style={{ padding:'5rem 0 4rem', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div style={{ marginBottom:'2rem', display:'flex', justifyContent:'center' }}>
            <Shield size={80} style={{ color:'var(--brand-primary)', animation:'heroFloat 3s ease-in-out infinite, heroGlow 3s ease-in-out infinite', filter:'drop-shadow(0 0 15px var(--brand-primary))' }}/>
          </div>
          <h1 style={{ fontSize:'clamp(2rem,5vw,3.2rem)', marginBottom:'1rem' }}>
            Detect Phishing Before It Strikes <br/>
            <span className="text-gradient">— Powered by AI</span>
          </h1>
          <p style={{ color:'var(--text-secondary)', fontSize:'1.15rem', maxWidth:'620px', margin:'0 auto 2rem', lineHeight:1.7 }}>
            Protect yourself and your organization with real-time, AI-driven analysis of suspicious URLs and emails.
          </p>
          <div style={{ display:'flex', justifyContent:'center', gap:'1rem', flexWrap:'wrap' }}>
            <a href="#demo" className="btn btn-primary">Try Live Detection</a>
            <a href="/how-it-works" className="btn btn-outline">Learn How It Works</a>
          </div>
        </div>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,240,255,0.04) 0%, transparent 70%)', pointerEvents:'none', zIndex:0 }}/>
      </section>

      {/* Demo Section */}
      <section id="demo" style={{ padding:'3rem 0', backgroundColor:'var(--bg-accent)' }}>
        <div className="container">
          <div className="card" style={{ maxWidth:800, margin:'0 auto' }}>
            <h2 style={{ textAlign:'center', marginBottom:'1.5rem' }}>Live Detection Demo</h2>
            <p style={{ textAlign:'center', color:'var(--text-secondary)', marginBottom:'1.5rem' }}>
              Select your scan type below. Enter a web address or paste an entire email body to scan against our active models.
              <br/><span style={{ fontSize:'0.82rem', fontFamily:'var(--font-mono)', color:'var(--text-secondary)', opacity:0.7 }}>Tip: Press ⌘↵ or Ctrl+Enter to scan</span>
            </p>

            {/* Type Toggle */}
            <div style={{ display:'flex', justifyContent:'center', gap:'0.5rem', marginBottom:'2rem' }}>
              <button type="button" className={`btn ${scanType==='url'?'btn-primary':'btn-outline'}`} onClick={() => handleScanTypeChange('url')} style={{ padding:'0.5rem 1rem', fontSize:'0.9rem' }}>URL Scanner</button>
              <button type="button" className={`btn ${scanType==='email'?'btn-primary':'btn-outline'}`} onClick={() => handleScanTypeChange('email')} style={{ padding:'0.5rem 1rem', fontSize:'0.9rem' }}>Email Body Scanner</button>
            </div>

            <form onSubmit={handleAnalyze} style={{ display:'flex', flexDirection:'column', gap:'1rem', marginBottom:'2rem' }}>
              {scanType === 'url'
                ? <input type="text" placeholder="e.g., http://secure-update-account.com" value={inputData} onChange={e => setInputData(e.target.value)} maxLength={2048} required/>
                : <textarea rows="4" placeholder="Paste the suspicious email contents here..." value={inputData} onChange={e => setInputData(e.target.value)} maxLength={10000} required/>
              }
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <Loader className="spin" size={20}/> : 'Analyze with AI'}
              </button>
            </form>

            {/* Loading animation (#3) */}
            {loading && (
              <div style={{ textAlign:'center', padding:'2.5rem', animation:'fadeIn 0.3s ease' }}>
                <div style={{ position:'relative', width:96, height:96, margin:'0 auto 1.5rem' }}>
                  <div style={{ position:'absolute', inset:0, borderRadius:'50%', border:'2px solid var(--border-color)' }}/>
                  <div style={{ position:'absolute', inset:0, borderRadius:'50%', border:'2px solid transparent', borderTopColor:'var(--brand-primary)', animation:'spin 1s linear infinite' }}/>
                  <div style={{ position:'absolute', inset:8, borderRadius:'50%', border:'2px solid transparent', borderTopColor:'var(--brand-success)', animation:'spin 1.5s linear infinite reverse' }}/>
                  <Radar size={32} style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', color:'var(--brand-primary)' }}/>
                </div>
                <p style={{ color:'var(--text-secondary)', fontFamily:'var(--font-mono)', fontSize:'0.9rem', letterSpacing:'1px' }}>ANALYZING PAYLOAD…</p>
                <p style={{ color:'var(--text-secondary)', fontSize:'0.8rem', marginTop:'0.5rem' }}>Running heuristic bounds and NLP classification</p>
              </div>
            )}

            {!loading && error && (
              <div style={{ padding:'1rem', backgroundColor:'rgba(239,68,68,0.1)', color:'var(--brand-danger)', borderRadius:'var(--radius)', textAlign:'center', marginBottom:'2rem' }}>
                <strong>Error: </strong>{error}
              </div>
            )}

            {!loading && result && (
              <div style={{ animation:'fadeIn 0.5s ease' }}>
                <div style={{ padding:'2rem', borderRadius:'var(--radius)', border:`2px solid ${getStatusColor(result.result)}`, backgroundColor:'var(--bg-secondary)', textAlign:'center', marginBottom:'2rem', position:'relative' }}>
                  {/* Copy button (#7) */}
                  <button onClick={handleCopy} title="Copy result to clipboard" style={{ position:'absolute', top:'1rem', right:'1rem', background:'none', border:'1px solid var(--border-color)', borderRadius:'var(--radius)', color:'var(--text-secondary)', cursor:'pointer', padding:'0.4rem 0.6rem', display:'flex', alignItems:'center', gap:'0.3rem', fontSize:'0.8rem', transition:'all 0.2s' }}>
                    {copied ? <><CheckCheck size={14} style={{ color:'var(--brand-success)' }}/> Copied!</> : <><Copy size={14}/> Copy</>}
                  </button>

                  {result.result === 'Safe' && <ShieldCheck size={48} style={{ color:getStatusColor(result.result), margin:'0 auto 1rem', display:'block' }}/>}
                  {result.result === 'Suspicious' && <ShieldQuestion size={48} style={{ color:getStatusColor(result.result), margin:'0 auto 1rem', display:'block' }}/>}
                  {result.result === 'Phishing Detected' && <ShieldAlert size={48} style={{ color:getStatusColor(result.result), margin:'0 auto 1rem', display:'block' }}/>}
                  <h3 style={{ fontSize:'1.5rem', marginBottom:'0.5rem', color:getStatusColor(result.result) }}>{result.result.toUpperCase()}</h3>
                  <p style={{ color:'var(--text-secondary)', marginBottom:'1rem' }}>Overall Confidence Score: <strong>{(result.confidence_score * 100).toFixed(0)}%</strong></p>
                </div>

                {result.analysis_details && (
                  <div className="card" style={{ padding:'2rem', backgroundColor:'var(--bg-secondary)', border:'1px solid var(--border-color)', marginBottom:'2rem' }}>
                    <h4 style={{ marginBottom:'1.5rem', textAlign:'center', color:'var(--brand-primary)', borderBottom:'1px solid var(--border-color)', paddingBottom:'0.5rem' }}>
                      Detailed Lexical & ML Analysis
                    </h4>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px,1fr))', gap:'1.5rem' }}>
                      <div style={{ padding:'1rem', backgroundColor:'var(--bg-primary)', borderRadius:'var(--radius)' }}>
                        <strong>Verified Dataset Match:</strong>
                        <p style={{ color: result.analysis_details.in_blocklist ? 'var(--brand-danger)' : 'var(--brand-success)' }}>
                          {result.analysis_details.in_blocklist ? 'Match Found in OpenPhish Blocklist!' : 'No Verified Match (Zero-Day)'}
                        </p>
                      </div>
                      {scanType === 'url' && (
                        <div style={{ padding:'1rem', backgroundColor:'var(--bg-primary)', borderRadius:'var(--radius)' }}>
                          <strong>Lexical Engine — Subdomains:</strong>
                          <p style={{ color:'var(--text-secondary)' }}>Detected {result.analysis_details.subdomain_count} excess nested subdomains</p>
                        </div>
                      )}
                      {scanType === 'url' && (
                        <div style={{ padding:'1rem', backgroundColor:'var(--bg-primary)', borderRadius:'var(--radius)' }}>
                          <strong>Raw IP Extraction:</strong>
                          <p style={{ color: result.analysis_details.ip_detected ? 'var(--brand-danger)' : 'var(--brand-success)' }}>
                            {result.analysis_details.ip_detected ? 'Raw IP Present' : 'Standard Domain Routing'}
                          </p>
                        </div>
                      )}
                      <div style={{ padding:'1rem', backgroundColor:'var(--bg-primary)', borderRadius:'var(--radius)' }}>
                        <strong>Anomaly Keywords Found:</strong>
                        <p style={{ color: result.analysis_details.keywords_found?.length > 0 ? 'var(--brand-danger)' : 'var(--brand-success)' }}>
                          {result.analysis_details.keywords_found?.length > 0 ? result.analysis_details.keywords_found.join(', ') : 'None extracted'}
                        </p>
                      </div>
                      <div style={{ gridColumn:'1 / -1', padding:'1.5rem', backgroundColor: result.analysis_details.ml_classification === 'phishing' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)', borderRadius:'var(--radius)', border:`1px solid ${result.analysis_details.ml_classification === 'phishing' ? 'var(--brand-danger)' : 'var(--brand-success)'}` }}>
                        <h5 style={{ margin:'0 0 0.5rem', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'0.5rem' }}>
                          <span>NLP Machine Learning Classifier</span>
                          <span style={{ color: result.analysis_details.ml_classification === 'phishing' ? 'var(--brand-danger)' : 'var(--brand-success)' }}>
                            {(result.analysis_details.ml_confidence * 100).toFixed(1)}% {result.analysis_details.ml_classification?.toUpperCase()} PROBABILITY
                          </span>
                        </h5>
                        <p style={{ fontSize:'0.9rem', color:'var(--text-secondary)', margin:0 }}>Evaluated against our dynamic Naive Bayes model trained on the global Phishing.Database vs Alexa Top Domains.</p>
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ textAlign:'center' }}>
                  <button onClick={handleFeedback} className="btn" style={{ backgroundColor:'transparent', color:'var(--text-secondary)', textDecoration:'underline', fontSize:'0.9rem' }} disabled={feedbackSent}>
                    {feedbackSent ? 'Feedback received. Thank you!' : <><MessageSquareWarning size={16}/> Report Incorrect Analysis</>}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section style={{ padding:'5rem 0', backgroundColor:'var(--bg-primary)' }}>
        <div className="container">
          <h2 className="text-gradient" style={{ textAlign:'center', marginBottom:'1rem', fontSize:'2.5rem' }}>Platform Capabilities</h2>
          <p style={{ textAlign:'center', color:'var(--text-secondary)', maxWidth:750, margin:'0 auto 4rem', lineHeight:1.7 }}>
            Built explicitly for robust, enterprise-grade threat detection. Our multi-vector engine analyzes raw digital anatomy to identify sophisticated phishing campaigns in real-time.
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))', gap:'2rem' }}>
            {[
              { icon: <Zap size={32}/>, title:'Millisecond Execution', desc:'Scan links and extract deep email payloads natively without inducing latency. Our asynchronous engine prevents bottlenecking during high-volume API requests.' },
              { icon: <BrainCircuit size={32}/>, title:'Deep Learning Ensemble', desc:'Dual-layered AI. Utilizing both Naive Bayes probability modeling and deep lexical anomaly mapping to identify zero-day threats instantly.' },
              { icon: <Shield size={32}/>, title:'Homograph & Typo Detection', desc:'Automatically catches spoofed localization strings (e.g., Cyrillic characters posing as Latin) designed to trick users into visiting fake domains.' },
              { icon: <Radar size={32}/>, title:'Psychological Sentiment NLP', desc:"Emails are parsed fundamentally to detect engineered 'urgency' or 'financial coercion', a direct countermeasure to advanced spear-phishing." },
              { icon: <LockKeyhole size={32}/>, title:'Authentication Probing', desc:'Examines underlying DNS constraints including SPF, DKIM, and DMARC failures natively injected within raw email headers to track identity spoofing.' },
              { icon: <Activity size={32}/>, title:'Deterministic Thresholding', desc:'Minimizes false-positives via strict override logic, balancing deterministic heuristic risks against machine-learned algorithmic percentages.' },
              { icon: <Database size={32}/>, title:'Live Threat Feeds', desc:'Integrates directly against verified global Phishing blocklists and Alexa Top Domains to safely map current internet topologies.' },
              { icon: <LayoutDashboard size={32}/>, title:'Forensic Analytics UI', desc:'Detailed post-scan reporting breaks down exact metadata anomalies, delivering transparent readouts rather than simple black-box results.' },
            ].map((item, i) => (
              <div key={i} className="card" style={{ display:'flex', flexDirection:'column', padding:'2rem' }}>
                <div style={{ color:'var(--brand-primary)', marginBottom:'1.25rem', padding:'1rem', backgroundColor:'rgba(0,240,255,0.05)', borderRadius:12, width:'max-content', border:'1px solid var(--border-color)' }}>{item.icon}</div>
                <h3 style={{ marginBottom:'0.75rem', fontSize:'1.3rem' }}>{item.title}</h3>
                <p style={{ color:'var(--text-secondary)', lineHeight:'1.6', fontSize:'0.95rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
