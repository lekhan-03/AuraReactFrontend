import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const CURRENCIES = {
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 1.0 },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.0115 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.0108 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.0093 },
  AED: { code: 'AED', symbol: 'AED', name: 'UAE Dirham', rate: 0.042 },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 0.0176 },
};

export function useCurrency() {
  const [currentCurrency, setCurrentCurrency] = useLocalStorage('aura_currency', 'INR');
  const [rates, setRates] = useState(CURRENCIES);
  const [isLiveRates, setIsLiveRates] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchLiveRates() {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/INR');
        if (!res.ok) throw new Error('Failed to fetch currency rates');
        const data = await res.json();
        if (data && data.rates && isMounted) {
          setRates((prev) => {
            const updated = { ...prev };
            Object.keys(updated).forEach((key) => {
              if (data.rates[key]) {
                updated[key] = { ...updated[key], rate: data.rates[key] };
              }
            });
            return updated;
          });
          setIsLiveRates(true);
        }
      } catch (err) {
        console.info('Using curated baseline currency rates:', err.message);
      }
    }

    fetchLiveRates();
    return () => {
      isMounted = false;
    };
  }, []);

  const formatPrice = (inrAmount, showCode = false) => {
    if (typeof inrAmount !== 'number') return '₹0';
    const currencyObj = rates[currentCurrency] || CURRENCIES.INR;
    const converted = Math.round(inrAmount * currencyObj.rate);

    // Format with Indian numbering for INR (e.g. ₹42,000)
    const locale = currentCurrency === 'INR' ? 'en-IN' : 'en-US';
    const formattedNumber = new Intl.NumberFormat(locale).format(converted);
    if (showCode) {
      return `${currencyObj.symbol}${formattedNumber} ${currencyObj.code}`;
    }
    return `${currencyObj.symbol}${formattedNumber}`;
  };

  return {
    currentCurrency,
    setCurrency: setCurrentCurrency,
    currencies: rates,
    formatPrice,
    isLiveRates,
    symbol: (rates[currentCurrency] || CURRENCIES.INR).symbol,
  };
}
