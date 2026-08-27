import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useBooking, AVAILABLE_ADDONS } from '../context/BookingContext';
import { useUser } from '../context/UserContext';
import { useCurrency } from '../hooks/useCurrency';
import { useToast } from '../context/ToastContext';
import { destinationsData } from '../data/destinationsData';
import { accommodationsData } from '../data/accommodationsData';
import RatingStars from '../components/common/RatingStars';
import Badge from '../components/common/Badge';
import {
  Calendar,
  MapPin,
  Users,
  Sparkles,
  CheckCircle,
  Tag,
  ArrowRight,
  ArrowLeft,
  Download,
  ShieldCheck,
  Plane,
  AlertCircle
} from 'lucide-react';

export default function Booking() {
  const navigate = useNavigate();
  const { state, dispatch, nights, priceBreakdown } = useBooking();
  const { addReservation } = useUser();
  const { formatPrice } = useCurrency();
  const { success, error, warning } = useToast();

  const [promoInput, setPromoInput] = useState('');
  const [formErrors, setFormErrors] = useState({});

  // Input refs for auto-focusing on validation error
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);

  // Filter available suites for chosen destination
  const availableSuites = accommodationsData.filter(
    (s) => s.destinationId === state.destination
  );

  // Validate Step 3 Form
  const validateStep3 = () => {
    const errs = {};
    const info = state.guestInfo;

    if (!info.fullName || info.fullName.trim().length < 3) {
      errs.fullName = 'Please enter your full legal name (minimum 3 characters).';
    }
    if (!info.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) {
      errs.email = 'Please provide a valid email address for confirmation.';
    }
    if (!info.phone || info.phone.trim().length < 7) {
      errs.phone = 'Please provide a valid contact phone number with country code.';
    }
    if (!info.agreeTerms) {
      errs.agreeTerms = 'You must agree to the sanctuary charter and cancellation policy.';
    }

    setFormErrors(errs);

    // Auto-focus first error field with useRef
    if (errs.fullName && nameInputRef.current) {
      nameInputRef.current.focus();
    } else if (errs.email && emailInputRef.current) {
      emailInputRef.current.focus();
    } else if (errs.phone && phoneInputRef.current) {
      phoneInputRef.current.focus();
    }

    return Object.keys(errs).length === 0;
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    dispatch({ type: 'APPLY_PROMO', payload: promoInput });
  };

  const handleNextStep = () => {
    if (state.step === 1) {
      // Validate dates
      if (!state.checkIn || !state.checkOut) {
        warning('Please select both arrival and departure dates.');
        return;
      }
      const start = new Date(state.checkIn);
      const end = new Date(state.checkOut);
      if (end <= start) {
        warning('Departure date must be after arrival date.');
        return;
      }
      dispatch({ type: 'SET_STEP', payload: 2 });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (state.step === 2) {
      if (!state.selectedSuite) {
        warning('Please select a sanctuary suite or pavilion to continue.');
        return;
      }
      dispatch({ type: 'SET_STEP', payload: 3 });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (state.step === 3) {
      if (!validateStep3()) {
        error('Please correct the highlighted form errors before confirming.');
        return;
      }

      // Finalize and trigger reservation!
      const newReservation = addReservation({
        suiteId: state.selectedSuite.id,
        suiteTitle: state.selectedSuite.title,
        destination: state.selectedSuite.destinationName,
        checkIn: state.checkIn,
        checkOut: state.checkOut,
        nights,
        guests: (state.guests.adults || 1) + (state.guests.children || 0),
        totalPrice: priceBreakdown.grandTotal,
        addons: state.selectedAddons.map((id) => AVAILABLE_ADDONS.find((a) => a.id === id)?.name).filter(Boolean),
        image: state.selectedSuite.images[0],
      });

      dispatch({ type: 'SET_CONFIRMED_BOOKING', payload: newReservation });

      // Celebration Confetti!
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#dfb15b', '#f3d790', '#10b981', '#38bdf8'],
        });
      } catch (e) {}

      success('Sanctuary Stay Reserved Successfully! Your VIP Pass is ready.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="container booking-engine-wrapper">
      {/* Header */}
      <div className="catalog-header" style={{ paddingBottom: '1.5rem' }}>
        <span className="section-eyebrow">Bespoke Reservation Engine</span>
        <h1>Reserve Your Sanctuary Stay</h1>
      </div>

      {/* Step Progress Indicator */}
      <div className="booking-step-indicator">
        <div className={`step-bubble ${state.step === 1 ? 'active' : state.step > 1 ? 'completed' : ''}`}>
          <div className="step-num">{state.step > 1 ? '✓' : '1'}</div>
          <span className="step-label">Location & Dates</span>
        </div>

        <div className={`step-bubble ${state.step === 2 ? 'active' : state.step > 2 ? 'completed' : ''}`}>
          <div className="step-num">{state.step > 2 ? '✓' : '2'}</div>
          <span className="step-label">Suite & Addons</span>
        </div>

        <div className={`step-bubble ${state.step === 3 ? 'active' : state.step > 3 ? 'completed' : ''}`}>
          <div className="step-num">{state.step > 3 ? '✓' : '3'}</div>
          <span className="step-label">Guest Details</span>
        </div>

        <div className={`step-bubble ${state.step === 4 ? 'active' : ''}`}>
          <div className="step-num">4</div>
          <span className="step-label">Confirmation</span>
        </div>
      </div>

      {/* STEP 1: DESTINATION & DATES */}
      {state.step === 1 && (
        <div className="glass-panel animate-fade-in" style={{ padding: '2.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>1. Choose Sanctuary Location & Dates</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="form-field-group">
              <label className="field-label">Select Sanctuary Destination</label>
              <select
                value={state.destination}
                onChange={(e) => dispatch({ type: 'SET_DESTINATION', payload: e.target.value })}
                style={{ width: '100%' }}
              >
                {destinationsData.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}, {d.country} — {d.tagline}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-grid-2">
              <div className="form-field-group">
                <label className="field-label">Check-In Arrival Date</label>
                <input
                  type="date"
                  value={state.checkIn}
                  onChange={(e) =>
                    dispatch({
                      type: 'SET_DATES',
                      payload: { checkIn: e.target.value, checkOut: state.checkOut },
                    })
                  }
                  required
                />
              </div>

              <div className="form-field-group">
                <label className="field-label">Check-Out Departure Date</label>
                <input
                  type="date"
                  value={state.checkOut}
                  onChange={(e) =>
                    dispatch({
                      type: 'SET_DATES',
                      payload: { checkIn: state.checkIn, checkOut: e.target.value },
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-field-group">
                <label className="field-label">Adult Guests (Age 13+)</label>
                <select
                  value={state.guests.adults}
                  onChange={(e) =>
                    dispatch({
                      type: 'SET_GUESTS',
                      payload: { ...state.guests, adults: Number(e.target.value) },
                    })
                  }
                >
                  <option value={1}>1 Adult</option>
                  <option value={2}>2 Adults</option>
                  <option value={3}>3 Adults</option>
                  <option value={4}>4 Adults</option>
                  <option value={6}>6 Adults</option>
                </select>
              </div>

              <div className="form-field-group">
                <label className="field-label">Children (Age 0-12)</label>
                <select
                  value={state.guests.children}
                  onChange={(e) =>
                    dispatch({
                      type: 'SET_GUESTS',
                      payload: { ...state.guests, children: Number(e.target.value) },
                    })
                  }
                >
                  <option value={0}>0 Children</option>
                  <option value={1}>1 Child</option>
                  <option value={2}>2 Children</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-primary btn-lg" onClick={handleNextStep}>
              <span>Continue to Suite Selection</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SUITE SELECTION & BESPOKE ADDONS */}
      {state.step === 2 && (
        <div className="glass-panel animate-fade-in" style={{ padding: '2.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>2. Select Suite & Bespoke Add-ons</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Showing available villas and suites in <strong>{destinationsData.find((d) => d.id === state.destination)?.name}</strong> for {nights} Nights:
          </p>

          {/* Suites Radio Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {availableSuites.map((suite) => {
              const isSelected = state.selectedSuite?.id === suite.id;
              return (
                <div
                  key={suite.id}
                  onClick={() => dispatch({ type: 'SELECT_SUITE', payload: suite })}
                  style={{
                    background: isSelected ? 'rgba(223, 177, 91, 0.15)' : 'var(--bg-tertiary)',
                    border: `2px solid ${isSelected ? 'var(--gold-primary)' : 'var(--border-glass)'}`,
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <img
                    src={suite.images[0]}
                    alt={suite.title}
                    style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '1.25rem' }}>
                    <h4 style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>{suite.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>{suite.view}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                        {formatPrice(suite.pricePerNight)} <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>/ night</span>
                      </span>
                      <span style={{ fontSize: '0.78rem', color: isSelected ? 'var(--gold-light)' : 'var(--text-muted)', fontWeight: 600 }}>
                        {isSelected ? '● Selected' : 'Click to Select'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add-ons Section */}
          <h4 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Bespoke Sanctuary Enhancements</h4>
          <div className="addon-selection-grid" style={{ marginBottom: '2.5rem' }}>
            {AVAILABLE_ADDONS.map((addon) => {
              const selected = state.selectedAddons.includes(addon.id);
              return (
                <div
                  key={addon.id}
                  className={`addon-card ${selected ? 'selected' : ''}`}
                  onClick={() => dispatch({ type: 'TOGGLE_ADDON', payload: addon.id })}
                >
                  <div>
                    <h5 style={{ fontSize: '0.92rem', marginBottom: '0.2rem' }}>{addon.name}</h5>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {addon.perGuest ? 'Per guest' : 'Per booking'}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, color: 'var(--gold-light)' }}>
                      +{formatPrice(addon.price)}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: selected ? 'var(--emerald-primary)' : 'var(--text-muted)' }}>
                      {selected ? 'Added ✓' : 'Add +'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-outline" onClick={() => dispatch({ type: 'SET_STEP', payload: 1 })}>
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <button className="btn btn-primary btn-lg" onClick={handleNextStep}>
              <span>Continue to Guest Details</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: GUEST DETAILS & PROMO VERIFICATION */}
      {state.step === 3 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '2.5rem' }} className="animate-fade-in">
          {/* Guest Contact Form */}
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>3. Guest Information & Confirmation</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-field-group">
                <label className="field-label">Full Name & Title *</label>
                <input
                  ref={nameInputRef}
                  type="text"
                  placeholder="e.g. Lady Genevieve Sterling"
                  value={state.guestInfo.fullName}
                  onChange={(e) => dispatch({ type: 'SET_GUEST_INFO', payload: { fullName: e.target.value } })}
                />
                {formErrors.fullName && <span className="field-error-msg">{formErrors.fullName}</span>}
              </div>

              <div className="form-grid-2">
                <div className="form-field-group">
                  <label className="field-label">Email Address *</label>
                  <input
                    ref={emailInputRef}
                    type="email"
                    placeholder="genevieve@voyage.com"
                    value={state.guestInfo.email}
                    onChange={(e) => dispatch({ type: 'SET_GUEST_INFO', payload: { email: e.target.value } })}
                  />
                  {formErrors.email && <span className="field-error-msg">{formErrors.email}</span>}
                </div>

                <div className="form-field-group">
                  <label className="field-label">Phone (WhatsApp) *</label>
                  <input
                    ref={phoneInputRef}
                    type="text"
                    placeholder="+1 (415) 890-2341"
                    value={state.guestInfo.phone}
                    onChange={(e) => dispatch({ type: 'SET_GUEST_INFO', payload: { phone: e.target.value } })}
                  />
                  {formErrors.phone && <span className="field-error-msg">{formErrors.phone}</span>}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-field-group">
                  <label className="field-label">Country of Residence</label>
                  <input
                    type="text"
                    placeholder="United Kingdom"
                    value={state.guestInfo.country}
                    onChange={(e) => dispatch({ type: 'SET_GUEST_INFO', payload: { country: e.target.value } })}
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">Arrival Flight / Seaplane Ref (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. BA 005 / SQ 432"
                    value={state.guestInfo.flightNumber}
                    onChange={(e) => dispatch({ type: 'SET_GUEST_INFO', payload: { flightNumber: e.target.value } })}
                  />
                </div>
              </div>

              <div className="form-field-group">
                <label className="field-label">Special Sanctuary Requests or Wellness Goals</label>
                <textarea
                  rows={3}
                  placeholder="Special dietary wishes, anniversary celebration, pillow preferences..."
                  value={state.guestInfo.specialRequests}
                  onChange={(e) => dispatch({ type: 'SET_GUEST_INFO', payload: { specialRequests: e.target.value } })}
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', cursor: 'pointer', marginTop: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={state.guestInfo.agreeTerms}
                  onChange={(e) => dispatch({ type: 'SET_GUEST_INFO', payload: { agreeTerms: e.target.checked } })}
                  style={{ marginTop: '0.2rem' }}
                />
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  I agree to the AURA Sanctuaries Biophilic Code of Conduct, zero-plastic policy, and flexible 72-hour cancellation charter. *
                </span>
              </label>
              {formErrors.agreeTerms && <span className="field-error-msg">{formErrors.agreeTerms}</span>}
            </div>

            {/* Back / Submit Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
              <button className="btn btn-outline" onClick={() => dispatch({ type: 'SET_STEP', payload: 2 })}>
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <button className="btn btn-primary btn-lg" onClick={handleNextStep}>
                <Sparkles size={16} />
                <span>Authorize & Confirm Reservation</span>
              </button>
            </div>
          </div>

          {/* Pricing & Promo Code Summary Card */}
          <div>
            <div className="detail-booking-card" style={{ position: 'static' }}>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.75rem' }}>
                Reservation Summary
              </h4>

              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{state.selectedSuite?.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-gold)', marginTop: '0.2rem' }}>
                  {state.selectedSuite?.destinationName}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  {state.checkIn} → {state.checkOut} ({nights} Nights)
                </div>
              </div>

              {/* Price Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Suite Total ({nights} nights)</span>
                  <span>{formatPrice(priceBreakdown.roomSubtotal)}</span>
                </div>
                {priceBreakdown.addonsSubtotal > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Selected Add-ons</span>
                    <span>+{formatPrice(priceBreakdown.addonsSubtotal)}</span>
                  </div>
                )}
                {priceBreakdown.discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--emerald-primary)', fontWeight: 600 }}>
                    <span>Promo Discount ({state.promoCode})</span>
                    <span>-{formatPrice(priceBreakdown.discount)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Regenerative Eco-Tax & Clean Energy Fee (8%)</span>
                  <span>{formatPrice(priceBreakdown.ecoTaxesAndFees)}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>Total Due</span>
                <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--gold-light)' }}>
                  {formatPrice(priceBreakdown.grandTotal)}
                </span>
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <input
                  type="text"
                  placeholder="Promo Code (LUMINA20)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  style={{ flex: 1, textTransform: 'uppercase', fontSize: '0.82rem' }}
                />
                <button type="submit" className="btn btn-outline btn-sm">
                  Apply
                </button>
              </form>

              {state.promoSuccess && (
                <div style={{ fontSize: '0.8rem', color: 'var(--emerald-primary)', marginBottom: '0.5rem' }}>
                  ✓ {state.promoSuccess}
                </div>
              )}
              {state.promoError && (
                <div style={{ fontSize: '0.8rem', color: 'var(--ruby-accent)', marginBottom: '0.5rem' }}>
                  ✗ {state.promoError}
                </div>
              )}

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem', textAlign: 'center' }}>
                ⚡ Guaranteed Best Sanctuary Rate • Instant Loyalty Credit
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: INSTANT CONFIRMATION & VOUCHER PASS */}
      {state.step === 4 && state.confirmedBooking && (
        <div className="animate-fade-in" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.2)',
              border: '2px solid var(--emerald-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
            }}
          >
            <CheckCircle size={36} color="var(--emerald-primary)" />
          </div>

          <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Reservation Confirmed</h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
            We look forward to welcoming you to <strong>{state.confirmedBooking.suiteTitle}</strong>. Your official digital boarding pass is generated below:
          </p>

          {/* Voucher Pass Card */}
          <div className="voucher-pass-card" style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-primary)', fontWeight: 700 }}>
                  AURA SANCTUARY VOUCHER
                </span>
                <h3 style={{ fontSize: '1.3rem', margin: '0.2rem 0' }}>{state.confirmedBooking.suiteTitle}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{state.confirmedBooking.destination}</span>
              </div>
              <Badge variant="emerald">CONFIRMED</Badge>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Booking Reference:</span>
                <strong style={{ display: 'block', color: 'var(--gold-light)', fontSize: '1.05rem' }}>{state.confirmedBooking.id}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Lead Guest:</span>
                <strong style={{ display: 'block' }}>{state.guestInfo.fullName || 'Valued Guest'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Arrival Check-in:</span>
                <strong style={{ display: 'block' }}>{state.confirmedBooking.checkIn}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Departure Check-out:</span>
                <strong style={{ display: 'block' }}>{state.confirmedBooking.checkOut} ({state.confirmedBooking.nights} Nights)</strong>
              </div>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Amount Authorized:</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gold-primary)' }}>
                  {formatPrice(state.confirmedBooking.totalPrice)}
                </div>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                QR Security Token: {state.confirmedBooking.qrCodeMock}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/dashboard/reservations" className="btn btn-primary">
              <span>View in Guest Portal</span>
              <ArrowRight size={16} />
            </Link>
            <button
              className="btn btn-outline"
              onClick={() => {
                dispatch({ type: 'RESET_BOOKING' });
                navigate('/');
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
