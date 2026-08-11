import React, { useState } from 'react';
import { CartItem } from '../../types';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, MapPin, CheckCircle2, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { useAudioSound } from '../../hooks/useAudioSound';
import { useAuth } from '../../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const { playClickSound, playSuccessSound } = useAudioSound();
  const { user, userData } = useAuth();

  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // 0.1 for 10%
  const [promoMessage, setPromoMessage] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0);
  const deliveryFee = orderType === 'delivery' ? 40 : 0;
  const discountAmount = subtotal * appliedDiscount;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    if (promoCode.trim().toUpperCase() === 'WAFFLE10') {
      setAppliedDiscount(0.1);
      setPromoMessage('10% Discount Applied!');
    } else if (promoCode.trim().toUpperCase() === 'MALAD15') {
      setAppliedDiscount(0.15);
      setPromoMessage('15% Malad Foodie Discount Applied!');
    } else {
      setPromoMessage('Invalid Code (Try: WAFFLE10)');
    }
  };

  const handleCheckout = async () => {
    playSuccessSound();
    setIsCheckingOut(true);

    const orderData = {
      userId: user?.uid || 'guest-checkout',
      userName: userData?.displayName || user?.displayName || 'Valued Guest',
      userEmail: user?.email || null,
      userPhone: user?.phoneNumber || null,
      items: items.map(item => ({
        id: item.id,
        name: item.product.name,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
        selectedOption: item.selectedOption || 'Standard',
      })),
      subtotal,
      deliveryFee,
      discountAmount,
      grandTotal,
      orderType,
      status: 'received',
      createdAt: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, 'orders'), orderData);
    } catch (err) {
      console.warn('Could not store order in Firestore:', err);
    }

    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
    }, 1000);
  };


  const handleFinish = () => {
    onClearCart();
    setOrderComplete(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#120B08]/80 backdrop-blur-md animate-fade-in">
      
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-[#1D120D] border-l border-[#3A2318] h-full shadow-2xl flex flex-col justify-between z-10 overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#3A2318] flex items-center justify-between bg-[#120B08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D48C29]/20 border border-[#D48C29] text-[#F3A83B] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#FAF4EC]">Your Waffle Order</h2>
              <p className="text-[11px] text-[#D1C5B6]">
                {items.length} {items.length === 1 ? 'creation' : 'creations'} in basket
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#1D120D] text-[#D1C5B6] hover:text-[#FAF4EC] hover:bg-[#3A2318] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {orderComplete ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#D48C29]/20 border border-[#F3A83B] text-[#F3A83B] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(243,168,59,0.3)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-[#FAF4EC]">Order Confirmed!</h3>
              <p className="text-xs text-[#D1C5B6] max-w-xs mx-auto leading-relaxed">
                Your Liege waffles are being pressed right now on the iron. Est. readiness in{' '}
                <strong className="text-[#F3A83B]">8-12 minutes</strong>.
              </p>
              <div className="p-4 rounded-2xl bg-[#120B08] border border-[#3A2318] text-xs text-left space-y-2">
                <div className="flex justify-between text-[#D1C5B6]">
                  <span>Order ID:</span>
                  <strong className="text-[#FAF4EC] font-mono">#WOW-{Math.floor(1000 + Math.random() * 9000)}</strong>
                </div>
                <div className="flex justify-between text-[#D1C5B6]">
                  <span>Pickup Location:</span>
                  <strong className="text-[#F3A83B]">Opposite Gol Garden, Malad East</strong>
                </div>
              </div>
              <button
                onClick={handleFinish}
                className="w-full py-3.5 rounded-2xl bg-[#D48C29] text-[#120B08] font-syne font-bold text-xs uppercase"
              >
                Done
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#120B08] border border-[#3A2318] text-[#D1C5B6] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-serif text-xl text-[#FAF4EC]">Your Order is Empty</p>
              <p className="text-xs text-[#D1C5B6] max-w-xs mx-auto">
                Select a golden creation from our live menu or build a custom Liege waffle!
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#D48C29] text-[#120B08] font-syne font-bold text-xs uppercase tracking-wider"
              >
                Browse Creations
              </button>
            </div>
          ) : (
            <>
              {/* Order Type Toggle */}
              <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#120B08] border border-[#3A2318]">
                <button
                  onClick={() => {
                    playClickSound();
                    setOrderType('pickup');
                  }}
                  className={`py-2 text-xs font-syne font-bold uppercase rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    orderType === 'pickup'
                      ? 'bg-[#D48C29] text-[#120B08]'
                      : 'text-[#D1C5B6] hover:text-[#FAF4EC]'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" /> Truck Pickup
                </button>

                <button
                  onClick={() => {
                    playClickSound();
                    setOrderType('delivery');
                  }}
                  className={`py-2 text-xs font-syne font-bold uppercase rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    orderType === 'delivery'
                      ? 'bg-[#D48C29] text-[#120B08]'
                      : 'text-[#D1C5B6] hover:text-[#FAF4EC]'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" /> Express Delivery
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-[#120B08] border border-[#3A2318] flex items-center justify-between gap-3"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover border border-[#3A2318] shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="font-serif font-bold text-sm text-[#FAF4EC] truncate">
                        {item.product.name}
                      </div>

                      {item.customToppings && item.customToppings.length > 0 && (
                        <div className="text-[10px] text-[#F3A83B] truncate mt-0.5">
                          Toppings: {item.customToppings.join(', ')}
                        </div>
                      )}

                      <div className="font-serif text-sm font-bold text-[#F3A83B] mt-1">
                        ₹{item.totalPrice * item.quantity}
                      </div>
                    </div>

                    {/* Qty Controls */}
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => {
                          playClickSound();
                          onRemoveItem(item.id);
                        }}
                        className="text-[#D1C5B6]/50 hover:text-red-400 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-2 bg-[#1D120D] border border-[#3A2318] rounded-lg px-2 py-0.5 text-xs">
                        <button
                          onClick={() => {
                            playClickSound();
                            onUpdateQuantity(item.id, item.quantity - 1);
                          }}
                          className="text-[#D1C5B6] hover:text-[#FAF4EC]"
                        >
                          -
                        </button>
                        <span className="font-bold text-[#FAF4EC] text-[11px] min-w-[14px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            playClickSound();
                            onUpdateQuantity(item.id, item.quantity + 1);
                          }}
                          className="text-[#D1C5B6] hover:text-[#FAF4EC]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#F3A83B]" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo Code (WAFFLE10)"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#120B08] border border-[#3A2318] text-xs text-[#FAF4EC] uppercase focus:outline-none focus:border-[#F3A83B]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#2C1810] border border-[#3A2318] text-xs font-syne text-[#FAF4EC] hover:border-[#F3A83B]"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className="text-[10px] text-[#F3A83B] font-mono">{promoMessage}</p>
                )}
              </form>
            </>
          )}

        </div>

        {/* Drawer Footer Summary & Checkout */}
        {!orderComplete && items.length > 0 && (
          <div className="p-6 border-t border-[#3A2318] bg-[#120B08] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#D1C5B6]">
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-[#F3A83B]">
                  <span>Discount:</span>
                  <span>-₹{Math.round(discountAmount)}</span>
                </div>
              )}

              {orderType === 'delivery' && (
                <div className="flex justify-between text-[#D1C5B6]">
                  <span>Delivery Charge:</span>
                  <span>₹{deliveryFee}</span>
                </div>
              )}

              <div className="flex justify-between font-serif text-lg font-bold text-[#FAF4EC] pt-2 border-t border-[#3A2318]">
                <span>Grand Total:</span>
                <span className="text-[#F3A83B]">₹{Math.round(grandTotal)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-3.5 rounded-2xl bg-[#D48C29] hover:bg-[#F3A83B] text-[#120B08] font-syne font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(212,140,41,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isCheckingOut ? (
                <span>Pressing Order...</span>
              ) : (
                <>
                  <span>Proceed to Live Press Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
