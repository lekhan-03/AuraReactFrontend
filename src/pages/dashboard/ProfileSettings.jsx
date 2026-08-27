import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useToast } from '../../context/ToastContext';
import { Save, User, Mail, Phone, Globe, Check } from 'lucide-react';

const DIETARY_OPTIONS = [
  'Sattvic Pure Vegetarian',
  'South Indian Vegetarian Gourmet',
  'Gluten-Conscious',
  'Jain Prepared (No Root Veg)',
  'Fresh Coastal Catch Only',
  'Plant-Based Organic Vegan'
];

export default function ProfileSettings() {
  const { profile, updateProfile } = useUser();
  const { success, error } = useToast();

  const [formData, setFormData] = useState({
    name: profile.name || '',
    email: profile.email || '',
    phone: profile.phone || '',
    country: profile.country || 'India',
    preferredCurrency: profile.preferredCurrency || 'INR',
    dietaryPreferences: profile.dietaryPreferences || [],
  });

  const [formErrors, setFormErrors] = useState({});

  const handleDietaryToggle = (item) => {
    setFormData((prev) => {
      const exists = prev.dietaryPreferences.includes(item);
      return {
        ...prev,
        dietaryPreferences: exists
          ? prev.dietaryPreferences.filter((i) => i !== item)
          : [...prev.dietaryPreferences, item]
      };
    });
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Invalid email address format';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      error('Please correct highlighted profile errors.');
      return;
    }

    updateProfile(formData);
    success('Your Indian sanctuary guest profile & Ayurvedic preferences have been updated.');
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>Profile & Sanctuary Preferences</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Update your contact credentials and dietary requirements for our culinary and Ayurvedic wellness teams.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <div className="form-grid-2">
          {/* Full Name */}
          <div className="form-field-group">
            <label className="field-label">Full Name & Title</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Dr. Raghavendra Rao"
            />
            {formErrors.name && <span className="field-error-msg">{formErrors.name}</span>}
          </div>

          {/* Email */}
          <div className="form-field-group">
            <label className="field-label">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. raghavendra@example.in"
            />
            {formErrors.email && <span className="field-error-msg">{formErrors.email}</span>}
          </div>

          {/* Phone */}
          <div className="form-field-group">
            <label className="field-label">Phone / WhatsApp (with country code)</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98450 89234"
            />
            {formErrors.phone && <span className="field-error-msg">{formErrors.phone}</span>}
          </div>

          {/* Country */}
          <div className="form-field-group">
            <label className="field-label">Country of Residence</label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              placeholder="India"
            />
          </div>
        </div>

        {/* Dietary Preferences Checkboxes */}
        <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Culinary & Ayurvedic Dietary Needs</h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Our master chefs and Vaidyas will prepare your personalized menus around these selections:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {DIETARY_OPTIONS.map((opt) => {
              const selected = formData.dietaryPreferences.includes(opt);
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => handleDietaryToggle(opt)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    background: selected ? 'rgba(223, 177, 91, 0.2)' : 'var(--bg-secondary)',
                    border: `1px solid ${selected ? 'var(--gold-primary)' : 'var(--border-glass)'}`,
                    color: selected ? 'var(--gold-light)' : 'var(--text-secondary)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '4px',
                      border: '1px solid var(--gold-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: selected ? 'var(--gold-primary)' : 'transparent',
                    }}
                  >
                    {selected && <Check size={12} color="#070a0e" strokeWidth={3} />}
                  </div>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
          <Save size={16} />
          <span>Save Sanctuary Preferences</span>
        </button>
      </form>
    </div>
  );
}
