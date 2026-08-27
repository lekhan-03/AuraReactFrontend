import React from 'react';
import { useUser } from '../../context/UserContext';
import { useToast } from '../../context/ToastContext';
import { Award, Sparkles, Gift, ShieldCheck, Check } from 'lucide-react';

export default function LoyaltyRewards() {
  const { loyaltyPoints, loyaltyTier } = useUser();
  const { success } = useToast();

  const nextTierPoints = 50000;
  const progressPct = Math.min(100, Math.round((loyaltyPoints / nextTierPoints) * 100));

  const handleRedeemPerk = (perkName, cost) => {
    if (loyaltyPoints < cost) {
      return;
    }
    success(`Successfully redeemed "${perkName}"! Your digital concierge voucher has been issued.`);
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>Aura Elite Membership & Loyalty</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Every night booked generates 10 loyalty points per $ spent, unlocking private privileges and bespoke credits.
        </p>
      </div>

      {/* Tier Card */}
      <div
        className="glass-panel"
        style={{
          padding: '2.5rem',
          background: 'linear-gradient(135deg, rgba(223, 177, 91, 0.15) 0%, rgba(16, 22, 34, 0.8) 100%)',
          border: '1px solid var(--border-highlight)',
          marginBottom: '2.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--gold-primary)', fontWeight: 700 }}>
              Current Status Tier
            </span>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--gold-light)', margin: '0.3rem 0' }}>{loyaltyTier.name}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Exclusive privilege: <strong>{loyaltyTier.perk}</strong>
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Available Balance</span>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
              {loyaltyPoints.toLocaleString()}
              <span style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--gold-primary)' }}> PTS</span>
            </div>
          </div>
        </div>

        {/* Progress Bar to Sovereign Obsidian */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
            <span>Progress to Sovereign Obsidian Tier</span>
            <span>{loyaltyPoints.toLocaleString()} / {nextTierPoints.toLocaleString()} PTS ({progressPct}%)</span>
          </div>
          <div style={{ height: '8px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progressPct}%`, background: 'linear-gradient(90deg, var(--gold-primary), var(--gold-light))', transition: 'width 0.8s ease' }} />
          </div>
        </div>
      </div>

      {/* Redeemable Perks Grid */}
      <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Instant Point Redemption Privileges</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
          <Gift size={20} color="var(--gold-primary)" style={{ marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>Complimentary Onsen Spa Pass</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            90-Minute private geothermal mineral bath & herbal tea service.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ fontSize: '0.9rem', color: 'var(--gold-light)' }}>12,000 PTS</strong>
            <button
              className="btn btn-outline btn-sm"
              disabled={loyaltyPoints < 12000}
              onClick={() => handleRedeemPerk('Complimentary Onsen Spa Pass', 12000)}
            >
              Redeem
            </button>
          </div>
        </div>

        <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
          <Sparkles size={20} color="var(--gold-primary)" style={{ marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>Grand Cru Cellar Tasting</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Private sommelier tasting with 4 biodynamic vintage pairings.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ fontSize: '0.9rem', color: 'var(--gold-light)' }}>18,000 PTS</strong>
            <button
              className="btn btn-outline btn-sm"
              disabled={loyaltyPoints < 18000}
              onClick={() => handleRedeemPerk('Grand Cru Cellar Tasting', 18000)}
            >
              Redeem
            </button>
          </div>
        </div>

        <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
          <ShieldCheck size={20} color="var(--gold-primary)" style={{ marginBottom: '0.5rem' }} />
          <h4 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>Private Electric Limousine Escort</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Airport airside VIP escort & private transfer to resort sanctuary.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ fontSize: '0.9rem', color: 'var(--gold-light)' }}>25,000 PTS</strong>
            <button
              className="btn btn-outline btn-sm"
              disabled={loyaltyPoints < 25000}
              onClick={() => handleRedeemPerk('Private Electric Limousine Escort', 25000)}
            >
              Redeem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
