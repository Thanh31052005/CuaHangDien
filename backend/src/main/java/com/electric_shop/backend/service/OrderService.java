package com.electric_shop.backend.service;

import java.math.BigDecimal;
import org.springframework.stereotype.Service;
import com.electric_shop.backend.entity.Cart;
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
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Transactional
    public String checkout(CheckoutRequestDto request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
        Long userId = user.getId();

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user: " + username));

        if (cart.getCartItems() == null || cart.getCartItems().isEmpty()) {
            throw new RuntimeException("Cart is empty. Cannot proceed to checkout for user: " + username);
        }

        Order order = Order.builder()
                .user(user)
                .shippingAddress(request.getShippingAddress())
                .phoneNumber(request.getPhoneNumber())
                .paymentMethod(request.getPaymentMethod())
                .status(OrderStatus.PENDING)
                .totalPrice(BigDecimal.ZERO)
                .build();
        
        BigDecimal totalPrice = BigDecimal.ZERO;
        List<CartItem> sortCartItems = cart.getCartItems().stream()
            .sorted(comparing(item -> item.getProduct().getId())) //chống Deadlock, nên sắp xếp theo productId trước khi lock
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
                    .product(lockedProduct)
                    .quantity(buyQuantity)
                    .price(lockedProduct.getPrice())
                    .build();
            order.addOrderItem(orderItem);
        }
        order.setTotalPrice(totalPrice);
        orderRepository.save(order);

        cart.getCartItems().clear();
        cartRepository.save(cart);
        return "Checkout successful. Order ID: " + order.getId();
    }

    public List<OrderResponseDto> getOrderHistory(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
        List<Order> orders = orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        return orders.stream()
                .map(this::mapToOrderResponse) 
                .collect(Collectors.toList());        
    }

    //Tránh vòng lặp vô hạn của Order và OrderItem khi trả thẳng JSON về client, nên phải map sang DTO
    //Tránh lặp code của getOrderHistory và getOrderDetail
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

    public OrderResponseDto getOrderDetail(Long orderId, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
        Order order = orderRepository.findByIdAndUserId(orderId, user.getId())
            .orElseThrow(() -> new RuntimeException("Order not found, or you don't have permission to view it."));
        return mapToOrderResponse(order);
    }

    @Transactional
    public String cancelOrder(Long orderId, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
        Order order = orderRepository.findByIdAndUserId(orderId, user.getId())
                .orElseThrow(() -> new RuntimeException("Order not found, or you don't have permission to cancel it."));

        if (order.getStatus() == OrderStatus.CANCELLED) {
            throw new RuntimeException("Order is already cancelled.");
        }
        if (order.getStatus() == OrderStatus.SHIPPED || order.getStatus() == OrderStatus.DELIVERED) {
            throw new RuntimeException("Order has already been shipped or delivered and cannot be cancelled.");
        }

        // Trả số lượng sản phẩm về kho
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
