import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Shield, Moon, Sun, Menu, X, LogIn, UserCircle } from 'lucide-react';

import './Navbar.css';

function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const close = () => setIsOpen(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? 'nav-links nav-links--active' : 'nav-links';

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo" onClick={close}>
          <Shield className="logo-icon" size={28} />
          <span className="text-gradient font-bold">PhishGuard AI</span>
        </Link>

        {/* Hamburger */}
        <button
          className="menu-icon"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item"><NavLink to="/" end className={navLinkClass} onClick={close}>Home</NavLink></li>
          <li className="nav-item"><NavLink to="/how-it-works" className={navLinkClass} onClick={close}>How It Works</NavLink></li>
          <li className="nav-item"><NavLink to="/dashboard" className={navLinkClass} onClick={close}>Dashboard</NavLink></li>
          <li className="nav-item"><NavLink to="/datasets" className={navLinkClass} onClick={close}>Datasets</NavLink></li>
          <li className="nav-item"><NavLink to="/research" className={navLinkClass} onClick={close}>Research</NavLink></li>
          <li className="nav-item"><NavLink to="/team" className={navLinkClass} onClick={close}>Team</NavLink></li>
          <li className="nav-item"><NavLink to="/about" className={navLinkClass} onClick={close}>About</NavLink></li>
          <li className="nav-item"><NavLink to="/implementation" className={navLinkClass} onClick={close}>Impl.</NavLink></li>
          <li className="nav-item"><NavLink to="/contact" className={navLinkClass} onClick={close}>Contact</NavLink></li>

          <li className="nav-item theme-btn-container" style={{ display:'flex', gap:'1rem', alignItems:'center' }}>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {user ? (
              <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginLeft:'0.5rem' }}>
                <span style={{ fontSize:'0.85rem', color:'var(--text-secondary)', display:'none', '@media (min-width: 960px)': { display:'inline' } }}>{user.username}</span>
                <button onClick={handleLogout} className="btn btn-outline" style={{ padding:'0.4rem 0.8rem', fontSize:'0.8rem', display:'flex', alignItems:'center', gap:'0.4rem' }}>
                  Logout
                </button>
              </div>
            ) : (
              <NavLink to="/auth" className="btn btn-primary" style={{ padding:'0.4rem 1rem', fontSize:'0.8rem', display:'flex', alignItems:'center', gap:'0.4rem', textDecoration:'none' }} onClick={close}>
                <LogIn size={14}/> Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
