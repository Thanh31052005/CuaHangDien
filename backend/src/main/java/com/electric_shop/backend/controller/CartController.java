package com.electric_shop.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import lombok.RequiredArgsConstructor;
import com.electric_shop.backend.dto.AddToCartRequestDto;
import com.electric_shop.backend.service.CartService;
import com.electric_shop.backend.dto.CartResponseDto;

@RestController
@RequestMapping("/api/carts")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody AddToCartRequestDto request) {
        try {
            String username = getCurrentUsername();
            String message = cartService.addToCart(request, username);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getCart() {
        try {
            String username = getCurrentUsername();
            CartResponseDto cartResponse = cartService.getCartByUserName(username);
            return ResponseEntity.ok(cartResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/products/{productId}")
    public ResponseEntity<?> updateQuantity(
            @PathVariable Long productId,
            @RequestParam Integer quantity) {
        try {
            String username = getCurrentUsername();
            String message = cartService.updateQuantity(username, productId, quantity);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/products/{productId}")
    public ResponseEntity<?> removeCartItem(
            @PathVariable Long productId) {
        try {
            String username = getCurrentUsername();
            String message = cartService.removeCartItem(username, productId);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
