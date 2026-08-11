import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../../constants/data';
import { Product } from '../../types';
import { useMenuAndOffers } from '../../context/MenuAndOffersContext';
import { Badge } from '../ui/Badge';
import { TextReveal } from '../ui/TextReveal';
import { CardTilt } from '../ui/CardTilt';
import { Search, Star, Sparkles, ChevronDown, ChevronUp, Plus, Filter } from 'lucide-react';
import { useAudioSound } from '../../hooks/useAudioSound';

interface MenuPreviewProps {}

export const MenuPreview: React.FC<MenuPreviewProps> = () => {
  const { playClickSound, playHoverSound, playTabSound } = useAudioSound();
  const { products } = useMenuAndOffers();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  // Track expanded accordion state for each category ID.
  // Default: first two categories ('mini-waffle', 'pancakes') expanded, or all expanded when searching.
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'mini-waffle': true,
    'pancakes': true,
  });

  const toggleCategory = (categoryId: string) => {
    playTabSound();
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Featured 6 signature items for cards showcase
  const featuredProducts = useMemo(() => {
    const ids = ['mw-19', 'pc-7', 'sh-23', 'cs-4', 'bc-16', 'tw-8'];
    const found = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];
    if (found.length < 6) {
      return products.filter((p) => p.bestseller || p.featured).slice(0, 6);
    }
    return found;
  }, [products]);

  // Category list excluding 'all' for accordion layout
  const categoriesList = useMemo(() => {
    return CATEGORIES.filter((c) => c.id !== 'all');
  }, []);

  // Filtered products grouped by category
  const menuByCategory = useMemo(() => {
    const isSearching = searchQuery.trim().length > 0;
    
    return categoriesList.map((cat) => {
      let items = products.filter((p) => p.category === cat.id);

      if (selectedDietary !== 'all') {
        items = items.filter((p) => p.dietary.includes(selectedDietary as any));
      }

      if (isSearching) {
        const query = searchQuery.toLowerCase();
        items = items.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.tagline.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
      }

      return {
        ...cat,
        items,
      };
    }).filter((catGroup) => {
      if (activeCategoryFilter !== 'all' && catGroup.id !== activeCategoryFilter) {
        return false;
      }
      return catGroup.items.length > 0;
    });
  }, [categoriesList, products, searchQuery, selectedDietary, activeCategoryFilter]);

  const DIETARY_FILTERS = [
    { id: 'all', label: 'All Items' },
    { id: 'BESTSELLER', label: '★ Bestsellers' },
    { id: 'VEG', label: '100% Veg' },
    { id: 'SPECIAL', label: 'Chef Specials' },
  ];

  return (
    <section id="menu" className="py-24 bg-[#FAF4EB] relative overflow-hidden perspective-1000 border-t border-[#E8DCC9]">
      
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#F3A83B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-[#D48C29]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* ========================================================= */}
        {/* SECTION 1: SIGNATURE CREATIONS (4-6 FEATURED CARDS ONLY) */}
        {/* ========================================================= */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold font-syne uppercase tracking-widest text-[#D48C29] block mb-2">
              CURATED DESSERT MASTERPIECES
            </span>
            <TextReveal
              text="Signature Selections"
              className="font-serif text-3xl sm:text-5xl font-bold text-[#2C1810] mb-4"
            />
            <p className="text-xs sm:text-sm text-[#5C4538] max-w-xl mx-auto leading-relaxed">
              Our six most requested creations — freshly pressed live on hot irons with imported Belgian cocoa and real hazelnut spreads.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProducts.map((product) => (
              <CardTilt key={product.id} maxTilt={12} className="h-full">
                <div
                  className="group h-full bg-white border border-[#EAE0D2] hover:border-[#D48C29] rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md preserve-3d"
                  onMouseEnter={playHoverSound}
                >
                  {/* Card Image */}
                  <div className="relative h-56 overflow-hidden bg-[#FFF8EE] preserve-3d">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 translate-z-20">
                      {product.dietary.map((tag) => (
                        <Badge key={tag} tag={tag} />
                      ))}
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#120B08]/85 border border-[#3A2318] text-xs font-bold text-[#F3A83B] flex items-center gap-1 z-10 translate-z-20 shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-[#F3A83B]" /> {product.rating}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4 preserve-3d">
                    <div className="translate-z-12">
                      <div className="text-[10px] font-bold text-[#D48C29] uppercase tracking-widest font-syne mb-1">
                        SIGNATURE {product.category.replace('-', ' ')}
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#2C1810] group-hover:text-[#D48C29] transition-colors mb-1.5">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#5C4538] line-clamp-2 leading-relaxed">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="pt-3 border-t border-[#EAE0D2] flex items-center justify-between translate-z-20">
                      <div>
                        {product.price5pc ? (
                          <div className="text-xs font-bold text-[#D48C29]">
                            5pc: ₹{product.price5pc} <span className="text-[#8C7063] font-normal">| 10pc: ₹{product.price10pc}</span>
                          </div>
                        ) : (
                          <div className="font-serif text-xl font-bold text-[#D48C29]">
                            ₹{product.price}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardTilt>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 2: FULL MENU DIRECTORY (CLEAN TEXT ROWS ONLY)      */}
        {/* ========================================================= */}
        <div className="pt-8 border-t border-[#EAE0D2]">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold font-syne uppercase tracking-widest text-[#D48C29] block mb-1">
                COMPLETE DIRECTORY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1810]">
                Full Artisanal Menu
              </h2>
              <p className="text-xs sm:text-sm text-[#5C4538] mt-1 max-w-lg leading-relaxed">
                Browse our entire offering across all categories. Select any item to view toppings, pricing, and ingredients.
              </p>
            </div>
          </div>

          {/* Filter & Search Toolbar */}
          <div className="bg-white border border-[#EAE0D2] p-4 sm:p-6 rounded-3xl mb-8 space-y-4 shadow-sm">
            
            {/* Search + Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D48C29]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search waffles, shakes, biscoff..."
                  className="w-full pl-11 pr-8 py-2.5 rounded-2xl bg-[#FFFBF5] border border-[#EAE0D2] text-xs text-[#2C1810] placeholder-[#8C7063]/60 focus:outline-none focus:border-[#D48C29] transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7063] hover:text-[#2C1810]"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-[#EAE0D2]">
              <button
                onClick={() => {
                  playClickSound();
                  setActiveCategoryFilter('all');
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-syne uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeCategoryFilter === 'all'
                    ? 'bg-[#D48C29] text-white shadow-xs'
                    : 'bg-[#FFF8EE] text-[#5C4538] hover:text-[#2C1810] border border-[#E8D0B3]'
                }`}
              >
                All Categories
              </button>
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    playClickSound();
                    setActiveCategoryFilter(cat.id);
                    // Ensure selected category accordion opens
                    setExpandedCategories((prev) => ({ ...prev, [cat.id]: true }));
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-syne uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    activeCategoryFilter === cat.id
                      ? 'bg-[#D48C29] text-white shadow-xs'
                      : 'bg-[#FFF8EE] text-[#5C4538] hover:text-[#2C1810] border border-[#E8D0B3]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Dietary Tags Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#EAE0D2]">
              <Filter className="w-3.5 h-3.5 text-[#D48C29] shrink-0 mr-1" />
              <span className="text-[10px] text-[#8C7063] font-syne uppercase tracking-widest shrink-0 font-semibold">Filter:</span>
              {DIETARY_FILTERS.map((df) => (
                <button
                  key={df.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedDietary(df.id);
                  }}
                  className={`px-3 py-1 rounded-lg text-[10px] font-syne uppercase font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedDietary === df.id
                      ? 'bg-[#FFF0D9] text-[#D48C29] border border-[#D48C29]/40'
                      : 'text-[#8C7063] hover:text-[#2C1810]'
                  }`}
                >
                  {df.label}
                </button>
              ))}
            </div>

          </div>

          {/* ========================================================= */}
          {/* CATEGORY ACCORDIONS CONTAINING CLEAN PRODUCT ROWS         */}
          {/* ========================================================= */}
          {menuByCategory.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#EAE0D2] px-4 shadow-sm">
              <p className="font-serif text-2xl text-[#2C1810] mb-2">No Matching Items Found</p>
              <p className="text-xs text-[#5C4538] mb-6">Try clearing your search query or dietary filter.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDietary('all');
                  setActiveCategoryFilter('all');
                }}
                className="px-6 py-2 rounded-full bg-[#D48C29] text-white font-bold text-xs font-syne uppercase shadow-sm hover:bg-[#B8751E]"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {menuByCategory.map((category) => {
                const isExpanded = searchQuery.trim().length > 0 || !!expandedCategories[category.id];

                return (
                  <div
                    key={category.id}
                    className="bg-white border border-[#EAE0D2] rounded-2xl overflow-hidden transition-all duration-200 shadow-sm"
                  >
                    {/* Category Accordion Header */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between hover:bg-[#FFF8EE] transition-colors cursor-pointer text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#D48C29] group-hover:scale-125 transition-transform" />
                        <div>
                          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1810] group-hover:text-[#D48C29] transition-colors">
                            {category.name}
                          </h3>
                          <span className="text-[11px] text-[#8C7063] font-syne uppercase tracking-wider block sm:inline sm:ml-2 font-semibold">
                            {category.items.length} {category.items.length === 1 ? 'item' : 'items'}
                            {category.startPrice && ` • From ₹${category.startPrice}`}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-syne font-bold text-[#D48C29] hidden sm:inline">
                          {isExpanded ? 'Hide' : 'View'}
                        </span>
                        <div className="p-2 rounded-xl bg-[#FFF8EE] border border-[#E8D0B3] text-[#2C1810] group-hover:border-[#D48C29]">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </button>

                    {/* Accordion Body: Clean Product Rows */}
                    {isExpanded && (
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 border-t border-[#EAE0D2] bg-[#FAF4EB]/30 divide-y divide-[#EAE0D2]/60">
                        {category.items.map((product) => (
                          <div
                            key={product.id}
                            className="py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FFF8EE]/80 -mx-2 px-3 rounded-xl transition-colors group/row"
                          >
                            {/* Left Side: Name + Tagline/Description */}
                            <div className="flex-1 min-w-0 pr-2">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <h4 className="font-serif text-base sm:text-lg font-bold text-[#2C1810] group-hover/row:text-[#D48C29] transition-colors">
                                  {product.name}
                                </h4>

                                {product.bestseller && (
                                  <span className="px-2 py-0.5 rounded-full bg-[#FFF0D9] text-[#D48C29] text-[10px] font-bold font-syne uppercase border border-[#E8D0B3]">
                                    ★ Bestseller
                                  </span>
                                )}

                                {product.dietary.includes('SPECIAL') && (
                                  <span className="px-2 py-0.5 rounded-full bg-[#2C1810] text-[#FAF4EC] text-[10px] font-bold font-syne uppercase">
                                    Chef Special
                                  </span>
                                )}

                                <span className="text-[10px] text-[#16A34A] font-syne font-bold uppercase">
                                  100% Veg
                                </span>
                              </div>

                              <p className="text-xs text-[#5C4538] leading-relaxed line-clamp-1 sm:line-clamp-2">
                                {product.tagline || product.description}
                              </p>
                            </div>

                            {/* Right Side: Pricing */}
                            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#EAE0D2]">
                              <div className="text-right">
                                {product.price5pc ? (
                                  <div className="text-xs font-bold text-[#D48C29] font-mono">
                                    5pc: ₹{product.price5pc} <span className="text-[#8C7063] font-normal">| 10pc: ₹{product.price10pc}</span>
                                  </div>
                                ) : (
                                  <div className="font-serif text-lg sm:text-xl font-bold text-[#D48C29]">
                                    ₹{product.price}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
