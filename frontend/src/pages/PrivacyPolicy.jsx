import React from 'react';
import { Shield } from 'lucide-react';

function PrivacyPolicy() {
  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '860px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <Shield size={36} style={{ color: 'var(--brand-primary)' }} />
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', margin: 0 }}>Privacy Policy</h1>
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
        Last updated: April 2026 — Academic Project Notice
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {[
          {
            title: '1. Academic Project Disclaimer',
            body: 'PhishGuard AI is an academic project developed as part of the Project Based Learning (PBL) curriculum at MIT-ADT University, Department of Computer Science & Engineering. This platform is not a commercial product and is intended solely for educational and research demonstration purposes.'
          },
          {
            title: '2. Data We Collect',
            body: 'When you use the Live Detection scanner, the URL or email text you submit is stored in our database for telemetry and dashboard analysis purposes. Contact form submissions (name, email, message) are stored to allow our team to respond. No personal identification data beyond what you voluntarily provide is collected.'
          },
          {
            title: '3. How We Use Your Data',
            body: 'Submitted scan payloads are used to populate the Telemetry Dashboard with anonymous aggregate statistics. We do not sell, share, or distribute any user-submitted data to third parties. Contact form data is used only to respond to your inquiry.'
          },
          {
            title: '4. Data Retention',
            body: 'Scan records are retained in our MySQL database for the duration of the academic demonstration period. Contact form submissions are retained for up to 90 days. You may request deletion by emailing phishguard@mitadt.edu.in.'
          },
          {
            title: '5. Cookies & Local Storage',
            body: 'We use browser localStorage solely to persist your selected UI theme (dark/light mode). No tracking cookies, analytics cookies, or third-party cookies are used on this platform.'
          },
          {
            title: '6. Third-Party Services',
            body: 'We reference open datasets including PhishTank, OpenPhish, and the Alexa Top Sites list for ML training purposes. These are accessed server-side only — no third-party scripts run in your browser from these providers.'
          },
          {
            title: '7. Contact',
            body: 'For any privacy concerns or data deletion requests, please contact: phishguard@mitadt.edu.in or visit the Contact page.'
          },
        ].map((section, i) => (
          <div key={i} className="card" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--brand-primary)', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>{section.title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PrivacyPolicy;
