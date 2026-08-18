package com.electric_shop.backend.service;

import org.springframework.stereotype.Service;
import com.electric_shop.backend.entity.User;
import com.electric_shop.backend.entity.Product;
import com.electric_shop.backend.entity.Cart;
import com.electric_shop.backend.entity.CartItem;
import com.electric_shop.backend.repository.UserRepository;
import com.electric_shop.backend.repository.CartRepository;
import com.electric_shop.backend.repository.ProductRepository;
import com.electric_shop.backend.dto.AddToCartRequestDto;
import jakarta.transaction.Transactional;
import java.util.Optional;
import java.util.stream.Collectors;
import com.electric_shop.backend.dto.CartResponseDto;
import com.electric_shop.backend.dto.CartItemDto;
import java.math.BigDecimal;
import java.util.Objects;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartService {
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    @Transactional
    public String addToCart(AddToCartRequestDto request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if(product.getStockQuantity() < request.getQuantity()) {
            throw new RuntimeException("Insufficient stock for product: " + product.getName());
        }
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });
        // tìm sản phẩm giỏ hàng đã tồn tại trong giỏ hàng của người dùng
        Optional<CartItem> existingCartItem = cart.getCartItems().stream()
                .filter(item -> item.getProduct().getId().equals(product.getId()))
                .findFirst();
        if(existingCartItem.isPresent()) {
            CartItem cartItem = existingCartItem.get();

            int newQuantity = cartItem.getQuantity() + request.getQuantity();
            if(newQuantity > product.getStockQuantity()) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }
            cartItem.setQuantity(newQuantity);
        } else {
            CartItem newCartItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getQuantity())
                    .build();
            cart.addCartItem(newCartItem);
        }
        cartRepository.save(cart);
        return "Product added to cart successfully";
    }

    public CartResponseDto getCartByUserName(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Cart> cartUser = cartRepository.findByUserId(user.getId());
        if(cartUser.isEmpty() || cartUser.get().getCartItems().isEmpty()) {
            return CartResponseDto.builder()
                    .items(new ArrayList<>())
                    .totalPrice(BigDecimal.ZERO)
                    .build();
        }

        Cart cart = cartUser.get(); // Chatgpt bảo clean code chỗ này
        List<CartItemDto> itemDtos = cart.getCartItems().stream()
                .map(item -> CartItemDto.builder()
                        .productId(item.getProduct().getId())
                        .productName(item.getProduct().getName())
                        .imageUrl(item.getProduct().getImageUrl())
                        .price(item.getProduct().getPrice())
                        .quantity(item.getQuantity())
                        .subTotal(item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                        .build())
                .collect(Collectors.toList());

        // Clean Code: Tính tổng tiền 1 dòng bằng Stream
        BigDecimal totalCartPrice = itemDtos.stream()
        .filter(Objects::nonNull)
        .map(item -> Objects.requireNonNullElse(
                item.getSubTotal(),
                BigDecimal.ZERO
        ))
        .reduce(BigDecimal.ZERO, (a, b) -> a.add(b));

        return CartResponseDto.builder()
                .cartId(cart.getId())
                .items(itemDtos)
                .totalPrice(totalCartPrice)
                .build();
    }

    @Transactional
    public String updateQuantity(String userName, Long productId, Integer newQuantity) {
        if (newQuantity <= 0) {
            return removeCartItem(userName, productId);
        }
        User user = userRepository.findByUsername(userName)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUserId(user.getId())
            .orElseThrow(() -> new RuntimeException("Cart not found"));

        CartItem cartItem = cart.getCartItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Product not in cart"));

        Product product = cartItem.getProduct();
        if (newQuantity > product.getStockQuantity()) {
            throw new RuntimeException(" Insufficient stock for product: " + product.getName());
        }

        cartItem.setQuantity(newQuantity);
        cartRepository.save(cart);
        return "Cart item quantity updated successfully";
    }

    @Transactional
    public String removeCartItem(String userName, Long productId) {
        User user = userRepository.findByUsername(userName)
            .orElseThrow(() -> new RuntimeException("User not found"));
        Long userId = user.getId();

        Cart cart = cartRepository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Cart not found"));

        CartItem cartItem = cart.getCartItems().stream()
            .filter(item -> item.getProduct().getId().equals(productId))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Product not in cart"));

        cart.removeCartItem(cartItem);
        cartRepository.save(cart);
        return "Cart item removed successfully";
    }
}
