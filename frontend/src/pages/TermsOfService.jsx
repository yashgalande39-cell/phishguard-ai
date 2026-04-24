import React from 'react';
import { FileText } from 'lucide-react';

function TermsOfService() {
  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '860px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <FileText size={36} style={{ color: 'var(--brand-secondary)' }} />
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', margin: 0 }}>Terms of Service</h1>
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
        Last updated: April 2026 — Academic Project Notice
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {[
          {
            title: '1. Acceptance of Terms',
            body: 'By accessing and using the PhishGuard AI platform, you agree to be bound by these Terms of Service. This is an academic demonstration project and should not be used as the sole security solution for any production system.'
          },
          {
            title: '2. Permitted Use',
            body: 'You may use PhishGuard AI to scan URLs and email content for phishing indicators for personal, educational, or research purposes. You agree not to submit content that violates any applicable laws, including content that may constitute harassment, hate speech, or illegal material.'
          },
          {
            title: '3. No Warranty',
            body: 'PhishGuard AI is provided "as is" without warranty of any kind. The platform\'s phishing detection is probabilistic and may produce false positives or false negatives. Do not rely solely on this tool for security decisions in a production environment.'
          },
          {
            title: '4. Accuracy Disclaimer',
            body: 'Our ML models are trained on open-source datasets including PhishTank, OpenPhish, Enron Email Dataset, and SpamAssassin. While we strive for 93–97% detection accuracy, the system is not infallible. Always verify high-stakes verdicts through multiple independent security tools.'
          },
          {
            title: '5. Rate Limiting',
            body: 'To prevent abuse of the API, the platform enforces rate limiting: 30 analysis requests per minute per IP address, and 100 general API requests per minute. Automated scraping or bulk analysis beyond these limits is not permitted.'
          },
          {
            title: '6. Intellectual Property',
            body: 'The PhishGuard AI codebase, design, and academic research paper are the intellectual property of the project team at MIT-ADT University. Reproduction for academic citation is permitted with proper attribution.'
          },
          {
            title: '7. Limitation of Liability',
            body: 'The PhishGuard AI development team shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of or inability to use the platform.'
          },
          {
            title: '8. Contact',
            body: 'For any questions regarding these terms, contact us at phishguard@mitadt.edu.in.'
          },
        ].map((section, i) => (
          <div key={i} className="card" style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--brand-secondary)', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>{section.title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TermsOfService;
