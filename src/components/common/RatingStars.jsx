import React from 'react';
import { Star } from 'lucide-react';

export default function RatingStars({ rating = 5, count, size = 15 }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
      <div style={{ display: 'flex', gap: '2px', color: 'var(--gold-primary)' }}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={size}
            fill={i < fullStars || (i === fullStars && hasHalf) ? 'currentColor' : 'none'}
            strokeWidth={1.5}
            style={{ opacity: i < fullStars || (i === fullStars && hasHalf) ? 1 : 0.35 }}
          />
        ))}
      </div>
      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginLeft: '0.25rem' }}>
        {rating.toFixed(2)}
      </span>
      {count !== undefined && (
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          ({count})
        </span>
      )}
    </div>
  );
}
