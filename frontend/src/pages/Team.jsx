import React, { useState } from 'react';
import './Team.css';
import {
  Users, Code, Server, Database, BrainCircuit,
  GraduationCap, Award, ChevronRight, Github,
  Linkedin, Mail, Shield, Cpu, Globe, Layers,
  CheckCircle, Zap, Network, BookOpen
} from 'lucide-react';

/* ── Data ────────────────────────────────────────────────── */
const teamMembers = [
  {
    name: "Yash Galande",
    initials: "YG",
    role: "Team Lead & System Architect",
    color: "#22d3ee",
    badgeColor: "rgba(34,211,238,0.12)",
    icon: Award,
    specialty: "Full-Stack Architecture & Project Leadership",
    skills: ["Node.js", "Express.js", "System Design", "REST APIs", "DevOps"],
    contributions: [
      "Spearheaded all architectural decisions across a 3-tier full-stack system.",
      "Engineered the Node.js/Express.js API Gateway with CORS, rate limiting, and structured routing.",
      "Coordinated integration between the React frontend and the ML detection pipeline.",
      "Authored the complete API contract documentation and data-flow diagrams.",
      "Managed project timelines and coordinated code reviews across all team modules.",
    ],
    quote: "Good architecture is about making the right trade-offs — speed, security, and scalability."
  },
  {
    name: "Yashkumar Lembhe",
    initials: "YL",
    role: "AI & Machine Learning Engineer",
    color: "#a78bfa",
    badgeColor: "rgba(167,139,250,0.12)",
    icon: BrainCircuit,
    specialty: "NLP, Naive Bayes & Ensemble ML Design",
    skills: ["natural.js", "NLP", "Naive Bayes", "Shannon Entropy", "Dataset Engineering"],
    contributions: [
      "Implemented the Naive Bayes text classification pipeline using the natural.js library.",
      "Sourced and integrated the PhishTank, OpenPhish, SpamAssassin, and Enron datasets.",
      "Engineered the dual-mode URL and Email NLP tokenization and feature extraction system.",
      "Designed the Shannon Entropy calculator for DGA domain detection.",
      "Built the Ensemble Override logic to prevent Zero-Day adversarial ML evasion attacks.",
    ],
    quote: "Training a model is only half the job. Teaching it *not* to be fooled is the real art."
  },
  {
    name: "Ram Borkar",
    initials: "RB",
    role: "Frontend Developer & UX Engineer",
    color: "#4ade80",
    badgeColor: "rgba(74,222,128,0.12)",
    icon: Code,
    specialty: "React UI/UX, CSS Design Systems & Animations",
    skills: ["React 18", "Vite 5", "CSS Variables", "Lucide Icons", "React Router v6"],
    contributions: [
      "Designed and built the complete cybersecurity-themed React SPA with Vite.",
      "Created the interactive real-time scanning dashboard with confidence ring animations.",
      "Built all 8 application pages including the Architecture Diagram and API Explorer.",
      "Implemented the global CSS design system using CSS custom properties for consistent theming.",
      "Ensured full mobile responsiveness and accessibility standards across all components.",
    ],
    quote: "Design is not just how it looks — it's how it makes the user feel safe."
  },
  {
    name: "Ayush Patil",
    initials: "AP",
    role: "Backend & Database Integrator",
    color: "#f59e0b",
    badgeColor: "rgba(245,158,11,0.12)",
    icon: Database,
    specialty: "MySQL DBA, RESTful APIs & Data Persistence",
    skills: ["MySQL 8", "mysql2/promise", "SQL Schema Design", "Parameterized Queries", "API Routes"],
    contributions: [
      "Designed the complete MySQL relational schema across 3 tables: scans, contacts, and feedback.",
      "Implemented all 4 RESTful API endpoints with proper HTTP semantics and error handling.",
      "Secured all database operations with parameterized queries preventing SQL injection attacks.",
      "Managed the database connection pool lifecycle and async/await query optimization.",
      "Built the feedback-to-scan foreign key linking pipeline for future ML retraining data collection.",
    ],
    quote: "Reliable data storage is the backbone of every intelligent system."
  }
];

