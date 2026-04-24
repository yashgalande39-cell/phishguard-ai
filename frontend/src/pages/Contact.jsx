import React, { useState } from 'react';
import { Send, Loader, Mail, MapPin, ExternalLink } from 'lucide-react';
import { API_BASE } from '../api';
import Toast from '../components/Toast';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to send message');

      setToast({ message: '✅ Message sent! We\'ll get back to you soon.', type: 'success' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setToast({ message: `❌ ${err.message}. Please try again.`, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <h1 className="text-gradient" style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.5rem' }}>Contact Us</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
        Have questions about our AI detection model or want to integrate our API into your enterprise?
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2.5rem',
        maxWidth: '960px',
        margin: '0 auto'
      }}>
        {/* Contact Info Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1.75rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <Mail size={24} style={{ color: 'var(--brand-primary)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ marginBottom: '0.4rem', fontSize: '1rem' }}>Email</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Reach out directly to the development team for API inquiries or collaboration.
              </p>
              <a href="mailto:phishguard@mitadt.edu.in"
                style={{ color: 'var(--brand-primary)', fontSize: '0.9rem', marginTop: '0.4rem', display: 'inline-block' }}>
                phishguard@mitadt.edu.in
              </a>
            </div>
          </div>

          <div className="card" style={{ padding: '1.75rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <MapPin size={24} style={{ color: 'var(--brand-success)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ marginBottom: '0.4rem', fontSize: '1rem' }}>Institution</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                MIT-ADT University<br />
                Dept. of CSE, Pune, Maharashtra
              </p>
            </div>
          </div>

          <div className="card" style={{ padding: '1.75rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <ExternalLink size={24} style={{ color: 'var(--brand-secondary)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ marginBottom: '0.4rem', fontSize: '1rem' }}>Research Paper</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Read our full academic paper on the ML architecture.
              </p>
              <a href="https://1drv.ms/b/c/b9ae01db94226b25/IQASR4jRdajdTIG_UqSXKVnuAWBX_7Q4WKj1wPAmWmME6ts?e=J2JigV"
                target="_blank" rel="noreferrer"
                style={{ color: 'var(--brand-secondary)', fontSize: '0.9rem', marginTop: '0.4rem', display: 'inline-block' }}>
                View Research Paper →
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label htmlFor="contact-name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Name</label>
            <input id="contact-name" type="text" placeholder="John Doe"
              value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              maxLength={120} required />
          </div>

          <div>
            <label htmlFor="contact-email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
            <input id="contact-email" type="email" placeholder="john@example.com"
              value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              maxLength={254} required />
          </div>

          <div>
            <label htmlFor="contact-message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Message</label>
            <textarea id="contact-message" rows="5" placeholder="How can we help you today?"
              value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              maxLength={2000} required />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={loading}>
            {loading ? <Loader className="spin" size={20} /> : <><Send size={18} /> Send Message</>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
