import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Shield, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

function Footer() {
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/datasets', label: 'Datasets' },
    { to: '/research', label: 'Research' },
    { to: '/team', label: 'Team' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <footer style={{
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      marginTop: 'auto'
    }}>
      <div className="container" style={{ padding: '3rem 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '2.5rem'
        }}>
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Shield size={24} style={{ color: 'var(--brand-primary)' }} />
              <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>PhishGuard AI</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              An AI-powered phishing detection platform built by CSE students at MIT-ADT University.
            </p>
            {/* Status Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.3rem 0.85rem',
              borderRadius: '99px',
              border: '1px solid rgba(0, 255, 157, 0.3)',
              backgroundColor: 'rgba(0, 255, 157, 0.07)',
              fontSize: '0.78rem',
              color: 'var(--brand-success)',
              fontFamily: 'var(--font-mono)'
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                backgroundColor: 'var(--brand-success)',
                display: 'inline-block',
                boxShadow: '0 0 6px var(--brand-success)',
                animation: 'pulse 2s infinite'
              }} />
              All Systems Operational
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 style={{
              fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px',
              color: 'var(--text-secondary)', marginBottom: '1.25rem', fontFamily: 'var(--font-mono)'
            }}>Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    style={({ isActive }) => ({
                      color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s ease'
                    })}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Project Info Column */}
          <div>
            <h4 style={{
              fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px',
              color: 'var(--text-secondary)', marginBottom: '1.25rem', fontFamily: 'var(--font-mono)'
            }}>Project Info</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Institution:</span>
                <br />MIT-ADT University, Pune
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Department:</span>
                <br />Computer Science & Engineering
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Project:</span>
                <br />PBL Initiative — Academic Year 2025–26
              </div>
              <a
                href="https://1drv.ms/b/c/b9ae01db94226b25/IQASR4jRdajdTIG_UqSXKVnuAWBX_7Q4WKj1wPAmWmME6ts?e=J2JigV"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  color: 'var(--brand-primary)', fontSize: '0.875rem', marginTop: '0.25rem'
                }}
              >
                <ExternalLink size={14} /> View Research Paper
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} PhishGuard AI — Phishing Attack Detection System. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link
              to="/contact"
              style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', transition: 'color 0.2s ease' }}
            >
              Privacy Policy
            </Link>
            <span style={{ color: 'var(--border-color)' }}>|</span>
            <Link
              to="/contact"
              style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', transition: 'color 0.2s ease' }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
