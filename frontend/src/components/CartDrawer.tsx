import React from 'react';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../data/products';

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
        <div className="flex items-center justify-between p-5 border-b border-base-200">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Giỏ hàng
            <span className="badge badge-primary badge-sm ml-1">{cartItems.reduce((s, i) => s + i.quantity, 0)}</span>
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="btn btn-ghost btn-sm btn-circle hover:rotate-90 transition-transform">✕</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-base-content/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="font-semibold">Giỏ hàng trống</p>
              <button onClick={() => { setIsCartOpen(false); navigate('products'); }} className="btn btn-primary btn-sm">
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex gap-3 group">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-base-200 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold line-clamp-2 leading-snug mb-1">{item.name}</p>
                  <p className="text-primary font-bold text-sm">{formatPrice(item.price)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-base-300 rounded-lg overflow-hidden">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="btn btn-ghost btn-xs h-7 min-h-0 w-7 rounded-none">-</button>
                      <span className="text-sm font-semibold w-7 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="btn btn-ghost btn-xs h-7 min-h-0 w-7 rounded-none">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="btn btn-ghost btn-xs text-error hover:bg-error/10">
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
          <div className="border-t border-base-200 p-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-base-content/70">Tạm tính:</span>
              <span className="font-black text-xl text-primary">{formatPrice(cartTotal)}</span>
            </div>
            <p className="text-xs text-success font-medium text-center">✓ Bạn được miễn phí vận chuyển!</p>
            <div className="flex gap-2">
              <button onClick={() => { setIsCartOpen(false); navigate('cart'); }} className="btn btn-outline flex-1">
                Xem giỏ hàng
              </button>
              <button onClick={() => { setIsCartOpen(false); navigate('checkout'); }} className="btn btn-primary flex-1">
                Thanh toán
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
