export type DietaryTag = 'VEG' | 'BESTSELLER' | 'SPECIAL' | 'CUSTOM';

export type CategoryType = 
  | 'mini-waffle' 
  | 'triangle-waffle' 
  | 'pancakes' 
  | 'shakes' 
  | 'cheesecake' 
  | 'bowl-cake' 
  | 'brownie' 
  | 'pistachio';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  price5pc?: number;
  price10pc?: number;
  category: CategoryType;
  description: string;
  image: string;
  secondaryImage?: string;
  dietary: DietaryTag[];
  rating: number;
  ingredients?: string[];
  customizable?: boolean;
  featured?: boolean;
  bestseller?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedOption?: '5pc' | '10pc' | 'Mini' | 'Triangle';
  customToppings?: string[];
  totalPrice: number;
}

export interface Ingredient {
  id: string;
  name: string;
  origin: string;
  description: string;
  image: string;
  purity: string;
  tag: string;
  accentColor: string;
}

export interface Review {
  id: string;
  author: string;
  role?: string;
  avatar: string;
  rating: number;
  comment: string;
  orderedDish?: string;
  favoriteItem?: string;
  date: string;
  verified: boolean;
  location?: string;
  likes: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  url?: string;
  likes: number;
  caption: string;
  aspectRatio?: 'square' | 'portrait' | 'wide';
}

export interface TruckLocation {
  id: string;
  day?: string;
  name: string;
  spotName?: string;
  neighborhood?: string;
  city?: string;
  address: string;
  hours: string;
  status: 'ACTIVE_NOW' | 'UPCOMING' | 'CLOSED' | 'open';
  nextMoveMinutes?: number;
  mapCoordinates?: { lat: number; lng: number };
  popularItem?: string;
}

export interface CustomWaffleBuild {
  base: string;
  dip: string;
  drizzle: string;
  toppings: string[];
  scoop?: string;
}

export interface Offer {
  id: string;
  title: string;
  code: string;
  description: string;
  discountPercentage?: number;
  discountAmount?: number;
  category?: string;
  validTill?: string;
  active: boolean;
  bannerColor?: string;
  badgeText?: string;
  createdAt?: string;
}

export type CursorMode = 'default' | 'hover' | 'magnetic' | 'drag' | 'explore' | 'hidden';
