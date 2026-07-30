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

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Transactional
    public String checkout(CheckoutRequestDto request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + request.getUserId()));

        Cart cart = cartRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Cart not found for user ID: " + request.getUserId()));

        if (cart.getCartItems() == null || cart.getCartItems().isEmpty()) {
            throw new RuntimeException("Cart is empty. Cannot proceed to checkout for user ID: " + request.getUserId());
        }

        Order order = Order.builder()
                .user(user)
                .shippingAddress(request.getShippingAddress())
                .phoneNumber(request.getPhoneNumber())
                .paymentMethod(request.getPaymentMethod())
                .status("PENDING")
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
}
