import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Calendar, Heart, Award, Settings, ShieldCheck, User } from 'lucide-react';

export default function Dashboard() {
  const { profile, loyaltyTier, loyaltyPoints, reservations, wishlist } = useUser();

  return (
    <div className="container" style={{ paddingBottom: '6rem' }}>
      <div className="catalog-header" style={{ paddingBottom: '1rem' }}>
        <span className="section-eyebrow">AURA Private Membership</span>
        <h1>Guest Sanctuary Portal</h1>
      </div>

      <div className="dashboard-layout">
        {/* Sidebar Nav */}
        <aside className="dashboard-sidebar">
          {/* User Profile Card */}
          <div className="dashboard-user-card">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="dashboard-user-avatar"
            />
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.2rem' }}>{profile.name}</h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              {profile.country} • Member since {profile.memberSince}
            </div>

            {/* Loyalty Tier Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'rgba(223, 177, 91, 0.15)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '0.3rem 0.8rem',
                fontSize: '0.78rem',
                color: 'var(--gold-light)',
                fontWeight: 700,
              }}
            >
              <Award size={13} color="var(--gold-primary)" />
              <span>{loyaltyTier.name}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="dashboard-nav-links" aria-label="Guest Portal Navigation">
            <NavLink
              to="/dashboard/reservations"
              className={({ isActive }) => `dashboard-nav-item ${isActive ? 'active' : ''}`}
            >
              <Calendar size={17} />
              <span>My Reservations ({reservations.length})</span>
            </NavLink>

            <NavLink
              to="/dashboard/wishlist"
              className={({ isActive }) => `dashboard-nav-item ${isActive ? 'active' : ''}`}
            >
              <Heart size={17} />
              <span>Saved Wishlist ({wishlist.length})</span>
            </NavLink>

            <NavLink
              to="/dashboard/loyalty"
              className={({ isActive }) => `dashboard-nav-item ${isActive ? 'active' : ''}`}
            >
              <Award size={17} />
              <span>Elite Rewards ({loyaltyPoints.toLocaleString()} pts)</span>
            </NavLink>

            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) => `dashboard-nav-item ${isActive ? 'active' : ''}`}
            >
              <Settings size={17} />
              <span>Profile & Preferences</span>
            </NavLink>
          </nav>
        </aside>

        {/* Dynamic Nested Content via OUTLET */}
        <main className="dashboard-content-card animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