const projectStats = [
  { value: '8', label: 'App Pages', icon: Globe },
  { value: '4', label: 'REST API Endpoints', icon: Network },
  { value: '6', label: 'AI Datasets Integrated', icon: BrainCircuit },
  { value: '7+', label: 'Heuristic Detectors', icon: Shield },
  { value: '3', label: 'DB Tables Designed', icon: Database },
  { value: '<300ms', label: 'Detection Latency', icon: Zap },
];

const techStack = [
  { layer: 'Frontend', color: '#22d3ee',    techs: ['React 18', 'Vite 5', 'React Router v6', 'Lucide Icons', 'Vanilla CSS'] },
  { layer: 'Backend',  color: 'var(--brand-primary)', techs: ['Node.js 20', 'Express 4', 'Axios', 'dotenv', 'cors'] },
  { layer: 'AI / ML',  color: '#a78bfa',    techs: ['natural.js', 'BayesClassifier', 'Shannon Entropy', 'NLP Tokenizer', 'Ensemble Logic'] },
  { layer: 'Database', color: '#f59e0b',    techs: ['MySQL 8', 'mysql2/promise', 'Parameterized Queries', 'Connection Pool'] },
];

/* ── Sub-components ─────────────────────────────────────── */
function SkillBadge({ label, color }) {
  return (
    <span style={{
      display: 'inline-block', padding: '0.2rem 0.65rem', borderRadius: '99px',
      fontSize: '0.72rem', fontWeight: 600, fontFamily: 'var(--font-mono)',
      letterSpacing: '0.4px', background: `${color}22`,
      color: color, border: `1px solid ${color}44`
    }}>{label}</span>
  );
}

