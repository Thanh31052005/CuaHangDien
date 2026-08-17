package com.electric_shop.backend.service;

import java.math.BigDecimal;
import org.springframework.stereotype.Service;
import com.electric_shop.backend.entity.Cart;
import com.electric_shop.backend.repository.CartItemRepository;
import com.electric_shop.backend.repository.CartRepository;
import com.electric_shop.backend.repository.OrderRepository;
import com.electric_shop.backend.repository.ProductRepository;
import com.electric_shop.backend.repository.UserRepository;
import com.electric_shop.backend.dto.CheckoutRequestDto;
import com.electric_shop.backend.dto.OrderResponseDto;
import com.electric_shop.backend.dto.OrderItemResponseDto;
import com.electric_shop.backend.entity.Order;
import com.electric_shop.backend.entity.OrderItem;
import com.electric_shop.backend.entity.User;
import com.electric_shop.backend.entity.CartItem;
import com.electric_shop.backend.entity.Product;
import java.util.ArrayList;
import java.util.List;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import java.util.stream.Collectors;
import static java.util.Comparator.comparing;
import com.electric_shop.backend.enums.OrderStatus;


@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Transactional
    public String checkout(CheckoutRequestDto request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user ID: " + userId));

        if (cart.getCartItems() == null || cart.getCartItems().isEmpty()) {
            throw new RuntimeException("Cart is empty. Cannot proceed to checkout for user ID: " + userId);
        }

        Order order = Order.builder()
                .user(user)
                .shippingAddress(request.getShippingAddress())
                .phoneNumber(request.getPhoneNumber())
                .paymentMethod(request.getPaymentMethod())
                .status(OrderStatus.PENDING)
                .totalPrice(BigDecimal.ZERO)
                .build();
        Order savedOrder = orderRepository.save(order);
        
        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalPrice = BigDecimal.ZERO;

        List<CartItem> sortCartItems = cart.getCartItems().stream()
            .sorted(comparing(item -> item.getProduct().getId()))
            .collect(Collectors.toList());

        for (CartItem cartItem : sortCartItems) {

            int buyQuantity = cartItem.getQuantity();
            Product lockedProduct = productRepository.findByIdForUpdate(cartItem.getProduct().getId())
                .orElseThrow(() -> new RuntimeException(" Product not found with ID: "));

            if (buyQuantity > lockedProduct.getStockQuantity()) {
                throw new RuntimeException("Not enough stock for product: " + lockedProduct.getName());
            }

            lockedProduct.setStockQuantity(lockedProduct.getStockQuantity() - buyQuantity);
            productRepository.save(lockedProduct);
            BigDecimal ItemTotalPrice = lockedProduct.getPrice().multiply(new BigDecimal(buyQuantity));
            totalPrice = totalPrice.add(ItemTotalPrice);

            OrderItem orderItem = OrderItem.builder()
                    .order(savedOrder)
                    .product(lockedProduct)
                    .quantity(buyQuantity)
                    .price(lockedProduct.getPrice())
                    .build();
            orderItems.add(orderItem);
        }
        savedOrder.setTotalPrice(totalPrice);
        savedOrder.setOrderItems(orderItems);
        orderRepository.save(savedOrder);

        cartItemRepository.deleteAll(cart.getCartItems());
        return "Checkout successful. Order ID: " + savedOrder.getId();
    }

    public List<OrderResponseDto> getOrderHistory(Long userId) {
        List<Order> orders = orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return orders.stream()
                .map(this::mapToOrderResponse) 
                .collect(Collectors.toList());        
    }

    private OrderResponseDto mapToOrderResponse(Order order) {
        List<OrderItemResponseDto> itemResponses = order.getOrderItems().stream()
                .map(item -> OrderItemResponseDto.builder()
                        .productId(item.getProduct().getId())
                        .productName(item.getProduct().getName())
                        .quantity(item.getQuantity())
                        .price(item.getPrice())
                        .subTotal(item.getPrice().multiply(new BigDecimal(item.getQuantity())))
                        .build())
                .collect(Collectors.toList());

        return OrderResponseDto.builder()
                .orderId(order.getId())
                .status(order.getStatus())
                .paymentMethod(order.getPaymentMethod())
                .shippingAddress(order.getShippingAddress())
                .phoneNumber(order.getPhoneNumber())
                .totalPrice(order.getTotalPrice())
                .createdAt(order.getCreatedAt())
                .items(itemResponses)
                .build();
    }

    public OrderResponseDto getOrderDetail(Long orderId, Long userId) {
        Order order = orderRepository.findByIdAndUserId(orderId, userId)
            .orElseThrow(() -> new RuntimeException("Order not found, or you don't have permission to view it."));
        return mapToOrderResponse(order);
    }

    @Transactional
    public String cancelOrder(Long orderId, Long userId) {
        Order order = orderRepository.findByIdAndUserId(orderId, userId)
                .orElseThrow(() -> new RuntimeException("Order not found, or you don't have permission to cancel it."));

        if (order.getStatus() == OrderStatus.CANCELLED) {
            throw new RuntimeException("Order is already cancelled.");
        }
        if (order.getStatus() == OrderStatus.SHIPPED || order.getStatus() == OrderStatus.DELIVERED) {
            throw new RuntimeException("Order has already been shipped or delivered and cannot be cancelled.");
        }

        for (OrderItem item : order.getOrderItems()) {
            Product lockedProduct = productRepository.findByIdForUpdate(item.getProduct().getId())
                    .orElseThrow(() -> new RuntimeException(" Product not found with ID: " + item.getProduct().getId()));

            lockedProduct.setStockQuantity(lockedProduct.getStockQuantity() + item.getQuantity());
            productRepository.save(lockedProduct);
        }

        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);

        return "Cancelled order successfully. Order ID: " + order.getId();
    }
}
