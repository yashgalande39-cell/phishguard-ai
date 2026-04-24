import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldOff } from 'lucide-react';

function NotFound() {
  return (
    <div className="container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '4rem 2rem',
      gap: '1.5rem'
    }}>
      <ShieldOff
        size={80}
        style={{
          color: 'var(--brand-danger)',
          filter: 'drop-shadow(0 0 20px var(--brand-danger))',
          animation: 'heroFloat 3s ease-in-out infinite'
        }}
      />
      <h1 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', margin: 0 }}>
        <span className="text-gradient">404</span>
      </h1>
      <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)' }}>
        Page Not Found
      </h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: 1.7 }}>
        The route you navigated to doesn't exist in this system. It may have been moved,
        deleted, or you may have mistyped the URL.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary">Return Home</Link>
        <Link to="/dashboard" className="btn btn-outline">Go to Dashboard</Link>
      </div>
    </div>
  );
}

export default NotFound;
