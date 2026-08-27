import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '8rem 1.5rem 10rem 1.5rem' }}>
      <Compass size={64} color="var(--gold-primary)" style={{ margin: '0 auto 1.5rem auto', filter: 'drop-shadow(0 0 15px rgba(223, 177, 91, 0.4))' }} />
      <span className="section-eyebrow">404 Sanctuary Not Found</span>
      <h1 style={{ fontSize: '3rem', margin: '0.5rem 0 1rem 0' }}>Uncharted Coordinates</h1>
      <p style={{ maxWidth: '520px', margin: '0 auto 2.5rem auto', fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
        The sanctuary retreat or experience pathway you are seeking does not exist or has been relocated to protected reserves.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/" className="btn btn-primary btn-lg">
          <Home size={16} />
          <span>Return to Sanctuaries Home</span>
        </Link>
        <Link to="/accommodations" className="btn btn-outline btn-lg">
          <span>Explore All Suites</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
