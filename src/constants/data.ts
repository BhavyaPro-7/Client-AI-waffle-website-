import { Product, Review, GalleryItem } from '../types';

export const BRAND_INFO = {
  name: 'Waffles On Wheels',
  tagline: 'Bite of Happiness.',
  description: 'Waffles, shakes & pan cakes — made fresh, every time.',
  hours: '4:30 PM – 2:00 AM (Monday to Sunday)',
  location: 'Opposite Gol Garden, Malad East, Mumbai – 400097',
  fullAddress: 'Sheetal Vaibhav Kutir, Opposite Gol Garden, Malad East, Mumbai – 400097',
  dietary: '100% Veg 🌱',
  rating: 4.6,
  reviewsCount: 54,
  priceStart: 60,
  maxPrice: 250,
  phones: ['+91 70457 13907', '+91 88508 61683'],
  instagram: '@__waffles_on_wheels',
  instagramUrl: 'https://www.instagram.com/__waffles_on_wheels?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
  copyright: '© 2025 Waffles On Wheels. All rights reserved.',
  highlights: [
    { title: '100% Veg', desc: 'Every single item. Zero compromise.' },
    { title: 'Outdoor Seating', desc: 'Kick back and watch the world go by.' },
    { title: 'Under ₹250', desc: 'Full belly, happy wallet — always.' },
    { title: 'Made Fresh', desc: 'To order, every time. No shortcuts.' }
  ],
  story: {
    title: 'Street Food, Elevated.',
    text: "Waffles On Wheels was born from one simple obsession — the perfect waffle. Not the sad, soggy kind you forget five minutes later. The kind that's golden-crisp on every ridge, pillowy inside, and loaded with toppings that actually deliver.\n\nParked at Gol Garden in Malad East, we keep things accessible without cutting corners. Every bite is made fresh to order, and every customer leaves wishing they'd ordered two."
  },
  vibe: {
    title: 'Not Just a Snack. A Little Escape.',
    points: [
      { name: 'Evening Energy', desc: 'We open at 4:30 PM — right when Malad starts winding down and street food starts calling.' },
      { name: 'Outdoor Seating', desc: "Grab a spot outside, watch the world go by, and eat something you'll actually remember." },
      { name: 'Easy to Find', desc: "Opposite Gol Garden, Malad East. You can't miss us — and you shouldn't." }
    ]
  }
};

// Category details
export const CATEGORIES = [
  { id: 'all', name: 'All Items' },
  { id: 'mini-waffle', name: 'Mini Waffles', startPrice: 60 },
  { id: 'triangle-waffle', name: 'Triangle Waffles', startPrice: 80 },
  { id: 'pancakes', name: 'Mini Pancakes', startPrice: 70 },
  { id: 'shakes', name: 'Shakes', startPrice: 90 },
  { id: 'cheesecake', name: 'Cheesecakes', startPrice: 130 },
  { id: 'bowl-cake', name: 'Bowl Cakes', startPrice: 130 },
  { id: 'brownie', name: 'Brownies', startPrice: 120 },
  { id: 'pistachio', name: 'Pistachio Specials', startPrice: 150 },
];

const WAFFLE_IMG = 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&q=80&w=800';
const PANCAKE_IMG = 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80&w=800';
const SHAKE_IMG = 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800';
const CHEESECAKE_IMG = 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800';
const BOWL_IMG = 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=800';
const BROWNIE_IMG = 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800';
const PISTACHIO_IMG = 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800';

