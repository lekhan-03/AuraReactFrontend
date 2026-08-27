import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { accommodationsData } from '../../data/accommodationsData';
import SuiteCard from '../../components/accommodations/SuiteCard';
import { Heart, ArrowRight } from 'lucide-react';

export default function Wishlist() {
  const { wishlist } = useUser();

  const savedSuites = accommodationsData.filter((s) => wishlist.includes(s.id));

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>Saved Dream Sanctuaries</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Your handpicked selection of secluded pavilions, treehouses, and overwater chalets.
        </p>
      </div>

      {savedSuites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
          <Heart size={40} color="var(--gold-primary)" style={{ margin: '0 auto 1rem auto' }} />
          <h3>Your Saved Sanctuary Wishlist is Empty</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0.5rem auto 1.5rem auto', maxWidth: '400px' }}>
            Click the heart icon on any suite or pavilion in our catalog to save it for your next retreat.
          </p>
          <Link to="/accommodations" className="btn btn-primary">
            Explore All Accommodations
          </Link>
        </div>
      ) : (
        <div className="suites-grid">
          {savedSuites.map((suite) => (
            <SuiteCard key={suite.id} suite={suite} />
          ))}
        </div>
      )}
    </div>
  );
}
