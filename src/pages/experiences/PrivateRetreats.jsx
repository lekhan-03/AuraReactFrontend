import React, { useState } from 'react';
import { experiencesData } from '../../data/experiencesData';
import { useCurrency } from '../../hooks/useCurrency';
import { useToast } from '../../context/ToastContext';
import RatingStars from '../../components/common/RatingStars';
import Modal from '../../components/common/Modal';
import { MoonStar, MapPin, Sparkles, Check } from 'lucide-react';

export default function PrivateRetreats() {
  const data = experiencesData.retreats;
  const { formatPrice } = useCurrency();
  const { success } = useToast();

  const [bookingItem, setBookingItem] = useState(null);
  const [retreatMonth, setRetreatMonth] = useState('October 2026');

  const handleConfirmRetreat = (e) => {
    e.preventDefault();
    success(`Your application for the multi-day retreat "${bookingItem.title}" for ${retreatMonth} has been submitted for director review.`);
    setBookingItem(null);
  };

  return (
    <div>
      {/* Category Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '3rem 2rem',
          marginBottom: '3rem',
          backgroundImage: `linear-gradient(to right, rgba(7, 10, 14, 0.92), rgba(7, 10, 14, 0.55)), url(${data.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          <span className="section-eyebrow">{data.category}</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#fff', marginBottom: '0.75rem' }}>{data.title}</h2>
          <p style={{ color: '#e2e8f0', fontSize: '1rem', lineHeight: '1.7' }}>{data.description}</p>
        </div>
      </div>

      {/* Items Grid */}
      <div className="experience-items-grid">
        {data.items.map((item) => (
          <div key={item.id} className="experience-item-card">
            <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
              <span className="suite-card-badge" style={{ bottom: '0.8rem', left: '0.8rem' }}>
                {item.duration}
              </span>
            </div>

            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <MapPin size={12} /> {item.location}
                </span>
                <RatingStars rating={item.rating} size={12} />
              </div>

              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>{item.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>
                {item.summary}
              </p>

              <div style={{ background: 'var(--bg-tertiary)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.82rem' }}>
                <strong style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>Immersion Curriculum:</strong>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem', color: 'var(--text-secondary)' }}>
                  {item.highlights.map((h, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Check size={12} color="var(--emerald-primary)" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-glass)' }}>
                <div>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {formatPrice(item.price)}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}> / retreat stay</span>
                </div>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setBookingItem(item)}
                >
                  <MoonStar size={13} />
                  <span>Inquire Retreat</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      <Modal isOpen={!!bookingItem} onClose={() => setBookingItem(null)} title="Inquire Multi-Day Private Retreat">
        {bookingItem && (
          <form onSubmit={handleConfirmRetreat} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--gold-primary)' }}>{bookingItem.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                {bookingItem.duration} • {bookingItem.location} • {formatPrice(bookingItem.price)} per retreat
              </p>
            </div>

            <div className="form-field-group">
              <label className="field-label">Preferred Season / Month</label>
              <select value={retreatMonth} onChange={(e) => setRetreatMonth(e.target.value)}>
                <option value="September 2026">September 2026</option>
                <option value="October 2026">October 2026</option>
                <option value="November 2026">November 2026</option>
                <option value="December 2026">December 2026</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit Retreat Application
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}
