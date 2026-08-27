import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { accommodationsData } from '../data/accommodationsData';
import { destinationsData } from '../data/destinationsData';
import { reviewsData, sustainabilityMetrics } from '../data/reviewsData';
import SuiteCard from '../components/accommodations/SuiteCard';
import RatingStars from '../components/common/RatingStars';
import { useBooking } from '../context/BookingContext';
import { Compass, Calendar, Users, MapPin, ArrowRight, Sparkles, Shield, Award, Leaf, ChevronRight } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { dispatch } = useBooking();

  // Quick booking bar local state
  const [quickDest, setQuickDest] = useState('kerala');
  const [quickCheckIn, setQuickCheckIn] = useState('2026-10-14');
  const [quickCheckOut, setQuickCheckOut] = useState('2026-10-19');
  const [quickGuests, setQuickGuests] = useState(2);

  const handleQuickBookSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_DESTINATION', payload: quickDest });
    dispatch({ type: 'SET_DATES', payload: { checkIn: quickCheckIn, checkOut: quickCheckOut } });
    dispatch({ type: 'SET_GUESTS', payload: { adults: Number(quickGuests), children: 0 } });
    navigate('/booking');
  };

  const featuredSuites = accommodationsData.filter((s) => s.featured).slice(0, 3);

  return (
    <div className="home-page-container">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <img
          src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2000&q=85"
          alt="AURA Indian Sanctuaries Kerala Backwaters Luxury"
          className="hero-bg-media"
        />
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-badge-pill">
            <Sparkles size={14} color="var(--gold-primary)" />
            <span>Regenerative Indian Biophilic & Heritage Sanctuaries</span>
          </div>

          <h1 className="hero-title">
            Where Timeless Heritage Dissolves Into Nature.
          </h1>

          <p className="hero-subtitle">
            Experience unscripted silence, ancestral Ayurvedic wellness rituals, and heirloom regional Indian gastronomy across secluded South Indian backwaters, rainforests, and Himalayan eco-sanctuaries.
          </p>

          {/* Interactive Quick Booking Bar */}
          <form className="quick-booking-bar" onSubmit={handleQuickBookSubmit}>
            {/* Sanctuary Destination */}
            <div className="booking-field-group">
              <label className="booking-field-label">
                <MapPin size={13} /> Indian Sanctuary Location
              </label>
              <select
                value={quickDest}
                onChange={(e) => setQuickDest(e.target.value)}
                className="booking-field-input"
                aria-label="Sanctuary Destination"
              >
                {destinationsData.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}, {d.state ? d.state : d.country}
                  </option>
                ))}
              </select>
            </div>

            {/* Check-In */}
            <div className="booking-field-group">
              <label className="booking-field-label">
                <Calendar size={13} /> Arrival Date
              </label>
              <input
                type="date"
                value={quickCheckIn}
                onChange={(e) => setQuickCheckIn(e.target.value)}
                className="booking-field-input"
                aria-label="Arrival Date"
              />
            </div>

            {/* Check-Out */}
            <div className="booking-field-group">
              <label className="booking-field-label">
                <Calendar size={13} /> Departure Date
              </label>
              <input
                type="date"
                value={quickCheckOut}
                onChange={(e) => setQuickCheckOut(e.target.value)}
                className="booking-field-input"
                aria-label="Departure Date"
              />
            </div>

            {/* Guests */}
            <div className="booking-field-group">
              <label className="booking-field-label">
                <Users size={13} /> Guests
              </label>
              <select
                value={quickGuests}
                onChange={(e) => setQuickGuests(e.target.value)}
                className="booking-field-input"
                aria-label="Number of guests"
              >
                <option value={1}>1 Sanctuary Guest</option>
                <option value={2}>2 Sanctuary Guests</option>
                <option value={4}>4 Sanctuary Guests</option>
                <option value={6}>6 Sanctuary Guests</option>
              </select>
            </div>

            {/* Submit CTA */}
            <div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '46px', marginTop: '1rem' }}>
                <span>Check Dates</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 2. SUSTAINABILITY METRICS STRIP */}
      <section className="metrics-strip">
        <div className="container">
          <div className="metrics-grid">
            <div>
              <div className="metric-item-num">{sustainabilityMetrics.treesProtected}</div>
              <div className="metric-item-label">Native Western Ghats Trees Protected</div>
            </div>
            <div>
              <div className="metric-item-num">{sustainabilityMetrics.forestCorridorsRestored}</div>
              <div className="metric-item-label">Biodiversity Corridors Restored</div>
            </div>
            <div>
              <div className="metric-item-num">{sustainabilityMetrics.solarEnergyGeneratedMWh} MWh</div>
              <div className="metric-item-label">Clean Microgrid Solar Generated</div>
            </div>
            <div>
              <div className="metric-item-num">{sustainabilityMetrics.plasticFreeCommitment}</div>
              <div className="metric-item-label">Zero Single-Use Plastic Mandate</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SANCTUARY DESTINATIONS SHOWCASE */}
      <section className="section container">
        <div className="section-title-wrap">
          <span className="section-eyebrow">Our Indian Sanctuaries</span>
          <h2>Untouched Frontiers of Serenity</h2>
          <p className="section-subtitle">
            From tranquil Kerala backwaters and Wayanad rainforests to Hampi boulder monoliths, Chettinad heritage palaces, and Himalayan high passes, every sanctuary is built in absolute harmony with its ecosystem.
          </p>
        </div>

        <div className="sanctuaries-showcase-grid">
          {destinationsData.map((dest) => (
            <div key={dest.id} className="sanctuary-preview-card">
              <img
                src={dest.heroImage}
                alt={dest.name}
                className="sanctuary-preview-img"
                loading="lazy"
              />
              <div className="sanctuary-preview-overlay" />
              <div className="sanctuary-preview-content">
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--gold-primary)', fontWeight: 700 }}>
                  {dest.state ? `${dest.state}, ${dest.country}` : dest.country}
                </span>
                <h3 style={{ fontSize: '1.5rem', margin: '0.35rem 0 0.5rem 0', color: '#fff' }}>
                  {dest.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1.25rem', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {dest.tagline}
                </p>
                <Link
                  to={`/accommodations?destination=${dest.id}`}
                  className="btn btn-glass btn-sm"
                >
                  <span>Explore Suites</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED SUITES & VILLAS */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3.5rem' }}>
            <div>
              <span className="section-eyebrow">Signature Living</span>
              <h2>Handcrafted Heritage & Biophilic Sanctuaries</h2>
              <p className="section-subtitle" style={{ maxWidth: '600px', margin: 0 }}>
                Every villa is an individual testament to Indian architectural mastery, passive climate cooling, and uncompromised privacy.
              </p>
            </div>

            <Link to="/accommodations" className="btn btn-outline">
              <span>View All Accommodations</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="suites-grid">
            {featuredSuites.map((suite) => (
              <SuiteCard key={suite.id} suite={suite} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CURATED EXPERIENCES SPOTLIGHT */}
      <section className="section container">
        <div className="section-title-wrap">
          <span className="section-eyebrow">Ayurvedic Wellness & Regional Gastronomy</span>
          <h2>Transformative Curated Experiences</h2>
          <p className="section-subtitle">
            Immerse in lineage Ayurvedic therapies, traditional coracle river safaris, heirloom South Indian banana leaf feasts, and silent spiritual retreats.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {/* Card 1: Wellness */}
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', fontWeight: 700, letterSpacing: '0.1em' }}>01 / AYURVEDA & VITALITY</span>
            <h3 style={{ fontSize: '1.3rem', margin: '0.75rem 0' }}>Sanctuary of the Senses</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
              Authentic Keralite Panchakarma, warm herbal Shirodhara flows, and temple brass uruli flower hydrotherapy.
            </p>
            <Link to="/experiences/wellness" className="btn btn-outline btn-sm">
              <span>Explore Wellness</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Card 2: Culinary */}
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', fontWeight: 700, letterSpacing: '0.1em' }}>02 / ZERO-KM DINING</span>
            <h3 style={{ fontSize: '1.3rem', margin: '0.75rem 0' }}>Epicurean Artistry</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
              18-Course South Indian Sadhya feasts on banana leaf, Chettinad stone-ground spice curries, and royal Mewari banquets.
            </p>
            <Link to="/experiences/dining" className="btn btn-outline btn-sm">
              <span>Explore Dining</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Card 3: Adventures */}
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', fontWeight: 700, letterSpacing: '0.1em' }}>03 / EXPEDITIONS</span>
            <h3 style={{ fontSize: '1.3rem', margin: '0.75rem 0' }}>Low-Impact Nature Safaris</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
              Sunrise Tungabhadra boulder coracle safaris, Wayanad rainforest bio-acoustic tracking, and trans-Himalayan treks.
            </p>
            <Link to="/experiences/adventures" className="btn btn-outline btn-sm">
              <span>Explore Expeditions</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. GUEST TESTIMONIALS */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-eyebrow">Guest Chronicles</span>
            <h2>Words from Our Fellow Voyagers</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {reviewsData.map((rev) => (
              <div key={rev.id} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <RatingStars rating={rev.rating} size={14} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rev.date}</span>
                  </div>
                  <p style={{ fontSize: '0.92rem', fontStyle: 'italic', lineHeight: '1.7', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                    "{rev.comment}"
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', paddingTop: '1rem', borderTop: '1px solid var(--border-glass)' }}>
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--gold-primary)' }}
                  />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', margin: 0 }}>{rev.author}</h4>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-gold)' }}>{rev.stayedAt}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONCIERGE INVITATION CTA */}
      <section className="section container">
        <div
          className="glass-panel"
          style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(16, 22, 34, 0.95) 0%, rgba(26, 38, 56, 0.85) 100%)',
            border: '1px solid var(--border-highlight)',
          }}
        >
          <Compass size={36} color="var(--gold-primary)" style={{ margin: '0 auto 1.5rem auto' }} />
          <h2 style={{ marginBottom: '1rem' }}>Begin Your Indian Reconnection Journey</h2>
          <p style={{ maxWidth: '640px', margin: '0 auto 2rem auto', fontSize: '1.05rem', color: '#cbd5e1' }}>
            Our dedicated Indian voyage curators are available 24/7 to personalize every detail of your sanctuary stay, from chartered airport connections to customized Ayurvedic wellness programs.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/booking" className="btn btn-primary btn-lg">
              <Sparkles size={16} />
              <span>Reserve Sanctuary Stay</span>
            </Link>
            <Link to="/contact" className="btn btn-outline btn-lg">
              <span>Speak to Concierge</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
