import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Bot, X, Send, Shield, RotateCcw, ExternalLink } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE } from '../api';
import './ChatBot.css';

// ── Suggested starter questions ─────────────────────────────────────
const SUGGESTIONS = [
  'What is PhishGuard AI?',
  'How do I scan a URL?',
  'How does the ML model work?',
  'What datasets are used?',
  'How accurate is detection?',
  'How to report false results?',
];

// ── Lightweight markdown-ish renderer ────────────────────────────────
// Converts **bold**, `code`, [text](url), and \n to React nodes
function renderMessage(text) {
  if (!text) return null;
  // Split by newline first
  const lines = text.split('\n');
  return lines.map((line, li) => {
    // Tokenize inline: **bold**, `code`, [text](url)
    const tokens = [];
    const regex = /(\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\((https?:\/\/[^\)]+)\))/g;
    let last = 0;
    let m;
    while ((m = regex.exec(line)) !== null) {
      if (m.index > last) tokens.push(line.slice(last, m.index));
      if (m[2]) tokens.push(<strong key={m.index}>{m[2]}</strong>);
      else if (m[3]) tokens.push(<code key={m.index} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82em', background: 'rgba(0,240,255,0.08)', padding: '1px 5px', borderRadius: 4 }}>{m[3]}</code>);
      else if (m[4]) tokens.push(<a key={m.index} className="chatbot-link" href={m[5]} target="_blank" rel="noopener noreferrer">{m[4]} <ExternalLink size={10} style={{ verticalAlign: 'middle' }} /></a>);
      last = regex.lastIndex;
    }
    if (last < line.length) tokens.push(line.slice(last));
    return (
      <React.Fragment key={li}>
        {tokens.length > 0 ? tokens : line}
        {li < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

// ── Format timestamp ─────────────────────────────────────────────────
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ── Main Component ───────────────────────────────────────────────────
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when window opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setShowBadge(false);
    }
  }, [isOpen]);

  // Notify user proactively on page change (optional: context awareness)
  useEffect(() => {
    if (!isOpen && messages.length === 0) setShowBadge(true);
  }, [location.pathname]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const sendMessage = useCallback(async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || loading) return;

    const userMsg = { role: 'user', text: trimmed, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: messages.map(m => ({ role: m.role, text: m.text })),
          currentPage: location.pathname,
        }),
      });

      const data = await response.json();

      // If server sent a reply even on error (e.g. 429 rate limit), show it as bot message
      if (!response.ok) {
        if (data.reply) {
          const botMsg = { role: 'bot', text: data.reply, time: new Date() };
          setMessages(prev => [...prev, botMsg]);
        } else {
          throw new Error(data.error || 'Failed to get response');
        }
        return;
      }

      const botMsg = { role: 'bot', text: data.reply, time: new Date() };
      setMessages(prev => [...prev, botMsg]);

      // Navigate if the bot suggests a page
      if (data.navigateTo) {
        setTimeout(() => navigate(data.navigateTo), 1200);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, location.pathname, navigate]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleReset = () => {
    setMessages([]);
    setError(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const showWelcome = messages.length === 0;

  return (
    <>
      {/* ── Floating Launcher ── */}
      <button
        id="chatbot-launcher-btn"
        className={`chatbot-launcher ${isOpen ? 'is-open' : ''}`}
        onClick={isOpen ? handleClose : handleOpen}
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        title={isOpen ? 'Close Assistant' : 'Ask PhishGuard AI'}
      >
        {isOpen ? <X size={22} /> : <Bot size={24} />}
        {!isOpen && showBadge && (
          <span className="chatbot-badge" aria-hidden="true">!</span>
        )}
      </button>

      {/* ── Chat Window ── */}
      {isOpen && (
        <div
          id="chatbot-window"
          className="chatbot-window"
          role="dialog"
          aria-label="PhishGuard AI Assistant"
        >
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-avatar">
              <Shield size={20} />
            </div>
            <div className="chatbot-header-info">
              <h4>PhishGuard Assistant</h4>
              <div className="chatbot-status">
                <div className="chatbot-status-dot" />
                AI Online · Powered by Gemini
              </div>
            </div>
            <button
              className="chatbot-close-btn"
              onClick={handleReset}
              title="Clear conversation"
              aria-label="Clear conversation"
            >
              <RotateCcw size={15} />
            </button>
            <button
              className="chatbot-close-btn"
              onClick={handleClose}
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Suggestion Chips */}
          {showWelcome && (
            <div className="chatbot-suggestions" role="list" aria-label="Suggested questions">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  className="suggestion-chip"
                  onClick={() => sendMessage(s)}
                  role="listitem"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          <div className="chatbot-messages" role="log" aria-live="polite">
            {/* Welcome card */}
            {showWelcome && (
              <div className="chatbot-welcome">
                <div className="chatbot-welcome-icon">
                  <Bot size={26} />
                </div>
                <h5>Hi, I'm your PhishGuard AI Assistant! 👋</h5>
                <p>
                  Ask me anything about phishing detection, how to use this platform,
                  what our datasets contain, or how our ML models work.
                </p>
              </div>
            )}

            {/* Message list */}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chatbot-message ${msg.role}`}
                aria-label={msg.role === 'user' ? 'Your message' : 'Assistant reply'}
              >
                <div className="msg-avatar">
                  {msg.role === 'bot' ? <Shield size={14} /> : 'U'}
                </div>
                <div>
                  <div className="msg-bubble">
                    {renderMessage(msg.text)}
                  </div>
                  <div className="msg-time">{formatTime(msg.time)}</div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="chatbot-message bot">
                <div className="msg-avatar"><Shield size={14} /></div>
                <div className="msg-bubble" style={{ padding: '0.6rem 1rem' }}>
                  <div className="typing-indicator">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}

            {/* Inline error */}
            {error && !loading && (
              <div className="chatbot-error">⚠ {error}</div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-area">
            <textarea
              ref={inputRef}
              id="chatbot-input"
              className="chatbot-input"
              placeholder="Ask about phishing, scans, datasets…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              maxLength={500}
              disabled={loading}
              aria-label="Chat message input"
            />
            <button
              id="chatbot-send-btn"
              className="chatbot-send-btn"
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              aria-label="Send message"
              title="Send (Enter)"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
