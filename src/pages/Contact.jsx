import React, { useState, useEffect } from 'react';
import { faqData } from '../data/faqData';
import { destinationsData } from '../data/destinationsData';
import { useToast } from '../context/ToastContext';
import { Send, Phone, Mail, Clock, MessageSquare, ChevronDown, CheckCircle, ShieldCheck } from 'lucide-react';

export default function Contact() {
  const { success, error } = useToast();

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: 'kerala',
    subject: 'Bespoke Sanctuary Stay Inquiry',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ Accordion State
  const [activeFaqId, setActiveFaqId] = useState(1);

  // Destination Live Clocks
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatLocalTime = (tz) => {
    try {
      return new Intl.DateTimeFormat('en-IN', {
        timeZone: tz || 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(currentTime);
    } catch (e) {
      return '12:00 PM';
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Valid email address is required';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Please provide detailed inquiry notes (minimum 10 characters)';
    }

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      error('Please complete all required fields correctly.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      success('Your private voyage inquiry has been dispatched. A dedicated Indian sanctuary curator will reply within 4 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        destination: 'kerala',
        subject: 'Bespoke Sanctuary Stay Inquiry',
        message: '',
      });
    }, 800);
  };

  return (
    <div className="container" style={{ paddingBottom: '6rem' }}>
      {/* Header */}
      <div className="catalog-header">
        <span className="section-eyebrow">24/7 Indian Heritage Private Concierge</span>
        <h1>Connect with Our Sanctuary Curators</h1>
        <p className="section-subtitle" style={{ maxWidth: '680px', margin: '0.8rem auto 0 auto' }}>
          Whether arranging chartered aviation to Kochi or Udaipur, organizing an exclusive palace buyout, or planning a customized Ayurvedic Panchakarma schedule, our curators are at your service.
        </p>
      </div>

      {/* Live Destination Clocks Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-glass)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          marginBottom: '3.5rem',
        }}
      >
        {destinationsData.map((dest) => (
          <div key={dest.id} style={{ textAlign: 'center', padding: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-primary)', fontWeight: 600 }}>
              {dest.name}
            </span>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem', fontFamily: 'var(--font-sans)' }}>
              {formatLocalTime(dest.timezone)} IST
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{dest.state ? dest.state : dest.country}</span>
          </div>
        ))}
      </div>

      {/* Main Grid: Form & Concierge Details */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '3rem', marginBottom: '5rem' }}>
        {/* Contact Form */}
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '1.5rem' }}>Send Private Inquiry</h3>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-grid-2">
              <div className="form-field-group">
                <label className="field-label">Your Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Raghavendra Rao"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {formErrors.name && <span className="field-error-msg">{formErrors.name}</span>}
              </div>

              <div className="form-field-group">
                <label className="field-label">Email Address *</label>
                <input
                  type="email"
                  placeholder="raghavendra@example.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {formErrors.email && <span className="field-error-msg">{formErrors.email}</span>}
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-field-group">
                <label className="field-label">Direct Phone / WhatsApp</label>
                <input
                  type="text"
                  placeholder="+91 98450 12345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-field-group">
                <label className="field-label">Sanctuary Destination</label>
                <select
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                >
                  {destinationsData.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}, {d.state ? d.state : d.country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-field-group">
              <label className="field-label">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="form-field-group">
              <label className="field-label">Inquiry Details *</label>
              <textarea
                rows={4}
                placeholder="Describe your desired stay dates, party size, Ayurvedic preferences, or special celebration arrangements..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              {formErrors.message && <span className="field-error-msg">{formErrors.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting} style={{ alignSelf: 'flex-start' }}>
              <Send size={16} />
              <span>{isSubmitting ? 'Transmitting...' : 'Dispatch Inquiry to Concierge'}</span>
            </button>
          </form>
        </div>

        {/* Concierge Channels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <Phone size={24} color="var(--gold-primary)" style={{ marginBottom: '0.75rem' }} />
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>Indian Sanctuary Direct Line</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>
              For immediate reservations, charter coordinates, and inquiries:
            </p>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--gold-light)' }}>
              1800-AURA-IND (+91 80 4920 2872)
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Toll-Free Across India • 24/7 Concierge</span>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <Mail size={24} color="var(--azure-accent)" style={{ marginBottom: '0.75rem' }} />
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>Email Dispatch</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>
              Direct line to our Principal Curator:
            </p>
            <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              concierge@aurasanctuaries.in
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <ShieldCheck size={24} color="var(--emerald-primary)" style={{ marginBottom: '0.75rem' }} />
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>Privacy & Discretion Pledge</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              All guest communications and custom itinerary requests are handled with absolute confidentiality and privacy.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive FAQ Accordion */}
      <div className="section-title-wrap">
        <span className="section-eyebrow">Frequently Addressed Inquiries</span>
        <h2>Sanctuary Concierge FAQs</h2>
      </div>

      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        {faqData.map((faq) => {
          const isOpen = activeFaqId === faq.id;
          return (
            <div key={faq.id} className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => setActiveFaqId(isOpen ? null : faq.id)}
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={18}
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s ease',
                    color: isOpen ? 'var(--gold-primary)' : 'inherit',
                  }}
                />
              </button>
              {isOpen && (
                <div className="accordion-body animate-fade-in">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
