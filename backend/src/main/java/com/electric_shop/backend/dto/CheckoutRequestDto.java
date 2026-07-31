package com.electric_shop.backend.dto;

import com.electric_shop.backend.enums.PaymentMethod;
import lombok.Data;

@Data
public class CheckoutRequestDto {
    private Long userId;
    private String shippingAddress;
    private String phoneNumber;     
    private PaymentMethod paymentMethod;
}
