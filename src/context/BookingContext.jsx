import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { accommodationsData } from '../data/accommodationsData';

const BookingContext = createContext();

export const AVAILABLE_ADDONS = [
  { id: 'spa-pass', name: 'Private Thermal Onsen & Hydrotherapy Pass', price: 180, perGuest: true },
  { id: 'michelin-dining', name: 'Five-Course Private Chef Wine Pairing Dinner', price: 280, perGuest: true },
  { id: 'vip-transfer', name: 'VIP Electric Luxury Limousine Airport Transfer', price: 150, perGuest: false },
  { id: 'eco-coral', name: 'Reef Restoration & Coral Adoption Contribution', price: 100, perGuest: false },
];

const INITIAL_STATE = {
  step: 1, // 1: Dates & Destination, 2: Suite Selection, 3: Addons & Guest Info, 4: Summary & Confirm
  destination: 'kyoto',
  checkIn: '2026-09-10',
  checkOut: '2026-09-15',
  guests: { adults: 2, children: 0 },
  selectedSuite: accommodationsData[0],
  selectedAddons: ['spa-pass'],
  guestInfo: {
    fullName: '',
    email: '',
    phone: '',
    country: '',
    specialRequests: '',
    flightNumber: '',
    agreeTerms: false,
  },
  promoCode: '',
  discountAmount: 0,
  promoError: '',
  promoSuccess: '',
  confirmedBooking: null,
};

function bookingReducer(state, action) {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload };

    case 'SET_DESTINATION':
      return { ...state, destination: action.payload };

    case 'SET_DATES':
      return {
        ...state,
        checkIn: action.payload.checkIn,
        checkOut: action.payload.checkOut,
      };

    case 'SET_GUESTS':
      return { ...state, guests: action.payload };

    case 'SELECT_SUITE':
      return { ...state, selectedSuite: action.payload };

    case 'TOGGLE_ADDON': {
      const addonId = action.payload;
      const exists = state.selectedAddons.includes(addonId);
      return {
        ...state,
        selectedAddons: exists
          ? state.selectedAddons.filter((id) => id !== addonId)
          : [...state.selectedAddons, addonId],
      };
    }

    case 'SET_GUEST_INFO':
      return {
        ...state,
        guestInfo: { ...state.guestInfo, ...action.payload },
      };

    case 'APPLY_PROMO': {
      const code = action.payload.trim().toUpperCase();
      if (code === 'LUMINA20') {
        return {
          ...state,
          promoCode: code,
          discountAmount: 0.20, // 20%
          promoSuccess: 'Promo LUMINA20 applied: 20% Luxury Discount!',
          promoError: '',
        };
      } else if (code === 'AURAECO') {
        return {
          ...state,
          promoCode: code,
          discountAmount: 0.15, // 15%
          promoSuccess: 'Promo AURAECO applied: 15% Eco Sanctuary Credit!',
          promoError: '',
        };
      } else if (code === 'ZEN') {
        return {
          ...state,
          promoCode: code,
          discountAmount: 250, // Fixed $250 credit
          promoSuccess: 'Promo ZEN applied: $250 Rejuvenation Credit!',
          promoError: '',
        };
      } else {
        return {
          ...state,
          promoError: 'Invalid promo code. Try LUMINA20, AURAECO, or ZEN.',
          promoSuccess: '',
        };
      }
    }

    case 'REMOVE_PROMO':
      return {
        ...state,
        promoCode: '',
        discountAmount: 0,
        promoSuccess: '',
        promoError: '',
      };

    case 'SET_CONFIRMED_BOOKING':
      return {
        ...state,
        confirmedBooking: action.payload,
        step: 4,
      };

    case 'RESET_BOOKING':
      return { ...INITIAL_STATE, selectedSuite: accommodationsData[0] };

    default:
      return state;
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, INITIAL_STATE);

  // Compute stay nights
  const nights = useMemo(() => {
    if (!state.checkIn || !state.checkOut) return 1;
    const start = new Date(state.checkIn);
    const end = new Date(state.checkOut);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [state.checkIn, state.checkOut]);

  // Compute pricing totals
  const priceBreakdown = useMemo(() => {
    const suitePricePerNight = state.selectedSuite ? state.selectedSuite.pricePerNight : 0;
    const roomSubtotal = suitePricePerNight * nights;

    const totalGuests = (state.guests.adults || 1) + (state.guests.children || 0);

    const addonsSubtotal = state.selectedAddons.reduce((acc, addonId) => {
      const addon = AVAILABLE_ADDONS.find((a) => a.id === addonId);
      if (!addon) return acc;
      return acc + (addon.perGuest ? addon.price * totalGuests : addon.price);
    }, 0);

    const rawTotal = roomSubtotal + addonsSubtotal;

    let calculatedDiscount = 0;
    if (state.discountAmount > 0 && state.discountAmount < 1) {
      calculatedDiscount = Math.round(rawTotal * state.discountAmount);
    } else if (state.discountAmount >= 1) {
      calculatedDiscount = Math.min(state.discountAmount, rawTotal);
    }

    const ecoTaxesAndFees = Math.round((rawTotal - calculatedDiscount) * 0.08); // 8% eco tax
    const grandTotal = Math.max(0, rawTotal - calculatedDiscount + ecoTaxesAndFees);

    return {
      nights,
      roomSubtotal,
      addonsSubtotal,
      rawTotal,
      discount: calculatedDiscount,
      ecoTaxesAndFees,
      grandTotal,
    };
  }, [state.selectedSuite, nights, state.guests, state.selectedAddons, state.discountAmount]);

  return (
    <BookingContext.Provider value={{ state, dispatch, nights, priceBreakdown }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
