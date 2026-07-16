package com.electric_shop.backend.dto;

import lombok.Data;

@Data
public class AddToCartRequestDto {
    private Long UserId;
    private Long productId;
    private Integer quantity;
}
