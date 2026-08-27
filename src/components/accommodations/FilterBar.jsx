import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCurrency } from '../../hooks/useCurrency';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';

const CATEGORIES = ['All', 'Villas & Pavilions', 'Overwater Bungalows', 'Alpine Chalets', 'Biophilic Treehouses'];
const DESTINATIONS = [
  { id: 'all', name: 'All Sanctuaries' },
  { id: 'kyoto', name: 'Kyoto, Japan' },
  { id: 'maldives', name: 'Baa Atoll, Maldives' },
  { id: 'alps', name: 'Zermatt, Switzerland' },
  { id: 'tulum', name: 'Tulum, Mexico' },
  { id: 'amalfi', name: 'Amalfi, Italy' },
];

export default function FilterBar({ totalResults, onReset }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { formatPrice } = useCurrency();

  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || 'All';
  const selectedDestination = searchParams.get('destination') || 'all';
  const selectedSort = searchParams.get('sort') || 'recommended';
  const maxPrice = Number(searchParams.get('maxPrice')) || 2500;

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === 'All' || value === 'all') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  const handleResetFilters = () => {
    setSearchParams({});
    if (onReset) onReset();
  };

  return (
    <div className="filter-bar-wrapper">
      {/* Top Search & Dropdowns */}
      <div className="filter-row-primary">
        {/* Live Search Input */}
        <div style={{ position: 'relative' }}>
          <Search
            size={18}
            color="var(--text-muted)"
            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            placeholder="Search villas by name, location, or feature..."
            value={searchQuery}
            onChange={(e) => updateParam('search', e.target.value)}
            style={{ width: '100%', paddingLeft: '2.8rem' }}
            aria-label="Search suites"
          />
        </div>

        {/* Destination Dropdown */}
        <div>
          <select
            value={selectedDestination}
            onChange={(e) => updateParam('destination', e.target.value)}
            aria-label="Filter by sanctuary destination"
            style={{ width: '100%' }}
          >
            {DESTINATIONS.map((dest) => (
              <option key={dest.id} value={dest.id}>
                {dest.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options Dropdown */}
        <div>
          <select
            value={selectedSort}
            onChange={(e) => updateParam('sort', e.target.value)}
            aria-label="Sort suites"
            style={{ width: '100%' }}
          >
            <option value="recommended">Featured / Recommended</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating_desc">Highest Rated (5.0★)</option>
          </select>
        </div>

        {/* Price Slider */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            <span>Max Price:</span>
            <strong style={{ color: 'var(--gold-light)' }}>{formatPrice(maxPrice)}</strong>
          </div>
          <input
            type="range"
            min="600"
            max="2500"
            step="100"
            value={maxPrice}
            onChange={(e) => updateParam('maxPrice', e.target.value)}
            style={{ accentColor: 'var(--gold-primary)', padding: '0' }}
            aria-label="Maximum price filter"
          />
        </div>
      </div>

      {/* Category Pills & Results Count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="category-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => updateParam('category', cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span>Showing <strong>{totalResults}</strong> sanctuary suites</span>
          {(searchQuery || selectedCategory !== 'All' || selectedDestination !== 'all' || maxPrice < 2500 || selectedSort !== 'recommended') && (
            <button
              onClick={handleResetFilters}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--gold-primary)', fontWeight: 600, fontSize: '0.82rem' }}
            >
              <RotateCcw size={13} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
