import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from '../constants';

/** Format number to Vietnamese currency string */
export const formatPrice = (price: number): string =>
  price.toLocaleString('vi-VN') + 'đ';

/** Calculate shipping fee */
export const calcShipping = (subtotal: number): number =>
  subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

/** Clamp a value between min and max */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/** Truncate text to a max length */
export const truncate = (text: string, max: number): string =>
  text.length > max ? text.slice(0, max) + '…' : text;

/** Generate a short random order ID */
export const genOrderId = (): string =>
  'EP' + Date.now().toString().slice(-6);
