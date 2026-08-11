import React, { useState, useEffect } from 'react';
import {
  Shield,
  LayoutDashboard,
  ShoppingBag,
  Tag,
  Search,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  RotateCcw,
  ArrowLeft,
  DollarSign,
  ExternalLink,
  Lock,
  MessageSquare,
  Star
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMenuAndOffers } from '../context/MenuAndOffersContext';
import { Product, Offer, CategoryType, Review } from '../types';
import { CATEGORIES, REVIEWS } from '../constants/data';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface AdminPageProps {
  onBackToStore: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onBackToStore }) => {
  const { user: currentAuthUser } = useAuth();
  const isAdmin = currentAuthUser?.email?.toLowerCase() === 'bhavyapradeep72@gmail.com';

  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'offers' | 'reviews'>('overview');

  // Context hook
  const {
    products,
    updateProduct,
    addProduct,
    deleteProduct,
    resetToDefaultMenu,
    offers,
    addOffer,
    updateOffer,
    toggleOfferActive,
    deleteOffer
  } = useMenuAndOffers();

  // ---------------- REVIEWS STATE ----------------
  const [adminReviews, setAdminReviews] = useState<Review[]>(REVIEWS);
  const [reviewSearch, setReviewSearch] = useState('');

  // Fetch Firestore reviews
  useEffect(() => {
    const fetchAdminReviews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'reviews'));
        if (!querySnapshot.empty) {
          const liveReviews: Review[] = querySnapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              author: data.author || 'Waffle Fan',
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
          setAdminReviews([...liveReviews, ...REVIEWS.filter((r) => !ids.has(r.id))]);
        }
      } catch (err) {
        console.warn('Could not fetch reviews in admin panel:', err);
      }
    };

    fetchAdminReviews();
  }, []);

  // ---------------- MENU STATE ----------------
  const [menuSearch, setMenuSearch] = useState('');
  const [menuCategory, setMenuCategory] = useState<string>('all');
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Product Form
  const [prodName, setProdName] = useState('');
  const [prodTagline, setProdTagline] = useState('');
  const [prodPrice, setProdPrice] = useState<number>(90);
  const [prodPrice5pc, setProdPrice5pc] = useState<string>('');
  const [prodPrice10pc, setProdPrice10pc] = useState<string>('');
  const [prodCategory, setProdCategory] = useState<CategoryType>('mini-waffle');
  const [prodDescription, setProdDescription] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [prodIsBestseller, setProdIsBestseller] = useState<boolean>(false);
  const [prodIsFeatured, setProdIsFeatured] = useState<boolean>(false);

  // Quick Price Edit state
  const [quickPrices, setQuickPrices] = useState<Record<string, number>>({});

  // ---------------- OFFERS STATE ----------------
  const [offerSearch, setOfferSearch] = useState('');
  const [isEditingOffer, setIsEditingOffer] = useState(false);
  const [editingOfferId, setEditingOfferId] = useState<string | null>(null);

  // Delete confirmation modal state
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: 'product' | 'offer' | 'review' | 'reset';
    id?: string;
    name: string;
  } | null>(null);

  const [offTitle, setOffTitle] = useState('');
  const [offCode, setOffCode] = useState('');
  const [offDesc, setOffDesc] = useState('');
  const [offPercent, setOffPercent] = useState<string>('');
  const [offAmount, setOffAmount] = useState<string>('');
  const [offBadge, setOffBadge] = useState('PROMO');
  const [offValidTill, setOffValidTill] = useState('Limited Period');
  const [offActive, setOffActive] = useState(true);

  // Security Gate
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
        <div className="bg-white text-slate-900 border border-slate-200 rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-100">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold font-sans text-slate-900 mb-2">Restricted Access</h2>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            The Admin Management Portal is restricted exclusively to user account{' '}
            <strong className="text-blue-600 font-semibold">bhavyapradeep72@gmail.com</strong>.
          </p>
          <button
            onClick={onBackToStore}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Customer Storefront</span>
          </button>
        </div>
      </div>
    );
  }

  // Filtered lists
  const filteredProducts = products.filter((p) => {
    const matchesCat = menuCategory === 'all' || p.category === menuCategory;
    const matchesQuery =
      p.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
      p.tagline.toLowerCase().includes(menuSearch.toLowerCase()) ||
      p.id.toLowerCase().includes(menuSearch.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const filteredOffers = offers.filter((o) =>
    o.title.toLowerCase().includes(offerSearch.toLowerCase()) ||
    o.code.toLowerCase().includes(offerSearch.toLowerCase()) ||
    o.description.toLowerCase().includes(offerSearch.toLowerCase())
  );

  const filteredAdminReviews = adminReviews.filter((r) =>
    r.author.toLowerCase().includes(reviewSearch.toLowerCase()) ||
    r.comment.toLowerCase().includes(reviewSearch.toLowerCase()) ||
    (r.orderedDish && r.orderedDish.toLowerCase().includes(reviewSearch.toLowerCase()))
  );

  const handleDeleteReviewClick = (id: string, author: string) => {
    setDeleteConfirm({
      type: 'review',
      id,
      name: `Customer Review by "${author}"`,
    });
  };

  // Handlers
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Partial<Product> = {
      name: prodName.trim() || 'Menu Item',
      tagline: prodTagline.trim() || 'Freshly handcrafted dessert.',
      price: Number(prodPrice) || 90,
      price5pc: prodPrice5pc ? Number(prodPrice5pc) : undefined,
      price10pc: prodPrice10pc ? Number(prodPrice10pc) : undefined,
      category: prodCategory,
      description: prodDescription.trim() || 'Delicious dessert item.',
      image: prodImage.trim() || 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&q=80&w=800',
      bestseller: prodIsBestseller,
      featured: prodIsFeatured,
    };

    if (editingProductId) {
      await updateProduct(editingProductId, payload);
    } else {
      await addProduct(payload);
    }

    setIsEditingProduct(false);
    setEditingProductId(null);
  };

  const handleQuickPriceSave = async (id: string) => {
    const val = quickPrices[id];
    if (val !== undefined && val > 0) {
      await updateProduct(id, { price: Number(val) });
      setQuickPrices((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const handleSaveOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Partial<Offer> = {
      title: offTitle.trim() || 'Special Promo Offer',
      code: offCode.trim().toUpperCase() || 'PROMO10',
      description: offDesc.trim() || 'Instant discount applied at checkout.',
      discountPercentage: offPercent ? Number(offPercent) : undefined,
      discountAmount: offAmount ? Number(offAmount) : undefined,
      badgeText: offBadge.trim() || 'PROMO',
      validTill: offValidTill.trim() || 'Limited Time',
      active: offActive,
    };

    if (editingOfferId) {
      await updateOffer(editingOfferId, payload);
    } else {
      await addOffer(payload);
    }

    setIsEditingOffer(false);
    setEditingOfferId(null);
  };

  const handleDeleteOffer = (id: string, code: string) => {
    setDeleteConfirm({
      type: 'offer',
      id,
      name: `Offer Code "${code}"`,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased">
      
      {/* Executive Top Navbar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  Management Console
                </h1>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-900/80 text-blue-300 border border-blue-700/50">
                  Enterprise
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Logged in: <span className="text-slate-200 font-medium">bhavyapradeep72@gmail.com</span>
              </p>
            </div>
          </div>

          <button
            onClick={onBackToStore}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-all border border-slate-700 shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Website</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-sm sticky top-24">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
              Management Sections
            </div>
            
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Executive Overview</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('menu');
                  setIsEditingProduct(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'menu'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Menu & Pricing</span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${activeTab === 'menu' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {products.length}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('offers');
                  setIsEditingOffer(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'offers'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Tag className="w-4 h-4" />
                  <span>Offers & Coupons</span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${activeTab === 'offers' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {offers.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4" />
                  <span>Customer Reviews</span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${activeTab === 'reviews' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {adminReviews.length}
                </span>
              </button>
            </nav>

            <div className="mt-6 pt-4 border-t border-slate-100 px-3">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-[11px] text-blue-900">
                <p className="font-semibold text-blue-950 mb-0.5">Live Firestore Sync</p>
                <p className="text-blue-700 leading-snug">
                  All product edits, price updates, and offer deletions sync instantly to the cloud.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 min-w-0">
          
          {/* TAB 1: EXECUTIVE OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Header Banner */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">System Dashboard Overview</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Real-time metrics for inventory and active marketing campaigns.
                  </p>
                </div>
                <button
                  onClick={onBackToStore}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Customer Store</span>
                </button>
              </div>

              {/* Metric Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Live Menu Items</span>
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{products.length}</div>
                  <p className="text-[11px] text-slate-500 mt-1">Across {CATEGORIES.length - 1} categories</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Active Offers</span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Tag className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    {offers.filter((o) => o.active).length} / {offers.length}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Live customer promo codes</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Average Item Price</span>
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">
                    ₹{products.length ? Math.round(products.reduce((acc, p) => acc + p.price, 0) / products.length) : 0}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Base item catalog average</p>
                </div>
              </div>

              {/* Quick Actions & Recent Offers Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Active Offers Overview */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-blue-600" />
                      <span>Live Promo Codes</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('offers')}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                    >
                      Manage Offers &rarr;
                    </button>
                  </div>

                  <div className="space-y-3">
                    {offers.slice(0, 3).map((off) => (
                      <div
                        key={off.id}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                              {off.code}
                            </span>
                            <span className="text-xs font-semibold text-slate-900">{off.title}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{off.description}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteOffer(off.id, off.code)}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-medium transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Status & Admin Profile */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span>Administrator Privileges</span>
                  </h3>
                  
                  <div className="space-y-3 text-xs text-slate-600">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <span>Administrator Email:</span>
                      <strong className="text-slate-900 font-mono">bhavyapradeep72@gmail.com</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <span>Database Engine:</span>
                      <strong className="text-emerald-700 font-semibold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Firestore
                      </strong>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <span>Offer Deletion Permission:</span>
                      <strong className="text-blue-600 font-semibold">Enabled (Real-time)</strong>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: MENU & PRICES MANAGEMENT */}
          {activeTab === 'menu' && (
            <div className="space-y-6">
              
              {/* Toolbar */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search menu items..."
                      value={menuSearch}
                      onChange={(e) => setMenuSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-xs font-sans text-slate-900 outline-none transition-all"
                    />
                  </div>

                  <select
                    value={menuCategory}
                    onChange={(e) => setMenuCategory(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500"
                  >
                    <option value="all">All Categories</option>
                    {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => {
                      setDeleteConfirm({
                        type: 'reset',
                        name: 'all custom items & reset to default menu',
                      });
                    }}
                    className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reset Menu</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsEditingProduct(true);
                      setEditingProductId(null);
                      setProdName('');
                      setProdTagline('');
                      setProdPrice(90);
                      setProdPrice5pc('');
                      setProdPrice10pc('');
                      setProdCategory('mini-waffle');
                      setProdDescription('');
                      setProdImage('');
                      setProdIsBestseller(false);
                      setProdIsFeatured(false);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Item</span>
                  </button>
                </div>
              </div>

              {/* Add / Edit Form Drawer */}
              {isEditingProduct ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-2xl mx-auto">
                  <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Edit className="w-4 h-4 text-blue-600" />
                      <span>{editingProductId ? 'Edit Product & Pricing' : 'Add New Item to Menu'}</span>
                    </h3>
                    <button onClick={() => setIsEditingProduct(false)} className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer">
                      Cancel
                    </button>
                  </div>

                  <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-semibold text-slate-700 uppercase text-[10px] block mb-1">
                          Item Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Belgian Chocolate Waffle"
                          value={prodName}
                          onChange={(e) => setProdName(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900 outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 uppercase text-[10px] block mb-1">
                          Category *
                        </label>
                        <select
                          value={prodCategory}
                          onChange={(e) => setProdCategory(e.target.value as CategoryType)}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900 outline-none"
                        >
                          {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 uppercase text-[10px] block mb-1">
                        Short Tagline
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Melted Belgian dark chocolate spread."
                        value={prodTagline}
                        onChange={(e) => setProdTagline(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="font-semibold text-slate-700 uppercase text-[10px] block mb-1">
                          Base Price (₹) *
                        </label>
                        <input
                          type="number"
                          required
                          min={10}
                          value={prodPrice}
                          onChange={(e) => setProdPrice(Number(e.target.value))}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900 font-bold text-blue-600 outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 uppercase text-[10px] block mb-1">
                          5pc Price (₹)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 120"
                          value={prodPrice5pc}
                          onChange={(e) => setProdPrice5pc(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900 outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 uppercase text-[10px] block mb-1">
                          10pc Price (₹)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 180"
                          value={prodPrice10pc}
                          onChange={(e) => setProdPrice10pc(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 uppercase text-[10px] block mb-1">
                        Image URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={prodImage}
                        onChange={(e) => setProdImage(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900 outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 uppercase text-[10px] block mb-1">
                        Full Description
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Detailed item description..."
                        value={prodDescription}
                        onChange={(e) => setProdDescription(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900 outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                        <input
                          type="checkbox"
                          checked={prodIsBestseller}
                          onChange={(e) => setProdIsBestseller(e.target.checked)}
                          className="w-4 h-4 rounded text-blue-600 border-slate-300"
                        />
                        <span>Mark as Bestseller ⭐</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                        <input
                          type="checkbox"
                          checked={prodIsFeatured}
                          onChange={(e) => setProdIsFeatured(e.target.checked)}
                          className="w-4 h-4 rounded text-blue-600 border-slate-300"
                        />
                        <span>Feature on Store Cards ✨</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 mt-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{editingProductId ? 'Save Product Changes' : 'Publish Product to Live Menu'}</span>
                    </button>
                  </form>
                </div>
              ) : (
                /* Menu Table */
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 font-semibold text-[11px] uppercase text-slate-500">
                          <th className="py-3.5 px-4">Product Info</th>
                          <th className="py-3.5 px-4">Category</th>
                          <th className="py-3.5 px-4 text-center">Current Price</th>
                          <th className="py-3.5 px-4 text-center">Quick Edit Price</th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredProducts.map((p) => {
                          const quickVal = quickPrices[p.id] !== undefined ? quickPrices[p.id] : p.price;

                          return (
                            <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={p.image}
                                    alt={p.name}
                                    className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                                  />
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-semibold text-slate-900 text-sm">{p.name}</span>
                                      {p.bestseller && (
                                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                                          BESTSELLER
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-slate-500 line-clamp-1">{p.tagline}</p>
                                  </div>
                                </div>
                              </td>

                              <td className="py-3 px-4">
                                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-semibold capitalize border border-slate-200">
                                  {p.category}
                                </span>
                              </td>

                              <td className="py-3 px-4 text-center font-bold font-mono text-sm text-blue-600">
                                ₹{p.price}
                              </td>

                              <td className="py-3 px-4 text-center">
                                <div className="inline-flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200">
                                  <span className="text-xs text-slate-400 font-bold pl-1">₹</span>
                                  <input
                                    type="number"
                                    min={10}
                                    value={quickVal}
                                    onChange={(e) =>
                                      setQuickPrices((prev) => ({
                                        ...prev,
                                        [p.id]: Number(e.target.value),
                                      }))
                                    }
                                    className="w-16 px-1 py-0.5 text-xs font-mono font-bold bg-white border border-slate-200 rounded text-slate-900 text-center outline-none"
                                  />
                                  <button
                                    onClick={() => handleQuickPriceSave(p.id)}
                                    className="px-2 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[10px] cursor-pointer"
                                  >
                                    Save
                                  </button>
                                </div>
                              </td>

                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => {
                                      setEditingProductId(p.id);
                                      setProdName(p.name);
                                      setProdTagline(p.tagline);
                                      setProdPrice(p.price);
                                      setProdPrice5pc(p.price5pc ? String(p.price5pc) : '');
                                      setProdPrice10pc(p.price10pc ? String(p.price10pc) : '');
                                      setProdCategory(p.category);
                                      setProdDescription(p.description);
                                      setProdImage(p.image);
                                      setProdIsBestseller(!!p.bestseller);
                                      setProdIsFeatured(!!p.featured);
                                      setIsEditingProduct(true);
                                    }}
                                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-blue-600 transition-colors cursor-pointer"
                                    title="Edit Product"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>

                                  <button
                                    onClick={() => {
                                      setDeleteConfirm({
                                        type: 'product',
                                        id: p.id,
                                        name: `Product "${p.name}"`,
                                      });
                                    }}
                                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 text-rose-600 transition-colors cursor-pointer"
                                    title="Delete Product"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: OFFERS & COUPONS MANAGEMENT */}
          {activeTab === 'offers' && (
            <div className="space-y-6">
              
              {/* Offers Header Toolbar */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search offer titles or coupon codes..."
                    value={offerSearch}
                    onChange={(e) => setOfferSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-xs text-slate-900 outline-none"
                  />
                </div>

                <button
                  onClick={() => {
                    setIsEditingOffer(true);
                    setEditingOfferId(null);
                    setOffTitle('');
                    setOffCode('');
                    setOffDesc('');
                    setOffPercent('15');
                    setOffAmount('');
                    setOffBadge('PROMO');
                    setOffValidTill('Limited Period');
                    setOffActive(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Offer</span>
                </button>
              </div>

              {/* Add / Edit Offer Form */}
              {isEditingOffer ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-xl mx-auto">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-blue-600" />
                      <span>{editingOfferId ? 'Edit Promo Coupon' : 'Create New Promotional Offer'}</span>
                    </h3>
                    <button onClick={() => setIsEditingOffer(false)} className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer">
                      Cancel
                    </button>
                  </div>

                  <form onSubmit={handleSaveOffer} className="space-y-3.5 text-xs">
                    <div>
                      <label className="font-semibold text-slate-700 uppercase text-[10px] block mb-1">
                        Offer Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Weekend Special 20% Discount"
                        value={offTitle}
                        onChange={(e) => setOffTitle(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-slate-700 uppercase text-[10px] block mb-1">
                          Coupon Code *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. WEEKEND20"
                          value={offCode}
                          onChange={(e) => setOffCode(e.target.value.toUpperCase())}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-blue-600 font-mono font-bold outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 uppercase text-[10px] block mb-1">
                          Badge Tag
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. LIMITED TIME"
                          value={offBadge}
                          onChange={(e) => setOffBadge(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold text-slate-700 uppercase text-[10px] block mb-1">
                          Percentage Discount (%)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 20"
                          value={offPercent}
                          onChange={(e) => setOffPercent(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900 outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 uppercase text-[10px] block mb-1">
                          Flat Amount Off (₹)
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 50"
                          value={offAmount}
                          onChange={(e) => setOffAmount(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 uppercase text-[10px] block mb-1">
                        Offer Description
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Detailed promo discount rules..."
                        value={offDesc}
                        onChange={(e) => setOffDesc(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900 outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 uppercase text-[10px] block mb-1">
                        Validity Info
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Every Friday - Sunday"
                        value={offValidTill}
                        onChange={(e) => setOffValidTill(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900 outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="offActiveCheck"
                        checked={offActive}
                        onChange={(e) => setOffActive(e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 border-slate-300"
                      />
                      <label htmlFor="offActiveCheck" className="text-xs text-slate-700 cursor-pointer font-medium">
                        Active & visible on customer website home section
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 mt-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{editingOfferId ? 'Update Offer' : 'Publish Offer'}</span>
                    </button>
                  </form>
                </div>
              ) : (
                /* Offers Cards Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredOffers.map((off) => (
                    <div
                      key={off.id}
                      className={`p-5 rounded-2xl border transition-all bg-white flex flex-col justify-between shadow-sm ${
                        off.active ? 'border-slate-200' : 'border-slate-200 opacity-60 bg-slate-50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                            {off.badgeText || 'PROMO'}
                          </span>

                          <button
                            onClick={() => toggleOfferActive(off.id)}
                            className="text-xs font-semibold cursor-pointer"
                          >
                            {off.active ? (
                              <span className="text-emerald-600 flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5" /> Active
                              </span>
                            ) : (
                              <span className="text-slate-400 flex items-center gap-1">
                                <XCircle className="w-3.5 h-3.5" /> Paused
                              </span>
                            )}
                          </button>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 mb-1">{off.title}</h4>
                        <p className="text-xs text-slate-500 mb-4 line-clamp-2">{off.description}</p>
                      </div>

                      <div>
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-dashed border-slate-300 flex items-center justify-between mb-3">
                          <span className="font-mono font-bold text-sm text-blue-600">{off.code}</span>
                          <span className="text-xs font-semibold text-emerald-600">
                            {off.discountPercentage ? `${off.discountPercentage}% OFF` : off.discountAmount ? `₹${off.discountAmount} OFF` : 'DEAL'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                          <span className="text-[11px] text-slate-400">Valid: {off.validTill || 'Ongoing'}</span>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingOfferId(off.id);
                                setOffTitle(off.title);
                                setOffCode(off.code);
                                setOffDesc(off.description);
                                setOffPercent(off.discountPercentage ? String(off.discountPercentage) : '');
                                setOffAmount(off.discountAmount ? String(off.discountAmount) : '');
                                setOffBadge(off.badgeText || 'PROMO');
                                setOffValidTill(off.validTill || 'Limited Period');
                                setOffActive(off.active);
                                setIsEditingOffer(true);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer transition-colors"
                            >
                              Edit
                            </button>

                            {/* DELETE OFFER BUTTON - WORKS REALTIME */}
                            <button
                              onClick={() => handleDeleteOffer(off.id, off.code)}
                              className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1"
                              title="Delete offer permanently"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CUSTOMER REVIEWS SECTION */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <span>Customer Reviews Moderation</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    View customer feedback and delete inappropriate or spam reviews from the live database.
                  </p>
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search reviews or authors..."
                    value={reviewSearch}
                    onChange={(e) => setReviewSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              {filteredAdminReviews.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
                  <MessageSquare className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                  <p className="text-sm font-semibold">No reviews found matching your search.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAdminReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={rev.avatar}
                              alt={rev.author}
                              className="w-8 h-8 rounded-full object-cover border border-slate-200"
                            />
                            <div>
                              <div className="font-bold text-xs text-slate-900">{rev.author}</div>
                              <div className="text-[10px] text-slate-400">{rev.date || 'Recently'}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(rev.rating)
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed italic mb-4">
                          "{rev.comment}"
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                          Ordered: {rev.orderedDish || 'Waffle'}
                        </span>

                        <button
                          onClick={() => handleDeleteReviewClick(rev.id, rev.author)}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 border border-rose-100"
                          title="Delete review permanently"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-slate-900">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 border border-rose-100">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Confirm Deletion
            </h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-900 font-semibold">{deleteConfirm.name}</strong>? This action will immediately remove it from the live database.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const target = deleteConfirm;
                  setDeleteConfirm(null);
                  if (target.type === 'offer' && target.id) {
                    await deleteOffer(target.id);
                  } else if (target.type === 'product' && target.id) {
                    await deleteProduct(target.id);
                  } else if (target.type === 'review' && target.id) {
                    setAdminReviews((prev) => prev.filter((r) => r.id !== target.id));
                    try {
                      await deleteDoc(doc(db, 'reviews', target.id));
                    } catch (err) {
                      console.warn('Error removing review:', err);
                    }
                  } else if (target.type === 'reset') {
                    await resetToDefaultMenu();
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
