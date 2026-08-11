import React, { useState, useEffect } from 'react';
import { MapPin, ShoppingBag, Menu, X, ArrowRight, User as UserIcon, LogIn, LogOut, Shield, Gift } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { BrandLogo } from '../ui/BrandLogo';
import { useAudioSound } from '../../hooks/useAudioSound';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onOpenAdminPortal?: () => void;
  onOpenUsersDb?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdminPortal, onOpenUsersDb }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { playClickSound } = useAudioSound();
  const { user, userData, setIsAuthModalOpen, signOutUser } = useAuth();

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 40);

      if (currentY <= 80) {
        setIsVisible(true);
      } else if (currentY > lastY && currentY - lastY > 5) {
        setIsVisible(false);
      } else if (currentY < lastY && lastY - currentY > 5) {
        setIsVisible(true);
      }

      lastY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NAV_LINKS = [
    { label: 'Our Story', href: '#story' },
    { label: 'Menu', href: '#menu' },
    { label: 'Why Us', href: '#highlights' },
    { label: 'Location & Hours', href: '#location' },
    { label: 'Reviews', href: '#reviews' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[90] transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'py-2 bg-[#120B08]/95 backdrop-blur-xl border-b border-[#3A2318]/60 shadow-2xl'
            : 'py-4 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            onClick={playClickSound}
          >
            <BrandLogo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={playClickSound}
                className="text-xs font-bold uppercase tracking-widest text-[#D1C5B6] hover:text-[#F3A83B] transition-colors font-syne relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F3A83B] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action Tools & Status */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Admin Portal Button (Restricted to Admin bhavyapradeep72@gmail.com) */}
            {(onOpenAdminPortal || onOpenUsersDb) && user?.email?.toLowerCase() === 'bhavyapradeep72@gmail.com' && (
              <button
                onClick={() => {
                  playClickSound();
                  if (onOpenAdminPortal) onOpenAdminPortal();
                  else if (onOpenUsersDb) onOpenUsersDb();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D48C29] hover:bg-[#E69D35] text-[#120B08] font-syne text-[11px] sm:text-xs font-bold transition-all shadow-md cursor-pointer animate-pulse-subtle"
                title="Manage Menu, Prices, Offers & Users DB"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </button>
            )}

            {/* Auth Profile or Sign In Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => {
                    playClickSound();
                    setShowUserDropdown(!showUserDropdown);
                  }}
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-white border border-[#EAE0D2] hover:border-[#D48C29] transition-colors cursor-pointer shadow-xs"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full" />
                  ) : (
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#D48C29] text-white flex items-center justify-center text-[10px] sm:text-xs font-bold font-syne">
                      {((userData?.displayName || user.displayName || user.email || 'U')[0]).toUpperCase()}
                    </div>
                  )}
                  <span className="text-[11px] sm:text-xs font-syne font-bold text-[#2C1810] max-w-[65px] sm:max-w-[100px] truncate">
                    {userData?.displayName?.split(' ')[0] || user.displayName?.split(' ')[0] || 'Account'}
                  </span>
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-[#EAE0D2] rounded-2xl shadow-xl p-3 z-[100] animate-fade-in">
                    <div className="px-3 py-2 border-b border-[#EAE0D2] mb-1">
                      <p className="text-xs font-bold text-[#2C1810] truncate">
                        {userData?.displayName || user.displayName || 'Waffle Lover'}
                      </p>
                      <p className="text-[10px] text-[#8C7063] truncate">
                        {user.email || user.phoneNumber || 'Signed in'}
                      </p>
                      <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 rounded-md bg-[#FFF3E0] text-[#D48C29] font-bold">
                        Provider: {user.providerData[0]?.providerId || 'phone/email'}
                      </span>
                    </div>

                    {(onOpenAdminPortal || onOpenUsersDb) && user?.email?.toLowerCase() === 'bhavyapradeep72@gmail.com' && (
                      <button
                        onClick={() => {
                          playClickSound();
                          setShowUserDropdown(false);
                          if (onOpenAdminPortal) onOpenAdminPortal();
                          else if (onOpenUsersDb) onOpenUsersDb();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-[#D48C29] hover:bg-[#FFF3E0] rounded-xl transition-colors cursor-pointer mb-1"
                      >
                        <Shield className="w-3.5 h-3.5" />
                        <span>Admin Control Portal</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        playClickSound();
                        signOutUser();
                        setShowUserDropdown(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  playClickSound();
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-[#D48C29] sm:bg-white text-white sm:text-[#2C1810] border border-[#D48C29] sm:border-[#EAE0D2] hover:border-[#D48C29] font-syne text-[11px] sm:text-xs font-bold transition-all shadow-xs cursor-pointer hover:bg-[#B8751E] sm:hover:bg-[#FFF8EE]"
              >
                <LogIn className="w-3.5 h-3.5 text-white sm:text-[#D48C29]" />
                <span>Sign In</span>
              </button>
            )}

            {/* Menu CTA */}
            <div className="hidden sm:block">
              <MagneticButton
                variant="gold"
                size="sm"
                onClick={() => {
                  playClickSound();
                  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Menu <ArrowRight className="w-3.5 h-3.5" />
              </MagneticButton>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-xl bg-white border border-[#EAE0D2] text-[#2C1810] hover:text-[#D48C29]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[80] bg-[#FFFBF5]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 pt-24 animate-fade-in lg:hidden border-b border-[#EAE0D2]">
          <nav className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  playClickSound();
                  setMobileMenuOpen(false);
                }}
                className="font-serif text-2xl font-bold text-[#2C1810] hover:text-[#D48C29] transition-colors py-1 border-b border-[#EAE0D2]/50 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-[#D48C29]" />
              </a>
            ))}
          </nav>

          <div className="space-y-3 pt-4 border-t border-[#EAE0D2]">
            {/* Mobile User Profile or Sign In Card */}
            {user ? (
              <div className="p-3.5 rounded-2xl bg-white border border-[#EAE0D2] flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3 overflow-hidden">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-10 h-10 rounded-full border border-[#D48C29]" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#D48C29] text-white flex items-center justify-center font-bold text-sm font-syne">
                      {((userData?.displayName || user.displayName || user.email || 'U')[0]).toUpperCase()}
                    </div>
                  )}
                  <div className="truncate">
                    <p className="text-xs font-bold text-[#2C1810] truncate">
                      {userData?.displayName || user.displayName || 'Logged In'}
                    </p>
                    <p className="text-[10px] text-[#8C7063] truncate">
                      {user.email || user.phoneNumber || 'User'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    playClickSound();
                    signOutUser();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-red-50 text-red-600 text-xs font-syne font-bold hover:bg-red-100 transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  playClickSound();
                  setMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="w-full py-3 rounded-2xl bg-[#D48C29] text-white font-syne font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:bg-[#B8751E] cursor-pointer"
              >
                <LogIn className="w-4 h-4" /> Sign In / Create Account
              </button>
            )}

            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-2xl bg-white border border-[#EAE0D2] text-[#2C1810] flex items-center justify-center gap-2 text-xs font-bold font-syne uppercase shadow-xs"
            >
              <MapPin className="w-4 h-4 text-[#D48C29]" /> Opposite Gol Garden, Malad East
            </a>

            <MagneticButton
              variant="gold"
              size="lg"
              className="w-full text-center py-3.5"
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Artisanal Menu <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>
      )}
    </>
  );
};
