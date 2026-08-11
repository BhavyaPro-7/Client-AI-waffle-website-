import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { InteractiveStory } from './components/sections/InteractiveStory';
import { OffersSection } from './components/sections/OffersSection';
import { MenuPreview } from './components/sections/MenuPreview';
import { FreshIngredients } from './components/sections/FreshIngredients';
import { LocationSection } from './components/sections/LocationSection';
import { CustomerReviews } from './components/sections/CustomerReviews';
import { InstagramFeed } from './components/sections/InstagramFeed';
import { ScrollProgressBar } from './components/ui/ScrollProgressBar';
import { CustomCursor } from './components/ui/CustomCursor';

import { CateringModal } from './components/modals/CateringModal';
import { AuthModal } from './components/modals/AuthModal';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  const [viewMode, setViewMode] = useState<'store' | 'admin'>('store');
  const [isCateringOpen, setIsCateringOpen] = useState(false);

  // Check URL hash for direct admin page navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setViewMode('admin');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openAdminPage = () => {
    setViewMode('admin');
    window.location.hash = 'admin';
  };

  const returnToStore = () => {
    setViewMode('store');
    if (window.location.hash === '#admin') {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  // Dedicated Admin Page View
  if (viewMode === 'admin') {
    return (
      <>
        <AdminPage onBackToStore={returnToStore} />
        <AuthModal />
      </>
    );
  }

  // Customer Storefront Page View
  return (
    <div className="min-h-screen bg-[#120B08] text-[#FAF4EC] font-sans selection:bg-[#F3A83B] selection:text-[#120B08] overflow-x-hidden">
      
      {/* Premium Custom Cursor */}
      <CustomCursor />

      {/* Scroll Reading Progress Bar */}
      <ScrollProgressBar />

      {/* Navigation Header */}
      <Navbar
        onOpenAdminPortal={openAdminPage}
        onOpenUsersDb={openAdminPage}
      />

      {/* Main Sections */}
      <main>
        {/* Hero Banner */}
        <HeroSection />

        {/* Brand Story & Sourcing Philosophy */}
        <InteractiveStory />

        {/* Live Special Offers & Deals */}
        <OffersSection />

        {/* Menu Preview & Pricing */}
        <MenuPreview />

        {/* Global Sourcing & Raw Ingredients */}
        <FreshIngredients />

        {/* Location & GPS Location Tracker */}
        <LocationSection onOpenCateringModal={() => setIsCateringOpen(true)} />

        {/* Community Reviews */}
        <CustomerReviews />

        {/* Instagram Feed */}
        <InstagramFeed />
      </main>

      {/* Footer */}
      <Footer onOpenCatering={() => setIsCateringOpen(true)} />

      {/* Modals */}
      <CateringModal
        isOpen={isCateringOpen}
        onClose={() => setIsCateringOpen(false)}
      />
      <AuthModal />
    </div>
  );
}
