package com.electric_shop.backend.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import com.electric_shop.backend.enums.OrderStatus;
import com.electric_shop.backend.enums.PaymentMethod;
import lombok.Builder;
import java.util.List;

@Data
@Builder
public class OrderResponseDto {
    private Long orderId;
    private OrderStatus status;
    private PaymentMethod paymentMethod;
    private String shippingAddress;
    private String phoneNumber;
    private BigDecimal totalPrice;
    private LocalDateTime createdAt;
    private List<OrderItemResponseDto> items;
}
