import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import WeatherWidget from './WeatherWidget';
import CurrencySelector from './CurrencySelector';
import { Compass, Moon, Sun, Heart, Menu, X, Sparkles, UserCheck } from 'lucide-react';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { wishlist } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <Compass className="brand-icon" />
          <div>
            <span>INDIAN</span>
            <span className="brand-tag">SANCTUARIES</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav>
          <ul className="nav-links-desktop">
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/accommodations" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
                Accommodations
              </NavLink>
            </li>
            <li>
              <NavLink to="/experiences" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
                Experiences
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
                About & Sustainability
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
                Concierge
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
                Guest Portal
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Navbar Actions */}
        <div className="navbar-actions">
          {/* Weather Widget */}
          <WeatherWidget />

          {/* Currency Selector */}
          <CurrencySelector />

          {/* Theme Switcher */}
          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to Pearl Light Theme' : 'Switch to Obsidian Dark Theme'}
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {isDark ? <Sun size={17} color="var(--gold-primary)" /> : <Moon size={17} />}
          </button>

          {/* Wishlist Link */}
          <Link
            to="/dashboard/wishlist"
            className="icon-btn"
            aria-label="View Saved Wishlist"
            title="Saved Suites"
          >
            <Heart size={17} />
            {wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
          </Link>

          {/* Primary CTA */}
          <Link to="/booking" className="btn btn-primary btn-sm" style={{ display: 'inline-flex' }}>
            <Sparkles size={14} />
            <span>Reserve</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="icon-btn mobile-menu-btn"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <NavLink to="/" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu} end>
          Home
        </NavLink>
        <NavLink to="/accommodations" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
          Accommodations
        </NavLink>
        <NavLink to="/experiences" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
          Curated Experiences
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
          Sustainability Promise
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
          Concierge & Contact
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
          Guest Portal / My Bookings
        </NavLink>
        <Link to="/booking" className="btn btn-primary" onClick={closeMobileMenu} style={{ marginTop: '1rem' }}>
          Reserve Sanctuary Stay
        </Link>
      </div>
    </header>
  );
}
