package com.electric_shop.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import com.electric_shop.backend.dto.AddToCartRequestDto;
import com.electric_shop.backend.service.CartService;

@RestController
@RequestMapping("/api/carts")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody AddToCartRequestDto request) {
        try {
            String message = cartService.AddToCart(request);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
