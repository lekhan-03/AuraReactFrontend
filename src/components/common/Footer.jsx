import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { Compass, Send, ShieldCheck, Award, Leaf, Heart } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { success, warning } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      warning('Please provide a valid email address to receive private invitations.');
      return;
    }
    success('Thank you for joining the AURA Curated Circle. Private voyage dispatches will arrive shortly.');
    setEmail('');
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand & Philosophy */}
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <Compass size={28} color="var(--gold-primary)" />
              <h3 style={{ fontSize: '1.3rem', letterSpacing: '0.1em' }}>AURA SANCTUARIES</h3>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              A collection of five remote, ultra-luxury biophilic sanctuaries dedicated to deep natural reconnection, architectural preservation, and regenerative hospitality.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--text-gold)' }}>
                <Leaf size={14} color="var(--emerald-primary)" /> 100% Microgrid Powered
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--text-gold)' }}>
                <Award size={14} color="var(--gold-primary)" /> Prix Versailles Laureate 2025
              </span>
            </div>
          </div>

          {/* Col 2: Sanctuaries */}
          <div className="footer-col">
            <h4>SANCTUARIES</h4>
            <ul>
              <li><Link to="/accommodations?destination=kyoto">Kyoto Arashiyama, Japan</Link></li>
              <li><Link to="/accommodations?destination=maldives">Baa Atoll Biosphere, Maldives</Link></li>
              <li><Link to="/accommodations?destination=alps">Zermatt Alpine Crest, Switzerland</Link></li>
              <li><Link to="/accommodations?destination=tulum">Tulum Cenote Sanctuary, Mexico</Link></li>
              <li><Link to="/accommodations?destination=amalfi">Amalfi Cliffside Perch, Italy</Link></li>
            </ul>
          </div>

          {/* Col 3: Experiences & Portal */}
          <div className="footer-col">
            <h4>DISCOVERY</h4>
            <ul>
              <li><Link to="/experiences/wellness">Holistic Hydrotherapy & Spa</Link></li>
              <li><Link to="/experiences/dining">Michelin Zero-Km Dining</Link></li>
              <li><Link to="/experiences/adventures">Regenerative Nature Expeditions</Link></li>
              <li><Link to="/experiences/retreats">Private Meditation Retreats</Link></li>
              <li><Link to="/dashboard/loyalty">Aura Elite Loyalty Program</Link></li>
              <li><Link to="/about">Sustainability Promise</Link></li>
            </ul>
          </div>

          {/* Col 4: Private Gazette Newsletter */}
          <div className="footer-col">
            <h4>PRIVATE DISPATCHES</h4>
            <p style={{ fontSize: '0.88rem', marginBottom: '0.5rem' }}>
              Receive seasonal private villa openings, bespoke expedition dates, and culinary previews.
            </p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email for newsletter subscription"
              />
              <button type="submit" className="btn btn-primary btn-sm" aria-label="Subscribe">
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} AURA Sanctuaries & Eco-Resorts International. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link to="/about">Privacy Charter</Link>
            <Link to="/about">Regenerative Hospitality Terms</Link>
            <Link to="/contact">Concierge Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
