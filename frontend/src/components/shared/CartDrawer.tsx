import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { formatPrice } from '../../constants/products';
import { ROUTES } from '../../constants';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotal, navigate } = useApp();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsCartOpen(false)}
      />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-base-100 z-[110] flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-base-200 bg-gradient-to-r from-primary/5 to-transparent">
          <h2 className="font-bold text-lg flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            Giỏ hàng
            <span className="bg-primary text-primary-content text-xs font-bold px-2 py-0.5 rounded-full">{cartItems.reduce((s, i) => s + i.quantity, 0)}</span>
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="btn btn-ghost btn-sm btn-circle hover:rotate-90 transition-transform">✕</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-base-content/40">
              <div className="w-20 h-20 rounded-2xl bg-base-200 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="font-semibold text-base-content/60">Giỏ hàng trống</p>
              <button onClick={() => { setIsCartOpen(false); navigate(ROUTES.PRODUCTS); }} className="btn btn-primary btn-sm rounded-xl shadow-md shadow-primary/20">
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex gap-3 p-3 rounded-2xl bg-base-200/40 hover:bg-base-200/70 transition-colors">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-base-200 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold line-clamp-2 leading-snug mb-1">{item.name}</p>
                  <p className="text-primary font-bold text-sm">{formatPrice(item.price)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-base-300 rounded-xl overflow-hidden bg-base-100">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="btn btn-ghost btn-xs h-7 min-h-0 w-8 rounded-none text-base">−</button>
                      <span className="text-sm font-bold w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="btn btn-ghost btn-xs h-7 min-h-0 w-8 rounded-none text-base">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="btn btn-ghost btn-xs text-error hover:bg-error/10 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-base-200 p-5 space-y-4 bg-gradient-to-t from-base-200/30 to-transparent">
            <div className="flex justify-between items-center">
              <span className="text-base-content/60 text-sm">Tạm tính:</span>
              <span className="font-black text-xl text-primary">{formatPrice(cartTotal)}</span>
            </div>
            <p className="text-xs text-success font-medium text-center bg-success/10 rounded-xl py-2">✓ Bạn được miễn phí vận chuyển!</p>
            <div className="flex gap-2">
              <button onClick={() => { setIsCartOpen(false); navigate(ROUTES.CART); }} className="btn btn-outline flex-1 rounded-xl">
                Xem giỏ hàng
              </button>
              <button onClick={() => { setIsCartOpen(false); navigate(ROUTES.CHECKOUT); }} className="btn btn-primary flex-1 rounded-xl shadow-md shadow-primary/20">
                Thanh toán
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
