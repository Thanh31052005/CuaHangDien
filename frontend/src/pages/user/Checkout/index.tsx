import { ROUTES } from '../../../constants'
import React, { useState } from 'react';
import { useApp } from '../../../contexts/AppContext';
import { formatPrice } from '../../../constants/products';

export default function CheckoutPage() {
  const { cartItems, cartTotal, navigate } = useApp();
  const [step, setStep] = useState(1);
  const [payMethod, setPayMethod] = useState('cod');
  const [submitted, setSubmitted] = useState(false);

  const shipping = cartTotal >= 2000000 ? 0 : 50000;
  const total = cartTotal + shipping;

  if (submitted) {
    return (
      <div className="bg-base-200 min-h-screen flex items-center justify-center">
        <div className="bg-base-100 rounded-2xl p-10 max-w-md w-full text-center shadow-xl border border-base-200 space-y-4">
          <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto text-4xl">âœ“</div>
          <h2 className="text-2xl font-black text-success">Äáº·t hÃ ng thÃ nh cÃ´ng!</h2>
          <p className="text-base-content/70">MÃ£ Ä‘Æ¡n hÃ ng: <strong className="text-primary">#EP{Date.now().toString().slice(-6)}</strong></p>
          <p className="text-sm text-base-content/60">Cáº£m Æ¡n báº¡n Ä‘Ã£ mua hÃ ng táº¡i ElecPro. ChÃºng tÃ´i sáº½ giao hÃ ng cho báº¡n trong 24 giá»!</p>
          <button onClick={() => navigate(ROUTES.HOME)} className="btn btn-primary w-full">Tiáº¿p tá»¥c mua sáº¯m</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-200 min-h-screen py-6">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="breadcrumbs text-sm mb-4">
          <ul>
            <li><button onClick={() => navigate(ROUTES.HOME)} className="hover:text-primary">Trang chá»§</button></li>
            <li><button onClick={() => navigate(ROUTES.CART)} className="hover:text-primary">Giá» hÃ ng</button></li>
            <li className="text-primary font-semibold">Thanh toÃ¡n</li>
          </ul>
        </div>

        {/* Steps */}
        <ul className="steps steps-horizontal w-full mb-8">
          <li className={`step ${step >= 1 ? 'step-primary' : ''} font-medium text-sm`}>ThÃ´ng tin</li>
          <li className={`step ${step >= 2 ? 'step-primary' : ''} font-medium text-sm`}>Thanh toÃ¡n</li>
          <li className={`step ${step >= 3 ? 'step-primary' : ''} font-medium text-sm`}>XÃ¡c nháº­n</li>
        </ul>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Step 1 */}
            {step === 1 && (
              <div className="bg-base-100 rounded-2xl p-6 border border-base-200 space-y-4">
                <h2 className="font-bold text-lg mb-2">ThÃ´ng tin giao hÃ ng</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label py-1"><span className="label-text font-medium">Há» vÃ  tÃªn *</span></label>
                    <input type="text" className="input input-bordered focus:input-primary" placeholder="Nguyá»…n VÄƒn A" />
                  </div>
                  <div className="form-control">
                    <label className="label py-1"><span className="label-text font-medium">Sá»‘ Ä‘iá»‡n thoáº¡i *</span></label>
                    <input type="tel" className="input input-bordered focus:input-primary" placeholder="09xxxxxxxx" />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label py-1"><span className="label-text font-medium">Email</span></label>
                  <input type="email" className="input input-bordered focus:input-primary" placeholder="example@email.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label py-1"><span className="label-text font-medium">Tá»‰nh / ThÃ nh phá»‘ *</span></label>
                    <select className="select select-bordered focus:outline-primary">
                      <option value="">Chá»n tá»‰nh thÃ nh</option>
                      <option>TP. Há»“ ChÃ­ Minh</option>
                      <option>HÃ  Ná»™i</option>
                      <option>ÄÃ  Náºµng</option>
                      <option>BÃ¬nh DÆ°Æ¡ng</option>
                      <option>Äá»“ng Nai</option>
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label py-1"><span className="label-text font-medium">Quáº­n / Huyá»‡n *</span></label>
                    <select className="select select-bordered focus:outline-primary">
                      <option value="">Chá»n quáº­n huyá»‡n</option>
                      <option>Quáº­n 1</option>
                      <option>Quáº­n 3</option>
                      <option>Quáº­n 7</option>
                    </select>
                  </div>
                </div>
                <div className="form-control">
                  <label className="label py-1"><span className="label-text font-medium">Äá»‹a chá»‰ cá»¥ thá»ƒ *</span></label>
                  <input type="text" className="input input-bordered focus:input-primary" placeholder="Sá»‘ nhÃ , tÃªn Ä‘Æ°á»ng..." />
                </div>
                <div className="form-control">
                  <label className="label py-1"><span className="label-text font-medium">Ghi chÃº</span></label>
                  <textarea className="textarea textarea-bordered focus:outline-primary h-20" placeholder="LÆ°u Ã½ cho ngÆ°á»i giao hÃ ng..." />
                </div>
                <button onClick={() => setStep(2)} className="btn btn-primary w-full mt-2">
                  Tiáº¿p tá»¥c â†’ Chá»n thanh toÃ¡n
                </button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="bg-base-100 rounded-2xl p-6 border border-base-200 space-y-4">
                <h2 className="font-bold text-lg mb-2">PhÆ°Æ¡ng thá»©c thanh toÃ¡n</h2>
                <div className="space-y-3">
                  {[
                    { id: 'cod', label: 'Thanh toÃ¡n khi nháº­n hÃ ng (COD)', icon: 'ðŸ’µ', desc: 'Nháº­n hÃ ng rá»“i tráº£ tiá»n' },
                    { id: 'bank', label: 'Chuyá»ƒn khoáº£n ngÃ¢n hÃ ng', icon: 'ðŸ¦', desc: 'VCB, BIDV, Techcombank,...' },
                    { id: 'momo', label: 'VÃ­ Ä‘iá»‡n tá»­ MoMo', icon: 'ðŸ’œ', desc: 'Thanh toÃ¡n nhanh qua MoMo' },
                    { id: 'card', label: 'Tháº» tÃ­n dá»¥ng / Ghi ná»£', icon: 'ðŸ’³', desc: 'Visa, Mastercard, JCB' },
                  ].map(m => (
                    <label key={m.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${payMethod === m.id ? 'border-primary bg-primary/5' : 'border-base-200 hover:border-primary/30'}`}>
                      <input type="radio" name="pay" value={m.id} checked={payMethod === m.id} onChange={() => setPayMethod(m.id)} className="radio radio-primary" />
                      <span className="text-2xl">{m.icon}</span>
                      <div>
                        <p className="font-semibold">{m.label}</p>
                        <p className="text-xs text-base-content/60">{m.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {payMethod === 'card' && (
                  <div className="bg-base-200 rounded-xl p-4 space-y-3">
                    <div className="form-control">
                      <label className="label py-1"><span className="label-text font-medium">Sá»‘ tháº»</span></label>
                      <input type="text" className="input input-bordered focus:input-primary" placeholder="0000 0000 0000 0000" maxLength={19} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="form-control">
                        <label className="label py-1"><span className="label-text font-medium">NgÃ y háº¿t háº¡n</span></label>
                        <input type="text" className="input input-bordered focus:input-primary" placeholder="MM/YY" maxLength={5} />
                      </div>
                      <div className="form-control">
                        <label className="label py-1"><span className="label-text font-medium">CVV</span></label>
                        <input type="text" className="input input-bordered focus:input-primary" placeholder="â€¢â€¢â€¢" maxLength={3} />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn btn-ghost flex-1">â† Quay láº¡i</button>
                  <button onClick={() => setStep(3)} className="btn btn-primary flex-1">Xem xÃ¡c nháº­n â†’</button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="bg-base-100 rounded-2xl p-6 border border-base-200 space-y-4">
                <h2 className="font-bold text-lg mb-2">XÃ¡c nháº­n Ä‘Æ¡n hÃ ng</h2>
                <div className="space-y-2 divide-y divide-base-200">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-3 py-3 first:pt-0">
                      <img src={item.image} className="w-14 h-14 rounded-lg object-cover" alt="" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold line-clamp-1">{item.name}</p>
                        <p className="text-xs text-base-content/50">SL: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-primary text-sm">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-base-200 rounded-xl p-4 text-sm space-y-1">
                  <div className="flex justify-between"><span>Táº¡m tÃ­nh:</span><span>{formatPrice(cartTotal)}</span></div>
                  <div className="flex justify-between"><span>Váº­n chuyá»ƒn:</span><span className={shipping === 0 ? 'text-success' : ''}>{shipping === 0 ? 'Miá»…n phÃ­' : formatPrice(shipping)}</span></div>
                  <div className="flex justify-between font-black text-base"><span>Tá»•ng cá»™ng:</span><span className="text-primary">{formatPrice(total)}</span></div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="btn btn-ghost flex-1">â† Quay láº¡i</button>
                  <button
                    onClick={() => setSubmitted(true)}
                    className="btn btn-success flex-1 gap-2"
                  >
                    âœ“ Äáº·t hÃ ng ngay
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary sidebar */}
          <div className="bg-base-100 rounded-2xl p-5 border border-base-200 h-fit sticky top-20">
            <h3 className="font-bold mb-3">ÄÆ¡n hÃ ng ({cartItems.length} sáº£n pháº©m)</h3>
            <div className="space-y-3 mb-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-2 items-center text-sm">
                  <img src={item.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                  <div className="flex-1 min-w-0">
                    <p className="line-clamp-1 font-medium">{item.name}</p>
                    <p className="text-xs text-base-content/50">x{item.quantity}</p>
                  </div>
                  <p className="font-bold text-primary text-xs whitespace-nowrap">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-base-200 pt-3 space-y-1 text-sm">
              <div className="flex justify-between"><span>Táº¡m tÃ­nh:</span><span>{formatPrice(cartTotal)}</span></div>
              <div className="flex justify-between"><span>Váº­n chuyá»ƒn:</span><span>{shipping === 0 ? 'Miá»…n phÃ­' : formatPrice(shipping)}</span></div>
              <div className="flex justify-between font-black mt-2"><span>Tá»•ng:</span><span className="text-primary">{formatPrice(total)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

