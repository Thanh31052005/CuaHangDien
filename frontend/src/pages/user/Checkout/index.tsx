import { ROUTES } from '../../../constants'
import React, { useState } from 'react';
import { useApp } from '../../../contexts/AppContext';
import { formatPrice } from '../../../constants/products';
import { promotionService } from '../../../services/promotion';
import { orderService } from '../../../services/order';

export default function CheckoutPage() {
  const { cartItems, cartTotal, navigate } = useApp();
  const [step, setStep] = useState(1);
  const [payMethod, setPayMethod] = useState('cod');
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [specificAddress, setSpecificAddress] = useState('');
  const [note, setNote] = useState('');

  // Promo State
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promoMessage, setPromoMessage] = useState({ text: '', type: '' });

  // Submit State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const shipping = cartTotal >= 2000000 ? 0 : 50000;
  const total = cartTotal + shipping - discountAmount;

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    setIsApplyingPromo(true);
    setPromoMessage({ text: '', type: '' });
    try {
      const res = await promotionService.applyPromotion(promoCode, cartTotal);
      setDiscountAmount(res.discountAmount);
      setPromoMessage({ text: 'Áp dụng mã thành công!', type: 'success' });
    } catch (err: any) {
      setDiscountAmount(0);
      setPromoMessage({ text: err.response?.data?.message || err.message || 'Mã không hợp lệ', type: 'error' });
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleCheckout = async () => {
    if (!fullName || !phone || !province || !district || !specificAddress) {
      setErrorMsg('Vui lòng điền đầy đủ thông tin bắt buộc (*)');
      return;
    }
    const shippingAddress = `${specificAddress}, ${district}, ${province}`;
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await orderService.checkout({
        shippingAddress,
        phoneNumber: phone,
        paymentMethod: payMethod,
        promotionCode: promoCode || undefined
      });
      setSubmitted(true);
      // Nếu có hàm clearCart trong AppContext, bạn có thể gọi ở đây
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Có lỗi xảy ra khi đặt hàng');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-base-200 min-h-screen flex items-center justify-center">
        <div className="bg-base-100 rounded-2xl p-10 max-w-md w-full text-center shadow-xl border border-base-200 space-y-4">
          <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto text-4xl">✓</div>
          <h2 className="text-2xl font-black text-success">Đặt hàng thành công!</h2>
          <p className="text-base-content/70">Mã đơn hàng: <strong className="text-primary">#EP{Date.now().toString().slice(-6)}</strong></p>
          <p className="text-sm text-base-content/60">Cảm ơn bạn đã mua hàng tại ElecPro. Chúng tôi sẽ giao hàng cho bạn trong 24 giờ!</p>
          <button onClick={() => navigate(ROUTES.HOME)} className="btn btn-primary w-full">Tiếp tục mua sắm</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-200 min-h-screen py-6">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="breadcrumbs text-sm mb-4">
          <ul>
            <li><button onClick={() => navigate(ROUTES.HOME)} className="hover:text-primary">Trang chủ</button></li>
            <li><button onClick={() => navigate(ROUTES.CART)} className="hover:text-primary">Giỏ hàng</button></li>
            <li className="text-primary font-semibold">Thanh toán</li>
          </ul>
        </div>

        {/* Steps */}
        <ul className="steps steps-horizontal w-full mb-8">
          <li className={`step ${step >= 1 ? 'step-primary' : ''} font-medium text-sm`}>Thông tin</li>
          <li className={`step ${step >= 2 ? 'step-primary' : ''} font-medium text-sm`}>Thanh toán</li>
          <li className={`step ${step >= 3 ? 'step-primary' : ''} font-medium text-sm`}>Xác nhận</li>
        </ul>

        {errorMsg && (
          <div className="alert alert-error mb-4 shadow-sm text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Step 1 */}
            {step === 1 && (
              <div className="bg-base-100 rounded-2xl p-6 border border-base-200 space-y-4">
                <h2 className="font-bold text-lg mb-2">Thông tin giao hàng</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label py-1"><span className="label-text font-medium">Họ và tên *</span></label>
                    <input value={fullName} onChange={e => setFullName(e.target.value)} type="text" className="input input-bordered focus:input-primary" placeholder="Nguyễn Văn A" />
                  </div>
                  <div className="form-control">
                    <label className="label py-1"><span className="label-text font-medium">Số điện thoại *</span></label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" className="input input-bordered focus:input-primary" placeholder="09xxxxxxxx" />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label py-1"><span className="label-text font-medium">Email</span></label>
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="input input-bordered focus:input-primary" placeholder="example@email.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label py-1"><span className="label-text font-medium">Tỉnh / Thành phố *</span></label>
                    <select value={province} onChange={e => setProvince(e.target.value)} className="select select-bordered focus:outline-primary">
                      <option value="">Chọn tỉnh thành</option>
                      <option>TP. Hồ Chí Minh</option>
                      <option>Hà Nội</option>
                      <option>Đà Nẵng</option>
                      <option>Bình Dương</option>
                      <option>Đồng Nai</option>
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label py-1"><span className="label-text font-medium">Quận / Huyện *</span></label>
                    <select value={district} onChange={e => setDistrict(e.target.value)} className="select select-bordered focus:outline-primary">
                      <option value="">Chọn quận huyện</option>
                      <option>Quận 1</option>
                      <option>Quận 3</option>
                      <option>Quận 7</option>
                    </select>
                  </div>
                </div>
                <div className="form-control">
                  <label className="label py-1"><span className="label-text font-medium">Địa chỉ cụ thể *</span></label>
                  <input value={specificAddress} onChange={e => setSpecificAddress(e.target.value)} type="text" className="input input-bordered focus:input-primary" placeholder="Số nhà, tên đường..." />
                </div>
                <div className="form-control">
                  <label className="label py-1"><span className="label-text font-medium">Ghi chú</span></label>
                  <textarea value={note} onChange={e => setNote(e.target.value)} className="textarea textarea-bordered focus:outline-primary h-20" placeholder="Lưu ý cho người giao hàng..." />
                </div>
                <button onClick={() => setStep(2)} className="btn btn-primary w-full mt-2">
                  Tiếp tục → Chọn thanh toán
                </button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="bg-base-100 rounded-2xl p-6 border border-base-200 space-y-4">
                <h2 className="font-bold text-lg mb-2">Phương thức thanh toán</h2>
                <div className="space-y-3">
                  {[
                    { id: 'cod', label: 'Thanh toán khi nhận hàng (COD)', icon: '💵', desc: 'Nhận hàng rồi trả tiền' },
                    { id: 'bank', label: 'Chuyển khoản ngân hàng', icon: '🏦', desc: 'VCB, BIDV, Techcombank,...' },
                    { id: 'momo', label: 'Ví điện tử MoMo', icon: '💜', desc: 'Thanh toán nhanh qua MoMo' },
                    { id: 'card', label: 'Thẻ tín dụng / Ghi nợ', icon: '💳', desc: 'Visa, Mastercard, JCB' },
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
                      <label className="label py-1"><span className="label-text font-medium">Số thẻ</span></label>
                      <input type="text" className="input input-bordered focus:input-primary" placeholder="0000 0000 0000 0000" maxLength={19} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="form-control">
                        <label className="label py-1"><span className="label-text font-medium">Ngày hết hạn</span></label>
                        <input type="text" className="input input-bordered focus:input-primary" placeholder="MM/YY" maxLength={5} />
                      </div>
                      <div className="form-control">
                        <label className="label py-1"><span className="label-text font-medium">CVV</span></label>
                        <input type="text" className="input input-bordered focus:input-primary" placeholder="•••" maxLength={3} />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-4">
                  <button onClick={() => setStep(1)} className="btn btn-ghost flex-1">← Quay lại</button>
                  <button onClick={() => setStep(3)} className="btn btn-primary flex-1">Xem xác nhận →</button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="bg-base-100 rounded-2xl p-6 border border-base-200 space-y-4">
                <h2 className="font-bold text-lg mb-2">Xác nhận đơn hàng</h2>
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
                  <div className="flex justify-between"><span>Tạm tính:</span><span>{formatPrice(cartTotal)}</span></div>
                  <div className="flex justify-between"><span>Vận chuyển:</span><span className={shipping === 0 ? 'text-success' : ''}>{shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</span></div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-success"><span>Giảm giá:</span><span>-{formatPrice(discountAmount)}</span></div>
                  )}
                  <div className="flex justify-between font-black text-base mt-2 pt-2 border-t border-base-300"><span>Tổng cộng:</span><span className="text-primary">{formatPrice(total)}</span></div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button onClick={() => setStep(2)} className="btn btn-ghost flex-1" disabled={isSubmitting}>← Quay lại</button>
                  <button
                    onClick={handleCheckout}
                    disabled={isSubmitting}
                    className="btn btn-success flex-1 gap-2"
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      '✓ Chốt đơn'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary sidebar */}
          <div className="bg-base-100 rounded-2xl p-5 border border-base-200 h-fit sticky top-20">
            <h3 className="font-bold mb-3">Đơn hàng ({cartItems.length} sản phẩm)</h3>
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
            
            <div className="border-t border-base-200 pt-4 mb-4">
              <label className="text-xs font-semibold mb-1 block">Mã khuyến mãi</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  placeholder="Nhập mã..." 
                  className="input input-sm input-bordered focus:input-primary flex-1" 
                />
                <button 
                  onClick={handleApplyPromo}
                  disabled={isApplyingPromo || !promoCode}
                  className="btn btn-sm btn-primary"
                >
                  {isApplyingPromo ? <span className="loading loading-spinner loading-xs"></span> : 'Áp dụng'}
                </button>
              </div>
              {promoMessage.text && (
                <p className={`text-xs mt-2 font-medium ${promoMessage.type === 'success' ? 'text-success' : 'text-error'}`}>
                  {promoMessage.text}
                </p>
              )}
            </div>

            <div className="border-t border-base-200 pt-3 space-y-1 text-sm">
              <div className="flex justify-between"><span>Tạm tính:</span><span>{formatPrice(cartTotal)}</span></div>
              <div className="flex justify-between"><span>Vận chuyển:</span><span>{shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</span></div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-success font-medium"><span>Giảm giá:</span><span>-{formatPrice(discountAmount)}</span></div>
              )}
              <div className="flex justify-between font-black mt-2 pt-2 border-t border-base-200"><span>Tổng:</span><span className="text-primary">{formatPrice(total)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
