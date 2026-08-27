import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Providers
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { UserProvider } from './context/UserContext';
import { BookingProvider } from './context/BookingContext';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ToastContainer from './components/common/ToastContainer';
import AudioAmbience from './components/common/AudioAmbience';

// Pages
import Home from './pages/Home';
import Accommodations from './pages/Accommodations';
import AccommodationDetail from './pages/AccommodationDetail';
import Experiences from './pages/Experiences';
import WellnessSpa from './pages/experiences/WellnessSpa';
import CulinaryArts from './pages/experiences/CulinaryArts';
import EcoAdventures from './pages/experiences/EcoAdventures';
import PrivateRetreats from './pages/experiences/PrivateRetreats';

import Dashboard from './pages/Dashboard';
import MyReservations from './pages/dashboard/MyReservations';
import Wishlist from './pages/dashboard/Wishlist';
import LoyaltyRewards from './pages/dashboard/LoyaltyRewards';
import ProfileSettings from './pages/dashboard/ProfileSettings';

import Booking from './pages/Booking';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <UserProvider>
          <BookingProvider>
            <BrowserRouter>
              <div className="app-container">
                {/* Global Luxury Header */}
                <Navbar />

                {/* Main Content Viewport with Router Routes */}
                <main className="main-content">
                  <Routes>
                    {/* 1. Home Page */}
                    <Route path="/" element={<Home />} />

                    {/* 2. Accommodations Catalog */}
                    <Route path="/accommodations" element={<Accommodations />} />

                    {/* 3. Single Suite Detail (useParams) */}
                    <Route path="/accommodations/:id" element={<AccommodationDetail />} />

                    {/* 4. Curated Experiences (NESTED ROUTING) */}
                    <Route path="/experiences" element={<Experiences />}>
                      <Route index element={<Navigate to="wellness" replace />} />
                      <Route path="wellness" element={<WellnessSpa />} />
                      <Route path="dining" element={<CulinaryArts />} />
                      <Route path="adventures" element={<EcoAdventures />} />
                      <Route path="retreats" element={<PrivateRetreats />} />
                    </Route>

                    {/* 5. Guest Portal / Dashboard (NESTED ROUTING) */}
                    <Route path="/dashboard" element={<Dashboard />}>
                      <Route index element={<Navigate to="reservations" replace />} />
                      <Route path="reservations" element={<MyReservations />} />
                      <Route path="wishlist" element={<Wishlist />} />
                      <Route path="loyalty" element={<LoyaltyRewards />} />
                      <Route path="settings" element={<ProfileSettings />} />
                    </Route>

                    {/* 6. Reservation Engine */}
                    <Route path="/booking" element={<Booking />} />

                    {/* 7. About & Sustainability Charter */}
                    <Route path="/about" element={<About />} />

                    {/* 8. Concierge & Contact */}
                    <Route path="/contact" element={<Contact />} />

                    {/* 9. 404 Fallback */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>

                {/* Floating Procedural Soundscape Player */}
                <AudioAmbience />

                {/* Global Toast Stack */}
                <ToastContainer />

                {/* Luxury Footer */}
                <Footer />
              </div>
            </BrowserRouter>
          </BookingProvider>
        </UserProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
