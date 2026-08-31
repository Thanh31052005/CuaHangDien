package com.electric_shop.backend.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import org.springframework.stereotype.Service;
import com.electric_shop.backend.dto.PromotionApplyResponseDto;
import com.electric_shop.backend.entity.Promotion;
import com.electric_shop.backend.repository.PromotionRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PromotionService {
    private final PromotionRepository promotionRepository;

    public PromotionApplyResponseDto applyCode(String code, BigDecimal cartTotal) {
        // 1. Tìm mã và kiểm tra Active
        Promotion promotion = promotionRepository.findByCodeAndIsActiveTrue(code)
                .orElseThrow(() -> new RuntimeException("Unvalid or inactive promotion code!"));

        // 2. Kiểm tra thời hạn sử dụng
        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(promotion.getStartDate()) || now.isAfter(promotion.getEndDate())) {
            throw new RuntimeException("Promotion code is not valid or has expired!");
        }

        // 3. Kiểm tra giá trị đơn hàng tối thiểu
        if (cartTotal.compareTo(promotion.getMinOrderValue()) < 0) {
            throw new RuntimeException("Order total does not meet the minimum requirement of " + promotion.getMinOrderValue() + " to apply this promotion code.");
        }

        // 4. Tính toán số tiền được giảm
        BigDecimal discountAmount = BigDecimal.ZERO;
        
        // Giả sử Entity Promotion của bạn có biến discountType ("PERCENTAGE" hoặc "FIXED")
        if (promotion.getDiscountType().equals("FIXED")) {
            discountAmount = promotion.getDiscountValue();
        } else if (promotion.getDiscountType().equals("PERCENTAGE")) {
            // Tính số tiền giảm = Tổng tiền * (Phần trăm / 100)
            discountAmount = cartTotal.multiply(promotion.getDiscountValue()).divide(BigDecimal.valueOf(100));
            
            // Chặn số tiền giảm tối đa (nếu có cấu hình maxDiscountAmount)
            if (promotion.getMaxDiscountAmount() != null && discountAmount.compareTo(promotion.getMaxDiscountAmount()) > 0) {
                discountAmount = promotion.getMaxDiscountAmount();
            }
        }

        // Đảm bảo không giảm lố tổng tiền đơn hàng
        if (discountAmount.compareTo(cartTotal) > 0) {
            discountAmount = cartTotal; 
        }

        BigDecimal finalPrice = cartTotal.subtract(discountAmount);

        // 5. Trả kết quả về cho Frontend hiển thị
        return PromotionApplyResponseDto.builder()
                .code(code)
                .discountAmount(discountAmount)
                .finalPrice(finalPrice)
                .build();
    }
}
