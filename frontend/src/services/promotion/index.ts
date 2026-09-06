import { axiosClient } from '../api/axiosClient';

export interface PromotionApplyDTO {
  discountAmount: number;
  finalPrice: number;
}

export const promotionService = {
  applyPromotion: (code: string, cartTotal: number) =>
    axiosClient.get<any, PromotionApplyDTO>('/promotions/apply', {
      params: { code, cartTotal },
    }),
};
