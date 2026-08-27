import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { accommodationsData } from '../data/accommodationsData';
import { useCurrency } from '../hooks/useCurrency';
import { useUser } from '../context/UserContext';
import { useToast } from '../context/ToastContext';
import { useBooking } from '../context/BookingContext';
import RatingStars from '../components/common/RatingStars';
import Badge from '../components/common/Badge';
import {
  Heart,
  Users,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  Leaf,
  ArrowLeft,
  Share2,
  ChevronRight
} from 'lucide-react';

export default function AccommodationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const { isInWishlist, toggleWishlist } = useUser();
  const { success, info } = useToast();
  const { dispatch } = useBooking();

  // Find suite
  const suite = useMemo(() => {
    return accommodationsData.find((s) => s.id === id) || accommodationsData[0];
  }, [id]);

  // Gallery state
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  // Local stay calculator state
  const [checkIn, setCheckIn] = useState('2026-10-14');
  const [checkOut, setCheckOut] = useState('2026-10-19');
  const [guestsCount, setGuestsCount] = useState(2);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [checkIn, checkOut]);

  const estimatedTotal = suite.pricePerNight * nights;

  const isFavorited = isInWishlist(suite.id);

  const handleWishlistToggle = () => {
    toggleWishlist(suite.id);
    if (!isFavorited) {
      success(`Added "${suite.title}" to your Saved Wishlist.`);
    } else {
      info(`Removed "${suite.title}" from Saved Wishlist.`);
    }
  };

  const handleProceedToBooking = () => {
    dispatch({ type: 'SELECT_SUITE', payload: suite });
    dispatch({ type: 'SET_DESTINATION', payload: suite.destinationId });
    dispatch({ type: 'SET_DATES', payload: { checkIn, checkOut } });
    dispatch({ type: 'SET_GUESTS', payload: { adults: Number(guestsCount), children: 0 } });
    dispatch({ type: 'SET_STEP', payload: 2 }); // Go to Step 2
    navigate('/booking');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      success('Sanctuary suite link copied to clipboard.');
    }
  };

  return (
    <div className="container suite-detail-layout">
      {/* Back Navigation & Breadcrumb */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <Link to="/accommodations" className="btn btn-outline btn-sm">
          <ArrowLeft size={14} />
          <span>Back to All Accommodations</span>
        </Link>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="icon-btn" onClick={handleShare} aria-label="Share Suite" title="Share Suite">
            <Share2 size={16} />
          </button>
          <button
            className={`icon-btn ${isFavorited ? 'active' : ''}`}
            onClick={handleWishlistToggle}
            aria-label="Save to Wishlist"
            style={{ color: isFavorited ? 'var(--ruby-accent)' : 'inherit' }}
          >
            <Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* Header Info */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <Badge variant="gold">{suite.category}</Badge>
          <span style={{ fontSize: '0.88rem', color: 'var(--gold-primary)', fontWeight: 600 }}>
            {suite.destinationName}
          </span>
          <RatingStars rating={suite.rating} count={suite.reviewsCount} />
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.5rem' }}>{suite.title}</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>{suite.tagline}</p>
      </div>

      {/* Image Gallery Showcase */}
      <div className="detail-gallery-grid">
        <div className="detail-gallery-main">
          <img
            src={suite.images[selectedImgIndex] || suite.images[0]}
            alt={suite.title}
            className="detail-gallery-img"
          />
        </div>
        {suite.images.slice(1, 3).map((imgUrl, idx) => (
          <div key={idx} className="detail-gallery-sub" onClick={() => setSelectedImgIndex(idx + 1)} style={{ cursor: 'pointer' }}>
            <img src={imgUrl} alt={`${suite.title} gallery ${idx + 1}`} className="detail-gallery-img" />
          </div>
        ))}
      </div>

      {/* Main Details & Sticky Booking Card Columns */}
      <div className="suite-detail-columns">
        {/* Left Column: Specs, Description, Amenities, Eco */}
        <div>
          {/* Quick Specs Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '1rem',
              background: 'var(--bg-secondary)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-glass)',
              marginBottom: '2.5rem',
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Capacity</div>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Users size={16} color="var(--gold-primary)" /> {suite.maxGuests} Guests
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Bedrooms</div>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Bed size={16} color="var(--gold-primary)" /> {suite.bedrooms} Bed
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Bathrooms</div>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Bath size={16} color="var(--gold-primary)" /> {suite.bathrooms} Bath
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Area</div>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Maximize2 size={16} color="var(--gold-primary)" /> {suite.sizeSqFt} sq ft
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Architectural Overview</h3>
            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              {suite.description}
            </p>
          </div>

          {/* Amenities Grid */}
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Sanctuary Inclusions & Amenities</h3>
            <div className="detail-amenity-grid">
              {suite.amenities.map((amenity, i) => (
                <div key={i} className="amenity-chip">
                  <CheckCircle size={16} className="amenity-icon" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Regenerative Eco Features */}
          <div className="glass-panel" style={{ padding: '2rem', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <Leaf size={22} color="var(--emerald-primary)" />
              <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Regenerative Charter & Eco Commitment</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Staying in this pavilion directly funds local ecosystem rehabilitation and zero-carbon infrastructure:
            </p>
            <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {suite.ecoFeatures.map((eco, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                  <Sparkles size={14} color="var(--gold-primary)" />
                  <span>{eco}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Sticky Booking & Stay Calculator Card */}
        <div>
          <div className="detail-booking-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)' }}>
              <div>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Sanctuary Rate</span>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
                  {formatPrice(suite.pricePerNight)}
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}> / night</span>
                </div>
              </div>
              <RatingStars rating={suite.rating} size={14} />
            </div>

            {/* Date Pickers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="form-field-group">
                <label className="field-label">Check-In Arrival</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div className="form-field-group">
                <label className="field-label">Check-Out Departure</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div className="form-field-group">
                <label className="field-label">Sanctuary Guests</label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  style={{ width: '100%' }}
                >
                  {[...Array(suite.maxGuests)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} Guest{i > 0 ? 's' : ''} (Max {suite.maxGuests})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Calculation Breakdown */}
            <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>{formatPrice(suite.pricePerNight)} × {nights} Nights</span>
                <strong>{formatPrice(estimatedTotal)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--emerald-primary)', marginBottom: '0.5rem' }}>
                <span>VIP Arrival Transfer</span>
                <span>Included</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-glass)', fontWeight: 700, fontSize: '1rem' }}>
                <span>Estimated Subtotal</span>
                <span style={{ color: 'var(--gold-light)' }}>{formatPrice(estimatedTotal)}</span>
              </div>
            </div>

            <button
              className="btn btn-primary btn-lg"
              onClick={handleProceedToBooking}
              style={{ width: '100%' }}
            >
              <Sparkles size={16} />
              <span>Reserve Suite Stay</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={14} color="var(--emerald-primary)" />
              <span>{suite.cancellationPolicy}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
