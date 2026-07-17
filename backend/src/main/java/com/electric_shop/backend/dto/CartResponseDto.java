package com.electric_shop.backend.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class CartResponseDto {
    private Long cartId;
    private List<CartItemDto> items;
    private BigDecimal totalPrice;
}
