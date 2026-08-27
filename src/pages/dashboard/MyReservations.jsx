import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useCurrency } from '../../hooks/useCurrency';
import { useToast } from '../../context/ToastContext';
import Modal from '../../components/common/Modal';
import Badge from '../../components/common/Badge';
import { Calendar, MapPin, Users, Sparkles, QrCode, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function MyReservations() {
  const { reservations, cancelReservation } = useUser();
  const { formatPrice } = useCurrency();
  const { success, warning } = useToast();

  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  const handleCancelConfirm = () => {
    if (cancellingId) {
      cancelReservation(cancellingId);
      warning(`Reservation ${cancellingId} has been successfully cancelled.`);
      setCancellingId(null);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>Sanctuary Stays & Reservations</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Manage upcoming retreats, access VIP check-in passes, and view past voyages.
          </p>
        </div>

        <Link to="/accommodations" className="btn btn-primary btn-sm">
          <span>Book Another Stay</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {reservations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
          <Calendar size={40} color="var(--gold-primary)" style={{ margin: '0 auto 1rem auto' }} />
          <h3>No Active Reservations</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0.5rem auto 1.5rem auto', maxWidth: '400px' }}>
            Your upcoming sanctuary voyages will appear here. Choose your next restorative retreat today.
          </p>
          <Link to="/accommodations" className="btn btn-primary">
            Explore Sanctuaries
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {reservations.map((res) => (
            <div
              key={res.id}
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                display: 'grid',
                gridTemplateColumns: '120px 1fr auto',
                gap: '1.5rem',
                alignItems: 'center',
              }}
            >
              {/* Thumbnail */}
              <img
                src={res.image || 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80'}
                alt={res.suiteTitle}
                style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
              />

              {/* Info */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--gold-primary)' }}>
                    {res.id}
                  </span>
                  <Badge variant={res.status === 'Confirmed' ? 'emerald' : 'dark'} size="sm">
                    {res.status}
                  </Badge>
                </div>

                <h4 style={{ fontSize: '1.15rem', marginBottom: '0.3rem' }}>{res.suiteTitle}</h4>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={13} color="var(--gold-primary)" /> {res.destination}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={13} color="var(--gold-primary)" /> {res.checkIn} → {res.checkOut} ({res.nights} Nights)
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Users size={13} color="var(--gold-primary)" /> {res.guests} Guests
                  </span>
                </div>
              </div>

              {/* Price & Actions */}
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.6rem' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {formatPrice(res.totalPrice)}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => setSelectedVoucher(res)}
                  >
                    <QrCode size={13} />
                    <span>Pass</span>
                  </button>

                  {res.status === 'Confirmed' && (
                    <button
                      className="btn btn-sm"
                      style={{ color: 'var(--ruby-accent)', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.2)' }}
                      onClick={() => setCancellingId(res.id)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Voucher Modal */}
      <Modal isOpen={!!selectedVoucher} onClose={() => setSelectedVoucher(null)} title="Sanctuary VIP Boarding Pass">
        {selectedVoucher && (
          <div className="voucher-pass-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-primary)', fontWeight: 700 }}>
              AURA SANCTUARIES • OFFICIAL GUEST PASS
            </div>
            <h3 style={{ fontSize: '1.4rem', margin: '0.5rem 0' }}>{selectedVoucher.suiteTitle}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              {selectedVoucher.destination}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', textAlign: 'left', background: 'rgba(0, 0, 0, 0.4)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Reservation Ref:</span>
                <strong style={{ display: 'block', color: 'var(--gold-light)' }}>{selectedVoucher.id}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                <strong style={{ display: 'block', color: 'var(--emerald-primary)' }}>{selectedVoucher.status}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Check-In Arrival:</span>
                <strong style={{ display: 'block' }}>{selectedVoucher.checkIn} (15:00)</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Check-Out Departure:</span>
                <strong style={{ display: 'block' }}>{selectedVoucher.checkOut} (12:00)</strong>
              </div>
            </div>

            <div style={{ background: '#fff', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'inline-block', margin: '0 auto 1rem auto' }}>
              {/* Mock QR Code Pattern */}
              <div style={{ width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff', fontSize: '0.7rem', textAlign: 'center', padding: '0.5rem' }}>
                [QR VIP ARRIVAL: {selectedVoucher.id}]
              </div>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Present this digital pass upon arrival for priority electric helicopter/yacht escort.
            </p>
          </div>
        )}
      </Modal>

      {/* Cancel Confirmation Modal */}
      <Modal isOpen={!!cancellingId} onClose={() => setCancellingId(null)} title="Cancel Sanctuary Reservation">
        <p style={{ fontSize: '0.92rem', lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Are you sure you wish to cancel reservation <strong>{cancellingId}</strong>? In accordance with our flexible policy, a 100% credit will be refunded to your original payment method.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button className="btn btn-outline" onClick={() => setCancellingId(null)}>
            Keep Reservation
          </button>
          <button className="btn" style={{ background: 'var(--ruby-accent)', color: '#fff' }} onClick={handleCancelConfirm}>
            Yes, Cancel Reservation
          </button>
        </div>
      </Modal>
    </div>
  );
}
