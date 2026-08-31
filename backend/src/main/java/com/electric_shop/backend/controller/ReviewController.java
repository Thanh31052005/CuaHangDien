package com.electric_shop.backend.controller;

import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.electric_shop.backend.service.ReviewService;
import jakarta.validation.Valid;
import com.electric_shop.backend.dto.ReviewRequestDto;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    // Móc username trực tiếp từ thẻ JWT của người gọi
    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    // API thêm đánh giá (Cần Token)
    @PostMapping
    public ResponseEntity<?> addReview(@Valid @RequestBody ReviewRequestDto request) {
        try {
            String username = getCurrentUsername();
            String message = reviewService.addReview(username, request);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
