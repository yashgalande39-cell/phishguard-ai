import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 999,
        width: 44, height: 44, borderRadius: '50%',
        background: 'var(--bg-accent)', border: '1px solid var(--border-color)',
        color: 'var(--brand-primary)', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4), 0 0 10px rgba(0,240,255,0.15)',
        transition: 'all 0.2s ease', animation: 'fadeIn 0.3s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4), 0 0 20px rgba(0,240,255,0.4)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4), 0 0 10px rgba(0,240,255,0.15)'}
    >
      <ArrowUp size={20} />
    </button>
  );
}

export default BackToTop;
