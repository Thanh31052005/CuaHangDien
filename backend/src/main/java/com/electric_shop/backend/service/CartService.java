package com.electric_shop.backend.service;

import org.springframework.stereotype.Service;
import com.electric_shop.backend.entity.User;
import com.electric_shop.backend.entity.Product;
import com.electric_shop.backend.entity.Cart;
import com.electric_shop.backend.entity.CartItem;
import com.electric_shop.backend.repository.UserRepository;
import com.electric_shop.backend.repository.CartRepository;
import com.electric_shop.backend.repository.CartItemRepository;
import com.electric_shop.backend.repository.ProductRepository;
import com.electric_shop.backend.dto.AddToCartRequestDto;
import jakarta.transaction.Transactional;
import java.util.Optional;
import com.electric_shop.backend.dto.CartResponseDto;
import com.electric_shop.backend.dto.CartItemDto;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartService {
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    @Transactional
    public String AddToCart(AddToCartRequestDto request) {
        User user = userRepository.findById(request.getUserId())
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
        Optional<CartItem> existingCartItem = cartItemRepository.findByCartIdAndProductId(cart.getId(), product.getId());
        if(existingCartItem.isPresent()) {
            CartItem cartItem = existingCartItem.get();

            int newQuantity = cartItem.getQuantity() + request.getQuantity();
            if(newQuantity > product.getStockQuantity()) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }
            cartItem.setQuantity(newQuantity);
            cartItemRepository.save(cartItem);
        } else {
            CartItem newCartItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getQuantity())
                    .build();
            cartItemRepository.save(newCartItem);
        }
        return "Product added to cart successfully";
    }

    public CartResponseDto getCartByUserId(Long userId) {
        Optional<Cart> cartUser = cartRepository.findByUserId(userId);
        if(cartUser.isEmpty() || cartUser.get().getCartItems().isEmpty()) {
            return CartResponseDto.builder()
                    .items(new ArrayList<>())
                    .totalPrice(BigDecimal.ZERO)
                    .build();
        }

        Cart cart = cartUser.get(); // Chatgpt bảo clean code chỗ này
        List<CartItemDto> itemDtos = new ArrayList<>();
        BigDecimal totalCartPrice = BigDecimal.ZERO;

        for (CartItem item : cart.getCartItems()) {
            BigDecimal price = item.getProduct().getPrice();
            BigDecimal totalPrice = price.multiply(new BigDecimal(item.getQuantity()));
            totalCartPrice = totalCartPrice.add(totalPrice);

            itemDtos.add(CartItemDto.builder()
                    .productId(item.getProduct().getId())
                    .productName(item.getProduct().getName())
                    .imageUrl(item.getProduct().getImageUrl())
                    .price(price)
                    .quantity(item.getQuantity())
                    .subTotal(totalPrice)
                    .build());
        }
        return CartResponseDto.builder()
                .cartId(cart.getId())
                .items(itemDtos)
                .totalPrice(totalCartPrice)
                .build();
    }
}
