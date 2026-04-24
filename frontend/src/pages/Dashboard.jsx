import React, { useState, useEffect, useMemo, useRef } from 'react';
import { RefreshCcw, Loader, ShieldAlert, ShieldCheck, Activity, BrainCircuit, ShieldQuestion, LayoutDashboard, X, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { API_BASE } from '../api';
import Toast from '../components/Toast';

const ROWS_PER_PAGE = 10;

function ScanDrawer({ scan, onClose }) {
  if (!scan) return null;
  let details = null;
  try { details = scan.details_json ? JSON.parse(scan.details_json) : null; } catch {}
  const color = scan.result === 'Safe' ? 'var(--brand-success)' : scan.result === 'Suspicious' ? 'var(--brand-warning)' : 'var(--brand-danger)';

  return (
    <div style={{ position:'fixed', inset:0, zIndex:1000, display:'flex' }}>
      <div onClick={onClose} style={{ flex:1, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(4px)' }} />
      <div style={{ width:'min(480px,95vw)', background:'var(--bg-secondary)', borderLeft:'1px solid var(--border-color)', overflowY:'auto', padding:'2rem', animation:'fadeIn 0.25s ease' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem' }}>
          <h3 style={{ margin:0 }}>Scan Detail — SYS-{scan.id}</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'var(--text-secondary)', cursor:'pointer' }}><X size={22}/></button>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
          <div className="card" style={{ padding:'1.25rem', borderTop:`2px solid ${color}` }}>
            <p style={{ color:'var(--text-secondary)', fontSize:'0.8rem', marginBottom:'0.4rem', letterSpacing:'1px' }}>VERDICT</p>
            <p style={{ color, fontFamily:'var(--font-mono)', fontWeight:'bold', fontSize:'1.2rem' }}>{scan.result.toUpperCase()}</p>
          </div>
          <div className="card" style={{ padding:'1.25rem' }}>
            <p style={{ color:'var(--text-secondary)', fontSize:'0.8rem', marginBottom:'0.4rem', letterSpacing:'1px' }}>CONFIDENCE</p>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'1.5rem', fontWeight:'bold', color:'var(--text-primary)' }}>{(scan.confidence_score * 100).toFixed(0)}%</p>
          </div>
          <div className="card" style={{ padding:'1.25rem' }}>
            <p style={{ color:'var(--text-secondary)', fontSize:'0.8rem', marginBottom:'0.4rem', letterSpacing:'1px' }}>PAYLOAD</p>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.85rem', wordBreak:'break-all', color:'var(--brand-primary)' }}>{scan.input_data}</p>
          </div>
          <div className="card" style={{ padding:'1.25rem' }}>
            <p style={{ color:'var(--text-secondary)', fontSize:'0.8rem', marginBottom:'0.4rem', letterSpacing:'1px' }}>TIMESTAMP</p>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.9rem' }}>{new Date(scan.created_at).toLocaleString()}</p>
          </div>
          {details && (
            <div className="card" style={{ padding:'1.25rem' }}>
              <p style={{ color:'var(--text-secondary)', fontSize:'0.8rem', marginBottom:'1rem', letterSpacing:'1px' }}>HEURISTIC BREAKDOWN</p>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                {details.in_blocklist !== undefined && <Row label="Blocklist Match" value={details.in_blocklist ? '⚠ Found' : '✓ Clear'} color={details.in_blocklist ? 'var(--brand-danger)' : 'var(--brand-success)'} />}
                {details.ip_detected !== undefined && <Row label="Raw IP in URL" value={details.ip_detected ? '⚠ Yes' : '✓ No'} color={details.ip_detected ? 'var(--brand-danger)' : 'var(--brand-success)'} />}
                {details.subdomain_count !== undefined && <Row label="Subdomain Depth" value={`${details.subdomain_count} level(s)`} color={details.subdomain_count > 2 ? 'var(--brand-warning)' : 'var(--brand-success)'} />}
                {details.keywords_found?.length > 0 && <Row label="Phish Keywords" value={details.keywords_found.join(', ')} color="var(--brand-danger)" />}
                {details.ml_classification && <Row label="ML Classifier" value={`${details.ml_classification.toUpperCase()} (${(details.ml_confidence * 100).toFixed(1)}%)`} color={details.ml_classification === 'phishing' ? 'var(--brand-danger)' : 'var(--brand-success)'} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, color }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:'1rem' }}>
      <span style={{ color:'var(--text-secondary)', fontSize:'0.85rem', fontFamily:'var(--font-mono)' }}>{label}</span>
      <span style={{ color, fontFamily:'var(--font-mono)', fontSize:'0.85rem', fontWeight:'bold', textAlign:'right' }}>{value}</span>
    </div>
  );
}

function Dashboard() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerdict, setFilterVerdict] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedScan, setSelectedScan] = useState(null);
  const [toast, setToast] = useState(null);
  const intervalRef = useRef(null);

  const fetchHistory = async () => {
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/history`);
      if (!res.ok) throw new Error('Failed to fetch history');
      setScans(await res.json());
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const startPolling = () => { if (!intervalRef.current) intervalRef.current = setInterval(fetchHistory, 10000); };
  const stopPolling = () => { clearInterval(intervalRef.current); intervalRef.current = null; };

  useEffect(() => {
    fetchHistory(); startPolling();
    const h = () => document.hidden ? stopPolling() : (fetchHistory(), startPolling());
    document.addEventListener('visibilitychange', h);
    return () => { stopPolling(); document.removeEventListener('visibilitychange', h); };
  }, []);

  const stats = useMemo(() => {
    const total = scans.length;
    const safe = scans.filter(s => s.result === 'Safe').length;
    const suspicious = scans.filter(s => s.result === 'Suspicious').length;
    const phishing = scans.filter(s => s.result === 'Phishing Detected').length;
    const safeP = total ? Math.round((safe / total) * 100) : 0;
    const suspP = total ? Math.round((suspicious / total) * 100) : 0;
    const phishP = total ? Math.round((phishing / total) * 100) : 0;
    const avgConf = total ? Math.round((scans.reduce((a, c) => a + c.confidence_score, 0) / total) * 100) : 0;
    const conic = `var(--brand-success) 0% ${safeP}%, var(--brand-warning) ${safeP}% ${safeP + suspP}%, var(--brand-danger) ${safeP + suspP}% 100%`;
    return { total, safe, suspicious, phishing, safeP, suspP, phishP, avgConf, conic };
  }, [scans]);

  const filteredScans = useMemo(() => {
    let s = scans;
    if (filterVerdict) s = s.filter(sc => sc.result === filterVerdict);
    if (searchTerm) s = s.filter(sc => sc.input_data.toLowerCase().includes(searchTerm.toLowerCase()) || sc.id.toString().includes(searchTerm));
    return s;
  }, [scans, searchTerm, filterVerdict]);

  const totalPages = Math.max(1, Math.ceil(filteredScans.length / ROWS_PER_PAGE));
  const paginated = filteredScans.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

  const handleKpiFilter = (verdict) => {
    setFilterVerdict(prev => prev === verdict ? null : verdict);
    setCurrentPage(1);
  };

  const exportCSV = () => {
    const header = 'ID,Payload,Verdict,Confidence,Timestamp';
    const rows = filteredScans.map(s => `${s.id},"${s.input_data.replace(/"/g, '""')}",${s.result},${(s.confidence_score * 100).toFixed(0)}%,${new Date(s.created_at).toLocaleString()}`);
    const blob = new Blob([header + '\n' + rows.join('\n')], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'phishguard_scans.csv'; a.click();
    setToast({ message: `Exported ${filteredScans.length} records to CSV.`, type: 'success' });
  };

  const kpiStyle = (active) => ({
    cursor: 'pointer', transition: 'all 0.2s ease',
    outline: active ? '2px solid var(--brand-primary)' : 'none',
    transform: active ? 'scale(1.02)' : 'scale(1)',
  });

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {selectedScan && <ScanDrawer scan={selectedScan} onClose={() => setSelectedScan(null)} />}

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize:'clamp(1.8rem,4vw,2.5rem)', margin:0, display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <Activity /> Telemetry Dashboard
          </h1>
          <p style={{ color:'var(--text-secondary)', marginTop:'0.5rem' }}>Live metrics. Auto-refreshing every 10s when tab is active.</p>
        </div>
        <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
          {scans.length > 0 && <button onClick={exportCSV} className="btn btn-outline" style={{ fontSize:'0.85rem' }}><Download size={16}/> Export CSV</button>}
          <button onClick={() => { setLoading(true); fetchHistory(); }} className="btn btn-outline" disabled={loading}>
            <RefreshCcw size={18} className={loading ? 'spin' : ''}/> Sync Now
          </button>
        </div>
      </div>

      {loading && !scans.length && <div style={{ display:'flex', justifyContent:'center', padding:'4rem' }}><Loader size={48} className="spin" color="var(--brand-primary)"/></div>}
      {error && <div className="card" style={{ borderColor:'var(--brand-danger)', textAlign:'center' }}><h3 style={{ color:'var(--brand-danger)' }}>Telemetry Disconnected</h3><p style={{ color:'var(--text-secondary)' }}>{error}</p></div>}

      {!loading && !error && scans.length === 0 && (
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'5rem 2rem', gap:'1.5rem' }}>
          <LayoutDashboard size={72} style={{ color:'var(--border-color)', animation:'heroFloat 3s ease-in-out infinite' }}/>
          <h2>No Scans Yet</h2>
          <p style={{ color:'var(--text-secondary)', maxWidth:'420px', lineHeight:1.7 }}>Run a detection from the <a href="/" style={{ color:'var(--brand-primary)' }}>Home page</a> to populate the dashboard.</p>
          <a href="/" className="btn btn-primary">Go to Scanner</a>
        </div>
      )}

      {!loading && !error && scans.length > 0 && (<>
        {/* KPI Cards — clickable filters */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px,1fr))', gap:'2rem', marginBottom:'2rem' }}>
          <div className="card" style={{ display:'flex', alignItems:'center', gap:'2rem', padding:'2rem', ...kpiStyle(filterVerdict === null) }} onClick={() => handleKpiFilter(null)} title="Show all scans">
            <BrainCircuit size={32} style={{ color:'var(--brand-primary)' }}/>
            <div><span style={{ color:'var(--text-secondary)', fontSize:'0.85rem', letterSpacing:'1.5px', display:'block' }}>TOTAL SCANS</span>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'2.5rem', fontWeight:600, color:'var(--brand-primary)', textShadow:'0 0 15px currentColor' }}>{stats.total}</span></div>
          </div>
          <div className="card" style={{ display:'flex', alignItems:'center', gap:'2rem', padding:'2rem', ...kpiStyle(filterVerdict === 'Phishing Detected') }} onClick={() => handleKpiFilter('Phishing Detected')} title="Filter: Phishing only">
            <ShieldAlert size={32} style={{ color:'var(--brand-danger)' }}/>
            <div><span style={{ color:'var(--text-secondary)', fontSize:'0.85rem', letterSpacing:'1.5px', display:'block' }}>MALICIOUS BLOCKS</span>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'2.5rem', fontWeight:600, color:'var(--brand-danger)', textShadow:'0 0 15px currentColor' }}>{stats.phishing}</span></div>
          </div>
          <div className="card" style={{ display:'flex', alignItems:'center', gap:'2rem', padding:'2rem', ...kpiStyle(filterVerdict === 'Suspicious') }} onClick={() => handleKpiFilter('Suspicious')} title="Filter: Suspicious only">
            <Activity size={32} style={{ color:'var(--brand-warning)' }}/>
            <div><span style={{ color:'var(--text-secondary)', fontSize:'0.85rem', letterSpacing:'1.5px', display:'block' }}>AVG RISK CONFIDENCE</span>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'2.5rem', fontWeight:600, color:'var(--text-primary)', textShadow:'0 0 15px currentColor' }}>{stats.avgConf}%</span></div>
          </div>
        </div>

        {/* Charts Row */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%,440px),1fr))', gap:'2rem', marginBottom:'2rem' }}>
          <div className="card">
            <h3 style={{ borderBottom:'1px solid var(--border-color)', paddingBottom:'1rem', marginBottom:'2rem' }}>Threat Distribution Matrix</h3>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-around', flexWrap:'wrap', gap:'2rem' }}>
              <div style={{ width:200, height:200, borderRadius:'50%', background:`conic-gradient(${stats.conic})`, display:'flex', justifyContent:'center', alignItems:'center', flexShrink:0, animation:'loadDonut 1s ease-out', boxShadow:'0 0 20px rgba(0,0,0,0.5)' }}>
                <div style={{ width:140, height:140, backgroundColor:'var(--bg-card-solid)', borderRadius:'50%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                  <span style={{ fontSize:'2rem', fontFamily:'var(--font-mono)', fontWeight:'bold' }}>{stats.total}</span>
                  <span style={{ fontSize:'0.8rem', color:'var(--text-secondary)' }}>Scans</span>
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                {[['var(--brand-success)', `Safe (${stats.safeP}%)`], ['var(--brand-warning)', `Suspicious (${stats.suspP}%)`], ['var(--brand-danger)', `Phishing (${stats.phishP}%)`]].map(([c, l]) => (
                  <div key={l} style={{ display:'flex', alignItems:'center', gap:'0.75rem', fontFamily:'var(--font-mono)', color:'var(--text-secondary)' }}>
                    <span style={{ width:14, height:14, borderRadius:'50%', backgroundColor:c, display:'inline-block', flexShrink:0 }}/>
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ borderBottom:'1px solid var(--border-color)', paddingBottom:'1rem', marginBottom:'2rem' }}>Historical Confidence Trajectory</h3>
            <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', height:250, padding:'1rem 0 2rem', gap:'0.5rem' }}>
              {scans.slice(0, 15).reverse().map((scan, idx) => {
                const h = Math.max(10, Math.round(scan.confidence_score * 100));
                const c = scan.result === 'Safe' ? 'var(--brand-success)' : scan.result === 'Suspicious' ? 'var(--brand-warning)' : 'var(--brand-danger)';
                return (
                  <div key={idx} style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end', alignItems:'center', height:'100%', flex:1, position:'relative', cursor:'pointer' }} onClick={() => setSelectedScan(scan)} title={`#${scan.id} | ${scan.result} | ${h}%`}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', marginBottom:'0.5rem' }}>{h}%</span>
                    <div style={{ width:'100%', maxWidth:30, borderRadius:'4px 4px 0 0', height:`${h}%`, backgroundColor:c, boxShadow:`0 0 10px ${c}`, opacity:0.85, transition:'opacity 0.2s' }}/>
                    <span style={{ position:'absolute', bottom:-20, fontSize:'0.7rem', color:'var(--text-secondary)', fontFamily:'var(--font-mono)' }}>#{scan.id}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="card" style={{ marginTop:'1rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem', borderBottom:'1px solid var(--border-color)', paddingBottom:'1rem', flexWrap:'wrap', gap:'1rem' }}>
            <h3 style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
              <span style={{ width:10, height:10, borderRadius:'50%', backgroundColor:'var(--brand-danger)', display:'inline-block', boxShadow:'0 0 10px var(--brand-danger)', animation:'pulse 2s infinite' }}/>
              System Logs Data Table
              {filterVerdict && <span style={{ fontSize:'0.75rem', padding:'0.25rem 0.75rem', background:'rgba(0,240,255,0.1)', border:'1px solid var(--brand-primary)', borderRadius:999, color:'var(--brand-primary)', fontFamily:'var(--font-mono)', marginLeft:'0.5rem' }}>Filtered: {filterVerdict}</span>}
            </h3>
            <div style={{ display:'flex', gap:'0.75rem', alignItems:'center' }}>
              {filterVerdict && <button onClick={() => { setFilterVerdict(null); setCurrentPage(1); }} style={{ background:'none', border:'none', color:'var(--text-secondary)', cursor:'pointer', fontSize:'0.85rem', textDecoration:'underline' }}>Clear filter</button>}
              <input type="text" placeholder="Query Payload or ID..." value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }} style={{ maxWidth:260, backgroundColor:'var(--bg-primary)' }} aria-label="Search scan logs"/>
            </div>
          </div>

          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', textAlign:'left' }}>
              <thead>
                <tr>{['Log ID','Intercepted Payload','Safety Verdict','Confidence','Timestamp'].map(h => (
                  <th key={h} style={{ padding:'1.2rem 1rem', color:'var(--text-secondary)', fontSize:'0.85rem', textTransform:'uppercase', letterSpacing:'1px', borderBottom:'2px solid var(--border-color)' }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan="5" style={{ textAlign:'center', padding:'3rem', color:'var(--text-secondary)' }}>No telemetry matching search vector.</td></tr>
                ) : paginated.map(scan => {
                  const pillColor = scan.result === 'Safe' ? { bg:'rgba(0,255,157,0.1)', color:'var(--brand-success)', border:'rgba(0,255,157,0.3)' } : scan.result === 'Suspicious' ? { bg:'rgba(255,176,0,0.1)', color:'var(--brand-warning)', border:'rgba(255,176,0,0.3)' } : { bg:'rgba(255,42,95,0.1)', color:'var(--brand-danger)', border:'rgba(255,42,95,0.3)' };
                  return (
                    <tr key={scan.id} onClick={() => setSelectedScan(scan)} style={{ cursor:'pointer' }}>
                      <td style={{ padding:'1.2rem 1rem', fontFamily:'var(--font-mono)', borderBottom:'1px solid rgba(255,255,255,0.03)' }}>SYS-{scan.id}</td>
                      <td style={{ padding:'1.2rem 1rem', maxWidth:280, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', fontFamily:'var(--font-mono)', color:'var(--brand-primary)', fontSize:'0.9rem', borderBottom:'1px solid rgba(255,255,255,0.03)' }}>
                        {scan.input_data.length > 50 ? scan.input_data.substring(0, 50) + '…' : scan.input_data}
                      </td>
                      <td style={{ padding:'1.2rem 1rem', borderBottom:'1px solid rgba(255,255,255,0.03)' }}>
                        <span style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', padding:'0.4rem 0.8rem', borderRadius:999, fontSize:'0.8rem', fontWeight:'bold', fontFamily:'var(--font-mono)', backgroundColor:pillColor.bg, color:pillColor.color, border:`1px solid ${pillColor.border}` }}>
                          {scan.result === 'Safe' && <ShieldCheck size={14}/>}
                          {scan.result === 'Suspicious' && <ShieldQuestion size={14}/>}
                          {scan.result === 'Phishing Detected' && <ShieldAlert size={14}/>}
                          {scan.result.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding:'1.2rem 1rem', fontFamily:'var(--font-mono)', borderBottom:'1px solid rgba(255,255,255,0.03)' }}>{(scan.confidence_score * 100).toFixed(0)}%</td>
                      <td style={{ padding:'1.2rem 1rem', color:'var(--text-secondary)', fontSize:'0.9rem', borderBottom:'1px solid rgba(255,255,255,0.03)' }}>{new Date(scan.created_at).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'1.5rem', paddingTop:'1rem', borderTop:'1px solid var(--border-color)', flexWrap:'wrap', gap:'0.75rem' }}>
              <span style={{ color:'var(--text-secondary)', fontSize:'0.9rem', fontFamily:'var(--font-mono)' }}>
                Showing {((currentPage-1)*ROWS_PER_PAGE)+1}–{Math.min(currentPage*ROWS_PER_PAGE, filteredScans.length)} of {filteredScans.length}
              </span>
              <div style={{ display:'flex', gap:'0.5rem' }}>
                <button onClick={() => setCurrentPage(p => Math.max(1,p-1))} disabled={currentPage===1} className="btn btn-outline" style={{ padding:'0.4rem 0.75rem' }}><ChevronLeft size={16}/></button>
                {Array.from({ length: totalPages }, (_,i) => i+1).filter(p => p===1 || p===totalPages || Math.abs(p-currentPage)<=1).map((p,i,arr) => (
                  <React.Fragment key={p}>
                    {i>0 && arr[i-1]!==p-1 && <span style={{ display:'flex', alignItems:'center', color:'var(--text-secondary)', padding:'0 0.25rem' }}>…</span>}
                    <button onClick={() => setCurrentPage(p)} className={p===currentPage ? 'btn btn-primary' : 'btn btn-outline'} style={{ padding:'0.4rem 0.75rem', minWidth:36 }}>{p}</button>
                  </React.Fragment>
                ))}
                <button onClick={() => setCurrentPage(p => Math.min(totalPages,p+1))} disabled={currentPage===totalPages} className="btn btn-outline" style={{ padding:'0.4rem 0.75rem' }}><ChevronRight size={16}/></button>
              </div>
            </div>
          )}
        </div>
      </>)}
    </div>
  );
}

export default Dashboard;
