package com.electric_shop.backend.dto;

import lombok.Data;

@Data
public class CheckoutRequestDto {
    private Long userId;
    private String shippingAddress;
    private String phoneNumber;     
    private String paymentMethod;
}
