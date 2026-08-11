import React, { useState, useEffect } from 'react';
import { REVIEWS } from '../../constants/data';
import { TextReveal } from '../ui/TextReveal';
import { Star, CheckCircle, Heart, MessageSquare, Send, ThumbsUp, LogIn, Trash2 } from 'lucide-react';
import { useAudioSound } from '../../hooks/useAudioSound';
import { useAuth } from '../../context/AuthContext';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Review } from '../../types';

export const CustomerReviews: React.FC = () => {
  const { playClickSound, playSuccessSound } = useAudioSound();
  const { user, userData, setIsAuthModalOpen } = useAuth();
  const isAdmin = user?.email?.toLowerCase() === 'bhavyapradeep72@gmail.com';
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [filterRating, setFilterRating] = useState<number | null>(null);

  // New review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newDish, setNewDish] = useState('Classic Liege Pearl');

  // Load reviews from Firestore
  useEffect(() => {
    const fetchFirestoreReviews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'reviews'));
        if (!querySnapshot.empty) {
          const liveReviews: Review[] = querySnapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              author: data.author || 'Waffle Enthusiast',
              avatar: data.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
              rating: data.rating || 5,
              comment: data.comment || '',
              orderedDish: data.orderedDish || 'Belgian Pearl Waffle',
              verified: true,
              likes: data.likes || 1,
              date: data.date || 'Recently',
            };
          });
          const ids = new Set(liveReviews.map((r) => r.id));
          setReviewsList([...liveReviews, ...REVIEWS.filter((r) => !ids.has(r.id))]);
        }
      } catch (err) {
        console.warn('Could not fetch reviews from Firestore:', err);
      }
    };

    fetchFirestoreReviews();
  }, []);

  useEffect(() => {
    if (user) {
      setNewAuthor(userData?.displayName || user.displayName || '');
    }
  }, [user, userData]);

  const filteredReviews = filterRating
    ? reviewsList.filter((r) => Math.floor(r.rating) === filterRating)
    : reviewsList;

  const handleLike = (id: string) => {
    playClickSound();
    setReviewsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const handleDeleteReview = async (id: string) => {
    playClickSound();
    if (!window.confirm('Admin Action: Delete this customer review permanently?')) return;

    setReviewsList((prev) => prev.filter((r) => r.id !== id));

    try {
      await deleteDoc(doc(db, 'reviews', id));
    } catch (err) {
      console.warn('Firestore review deletion notice:', err);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const authorName = newAuthor || userData?.displayName || user?.displayName || 'Happy Foodie';
    if (!newComment) return;

    playClickSound();

    const newReviewData = {
      author: authorName,
      avatar: user?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      rating: newRating,
      comment: newComment,
      orderedDish: newDish,
      verified: true,
      likes: 1,
      date: 'Just now',
      userId: user?.uid || 'guest',
      createdAt: new Date().toISOString(),
    };

    const localReview: Review = {
      id: `rev-${Date.now()}`,
      ...newReviewData,
    };

    setReviewsList([localReview, ...reviewsList]);
    playSuccessSound();
    setShowReviewModal(false);
    setNewComment('');

    // Persist to Firestore
    try {
      await addDoc(collection(db, 'reviews'), newReviewData);
    } catch (err) {
      console.warn('Failed to save review to Firestore:', err);
    }
  };

  return (
    <section id="reviews" className="py-24 bg-[#FAF4EB] border-t border-[#E8DCC9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold font-syne uppercase tracking-widest text-[#D48C29] block mb-2">
            VOICES OF WAFFLE ENTHUSIASTS
          </span>
          <TextReveal
            text="Rated 4.6★ by Malad East Desserts Fans"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2C1810] mb-4"
          />
          <p className="text-xs sm:text-sm text-[#5C4538] leading-relaxed">
            Real feedback from dessert lovers at Gol Garden, Malad East.
          </p>
        </div>

        {/* Rating Summary Bar */}
        <div className="bg-white border border-[#EAE0D2] p-6 sm:p-8 rounded-3xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="text-center md:text-left">
              <div className="font-serif text-5xl font-bold text-[#D48C29]">4.6</div>
              <div className="flex items-center gap-1 my-1 justify-center md:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-[#D48C29] text-[#D48C29]' : 'fill-[#D48C29]/30 text-[#D48C29]/30'}`} />
                ))}
              </div>
              <p className="text-xs text-[#8C7063]">Based on 54+ verified customer reviews</p>
            </div>

            <div className="hidden sm:block h-16 w-px bg-[#EAE0D2]" />

            {/* Filter buttons by rating */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => setFilterRating(null)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-syne font-bold cursor-pointer transition-all ${
                  filterRating === null
                    ? 'bg-[#D48C29] text-white shadow-sm'
                    : 'bg-[#FFF8EE] text-[#5C4538] border border-[#E8D0B3]'
                }`}
              >
                All ({reviewsList.length})
              </button>
              {[5, 4].map((star) => (
                <button
                  key={star}
                  onClick={() => setFilterRating(star)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-syne font-bold flex items-center gap-1 cursor-pointer transition-all ${
                    filterRating === star
                      ? 'bg-[#D48C29] text-white shadow-sm'
                      : 'bg-[#FFF8EE] text-[#5C4538] border border-[#E8D0B3]'
                  }`}
                >
                  {star} <Star className="w-3 h-3 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="px-6 py-3 rounded-full bg-[#D48C29] text-white font-syne font-bold text-xs uppercase tracking-wider hover:bg-[#B8751E] transition-all duration-300 shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" /> Share Your Tasting Review
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div key={rev.id} className="h-full">
              <div
                className="bg-white border border-[#EAE0D2] p-6 rounded-3xl h-full flex flex-col justify-between hover:border-[#D48C29] transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <div>
                  {/* Author Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.avatar}
                        alt={rev.author}
                        referrerPolicy="no-referrer"
                        className="w-11 h-11 rounded-full object-cover border border-[#D48C29]/40 shadow-sm"
                      />
                      <div>
                        <div className="font-serif font-bold text-base text-[#2C1810] flex items-center gap-1.5">
                          {rev.author}
                          {rev.verified && (
                            <CheckCircle className="w-3.5 h-3.5 text-[#D48C29]" />
                          )}
                        </div>
                        <div className="text-[10px] text-[#8C7063]">{rev.date}</div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(rev.rating)
                              ? 'fill-[#D48C29] text-[#D48C29]'
                              : 'text-[#EAE0D2]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-xs text-[#5C4538] leading-relaxed mb-4 italic">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Bottom dish tag & likes */}
                <div className="pt-4 border-t border-[#EAE0D2] flex items-center justify-between text-xs text-[#5C4538]">
                  <span className="text-[10px] font-syne font-bold uppercase tracking-wider text-[#D48C29] bg-[#FFF8EE] px-2.5 py-1 rounded-full border border-[#E8D0B3] shadow-xs">
                    Ordered: {rev.orderedDish}
                  </span>

                  <div className="flex items-center gap-2">
                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteReview(rev.id)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                        title="Delete review (Admin)"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={() => handleLike(rev.id)}
                      className="flex items-center gap-1 text-[#8C7063] hover:text-[#D48C29] transition-colors cursor-pointer"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span className="text-[11px]">{rev.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Form for Adding Review */}
        {showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#120B08]/80 backdrop-blur-md">
            <div className="bg-[#1D120D] border border-[#3A2318] p-6 sm:p-8 rounded-3xl max-w-lg w-full relative shadow-2xl">
              <h3 className="font-serif text-2xl font-bold text-[#FAF4EC] mb-2">
                Write a Tasting Review
              </h3>
              <p className="text-xs text-[#D1C5B6] mb-6">
                Tell us about your waffle experience with Waffles On Wheels!
              </p>

              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-syne uppercase text-[#F3A83B] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Jessica Chen"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#120B08] border border-[#3A2318] text-xs text-[#FAF4EC] focus:outline-none focus:border-[#F3A83B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-syne uppercase text-[#F3A83B] mb-1">Favorite Creation Ordered</label>
                  <select
                    value={newDish}
                    onChange={(e) => setNewDish(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#120B08] border border-[#3A2318] text-xs text-[#FAF4EC] focus:outline-none focus:border-[#F3A83B]"
                  >
                    <option value="Death By Chocolate Waffle">Death By Chocolate Waffle</option>
                    <option value="Tripple Chocolate Mini Waffle">Tripple Chocolate Mini Waffle</option>
                    <option value="Lotus Biscoff Waffle">Lotus Biscoff Waffle</option>
                    <option value="Naughty Nutella Waffle">Naughty Nutella Waffle</option>
                    <option value="Mini Pancakes (Nutella)">Mini Pancakes (Nutella)</option>
                    <option value="Kitkat Shake">Kitkat Shake</option>
                    <option value="Pistachio Waffle">Pistachio Waffle</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-syne uppercase text-[#F3A83B] mb-1">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className={`p-2 rounded-lg border ${
                          newRating >= star
                            ? 'bg-[#2C1810] border-[#F3A83B] text-[#F3A83B]'
                            : 'bg-[#120B08] border-[#3A2318] text-[#D1C5B6]/40'
                        }`}
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-syne uppercase text-[#F3A83B] mb-1">Review Comment</label>
                  <textarea
                    required
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Describe the crunch, chocolate drizzle, and truck vibe..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#120B08] border border-[#3A2318] text-xs text-[#FAF4EC] focus:outline-none focus:border-[#F3A83B]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#3A2318]">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-syne text-[#D1C5B6] hover:text-[#FAF4EC]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#D48C29] text-[#120B08] font-syne font-bold text-xs uppercase tracking-wider hover:bg-[#F3A83B]"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

