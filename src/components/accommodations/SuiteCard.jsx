import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useCurrency } from '../../hooks/useCurrency';
import { useToast } from '../../context/ToastContext';
import RatingStars from '../common/RatingStars';
import Badge from '../common/Badge';
import { Heart, Users, Bed, Maximize2, ArrowRight } from 'lucide-react';

export default function SuiteCard({ suite }) {
  const { isInWishlist, toggleWishlist } = useUser();
  const { formatPrice } = useCurrency();
  const { success, info } = useToast();

  const isFavorited = isInWishlist(suite.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(suite.id);
    if (!isFavorited) {
      success(`Added "${suite.title}" to your Saved Sanctuary Wishlist.`);
    } else {
      info(`Removed "${suite.title}" from Saved Wishlist.`);
    }
  };

  return (
    <article className="suite-card">
      {/* Image & Overlay Badges */}
      <div className="suite-card-img-wrap">
        <img
          src={suite.images[0]}
          alt={suite.title}
          className="suite-card-img"
          loading="lazy"
        />
        <button
          className={`suite-card-wishlist-btn ${isFavorited ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart size={18} fill={isFavorited ? 'currentColor' : 'none'} />
        </button>

        {suite.badges && suite.badges[0] && (
          <span className="suite-card-badge">
            {suite.badges[0]}
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="suite-card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <span className="suite-card-location">{suite.destinationName}</span>
          <RatingStars rating={suite.rating} size={13} />
        </div>

        <h3 className="suite-card-title">
          <Link to={`/accommodations/${suite.id}`}>
            {suite.title}
          </Link>
        </h3>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.2rem', lineClamp: 2, WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {suite.tagline}
        </p>

        {/* Specs List */}
        <div className="suite-card-specs">
          <div className="suite-card-spec-item" title="Capacity">
            <Users size={15} color="var(--gold-primary)" />
            <span>Up to {suite.maxGuests} Guests</span>
          </div>
          <div className="suite-card-spec-item" title="Bedrooms">
            <Bed size={15} color="var(--gold-primary)" />
            <span>{suite.bedrooms} Bed</span>
          </div>
          <div className="suite-card-spec-item" title="Size">
            <Maximize2 size={15} color="var(--gold-primary)" />
            <span>{suite.sizeSqFt} sq ft</span>
          </div>
        </div>

        {/* Card Footer */}
        <div className="suite-card-footer">
          <div>
            <span className="suite-price-num">{formatPrice(suite.pricePerNight)}</span>
            <span className="suite-price-period"> / night</span>
          </div>

          <Link to={`/accommodations/${suite.id}`} className="btn btn-outline btn-sm">
            <span>Explore</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
