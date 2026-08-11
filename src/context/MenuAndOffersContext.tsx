import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product, Offer } from '../types';
import { PRODUCTS } from '../constants/data';

interface MenuAndOffersContextType {
  products: Product[];
  offers: Offer[];
  loadingProducts: boolean;
  loadingOffers: boolean;
  updateProduct: (id: string, updatedFields: Partial<Product>) => Promise<void>;
  addProduct: (productData: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addOffer: (offerData: Partial<Offer>) => Promise<void>;
  updateOffer: (id: string, updatedFields: Partial<Offer>) => Promise<void>;
  toggleOfferActive: (id: string) => Promise<void>;
  deleteOffer: (id: string) => Promise<void>;
  resetToDefaultMenu: () => Promise<void>;
}

const DEFAULT_OFFERS: Offer[] = [
  {
    id: 'off-1',
    title: 'Welcome First Order Deal',
    code: 'WELCOME20',
    description: 'Get 20% OFF on all waffles & shakes for orders above ₹199!',
    discountPercentage: 20,
    badgeText: 'WELCOME OFFER',
    validTill: 'Ongoing',
    active: true,
    bannerColor: 'from-[#D48C29] to-[#E69D35]',
  },
  {
    id: 'off-2',
    title: 'Late Night Midnight Cravings',
    code: 'NIGHT50',
    description: 'Flat ₹50 OFF on orders above ₹299 from 10 PM to 2 AM!',
    discountAmount: 50,
    badgeText: 'LATE NIGHT SPECIAL',
    validTill: 'Every Night (10 PM - 2 AM)',
    active: true,
    bannerColor: 'from-purple-800 to-indigo-900',
  },
  {
    id: 'off-3',
    title: 'Pistachio Specials Discount',
    code: 'PISTACHIO15',
    description: '15% OFF on all Pistachio & Kunafa luxury desserts!',
    discountPercentage: 15,
    category: 'pistachio',
    badgeText: 'LUXURY DEAL',
    validTill: 'This Weekend',
    active: true,
    bannerColor: 'from-emerald-700 to-teal-900',
  },
  {
    id: 'off-4',
    title: 'Pancakes & Shakes Combo',
    code: 'SHAKECOMBO',
    description: 'Buy Any 10pc Mini Pancakes & Get ₹30 OFF on Any Shake!',
    discountAmount: 30,
    badgeText: 'COMBO SAVINGS',
    validTill: 'Limited Time',
    active: true,
    bannerColor: 'from-amber-800 to-amber-950',
  },
];

const MenuAndOffersContext = createContext<MenuAndOffersContextType | undefined>(undefined);

export const MenuAndOffersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [offers, setOffers] = useState<Offer[]>(DEFAULT_OFFERS);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);
  const [loadingOffers, setLoadingOffers] = useState<boolean>(true);

  // 1. Sync Products from Firestore
  useEffect(() => {
    const productsCol = collection(db, 'products');

    const unsubscribe = onSnapshot(
      productsCol,
      async (snapshot) => {
        if (snapshot.empty) {
          // Seed Firestore with default PRODUCTS if collection is empty
          try {
            console.log('Seeding initial PRODUCTS to Firestore...');
            const batch = writeBatch(db);
            PRODUCTS.forEach((prod) => {
              const docRef = doc(db, 'products', prod.id);
              batch.set(docRef, prod);
            });
            await batch.commit();
            setProducts(PRODUCTS);
          } catch (seedErr) {
            console.warn('Error seeding products to Firestore, using local fallback:', seedErr);
            setProducts(PRODUCTS);
          }
        } else {
          const fetched: Product[] = [];
          snapshot.forEach((docSnap) => {
            fetched.push({
              ...(docSnap.data() as Product),
              id: docSnap.id,
            });
          });
          setProducts(fetched);
        }
        setLoadingProducts(false);
      },
      (err) => {
        console.warn('Firestore products fetch error, fallback to local data:', err);
        setProducts(PRODUCTS);
        setLoadingProducts(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // 2. Sync Offers from Firestore
  useEffect(() => {
    const offersCol = collection(db, 'offers');

    const unsubscribe = onSnapshot(
      offersCol,
      async (snapshot) => {
        if (snapshot.empty) {
          // Seed Firestore with default DEFAULT_OFFERS if empty
          try {
            console.log('Seeding initial OFFERS to Firestore...');
            const batch = writeBatch(db);
            DEFAULT_OFFERS.forEach((off) => {
              const docRef = doc(db, 'offers', off.id);
              batch.set(docRef, off);
            });
            await batch.commit();
            setOffers(DEFAULT_OFFERS);
          } catch (seedErr) {
            console.warn('Error seeding offers to Firestore, using local fallback:', seedErr);
            setOffers(DEFAULT_OFFERS);
          }
        } else {
          const fetched: Offer[] = [];
          snapshot.forEach((docSnap) => {
            fetched.push({
              ...(docSnap.data() as Offer),
              id: docSnap.id,
            });
          });
          setOffers(fetched);
        }
        setLoadingOffers(false);
      },
      (err) => {
        console.warn('Firestore offers fetch error, fallback to local offers:', err);
        setOffers(DEFAULT_OFFERS);
        setLoadingOffers(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Admin Actions for Products
  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    // Optimistic local update
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );

    try {
      const docRef = doc(db, 'products', id);
      await setDoc(docRef, updatedFields, { merge: true });
    } catch (err) {
      console.error('Failed to update product in Firestore:', err);
    }
  };

  const addProduct = async (productData: Partial<Product>) => {
    const newId = productData.id || `custom-${Date.now()}`;
    const fullProduct: Product = {
      id: newId,
      name: productData.name || 'New Waffle Treat',
      tagline: productData.tagline || 'Made fresh to order.',
      price: Number(productData.price) || 90,
      price5pc: productData.price5pc ? Number(productData.price5pc) : undefined,
      price10pc: productData.price10pc ? Number(productData.price10pc) : undefined,
      category: productData.category || 'mini-waffle',
      description: productData.description || 'Delicious handcrafted dessert.',
      image: productData.image || 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&q=80&w=800',
      dietary: productData.dietary || ['VEG'],
      rating: productData.rating || 4.8,
      bestseller: productData.bestseller || false,
      featured: productData.featured || false,
    };

    setProducts((prev) => [fullProduct, ...prev]);

    try {
      const docRef = doc(db, 'products', newId);
      await setDoc(docRef, fullProduct);
    } catch (err) {
      console.error('Failed to add product to Firestore:', err);
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    try {
      await deleteDoc(doc(db, 'products', id));
      console.log(`Deleted product ${id} from Firestore`);
    } catch (err) {
      console.warn('Failed to delete product from Firestore (removed locally):', err);
    }
  };

  const resetToDefaultMenu = async () => {
    try {
      const batch = writeBatch(db);
      PRODUCTS.forEach((p) => {
        batch.set(doc(db, 'products', p.id), p);
      });
      await batch.commit();
    } catch (err) {
      console.warn('Reset to default menu warning:', err);
    }
  };

  // Admin Actions for Offers
  const addOffer = async (offerData: Partial<Offer>) => {
    const newId = offerData.id || `offer-${Date.now()}`;
    const newOffer: Offer = {
      id: newId,
      title: offerData.title || 'Special Festival Discount',
      code: (offerData.code || 'SPECIAL10').toUpperCase(),
      description: offerData.description || 'Enjoy delicious savings on fresh waffles!',
      discountPercentage: offerData.discountPercentage ? Number(offerData.discountPercentage) : undefined,
      discountAmount: offerData.discountAmount ? Number(offerData.discountAmount) : undefined,
      category: offerData.category || undefined,
      validTill: offerData.validTill || 'Limited Period',
      active: offerData.active !== undefined ? offerData.active : true,
      badgeText: offerData.badgeText || 'PROMO OFFER',
      bannerColor: offerData.bannerColor || 'from-blue-600 to-indigo-700',
      createdAt: new Date().toISOString(),
    };

    setOffers((prev) => [newOffer, ...prev.filter((o) => o.id !== newId)]);

    try {
      await setDoc(doc(db, 'offers', newId), newOffer);
    } catch (err) {
      console.warn('Failed to add offer to Firestore (saved locally):', err);
    }
  };

  const updateOffer = async (id: string, updatedFields: Partial<Offer>) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, ...updatedFields } : o))
    );

    try {
      await setDoc(doc(db, 'offers', id), updatedFields, { merge: true });
    } catch (err) {
      console.warn('Failed to update offer in Firestore (updated locally):', err);
    }
  };

  const toggleOfferActive = async (id: string) => {
    const current = offers.find((o) => o.id === id);
    if (!current) return;

    const newActive = !current.active;
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, active: newActive } : o))
    );

    try {
      await updateDoc(doc(db, 'offers', id), { active: newActive });
    } catch (err) {
      console.warn('Failed to toggle offer active in Firestore (toggled locally):', err);
    }
  };

  const deleteOffer = async (id: string) => {
    // Optimistically update local state immediately
    setOffers((prev) => prev.filter((o) => o.id !== id));
    try {
      await deleteDoc(doc(db, 'offers', id));
      console.log(`Deleted offer ${id} from Firestore`);
    } catch (err) {
      console.warn('Failed to delete offer from Firestore (removed locally):', err);
    }
  };

  return (
    <MenuAndOffersContext.Provider
      value={{
        products,
        offers,
        loadingProducts,
        loadingOffers,
        updateProduct,
        addProduct,
        deleteProduct,
        addOffer,
        updateOffer,
        toggleOfferActive,
        deleteOffer,
        resetToDefaultMenu,
      }}
    >
      {children}
    </MenuAndOffersContext.Provider>
  );
};

export const useMenuAndOffers = () => {
  const context = useContext(MenuAndOffersContext);
  if (!context) {
    throw new Error('useMenuAndOffers must be used within a MenuAndOffersProvider');
  }
  return context;
};
