package com.electric_shop.backend.dto;

import java.math.BigDecimal;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class OrderItemResponseDto {
    private Long productId;
    private String productName; 
    private int quantity;
    private BigDecimal price;
    private BigDecimal subTotal;
}
