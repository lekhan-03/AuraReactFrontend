import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const UserContext = createContext();

const INITIAL_PROFILE = {
  name: 'Lady Genevieve Sterling',
  email: 'genevieve.sterling@voyage-elite.com',
  phone: '+1 (415) 890-2341',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  country: 'United Kingdom',
  preferredCurrency: 'USD',
  dietaryPreferences: ['Plant-Based Gourmet', 'Gluten-Conscious'],
  wellnessInterests: ['Thermal Hydrotherapy', 'Singing Bowls', 'Forest Bathing'],
  memberSince: '2023',
};

const INITIAL_RESERVATIONS = [
  {
    id: 'AURA-2026-8941',
    suiteId: 'kyoto-bamboo-suite',
    suiteTitle: 'The Bamboo Sukiya Pavilion',
    destination: 'Kyoto Arashiyama, Japan',
    checkIn: '2026-10-14',
    checkOut: '2026-10-19',
    nights: 5,
    guests: 2,
    totalPrice: 4250,
    status: 'Confirmed',
    bookedAt: '2026-08-20',
    qrCodeMock: 'AURA-KYOTO-8941-CONFIRMED',
    addons: ['Kyoto Kaiseki Banquet', 'Geothermal Hydrotherapy'],
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80'
  }
];

export function UserProvider({ children }) {
  const [profile, setProfile] = useLocalStorage('aura_user_profile', INITIAL_PROFILE);
  const [wishlist, setWishlist] = useLocalStorage('aura_wishlist', ['maldives-overwater-haven', 'alps-matterhorn-chalet']);
  const [reservations, setReservations] = useLocalStorage('aura_reservations', INITIAL_RESERVATIONS);
  const [loyaltyPoints, setLoyaltyPoints] = useLocalStorage('aura_loyalty_points', 38400);

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
      id: `AURA-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Confirmed',
      bookedAt: new Date().toISOString().split('T')[0],
      qrCodeMock: `AURA-VOUCHER-${Date.now()}`
    };

    setReservations((prev) => [newReservation, ...prev]);
    // Earn 10 loyalty points per $ spent
    const earnedPoints = Math.floor(reservation.totalPrice * 10);
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
    if (loyaltyPoints >= 50000) return { name: 'Sovereign Obsidian', discountPct: 15, perk: 'Complimentary Villa Upgrade & Helipad Transfer' };
    if (loyaltyPoints >= 25000) return { name: 'Aura Luminary', discountPct: 10, perk: 'Unlimited Spa Hydrotherapy & Private Wine Cellar Access' };
    return { name: 'Sanctuary Member', discountPct: 5, perk: 'Welcome Champagne & Late 4 PM Check-out' };
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
