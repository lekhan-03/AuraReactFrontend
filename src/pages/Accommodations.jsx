import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { accommodationsData } from '../data/accommodationsData';
import SuiteCard from '../components/accommodations/SuiteCard';
import FilterBar from '../components/accommodations/FilterBar';
import { useDebounce } from '../hooks/useDebounce';
import { Sparkles, Building2, SearchX } from 'lucide-react';

export default function Accommodations() {
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || 'All';
  const selectedDestination = searchParams.get('destination') || 'all';
  const selectedSort = searchParams.get('sort') || 'recommended';
  const maxPrice = Number(searchParams.get('maxPrice')) || 100000;

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Filter & Sort Logic
  const filteredSuites = useMemo(() => {
    return accommodationsData
      .filter((suite) => {
        // 1. Text search match
        if (debouncedSearch) {
          const q = debouncedSearch.toLowerCase();
          const matchTitle = suite.title.toLowerCase().includes(q);
          const matchDesc = suite.description.toLowerCase().includes(q);
          const matchDest = suite.destinationName.toLowerCase().includes(q);
          const matchAmenity = suite.amenities.some((a) => a.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchDest && !matchAmenity) return false;
        }

        // 2. Category match
        if (selectedCategory !== 'All' && suite.category !== selectedCategory) {
          return false;
        }

        // 3. Destination match
        if (selectedDestination !== 'all' && suite.destinationId !== selectedDestination) {
          return false;
        }

        // 4. Max Price match
        if (suite.pricePerNight > maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (selectedSort === 'price_asc') return a.pricePerNight - b.pricePerNight;
        if (selectedSort === 'price_desc') return b.pricePerNight - a.pricePerNight;
        if (selectedSort === 'rating_desc') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); // Default recommended
      });
  }, [debouncedSearch, selectedCategory, selectedDestination, selectedSort, maxPrice]);

  return (
    <div className="container" style={{ paddingBottom: '6rem' }}>
      {/* Header */}
      <div className="catalog-header">
        <span className="section-eyebrow">The Architecture Collection</span>
        <h1>Sanctuary Accommodations</h1>
        <p className="section-subtitle" style={{ maxWidth: '680px', margin: '0.8rem auto 0 auto' }}>
          Explore our handcrafted floating pavilions, rainforest treehouses, boulder villas, and heritage palaces designed with regenerative biophilic and vernacular principles.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <FilterBar totalResults={filteredSuites.length} />

      {/* Suites Grid */}
      {filteredSuites.length > 0 ? (
        <div className="suites-grid animate-fade-in">
          {filteredSuites.map((suite) => (
            <SuiteCard key={suite.id} suite={suite} />
          ))}
        </div>
      ) : (
        <div className="empty-catalog-state animate-fade-in">
          <SearchX size={48} color="var(--gold-primary)" style={{ margin: '0 auto 1rem auto' }} />
          <h3>No Sanctuary Accommodations Match Your Filter</h3>
          <p style={{ maxWidth: '460px', margin: '0.5rem auto 1.5rem auto', fontSize: '0.92rem' }}>
            Try broadening your tariff range, clearing search terms, or exploring other Indian sanctuary destinations.
          </p>
        </div>
      )}
    </div>
  );
}
