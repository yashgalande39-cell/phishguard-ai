import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  const bg = type === 'success' ? 'rgba(0,255,157,0.12)' : 'rgba(255,42,95,0.12)';
  const border = type === 'success' ? 'var(--brand-success)' : 'var(--brand-danger)';
  const color  = type === 'success' ? 'var(--brand-success)' : 'var(--brand-danger)';

  return (
    <div style={{
      position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999,
      display: 'flex', alignItems: 'center', gap: '0.75rem',
      padding: '1rem 1.25rem', borderRadius: 'var(--radius)',
      background: bg, border: `1px solid ${border}`, color,
      boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 12px ${border}40`,
      animation: 'fadeIn 0.3s ease', minWidth: '280px', maxWidth: '420px',
      fontFamily: 'var(--font-primary)', fontWeight: 500, fontSize: '0.95rem',
    }}>
      {type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
      <span style={{ flex: 1 }}>{message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color, cursor: 'pointer', padding: 0, display: 'flex' }}>
        <X size={16} />
      </button>
    </div>
  );
}

export default Toast;
