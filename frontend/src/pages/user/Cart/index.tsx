import { ROUTES } from '../../../constants'
import React from 'react';
import { useApp } from '../../../contexts/AppContext';
import { formatPrice } from '../../../constants/products';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, navigate } = useApp();

  if (cartItems.length === 0) {
    return (
      <div className="bg-base-200 min-h-screen flex items-center justify-center">
        <div className="text-center py-20 space-y-4">
          <div className="text-8xl">ðŸ›’</div>
          <h2 className="text-2xl font-black">Giá» hÃ ng trá»‘ng</h2>
          <p className="text-base-content/60">HÃ£y chá»n thÃªm sáº£n pháº©m Ä‘á»ƒ tiáº¿p tá»¥c mua sáº¯m!</p>
          <button onClick={() => navigate(ROUTES.PRODUCTS)} className="btn btn-primary">
            Tiáº¿p tá»¥c mua sáº¯m
          </button>
        </div>
      </div>
    );
  }

  const shipping = cartTotal >= 2000000 ? 0 : 50000;
  const total = cartTotal + shipping;

  return (
    <div className="bg-base-200 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <div className="breadcrumbs text-sm mb-4">
          <ul>
            <li><button onClick={() => navigate(ROUTES.HOME)} className="hover:text-primary">Trang chá»§</button></li>
            <li className="text-primary font-semibold">Giá» hÃ ng</li>
          </ul>
        </div>

        <h1 className="text-2xl font-black mb-6">Giá» hÃ ng ({cartItems.reduce((s, i) => s + i.quantity, 0)} sáº£n pháº©m)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {cartItems.map(item => (
              <div key={item.id} className="bg-base-100 rounded-xl p-4 border border-base-200 flex gap-4 items-start">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-xl object-cover cursor-pointer flex-shrink-0"
                  onClick={() => navigate(ROUTES.PRODUCT_DETAIL, { product: item })}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold leading-snug mb-1 cursor-pointer hover:text-primary transition-colors" onClick={() => navigate(ROUTES.PRODUCT_DETAIL, { product: item })}>
                    {item.name}
                  </p>
                  <p className="text-xs text-base-content/50 mb-2">{item.category} â€¢ Báº£o hÃ nh 24 thÃ¡ng</p>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center border border-base-300 rounded-lg overflow-hidden">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="btn btn-ghost btn-sm rounded-none w-10">-</button>
                      <span className="font-bold w-10 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="btn btn-ghost btn-sm rounded-none w-10">+</button>
                    </div>
                    <div className="text-right">
                      <p className="text-primary font-black">{formatPrice(item.price * item.quantity)}</p>
                      <p className="text-xs text-base-content/40">{formatPrice(item.price)} / sáº£n pháº©m</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="btn btn-ghost btn-sm text-error gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      XoÃ¡
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Promo code */}
            <div className="bg-base-100 rounded-xl p-4 border border-base-200">
              <h3 className="font-semibold mb-3">MÃ£ giáº£m giÃ¡</h3>
              <div className="flex gap-2">
                <input type="text" placeholder="Nháº­p mÃ£ khuyáº¿n mÃ£i" className="input input-bordered flex-1 focus:outline-primary" />
                <button className="btn btn-outline">Ãp dá»¥ng</button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="bg-base-100 rounded-xl p-5 border border-base-200 sticky top-20">
              <h3 className="font-bold text-lg mb-4">TÃ³m táº¯t Ä‘Æ¡n hÃ ng</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-base-content/70">Táº¡m tÃ­nh ({cartItems.reduce((s, i) => s + i.quantity, 0)} sp):</span>
                  <span className="font-semibold">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/70">PhÃ­ váº­n chuyá»ƒn:</span>
                  <span className={`font-semibold ${shipping === 0 ? 'text-success' : ''}`}>
                    {shipping === 0 ? 'Miá»…n phÃ­' : formatPrice(shipping)}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-success bg-success/10 rounded-lg px-3 py-2">âœ“ ÄÆ¡n hÃ ng Ä‘Æ°á»£c miá»…n phÃ­ váº­n chuyá»ƒn!</p>
                )}
                <div className="divider my-2" />
                <div className="flex justify-between text-base font-black">
                  <span>Tá»•ng cá»™ng:</span>
                  <span className="text-primary text-lg">{formatPrice(total)}</span>
                </div>
              </div>
              <button onClick={() => navigate(ROUTES.CHECKOUT)} className="btn btn-primary w-full mt-5 gap-2">
                Tiáº¿n hÃ nh thanh toÃ¡n
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button onClick={() => navigate(ROUTES.PRODUCTS)} className="btn btn-ghost w-full mt-2 btn-sm">
                â† Tiáº¿p tá»¥c mua sáº¯m
              </button>
            </div>

            <div className="bg-base-100 rounded-xl p-4 border border-base-200 space-y-2">
              <p className="font-semibold text-sm mb-2">Cam káº¿t cá»§a chÃºng tÃ´i</p>
              {['ðŸ”’ Thanh toÃ¡n 100% báº£o máº­t', 'ðŸšš Giao hÃ ng nhanh 24h', 'ðŸ”„ Äá»•i tráº£ miá»…n phÃ­ 30 ngÃ y'].map(t => (
                <p key={t} className="text-xs text-base-content/70">{t}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

