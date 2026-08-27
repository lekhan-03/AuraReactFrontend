import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.0 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 154.5 },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.52 },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 86.8 },
};

export function useCurrency() {
  const [currentCurrency, setCurrentCurrency] = useLocalStorage('aura_currency', 'USD');
  const [rates, setRates] = useState(CURRENCIES);
  const [isLiveRates, setIsLiveRates] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchLiveRates() {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
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

  const formatPrice = (usdAmount, showCode = false) => {
    if (typeof usdAmount !== 'number') return '$0';
    const currencyObj = rates[currentCurrency] || CURRENCIES.USD;
    const converted = Math.round(usdAmount * currencyObj.rate);

    // Format with commas
    const formattedNumber = new Intl.NumberFormat('en-US').format(converted);
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
    symbol: (rates[currentCurrency] || CURRENCIES.USD).symbol,
  };
}
