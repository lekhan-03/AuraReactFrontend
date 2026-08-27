import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Sparkles, Flower2, Utensils, Compass, MoonStar } from 'lucide-react';

export default function Experiences() {
  return (
    <div className="container" style={{ paddingBottom: '6rem' }}>
      {/* Header */}
      <div className="catalog-header" style={{ paddingBottom: '1rem' }}>
        <span className="section-eyebrow">Signature Curations & Expeditions</span>
        <h1>Curated Experiences</h1>
        <p className="section-subtitle" style={{ maxWidth: '680px', margin: '0.8rem auto 0 auto' }}>
          Explore our four distinct disciplines of regenerative wellness, Michelin culinary arts, low-impact nature safaris, and transformative silent retreats.
        </p>
      </div>

      {/* Nested Route Navigation Tabs */}
      <nav className="experiences-tabs-nav" aria-label="Experience Categories">
        <NavLink
          to="/experiences/wellness"
          className={({ isActive }) => `experience-tab-link ${isActive ? 'active' : ''}`}
        >
          <Flower2 size={16} />
          <span>Holistic Wellness & Spa</span>
        </NavLink>

        <NavLink
          to="/experiences/dining"
          className={({ isActive }) => `experience-tab-link ${isActive ? 'active' : ''}`}
        >
          <Utensils size={16} />
          <span>Culinary Arts & Cellars</span>
        </NavLink>

        <NavLink
          to="/experiences/adventures"
          className={({ isActive }) => `experience-tab-link ${isActive ? 'active' : ''}`}
        >
          <Compass size={16} />
          <span>Eco Adventures & Safaris</span>
        </NavLink>

        <NavLink
          to="/experiences/retreats"
          className={({ isActive }) => `experience-tab-link ${isActive ? 'active' : ''}`}
        >
          <MoonStar size={16} />
          <span>Bespoke Private Retreats</span>
        </NavLink>
      </nav>

      {/* RENDER NESTED ROUTE CONTENT VIA OUTLET */}
      <div className="animate-fade-in">
        <Outlet />
      </div>
    </div>
  );
}
