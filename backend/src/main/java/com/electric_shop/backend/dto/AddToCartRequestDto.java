package com.electric_shop.backend.dto;

import lombok.Data;

@Data
public class AddToCartRequestDto {
    private Long productId;
    private Integer quantity;
}
