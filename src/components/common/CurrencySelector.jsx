import React, { useState, useRef, useEffect } from 'react';
import { useCurrency } from '../../hooks/useCurrency';
import { ChevronDown, Globe } from 'lucide-react';

export default function CurrencySelector() {
  const { currentCurrency, setCurrency, currencies, isLiveRates } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="currency-dropdown" ref={dropdownRef}>
      <button
        className="currency-toggle-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Select currency"
        aria-expanded={isOpen}
      >
        <Globe size={15} color="var(--gold-primary)" />
        <span>{currentCurrency}</span>
        <ChevronDown size={13} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      {isOpen && (
        <div className="currency-menu animate-fade-in">
          <div style={{ padding: '0.4rem 0.6rem', fontSize: '0.72rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-glass)' }}>
            {isLiveRates ? '● Live Global FX Rates' : 'Curated FX Rates'}
          </div>
          {Object.entries(currencies).map(([code, item]) => (
            <button
              key={code}
              className={`currency-option ${currentCurrency === code ? 'selected' : ''}`}
              onClick={() => {
                setCurrency(code);
                setIsOpen(false);
              }}
            >
              <span>{item.symbol} {item.code}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
