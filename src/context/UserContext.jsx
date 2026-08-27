import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const UserContext = createContext();

const INITIAL_PROFILE = {
  name: 'Aditi & Raghavendra Rao',
  email: 'aditi.rao@heritage-voyages.in',
  phone: '+91 98450 89234',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  country: 'India',
  preferredCurrency: 'INR',
  dietaryPreferences: ['Sattvic Gourmet', 'South Indian Vegetarian', 'Gluten-Conscious'],
  wellnessInterests: ['Panchakarma Ayurveda', 'Temple Sound Meditation', 'Western Ghats Forest Bathing'],
  memberSince: '2023',
};

const INITIAL_RESERVATIONS = [
  {
    id: 'AURA-IND-2026-8941',
    suiteId: 'kerala-vembanad-kettuvallam',
    suiteTitle: 'The Vembanad Royal Kettuvallam Pavilion',
    destination: 'Kumarakom & Alleppey Backwaters, Kerala',
    checkIn: '2026-10-14',
    checkOut: '2026-10-19',
    nights: 5,
    guests: 2,
    totalPrice: 210000,
    status: 'Confirmed',
    bookedAt: '2026-08-20',
    qrCodeMock: 'AURA-KERALA-8941-CONFIRMED',
    addons: ['18-Course Grand South Indian Sadhya', 'Authentic Keralite Abhyanga & Shirodhara'],
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80'
  }
];

export function UserProvider({ children }) {
  const [profile, setProfile] = useLocalStorage('aura_user_profile', INITIAL_PROFILE);
  const [wishlist, setWishlist] = useLocalStorage('aura_wishlist', ['wayanad-canopy-treehouse', 'hampi-boulder-villa']);
  const [reservations, setReservations] = useLocalStorage('aura_reservations', INITIAL_RESERVATIONS);
  const [loyaltyPoints, setLoyaltyPoints] = useLocalStorage('aura_loyalty_points', 42000);

  const toggleWishlist = (suiteId) => {
    setWishlist((prev) =>
      prev.includes(suiteId)
        ? prev.filter((id) => id !== suiteId)
        : [...prev, suiteId]
    );
  };

  const isInWishlist = (suiteId) => wishlist.includes(suiteId);

  const addReservation = (reservation) => {
    const newReservation = {
      ...reservation,
      id: `AURA-IND-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Confirmed',
      bookedAt: new Date().toISOString().split('T')[0],
      qrCodeMock: `AURA-IND-VOUCHER-${Date.now()}`
    };

    setReservations((prev) => [newReservation, ...prev]);
    // Earn 1 loyalty point per ₹10 spent (or 0.1x)
    const earnedPoints = Math.floor(reservation.totalPrice * 0.1);
    setLoyaltyPoints((prev) => prev + earnedPoints);

    return newReservation;
  };

  const cancelReservation = (reservationId) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === reservationId ? { ...res, status: 'Cancelled' } : res
      )
    );
  };

  const updateProfile = (updatedFields) => {
    setProfile((prev) => ({ ...prev, ...updatedFields }));
  };

  // Loyalty Tier calculation
  const loyaltyTier = useMemo(() => {
    if (loyaltyPoints >= 50000) return { name: 'Sovereign Obsidian', discountPct: 15, perk: 'Complimentary Heritage Suite Upgrade & Private Electric Transfer' };
    if (loyaltyPoints >= 25000) return { name: 'Aura Luminary', discountPct: 10, perk: 'Unlimited Vaidya Ayurvedic Hydrotherapy & Private Spice Cellar Tasting' };
    return { name: 'Sanctuary Member', discountPct: 5, perk: 'Welcome Tender Coconut Elixir & Late 4 PM Check-out' };
  }, [loyaltyPoints]);

  return (
    <UserContext.Provider
      value={{
        profile,
        updateProfile,
        wishlist,
        toggleWishlist,
        isInWishlist,
        reservations,
        addReservation,
        cancelReservation,
        loyaltyPoints,
        loyaltyTier,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
