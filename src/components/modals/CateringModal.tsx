import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Users, CheckCircle, Sparkles, Send } from 'lucide-react';
import { useAudioSound } from '../../hooks/useAudioSound';
import { useAuth } from '../../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface CateringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CateringModal: React.FC<CateringModalProps> = ({ isOpen, onClose }) => {
  const { playClickSound, playSuccessSound } = useAudioSound();
  const { user, userData } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    guestCount: '50-100',
    eventType: 'Corporate Event',
    specialRequests: '',
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: userData?.displayName || user.displayName || prev.name,
        email: user.email || prev.email,
        phone: user.phoneNumber || prev.phone,
      }));
    }
  }, [user, userData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'cateringInquiries'), {
        ...formData,
        userId: user?.uid || 'guest-inquiry',
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('Failed saving catering inquiry to Firestore:', err);
    }

    playSuccessSound();
    setSubmitted(true);
    setLoading(false);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#120B08]/85 backdrop-blur-md animate-fade-in">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1D120D] border border-[#3A2318] rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#120B08]/80 text-[#FAF4EC] flex items-center justify-center hover:bg-[#D48C29] hover:text-[#120B08] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#D48C29]/20 text-[#F3A83B] flex items-center justify-center mx-auto border border-[#F3A83B]">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-3xl font-bold text-[#FAF4EC]">
              Catering Request Received!
            </h3>
            <p className="text-xs text-[#D1C5B6] max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-[#FAF4EC]">{formData.name}</strong>. Our truck manager will contact you within 4 hours at <strong className="text-[#F3A83B]">{formData.email}</strong> to confirm availability and custom menu options.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-[#D48C29] text-[#120B08] font-syne font-bold text-xs uppercase"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-syne font-bold uppercase tracking-widest text-[#F3A83B] block mb-1">
                PARTY & EVENT ORDERS
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#FAF4EC]">
                Waffles On Wheels Event Catering
              </h2>
              <p className="text-xs text-[#D1C5B6] mt-1">
                Bring 100% pure veg fresh hot waffles, mini pancakes & shakes to your birthday party, wedding, or corporate event in Mumbai.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-syne uppercase text-[#F3A83B] mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#120B08] border border-[#3A2318] text-xs text-[#FAF4EC] focus:outline-none focus:border-[#F3A83B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-syne uppercase text-[#F3A83B] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#120B08] border border-[#3A2318] text-xs text-[#FAF4EC] focus:outline-none focus:border-[#F3A83B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-syne uppercase text-[#F3A83B] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 234-5678"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#120B08] border border-[#3A2318] text-xs text-[#FAF4EC] focus:outline-none focus:border-[#F3A83B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-syne uppercase text-[#F3A83B] mb-1">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#120B08] border border-[#3A2318] text-xs text-[#FAF4EC] focus:outline-none focus:border-[#F3A83B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-syne uppercase text-[#F3A83B] mb-1">Event Type</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#120B08] border border-[#3A2318] text-xs text-[#FAF4EC] focus:outline-none focus:border-[#F3A83B]"
                  >
                    <option value="Corporate Event">Corporate Event / Tech Summit</option>
                    <option value="Wedding Reception">Wedding Reception</option>
                    <option value="Birthday Party">Birthday / Milestone Party</option>
                    <option value="VIP Festival">VIP Lounge / Festival</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-syne uppercase text-[#F3A83B] mb-1">Est. Guests</label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#120B08] border border-[#3A2318] text-xs text-[#FAF4EC] focus:outline-none focus:border-[#F3A83B]"
                  >
                    <option value="25-50">25 - 50 Guests</option>
                    <option value="50-100">50 - 100 Guests</option>
                    <option value="100-250">100 - 250 Guests</option>
                    <option value="250+">250+ Guests</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-syne uppercase text-[#F3A83B] mb-1">Special Requests or Location Notes</label>
                <textarea
                  rows={3}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="e.g. Need gluten-free options, custom brand logo pressed on waffle sticks..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#120B08] border border-[#3A2318] text-xs text-[#FAF4EC] focus:outline-none focus:border-[#F3A83B]"
                />
              </div>

              <div className="pt-4 border-t border-[#3A2318] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-syne text-[#D1C5B6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#D48C29] text-[#120B08] font-syne font-bold text-xs uppercase tracking-wider hover:bg-[#F3A83B] flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Submit Catering Inquiry
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
