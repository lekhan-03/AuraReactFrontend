import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sustainabilityMetrics } from '../data/reviewsData';
import { Leaf, Award, Compass, ShieldCheck, Sparkles, Heart, Sun, ArrowRight } from 'lucide-react';

export default function About() {
  // Interactive Eco-Impact Calculator
  const [stayNights, setStayNights] = useState(7);
  const treesPlanted = stayNights * 5;
  const coralRestoredSqM = (stayNights * 2).toFixed(1);
  const carbonOffsetKg = stayNights * 85;

  return (
    <div className="container" style={{ paddingBottom: '6rem' }}>
      {/* Header */}
      <div className="catalog-header">
        <span className="section-eyebrow">The AURA Philosophy</span>
        <h1>Sanctuary Heritage & Sustainability Charter</h1>
        <p className="section-subtitle" style={{ maxWidth: '720px', margin: '0.8rem auto 0 auto' }}>
          Founded on the conviction that true luxury should leave the Earth richer and more biodiverse than we found it.
        </p>
      </div>

      {/* Hero Visual Banner */}
      <div
        className="glass-panel"
        style={{
          height: '420px',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '4rem',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=80"
          alt="AURA Kyoto Bamboo Sanctuary Architecture"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="hero-overlay" />
        <div style={{ position: 'absolute', bottom: '2.5rem', left: '2.5rem', zIndex: 3, maxWidth: '600px' }}>
          <span style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-primary)', fontWeight: 700 }}>
            BIOPHILIC ARCHITECTURE
          </span>
          <h2 style={{ color: '#fff', fontSize: '2rem', margin: '0.4rem 0' }}>Built in Reverence to Ancient Earth</h2>
          <p style={{ color: '#e2e8f0', fontSize: '0.95rem' }}>
            Zero living trees felled. Zero fossil fuels burned. Powered entirely by on-site microgrid solar and geothermal spring loops.
          </p>
        </div>
      </div>

      {/* Architectural Principles Grid */}
      <div className="section-title-wrap">
        <span className="section-eyebrow">Our Three Tenets</span>
        <h2>The Triad of Regenerative Hospitality</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <Leaf size={32} color="var(--emerald-primary)" style={{ marginBottom: '1.25rem' }} />
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>01. Net-Positive Conservation</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            Rather than simply minimizing impact, our sanctuaries actively regenerate surrounding ecosystems. We fund active coral nurseries in the Maldives, mangrove corridors in Tulum, and bamboo reforestation in Kyoto.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <Sparkles size={32} color="var(--gold-primary)" style={{ marginBottom: '1.25rem' }} />
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>02. Ancestral Wellness</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            We work alongside indigenous elders, Ayurvedic doctors, and Zen masters to preserve centuries of healing wisdom—delivering deep nervous system restoration in peaceful, low-frequency soundscapes.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <Award size={32} color="var(--azure-accent)" style={{ marginBottom: '1.25rem' }} />
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>03. Zero-Kilometer Gastronomy</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            Over 88% of our produce is harvested on sanctuary organic soils or sourced from artisanal bio-fisheries within 5 kilometers, reducing transport emissions to virtually zero.
          </p>
        </div>
      </div>

      {/* Interactive Carbon & Ecology Impact Calculator */}
      <div className="sustainability-calc-card">
        <span className="section-eyebrow">Interactive Guest Eco-Impact Simulator</span>
        <h2 style={{ marginBottom: '0.5rem' }}>Calculate Your Stay’s Conservation Footprint</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto 2rem auto', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
          See the tangible ecosystem benefits generated directly by your sanctuary stay duration:
        </p>

        {/* Stay Duration Slider */}
        <div style={{ maxWidth: '480px', margin: '0 auto 2.5rem auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 600 }}>
            <span>Sanctuary Stay Duration:</span>
            <strong style={{ color: 'var(--gold-light)', fontSize: '1.1rem' }}>{stayNights} Nights</strong>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            value={stayNights}
            onChange={(e) => setStayNights(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--gold-primary)' }}
          />
        </div>

        {/* Calculated Results */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--emerald-primary)', fontFamily: 'var(--font-sans)' }}>
              +{treesPlanted}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Native Trees Planted & Protected</div>
          </div>

          <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--azure-accent)', fontFamily: 'var(--font-sans)' }}>
              {coralRestoredSqM} m²
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Marine Coral Reef Restored</div>
          </div>

          <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--gold-light)', fontFamily: 'var(--font-sans)' }}>
              {carbonOffsetKg} kg
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Net Verified Carbon Offset</div>
          </div>
        </div>
      </div>

      {/* Directors & Master Curators */}
      <div className="section-title-wrap" style={{ marginTop: '5rem' }}>
        <span className="section-eyebrow">Master Directors</span>
        <h2>Guardians of the Sanctuary</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
            alt="Aya Takahashi"
            style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold-primary)', margin: '0 auto 1rem auto' }}
          />
          <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Aya Takahashi</h4>
          <span style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', fontWeight: 600, display: 'block', marginBottom: '0.8rem' }}>
            Lead Biophilic Architect
          </span>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Former Tokyo Institute of Technology Chair; pioneer in passive timber structures and zero-energy thermal ventilation.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
            alt="Chef Kenzo Mori"
            style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold-primary)', margin: '0 auto 1rem auto' }}
          />
          <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Chef Kenzo Mori</h4>
          <span style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', fontWeight: 600, display: 'block', marginBottom: '0.8rem' }}>
            Culinary Arts Director
          </span>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            3-Star Michelin background; champion of ancestral fermentation and seasonal zero-kilometer gastronomy.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
            alt="Dr. Maya Lin-Vance"
            style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold-primary)', margin: '0 auto 1rem auto' }}
          />
          <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Dr. Maya Lin-Vance</h4>
          <span style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', fontWeight: 600, display: 'block', marginBottom: '0.8rem' }}>
            Director of Marine Conservation
          </span>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Chief Marine Biologist leading our UNESCO Baa Atoll coral micro-fragmentation and sea turtle sanctuaries.
          </p>
        </div>
      </div>
    </div>
  );
}
