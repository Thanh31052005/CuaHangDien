package com.electric_shop.backend.dto;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PromotionApplyResponseDto {
    private String code;           
    private BigDecimal discountAmount; 
    private BigDecimal finalPrice;
}