export const PRODUCTS: Product[] = [
  // 1. MINI WAFFLES
  { id: 'mw-1', name: 'Dark Fantasy', tagline: 'Classic mini waffle drizzled with rich dark chocolate.', price: 60, category: 'mini-waffle', description: 'Freshly made crispy mini waffle topped with melted dark chocolate sauce.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.6 },
  { id: 'mw-2', name: 'Milk Fantasy', tagline: 'Warm mini waffle drizzled with creamy milk chocolate.', price: 60, category: 'mini-waffle', description: 'Freshly made mini waffle topped with smooth milk chocolate sauce.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.5 },
  { id: 'mw-3', name: 'White Fantasy', tagline: 'Golden mini waffle topped with sweet white chocolate.', price: 60, category: 'mini-waffle', description: 'Freshly baked mini waffle coated in silky white chocolate.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.5 },
  { id: 'mw-4', name: 'Dark & Milk', tagline: 'Dual delight of dark & milk chocolate on fresh mini waffle.', price: 70, category: 'mini-waffle', description: 'Combined dark and milk chocolate drizzle on a crispy mini waffle.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.6 },
  { id: 'mw-5', name: 'Milk & White', tagline: 'Sweet milk & white chocolate combination.', price: 70, category: 'mini-waffle', description: 'Balanced blend of milk and white chocolate sauces.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.6 },
  { id: 'mw-6', name: 'Dark & White', tagline: 'Contrast of rich dark and sweet white chocolate.', price: 70, category: 'mini-waffle', description: 'Striking black and white chocolate combination on a hot mini waffle.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.7 },
  { id: 'mw-7', name: 'Rainbow Sprinkle', tagline: 'Playful mini waffle with dark & white chocolate and sprinkles.', price: 70, category: 'mini-waffle', description: 'Crispy mini waffle with chocolate and colourful rainbow sprinkles.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.5 },
  { id: 'mw-8', name: 'Tripple Chocolate', tagline: 'Dark, milk & white chocolate loaded together.', price: 70, category: 'mini-waffle', description: 'The ultimate trio of dark, milk, and white chocolate drizzles.', image: WAFFLE_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.8, bestseller: true },
  { id: 'mw-9', name: 'Kitkat Crunch', tagline: 'Crispy mini waffle topped with Kitkat crunchies.', price: 70, category: 'mini-waffle', description: 'Mini waffle loaded with melted chocolate and crunchy Kitkat bites.', image: WAFFLE_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.7, bestseller: true },
  { id: 'mw-10', name: 'Oreo Crunch', tagline: 'Mini waffle with dark chocolate and crushed Oreo crumble.', price: 70, category: 'mini-waffle', description: 'Hot mini waffle coated with chocolate sauce and crushed Oreo cookies.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.6 },
  { id: 'mw-11', name: 'Genius Gems', tagline: 'Fun mini waffle with colorful Gems chocoballs.', price: 80, category: 'mini-waffle', description: 'Crispy mini waffle drizzled with chocolate and topped with colourful Gems.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.6 },
  { id: 'mw-12', name: 'Naughty Nutella', tagline: 'Loaded with rich hazelnut Nutella spread.', price: 90, category: 'mini-waffle', description: 'Generously smothered in authentic Nutella hazelnut cocoa spread.', image: WAFFLE_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.9, bestseller: true },
  { id: 'mw-13', name: 'Kitkat Nutella', tagline: 'Crunchy Kitkat combined with rich Nutella.', price: 100, category: 'mini-waffle', description: 'Creamy Nutella paired with crunchy Kitkat pieces.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.8 },
  { id: 'mw-14', name: 'Oreo Nutella', tagline: 'Nutella spread with crushed Oreo crumble.', price: 100, category: 'mini-waffle', description: 'Rich Nutella spread topped with generous Oreo cookie crunch.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.7 },
  { id: 'mw-15', name: 'Chocolate Brownie', tagline: 'Mini waffle topped with fudgy brownie crumbs & chocolate.', price: 100, category: 'mini-waffle', description: 'Hot mini waffle topped with real chocolate brownie crumble.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.7 },
  { id: 'mw-16', name: 'Brownie Nutella', tagline: 'Fudgy brownie crumble drenched in Nutella.', price: 110, category: 'mini-waffle', description: 'Decadent combo of Nutella spread and fresh brownie crumble.', image: WAFFLE_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.8 },
  { id: 'mw-17', name: 'Lotus Biscoff', tagline: 'Smooth Biscoff spread with cookie crunch.', price: 110, category: 'mini-waffle', description: 'Coated in creamy Lotus Biscoff speculoos spread and crumbs.', image: WAFFLE_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.8, bestseller: true },
  { id: 'mw-18', name: 'Kitkat + Oreo + Nutella', tagline: 'The ultimate trio of Kitkat, Oreo and Nutella.', price: 120, category: 'mini-waffle', description: 'Loaded mini waffle with Kitkat crunch, Oreo crumble, and rich Nutella.', image: WAFFLE_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.9, featured: true },
  { id: 'mw-19', name: 'Death By Chocolate', tagline: 'Overloaded with multi-chocolate layers & toppings.', price: 130, category: 'mini-waffle', description: 'Intense chocolate indulgence layered with dark, milk, brownie, and choco chips.', image: WAFFLE_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.9, bestseller: true },
  { id: 'mw-20', name: 'Pistachio', tagline: 'Exotic pistachio sauce on crisp mini waffle.', price: 150, category: 'mini-waffle', description: 'Topped with premium pistachio spread and crushed pistachios.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.8 },
  { id: 'mw-21', name: 'Pistachio + Nutella', tagline: 'Luxury blend of pistachio spread & Nutella.', price: 170, category: 'mini-waffle', description: 'Decadent pairing of rich pistachio cream and Nutella spread.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.9 },

  // 2. TRIANGLE WAFFLES
  { id: 'tw-1', name: 'Dark & Milk (Triangle)', tagline: 'Crispy classic triangle waffle with dark & milk chocolate.', price: 80, category: 'triangle-waffle', description: 'Full sized triangle waffle section topped with dark & milk chocolate.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.6 },
  { id: 'tw-2', name: 'Milk & White (Triangle)', tagline: 'Golden triangle waffle with milk & white chocolate.', price: 80, category: 'triangle-waffle', description: 'Triangle waffle coated with smooth milk and white chocolate sauces.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.5 },
  { id: 'tw-3', name: 'Dark & White (Triangle)', tagline: 'Triangle waffle with dark and white chocolate blend.', price: 80, category: 'triangle-waffle', description: 'Drizzled with dark and white chocolate on a hot triangle waffle.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.6 },
  { id: 'tw-4', name: 'Rainbow Sprinkle (Triangle)', tagline: 'Triangle waffle with chocolate and colorful sprinkles.', price: 90, category: 'triangle-waffle', description: 'Topped with white/dark chocolate and fun rainbow sprinkles.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.5 },
  { id: 'tw-5', name: 'Tripple Chocolate (Triangle)', tagline: 'Loaded with dark, milk & white chocolate.', price: 90, category: 'triangle-waffle', description: 'Triple chocolate sauce layered over a crisp triangle waffle.', image: WAFFLE_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.7, bestseller: true },
  { id: 'tw-6', name: 'Kitkat Crunch (Triangle)', tagline: 'Triangle waffle topped with Kitkat crunchies.', price: 90, category: 'triangle-waffle', description: 'Drizzled chocolate and crispy Kitkat pieces.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.6 },
  { id: 'tw-7', name: 'Oreo Crunch (Triangle)', tagline: 'Triangle waffle with dark chocolate & Oreo crumbs.', price: 90, category: 'triangle-waffle', description: 'Loaded with chocolate sauce and crushed Oreo cookies.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.6 },
  { id: 'tw-8', name: 'Genius Gems (Triangle)', tagline: 'Triangle waffle topped with chocolate & Gems.', price: 100, category: 'triangle-waffle', description: 'Crispy triangle waffle with melted chocolate and Gems.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.5 },
  { id: 'tw-9', name: 'Naughty Nutella (Triangle)', tagline: 'Triangle waffle smothered in Nutella.', price: 110, category: 'triangle-waffle', description: 'Generous spread of Nutella hazelnut cocoa on a crisp waffle.', image: WAFFLE_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.8, bestseller: true },
  { id: 'tw-10', name: 'Kitkat Nutella (Triangle)', tagline: 'Nutella & Kitkat on a hot triangle waffle.', price: 120, category: 'triangle-waffle', description: 'Nutella spread paired with Kitkat chocolate crunch.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.7 },
  { id: 'tw-11', name: 'Oreo Nutella (Triangle)', tagline: 'Nutella spread & crushed Oreo cookies.', price: 120, category: 'triangle-waffle', description: 'Nutella combined with crunchy Oreo cookie crumble.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.7 },
  { id: 'tw-12', name: 'Bubblegum (Triangle)', tagline: 'Unique sweet bubblegum sauce drizzle.', price: 120, category: 'triangle-waffle', description: 'Fun bubblegum flavoured dessert sauce on a hot waffle.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.4 },
  { id: 'tw-13', name: 'Marshmello (Triangle)', tagline: 'Soft marshmallows on chocolate waffle.', price: 120, category: 'triangle-waffle', description: 'Topped with fluffy marshmallows and chocolate drizzle.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.6 },
  { id: 'tw-14', name: 'Chocolate Brownie (Triangle)', tagline: 'Fresh brownie crumble on triangle waffle.', price: 120, category: 'triangle-waffle', description: 'Loaded with fudgy brownie crumbs and dark chocolate.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.7 },
  { id: 'tw-15', name: 'Brownie Nutella (Triangle)', tagline: 'Fudgy brownie crumble drenched in Nutella.', price: 130, category: 'triangle-waffle', description: 'Rich Nutella spread with house brownie crumble.', image: WAFFLE_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.8 },
  { id: 'tw-16', name: 'Blueberry (Triangle)', tagline: 'White chocolate with tangy blueberry filling.', price: 130, category: 'triangle-waffle', description: 'Topped with white chocolate and real blueberry fruit filling.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.7 },
  { id: 'tw-17', name: 'Strawberry (Triangle)', tagline: 'White chocolate with luscious strawberry sauce.', price: 130, category: 'triangle-waffle', description: 'Delicious white chocolate drizzled with strawberry compote.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.7 },
  { id: 'tw-18', name: 'Red Velvet (Triangle)', tagline: 'Red velvet crumble & white chocolate.', price: 130, category: 'triangle-waffle', description: 'White chocolate drizzled over red velvet cake crumble.', image: WAFFLE_IMG, dietary: ['VEG'], rating: 4.7 },
  { id: 'tw-19', name: 'Lotus Biscoff (Triangle)', tagline: 'Speculoos Biscoff spread and cookie crumbs.', price: 140, category: 'triangle-waffle', description: 'Rich Lotus Biscoff caramelised cookie spread.', image: WAFFLE_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.8 },
  { id: 'tw-20', name: 'Kitkat + Oreo + Nutella (Triangle)', tagline: 'Ultimate combination of Kitkat, Oreo and Nutella.', price: 150, category: 'triangle-waffle', description: 'Triangle waffle loaded with Nutella, Oreo, and Kitkat.', image: WAFFLE_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.9 },
  { id: 'tw-21', name: 'Death By Chocolate (Triangle)', tagline: 'Intense multi-chocolate overloaded waffle.', price: 160, category: 'triangle-waffle', description: 'Layers of dark, milk chocolate, choco chips and brownie.', image: WAFFLE_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.9, bestseller: true },
  { id: 'tw-22', name: 'Pistachio (Triangle)', tagline: 'Premium pistachio spread on triangle waffle.', price: 180, category: 'triangle-waffle', description: 'Coated with creamy pistachio sauce and crushed pistachios.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.8 },
  { id: 'tw-23', name: 'Pistachio + Nutella (Triangle)', tagline: 'Luxury duo of Pistachio sauce and Nutella.', price: 200, category: 'triangle-waffle', description: 'Indulgent blend of rich pistachio sauce and Nutella spread.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.9, featured: true },

  // 3. MINI PAN CAKES (5 pc / 10 pc)
  { id: 'pc-1', name: 'Rainbow Pancake', tagline: 'Dark & White Chocolate with Rainbow Sprinkles.', price: 70, price5pc: 70, price10pc: 120, category: 'pancakes', description: 'Fluffy mini pancakes topped with dark & white chocolate and rainbow sprinkles.', image: PANCAKE_IMG, dietary: ['VEG'], rating: 4.6 },
  { id: 'pc-2', name: 'Caramel Castle', tagline: 'Caramel Sauce with Chocolate Crispies.', price: 80, price5pc: 80, price10pc: 130, category: 'pancakes', description: 'Drenched in smooth caramel sauce and topped with crunchy chocolate crispies.', image: PANCAKE_IMG, dietary: ['VEG'], rating: 4.6 },
  { id: 'pc-3', name: 'Genius Gems (Pancake)', tagline: 'Milk & White Chocolate with Gems.', price: 90, price5pc: 90, price10pc: 140, category: 'pancakes', description: 'Coated with milk & white chocolate and topped with crunchy Gems.', image: PANCAKE_IMG, dietary: ['VEG'], rating: 4.5 },
  { id: 'pc-4', name: 'Oreo Obsession', tagline: 'Dark & White Chocolate with Oreo Crumble.', price: 100, price5pc: 100, price10pc: 160, category: 'pancakes', description: 'Soft pancakes loaded with dark & white chocolate and Oreo crumble.', image: PANCAKE_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.8, bestseller: true },
  { id: 'pc-5', name: 'Crunchy Kitkat (Pancake)', tagline: 'Dark & Milk Chocolate with Kitkat Crunchies.', price: 100, price5pc: 100, price10pc: 160, category: 'pancakes', description: 'Topped with dark & milk chocolate and crunchy Kitkat pieces.', image: PANCAKE_IMG, dietary: ['VEG'], rating: 4.7 },
  { id: 'pc-6', name: 'Chocolate Volcano', tagline: 'Dark, Milk & White Chocolate with Choco Nutties.', price: 110, price5pc: 110, price10pc: 170, category: 'pancakes', description: 'Explosive triple chocolate drizzle topped with choco nutties.', image: PANCAKE_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.8 },
  { id: 'pc-7', name: 'Naughty Nutella (Pancake)', tagline: 'Overloaded Nutella mini pancakes.', price: 120, price5pc: 120, price10pc: 180, category: 'pancakes', description: 'Mini pancakes smothered in generous, warm Nutella.', image: PANCAKE_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.9, bestseller: true },
  { id: 'pc-8', name: 'Chocolate Therapy', tagline: 'Dark & Milk Chocolate with Chocobakes Crumble & Chocochips.', price: 130, price5pc: 130, price10pc: 190, category: 'pancakes', description: 'A soothing overdose of chocolate, chocobakes crumble, and choco chips.', image: PANCAKE_IMG, dietary: ['VEG'], rating: 4.8 },
  { id: 'pc-9', name: 'Red Velvet Rush', tagline: 'White Chocolate with Red Velvet Crumble.', price: 130, price5pc: 130, price10pc: 190, category: 'pancakes', description: 'Soft mini pancakes drizzled with white chocolate and red velvet crumbs.', image: PANCAKE_IMG, dietary: ['VEG'], rating: 4.7 },
  { id: 'pc-10', name: 'Blueberry / Strawberry Pancake', tagline: 'White Chocolate with Blueberry or Strawberry Filling.', price: 140, price5pc: 140, price10pc: 200, category: 'pancakes', description: 'Topped with white chocolate and fruit berry filling.', image: PANCAKE_IMG, dietary: ['VEG'], rating: 4.7 },
  { id: 'pc-11', name: 'Lotus Biscoff Pancake', tagline: 'White Chocolate with Biscoff Spread & Crumble.', price: 150, price5pc: 150, price10pc: 220, category: 'pancakes', description: 'Coated in white chocolate, Biscoff speculoos spread and crumbs.', image: PANCAKE_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.9, bestseller: true },
  { id: 'pc-12', name: 'Kitkat + Oreo Nutella Pancake', tagline: 'Loaded with Kitkat, Oreo and Nutella.', price: 170, price5pc: 170, price10pc: 240, category: 'pancakes', description: 'Ultimate pancake treat with Kitkat, Oreo, and Nutella spread.', image: PANCAKE_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.9 },
  { id: 'pc-13', name: 'Chocolate Overloaded Pancake', tagline: 'All chocolate varieties piled high.', price: 180, price5pc: 180, price10pc: 260, category: 'pancakes', description: 'Extravagant stack loaded with multiple chocolate layers.', image: PANCAKE_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.9, featured: true },
  { id: 'pc-14', name: 'Pistachio Pancake', tagline: 'Rich Pistachio spread on mini pancakes.', price: 200, price5pc: 200, price10pc: 300, category: 'pancakes', description: 'Soft mini pancakes drizzled with smooth pistachio sauce.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.8 },
  { id: 'pc-15', name: 'Pistachio + Nutella Pancake', tagline: 'Pistachio cream & Nutella combination.', price: 220, price5pc: 220, price10pc: 350, category: 'pancakes', description: 'Luxury pairing of pistachio spread and Nutella on fluffy mini pancakes.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.9 },

  // 4. SHAKES
  { id: 'sh-1', name: 'Chocolate Shake', tagline: 'Classic rich thick chocolate milkshake.', price: 90, category: 'shakes', description: 'Chilled, thick, and creamy chocolate shake made fresh.', image: SHAKE_IMG, dietary: ['VEG'], rating: 4.5 },
  { id: 'sh-2', name: 'Cold Coffee', tagline: 'Refreshing chilled coffee blend.', price: 100, category: 'shakes', description: 'Smooth, creamy cold coffee with rich coffee flavour.', image: SHAKE_IMG, dietary: ['VEG'], rating: 4.6 },
  { id: 'sh-3', name: 'Oreo Shake', tagline: 'Thick shake blended with real Oreo cookies.', price: 100, category: 'shakes', description: 'Chilled milkshake blended with crunchy Oreo cookies.', image: SHAKE_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.8, bestseller: true },
  { id: 'sh-4', name: 'Kitkat Shake', tagline: 'Thick shake blended with Kitkat chocolate bars.', price: 110, category: 'shakes', description: 'Delicious thick shake packed with Kitkat crunch.', image: SHAKE_IMG, dietary: ['VEG'], rating: 4.7 },
  { id: 'sh-5', name: 'Marshmellow Shake', tagline: 'Sweet shake topped with fluffy marshmallows.', price: 110, category: 'shakes', description: 'Creamy shake with marshmallow sweetness.', image: SHAKE_IMG, dietary: ['VEG'], rating: 4.5 },
  { id: 'sh-6', name: 'Hazelnut Coffee', tagline: 'Cold coffee infused with hazelnut flavour.', price: 120, category: 'shakes', description: 'Rich cold coffee blended with nutty hazelnut syrup.', image: SHAKE_IMG, dietary: ['VEG'], rating: 4.7 },
  { id: 'sh-7', name: 'Mango Shake', tagline: 'Luscious tropical mango milkshake.', price: 120, category: 'shakes', description: 'Chilled mango milkshake full of fruit sweetness.', image: SHAKE_IMG, dietary: ['VEG'], rating: 4.6 },
  { id: 'sh-8', name: 'Bubblegum Shake', tagline: 'Fun pink bubblegum flavoured milkshake.', price: 120, category: 'shakes', description: 'Sweet and refreshing bubblegum thick shake.', image: SHAKE_IMG, dietary: ['VEG'], rating: 4.4 },
  { id: 'sh-9', name: 'Strawberry Shake', tagline: 'Classic fresh strawberry milkshake.', price: 120, category: 'shakes', description: 'Creamy milk shake flavoured with sweet strawberries.', image: SHAKE_IMG, dietary: ['VEG'], rating: 4.6 },
  { id: 'sh-10', name: 'Oreo - Kitkat Shake', tagline: 'Duo blend of Oreo cookies and Kitkat.', price: 130, category: 'shakes', description: 'Thick shake combining both Oreo crunch and Kitkat.', image: SHAKE_IMG, dietary: ['VEG'], rating: 4.8 },
  { id: 'sh-11', name: 'Blueberry Shake', tagline: 'Smooth berry milkshake with blueberry pulp.', price: 130, category: 'shakes', description: 'Refreshing shake with sweet and tangy blueberry flavour.', image: SHAKE_IMG, dietary: ['VEG'], rating: 4.7 },
  { id: 'sh-12', name: 'Butterscotch Shake', tagline: 'Creamy butterscotch crunch shake.', price: 130, category: 'shakes', description: 'Classic butterscotch thick shake with caramelized crunch.', image: SHAKE_IMG, dietary: ['VEG'], rating: 4.6 },
  { id: 'sh-13', name: 'Brownie Shake', tagline: 'Thick shake blended with fudgy brownie.', price: 140, category: 'shakes', description: 'Rich chocolate shake blended with real brownie chunks.', image: SHAKE_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.8 },
  { id: 'sh-14', name: 'Nutella Shake', tagline: 'Indulgent thick shake made with pure Nutella.', price: 140, category: 'shakes', description: 'Creamy, rich milkshake loaded with hazelnut Nutella.', image: SHAKE_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.9, bestseller: true },
  { id: 'sh-15', name: 'Blackcurrant Shake', tagline: 'Tangy blackcurrant thick shake.', price: 140, category: 'shakes', description: 'Smooth berry shake with rich blackcurrant flavor.', image: SHAKE_IMG, dietary: ['VEG'], rating: 4.6 },
  { id: 'sh-16', name: 'Hazelnut Shake', tagline: 'Creamy hazelnut chocolate thick shake.', price: 150, category: 'shakes', description: 'Nourishing thick shake with real hazelnut flavour.', image: SHAKE_IMG, dietary: ['VEG'], rating: 4.7 },
  { id: 'sh-17', name: 'Mix Berry Shake', tagline: 'Blend of fresh strawberries, blueberries & berries.', price: 150, category: 'shakes', description: 'Thick berry shake made with wild berry blend.', image: SHAKE_IMG, dietary: ['VEG'], rating: 4.7 },
  { id: 'sh-18', name: 'Brownie Nutella Shake', tagline: 'Fudgy brownie & Nutella blended together.', price: 150, category: 'shakes', description: 'The ultimate indulgent shake combining brownie and Nutella.', image: SHAKE_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.9 },
  { id: 'sh-19', name: 'Biscoff Shake', tagline: 'Thick shake made with Lotus Biscoff speculoos.', price: 180, category: 'shakes', description: 'Creamy shake infused with caramelized Biscoff cookie spread.', image: SHAKE_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.8 },
  { id: 'sh-20', name: 'Ferrero Shake', tagline: 'Thick hazelnut shake with Ferrero chocolate taste.', price: 200, category: 'shakes', description: 'Luxurious shake infused with Ferrero Rocher hazelnut notes.', image: SHAKE_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.9 },
  { id: 'sh-21', name: 'Chocoblast Shake', tagline: 'Extreme chocolate overdose thick shake.', price: 220, category: 'shakes', description: 'Loaded with chocolate sauce, chips, brownie, and cocoa.', image: SHAKE_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.9 },
  { id: 'sh-22', name: 'Pistachio Shake', tagline: 'Premium thick shake with rich pistachio spread.', price: 250, category: 'shakes', description: 'Exotic pistachio thick shake topped with crushed pistachios.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.9 },
  { id: 'sh-23', name: 'Pistachio Nutella Shake', tagline: 'Pistachio cream blended with rich Nutella.', price: 280, category: 'shakes', description: 'Ultimate luxury shake combining rich pistachio sauce and Nutella.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 5.0, featured: true },

  // 5. CHEESE CAKES
  { id: 'cs-1', name: 'Strawberry Cheese Cake', tagline: 'Creamy cheesecake slice topped with strawberry compote.', price: 130, category: 'cheesecake', description: 'Smooth 100% vegetarian cheesecake topped with sweet strawberry filling.', image: CHEESECAKE_IMG, dietary: ['VEG'], rating: 4.6 },
  { id: 'cs-2', name: 'Blueberry Cheese Cake', tagline: 'Rich cheesecake slice topped with blueberry pulp.', price: 140, category: 'cheesecake', description: 'Classic cheesecake topped with tangy blueberry fruit compote.', image: CHEESECAKE_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.7, bestseller: true },
  { id: 'cs-3', name: 'Nutella Cheese Cake', tagline: 'Smooth cheesecake layered with rich Nutella.', price: 150, category: 'cheesecake', description: 'Decadent vegetarian cheesecake generously topped with Nutella.', image: CHEESECAKE_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.8, bestseller: true },
  { id: 'cs-4', name: 'Biscoff Cheese Cake', tagline: 'Cheesecake topped with Lotus Biscoff speculoos spread.', price: 160, category: 'cheesecake', description: 'Velvety cheesecake layered with Biscoff spread and crushed cookies.', image: CHEESECAKE_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.8 },
  { id: 'cs-5', name: 'Pistachio Cheese Cake', tagline: 'Cheesecake infused with rich pistachio spread.', price: 200, category: 'cheesecake', description: 'Exotic cheesecake topped with authentic pistachio cream and nuts.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.9 },
  { id: 'cs-6', name: 'Pistachio Nutella Cheese Cake', tagline: 'Pistachio cream & Nutella layered cheesecake.', price: 230, category: 'cheesecake', description: 'High-end dessert slice pairing pistachio sauce and Nutella on cheesecake.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.9, featured: true },

  // 6. BOWL CAKES (100% Veg)
  { id: 'bc-1', name: 'Classic Dark Chocolate Bowl', tagline: 'Soft cake bowl layered with rich dark chocolate.', price: 130, category: 'bowl-cake', description: 'Warm dessert bowl filled with soft cake and melted dark chocolate.', image: BOWL_IMG, dietary: ['VEG'], rating: 4.6 },
  { id: 'bc-2', name: 'Classic Milk Chocolate Bowl', tagline: 'Cake bowl drenched in smooth milk chocolate.', price: 130, category: 'bowl-cake', description: 'Delicious cake bowl topped with warm milk chocolate.', image: BOWL_IMG, dietary: ['VEG'], rating: 4.5 },
  { id: 'bc-3', name: 'Classic White Chocolate Bowl', tagline: 'Cake bowl with sweet white chocolate sauce.', price: 130, category: 'bowl-cake', description: 'Warm cake bowl layered with silky white chocolate.', image: BOWL_IMG, dietary: ['VEG'], rating: 4.5 },
  { id: 'bc-4', name: 'Double Chocolate Bowl', tagline: 'Layered dark and milk chocolate cake bowl.', price: 140, category: 'bowl-cake', description: 'Combination of dark and milk chocolate over warm cake layers.', image: BOWL_IMG, dietary: ['VEG'], rating: 4.7 },
  { id: 'bc-5', name: 'Tripple Chocolate Bowl', tagline: 'Loaded with dark, milk and white chocolate.', price: 150, category: 'bowl-cake', description: 'Trio of melted chocolates layered over cake.', image: BOWL_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.8, bestseller: true },
  { id: 'bc-6', name: 'Oreo Chocolate Bowl', tagline: 'Chocolate cake bowl with crushed Oreo cookie crunch.', price: 150, category: 'bowl-cake', description: 'Cake bowl drenched in chocolate and loaded with crushed Oreos.', image: BOWL_IMG, dietary: ['VEG'], rating: 4.7 },
  { id: 'bc-7', name: 'Kit-Kat Chocolate Bowl', tagline: 'Chocolate cake bowl with crunchy Kitkat pieces.', price: 150, category: 'bowl-cake', description: 'Cake bowl with melted chocolate and Kitkat crunchies.', image: BOWL_IMG, dietary: ['VEG'], rating: 4.7 },
  { id: 'bc-8', name: 'Blueberry with White Chocolate Bowl', tagline: 'White chocolate cake bowl with tangy blueberry.', price: 160, category: 'bowl-cake', description: 'Silky white chocolate paired with sweet blueberry fruit sauce.', image: BOWL_IMG, dietary: ['VEG'], rating: 4.7 },
  { id: 'bc-9', name: 'Strawberry with White Chocolate Bowl', tagline: 'White chocolate cake bowl with strawberry compote.', price: 160, category: 'bowl-cake', description: 'White chocolate combined with luscious strawberry sauce.', image: BOWL_IMG, dietary: ['VEG'], rating: 4.7 },
  { id: 'bc-10', name: 'Mix Berry with White Chocolate Bowl', tagline: 'White chocolate cake bowl with mixed wild berries.', price: 160, category: 'bowl-cake', description: 'Mixed berry topping over white chocolate cake bowl.', image: BOWL_IMG, dietary: ['VEG'], rating: 4.7 },
  { id: 'bc-11', name: 'Brownie Chocolate Bowl', tagline: 'Cake bowl loaded with fudgy brownie chunks.', price: 170, category: 'bowl-cake', description: 'Decadent cake bowl topped with real chocolate brownie crumble.', image: BOWL_IMG, dietary: ['VEG'], rating: 4.8 },
  { id: 'bc-12', name: 'Nutella Chocolate Bowl', tagline: 'Cake bowl smothered in rich Nutella spread.', price: 180, category: 'bowl-cake', description: 'Overloaded with Nutella hazelnut chocolate sauce.', image: BOWL_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.9, bestseller: true },
  { id: 'bc-13', name: 'Lotus Biscoff Bowl', tagline: 'Cake bowl layered with Biscoff spread and crumbs.', price: 200, category: 'bowl-cake', description: 'Rich Lotus Biscoff cookie spread layered on dessert cake bowl.', image: BOWL_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.8 },
  { id: 'bc-14', name: 'Loaded Bowl', tagline: 'Extravagant bowl with brownies, chips, and chocolate.', price: 220, category: 'bowl-cake', description: 'Fully loaded with brownie, oreo, kitkat, and multi-chocolate layers.', image: BOWL_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.9 },
  { id: 'bc-15', name: 'Pistachio Kunafa Bowl', tagline: 'Pistachio cream with roasted crunchy kataifi kunafa.', price: 250, category: 'bowl-cake', description: 'Arabic kunafa crunch and rich pistachio sauce over cake bowl.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.9 },
  { id: 'bc-16', name: 'Pistachio Kunafa Nutella Bowl', tagline: 'Pistachio, kunafa crunch and Nutella spread.', price: 280, category: 'bowl-cake', description: 'Pistachio spread, crispy kunafa, and Nutella layered together.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 5.0, featured: true },
  { id: 'bc-17', name: 'Pistachio Kunafa Biscoff Bowl', tagline: 'Pistachio, kunafa crunch and Biscoff spread.', price: 300, category: 'bowl-cake', description: 'The pinnacle dessert bowl with pistachio, kunafa, and Biscoff.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 5.0 },
  { id: 'bc-18', name: 'Make Your Own Bowl', tagline: 'Any 2 Chocolates & Any 4 Toppings of your choice.', price: 350, category: 'bowl-cake', description: 'Customizable dessert bowl: pick your 2 favourite chocolates and 4 delicious toppings!', image: BOWL_IMG, dietary: ['VEG', 'CUSTOM', 'SPECIAL'], rating: 5.0, customizable: true, featured: true },

  // 7. BROWNIES
  { id: 'br-1', name: 'Chocolate Brownie', tagline: 'Fudgy, dense 100% veg chocolate brownie.', price: 120, category: 'brownie', description: 'Rich, gooey vegetarian chocolate brownie baked fresh.', image: BROWNIE_IMG, dietary: ['VEG'], rating: 4.6 },
  { id: 'br-2', name: 'Nutella Brownie', tagline: 'Fudgy chocolate brownie drenched in Nutella.', price: 130, category: 'brownie', description: 'Warm brownie topped with generous hazelnut Nutella spread.', image: BROWNIE_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.8, bestseller: true },
  { id: 'br-3', name: 'Lotus Biscoff Brownie', tagline: 'Chocolate brownie topped with Biscoff spread.', price: 140, category: 'brownie', description: 'Fudgy brownie covered with caramelized Biscoff spread and cookie crumbs.', image: BROWNIE_IMG, dietary: ['VEG'], rating: 4.8 },
  { id: 'br-4', name: 'Brownie With Ice Cream', tagline: 'Warm chocolate brownie with a scoop of vanilla ice cream.', price: 150, category: 'brownie', description: 'Sizzling warm brownie served alongside a scoop of vanilla ice cream.', image: BROWNIE_IMG, dietary: ['VEG', 'BESTSELLER'], rating: 4.9, bestseller: true },
  { id: 'br-5', name: 'Pistachio Kunafa Brownie', tagline: 'Brownie topped with pistachio cream & kunafa crunch.', price: 180, category: 'brownie', description: 'Exotic brownie topped with roasted kunafa noodles and pistachio sauce.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.9 },
  { id: 'br-6', name: 'Pistachio Kunafa Nutella Brownie', tagline: 'Pistachio, kunafa crunch and Nutella over brownie.', price: 200, category: 'brownie', description: 'Indulgent brownie covered in Nutella, pistachio sauce, and kunafa.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.9 },
  { id: 'br-7', name: 'Pistachio Kunafa Biscoff Brownie', tagline: 'Pistachio, kunafa crunch and Biscoff over brownie.', price: 220, category: 'brownie', description: 'Ultimate brownie crowned with pistachio cream, Biscoff, and kunafa crunch.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 5.0 },

  // 8. PISTACHIO SPECIALS
  { id: 'pst-1', name: 'Pistachio Waffle', tagline: 'Available as Mini (₹150) or Triangle (₹180).', price: 150, category: 'pistachio', description: 'Fresh waffle topped with authentic pistachio sauce and crushed pistachios.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.8 },
  { id: 'pst-2', name: 'Pistachio + Nutella Waffle', tagline: 'Available as Mini (₹180) or Triangle (₹200).', price: 180, category: 'pistachio', description: 'Luxury combination of creamy pistachio sauce and Nutella on crisp waffle.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL', 'BESTSELLER'], rating: 4.9, bestseller: true },
  { id: 'pst-3', name: 'Pistachio Pan Cake', tagline: '5 pc (₹200) / 10 pc (₹300) options.', price: 200, price5pc: 200, price10pc: 300, category: 'pistachio', description: 'Fluffy mini pancakes drenched in rich pistachio sauce.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.8 },
  { id: 'pst-4', name: 'Pistachio + Nutella Pancake', tagline: '5 pc (₹220) / 10 pc (₹350) options.', price: 220, price5pc: 220, price10pc: 350, category: 'pistachio', description: 'Soft mini pancakes coated in rich pistachio spread and Nutella.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.9 },
  { id: 'pst-5', name: 'Pistachio Shake', tagline: 'Thick creamy milkshake infused with pistachio.', price: 250, category: 'pistachio', description: 'Chilled thick shake made with real pistachio spread and nuts.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.9 },
  { id: 'pst-6', name: 'Pistachio + Nutella Shake', tagline: 'Pistachio cream blended with rich Nutella.', price: 280, category: 'pistachio', description: 'The pinnacle thick shake combining pistachio cream and Nutella.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 5.0, featured: true },
  { id: 'pst-7', name: 'Pistachio Cheese Cake', tagline: 'Creamy cheesecake slice topped with pistachio cream.', price: 200, category: 'pistachio', description: 'Vegetarian cheesecake topped with rich pistachio spread and crushed pistachios.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.9 },
  { id: 'pst-8', name: 'Pistachio + Nutella Cheese Cake', tagline: 'Cheesecake slice with pistachio cream and Nutella.', price: 230, category: 'pistachio', description: 'Decadent cheesecake layered with rich pistachio spread and Nutella.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.9 },
  { id: 'pst-9', name: 'Pistachio + Biscoff Cheese Cake', tagline: 'Cheesecake slice with pistachio cream and Biscoff.', price: 250, category: 'pistachio', description: 'Cheesecake topped with both pistachio cream and Lotus Biscoff spread.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 5.0 },
  { id: 'pst-10', name: 'Pistachio Bowl Cake', tagline: 'Cake bowl topped with rich pistachio sauce.', price: 250, category: 'pistachio', description: 'Warm dessert cake bowl layered with pistachio sauce.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.8 },
  { id: 'pst-11', name: 'Pistachio + Nutella Bowl Cake', tagline: 'Cake bowl with pistachio cream & Nutella.', price: 280, category: 'pistachio', description: 'Dessert cake bowl smothered in pistachio sauce and Nutella.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 4.9 },
  { id: 'pst-12', name: 'Pistachio + Biscoff Bowl Cake', tagline: 'Cake bowl with pistachio cream & Biscoff.', price: 300, category: 'pistachio', description: 'Cake bowl loaded with rich pistachio sauce and Lotus Biscoff spread.', image: PISTACHIO_IMG, dietary: ['VEG', 'SPECIAL'], rating: 5.0 }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-ronak',
    author: 'Ronak',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'Very good place if you crave waffles!!! Waffles were bit less crunchy but the taste was too good. They also serve a variety of desserts like tub cakes and shakes.',
    orderedDish: 'Tub Cakes & Shakes',
    date: '4 months ago • Dine in',
    verified: true,
    likes: 12
  },
  {
    id: 'rev-juhi',
    author: 'Juhi Gupta',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'Tried the triple mini waffle. It was too good. Next was KitKat waffle.. simply AMAZING! Had to wait for 20-25 mins as there was a long queue before me for his amazing waffles.. but worth the wait! Will revisit!',
    orderedDish: 'Triple Mini Waffle & KitKat Waffle',
    date: '3 years ago • Local Guide',
    verified: true,
    likes: 35
  },
  {
    id: 'rev-saurabh',
    author: 'SAURABH SHUKLA',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'I just love their waffle in a week time I visited twice to have waffle 😋. Good place to have waffle in Malad',
    orderedDish: 'Fresh Waffle in Malad',
    date: '3 years ago • Local Guide',
    verified: true,
    likes: 28
  },
  {
    id: 'rev-hygiene',
    author: 'Verified Local Guide',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'The place is supremely hygienic and amazing quality waffles... Would be definitely adding this in my go to dessert place. Everyone should try once to experience pocket friendly waffles.',
    orderedDish: 'Pocket Friendly Waffles',
    date: '3 years ago • Takeaway',
    verified: true,
    likes: 19
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Freshly Baked Mini Waffles',
    category: 'waffles',
    image: WAFFLE_IMG,
    likes: 450,
    caption: 'Made fresh to order at Gol Garden, Malad East.',
    aspectRatio: 'portrait'
  },
  {
    id: 'g-2',
    title: 'Fluffy Mini Pancakes',
    category: 'pancakes',
    image: PANCAKE_IMG,
    likes: 380,
    caption: '100% Veg mini pancakes with chocolate drizzles.',
    aspectRatio: 'square'
  },
  {
    id: 'g-3',
    title: 'Overloaded Shakes',
    category: 'shakes',
    image: SHAKE_IMG,
    likes: 520,
    caption: 'Thick, creamy shakes served cold every evening.',
    aspectRatio: 'portrait'
  },
  {
    id: 'g-4',
    title: 'Pistachio Kunafa Bowl Cake',
    category: 'bowlcakes',
    image: PISTACHIO_IMG,
    likes: 610,
    caption: 'Signature Pistachio Kunafa creation.',
    aspectRatio: 'wide'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: WAFFLE_IMG,
    likes: '1.2k',
    comments: 45,
    caption: 'Night cravings hit different opposite Gol Garden! 🧇 Open till 2 AM.'
  },
  {
    id: 'ig-2',
    image: PANCAKE_IMG,
    likes: '980',
    comments: 32,
    caption: 'Fresh mini pancakes starting at ₹70! 100% Veg 🌱'
  },
  {
    id: 'ig-3',
    image: SHAKE_IMG,
    likes: '1.1k',
    comments: 50,
    caption: 'Chill with our thick Nutella & Cold Coffee shakes 🥤'
  },
  {
    id: 'ig-4',
    image: PISTACHIO_IMG,
    likes: '1.5k',
    comments: 68,
    caption: 'Pistachio + Nutella overload! Have you tried it yet?'
  }
];