function MemberCard({ member }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = member.icon;

  return (
    <div
      className="team-card-outer"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className={`team-card-inner ${flipped ? 'flipped' : ''}`}>

        {/* FRONT */}
        <div className="team-card-face team-card-front" style={{ borderTop: `3px solid ${member.color}` }}>
          <div className="team-avatar" style={{ background: member.badgeColor, borderColor: member.color }}>
            <span style={{ color: member.color, fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.6rem' }}>
              {member.initials}
            </span>
          </div>
          <div className="team-icon-badge" style={{ background: member.badgeColor }}>
            <Icon size={22} style={{ color: member.color }} />
          </div>
          <h3 className="team-name">{member.name}</h3>
          <p className="team-role" style={{ color: member.color }}>{member.role}</p>
          <div className="team-specialty">
            <span>{member.specialty}</span>
          </div>
          <div className="team-skills">
            {member.skills.map(s => <SkillBadge key={s} label={s} color={member.color} />)}
          </div>
          <p className="team-hover-hint">Hover to see contributions →</p>
        </div>

        {/* BACK */}
        <div className="team-card-face team-card-back" style={{ borderTop: `3px solid ${member.color}` }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <p className="team-quote" style={{ borderLeft: `3px solid ${member.color}` }}>
              "{member.quote}"
            </p>
          </div>
          <strong style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.85rem' }}>
            Key Contributions
          </strong>
          <ul className="team-contributions">
            {member.contributions.map((c, i) => (
              <li key={i}>
                <ChevronRight size={14} style={{ color: member.color, flexShrink: 0, marginTop: '2px' }} />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────────── */
function Team() {
  return (
    <div className="container" style={{ padding: '4rem 0' }}>

      {/* Hero */}
      <h1 className="text-gradient" style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '3rem' }}>
        Meet the Team
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto 3rem', fontSize: '1.1rem', lineHeight: 1.7 }}>
        We are a group of Computer Science & Engineering students from MIT-ADT University who built PhishGuard AI — a full-stack, production-grade AI phishing detection platform — as a Project Based Learning (PBL) initiative combining machine learning, cybersecurity, and modern web engineering.
      </p>

      {/* Project Stats Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '4rem' }}>
        {projectStats.map(({ value, label, icon: Icon }) => (
          <div key={label} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', padding: '1.25rem 1.75rem', minWidth: '130px' }}>
            <Icon size={22} style={{ color: 'var(--brand-primary)' }} />
            <span style={{ fontSize: '1.8rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--brand-primary)' }}>{value}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Institution & Academic Backing */}
      <div className="card" style={{ maxWidth: '900px', margin: '0 auto 4rem', display: 'flex', gap: '2rem', alignItems: 'center', padding: '2.5rem', flexWrap: 'wrap' }}>
        <GraduationCap style={{ color: 'var(--brand-primary)', flexShrink: 0 }} size={64} />
        <div>
          <h2 style={{ marginBottom: '0.5rem', fontSize: '1.75rem' }}>MIT-ADT University</h2>
          <span style={{
            display: 'inline-block', background: 'rgba(0,240,255,0.1)', color: 'var(--brand-primary)',
            padding: '0.35rem 1rem', borderRadius: '99px', fontWeight: 700, letterSpacing: '1px',
            textTransform: 'uppercase', fontSize: '0.75rem', marginBottom: '1rem', fontFamily: 'var(--font-mono)'
          }}>
            Dept. of Computer Science & Engineering (CSE)
          </span>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0, fontSize: '0.95rem' }}>
            This platform was developed as part of our <strong style={{ color: 'var(--text-primary)' }}>Project Based Learning (PBL)</strong> curriculum, demonstrating proficiency in Full-Stack Web Development, Natural Language Processing, Relational Database Management, and applied Cybersecurity. The system adheres to industry-grade engineering practices and modern software architecture patterns.
          </p>
        </div>
      </div>

      {/* Mentor Card */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Academic Oversight</h2>
        <div className="card" style={{
          maxWidth: '640px', margin: '0 auto',
          border: '1px solid var(--brand-secondary)',
          background: 'rgba(6,182,212,0.03)',
          padding: '2.5rem', textAlign: 'center'
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'rgba(6,182,212,0.1)', border: '2px solid var(--brand-secondary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem'
          }}>
            <Users size={32} style={{ color: 'var(--brand-secondary)' }} />
          </div>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '0.25rem' }}>Prof. Shraddha Katkar</h3>
          <p style={{ color: 'var(--brand-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.82rem', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>
            Faculty Mentor & Technical Advisor — MIT-ADT University
          </p>
          <hr style={{ borderColor: 'var(--border-color)', margin: '0 0 1.5rem' }} />
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, margin: 0, fontSize: '0.95rem' }}>
            Prof. Katkar provided continuous academic guidance and structural oversight throughout the project lifecycle — ensuring the AI integration, software architecture, and cybersecurity methodologies adhered strictly to contemporary academic and industry standards. Her mentorship was instrumental in shaping the project scope and technical depth.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1.5rem' }}>
            {['AI & ML Oversight', 'Architecture Review', 'Research Methods', 'Security Best Practices'].map(t => (
              <SkillBadge key={t} label={t} color="var(--brand-secondary)" />
            ))}
          </div>
        </div>
      </section>

      {/* Team Cards Grid */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2rem' }}>Engineering Team</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
          Hover over each card to reveal technical contributions.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {teamMembers.map(m => <MemberCard key={m.name} member={m} />)}
        </div>
      </section>

      {/* Technology Stack Used */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Technology Stack</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {techStack.map(({ layer, color, techs }) => (
            <div key={layer} className="card" style={{ borderLeft: `3px solid ${color}`, padding: '1.5rem' }}>
              <h4 style={{ color, marginBottom: '1rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
                {layer}
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {techs.map(t => <SkillBadge key={t} label={t} color={color} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Research Paper CTA */}
      <section>
        <div className="card" style={{
          textAlign: 'center', padding: '3rem',
          background: 'rgba(59,130,246,0.04)',
          border: '1px solid var(--brand-primary)'
        }}>
          <BookOpen size={48} style={{ color: 'var(--brand-primary)', marginBottom: '1.25rem' }} />
          <h2 style={{ marginBottom: '0.75rem', fontSize: '1.75rem' }}>Our Published Research</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.7, fontSize: '0.95rem' }}>
            We've authored a comprehensive academic research paper detailing the ML classification pipeline, ensemble heuristic architecture, and detection efficacy benchmarks of the PhishGuard AI system.
          </p>
          <a
            href="https://1drv.ms/b/c/b9ae01db94226b25/IQASR4jRdajdTIG_UqSXKVnuAWBX_7Q4WKj1wPAmWmME6ts?e=J2JigV"
            target="_blank"
            rel="noreferrer"
            className="btn"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
          >
            <BookOpen size={18} /> Read the Research Paper
          </a>
        </div>
      </section>

    </div>
  );
}

export default Team;
