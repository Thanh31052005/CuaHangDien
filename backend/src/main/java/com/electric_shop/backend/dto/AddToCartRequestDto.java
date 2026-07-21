package com.electric_shop.backend.dto;

import lombok.Data;

@Data
public class AddToCartRequestDto {
    private Long userId;
    private Long productId;
    private Integer quantity;
}
