package com.electric_shop.backend.controller;

import java.math.BigDecimal;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.electric_shop.backend.service.PromotionService;
import com.electric_shop.backend.dto.PromotionApplyResponseDto;


@RestController
@RequestMapping("/api/promotions")
@RequiredArgsConstructor
public class PromotionController {
    private final PromotionService promotionService;

    // API nháp tính tiền khuyến mãi: GET /api/promotions/apply?code=SUMMER20&cartTotal=150000
    @GetMapping("/apply")
    public ResponseEntity<?> applyCode(
            @RequestParam String code,
            @RequestParam BigDecimal cartTotal) {
        try {
            // Service sẽ kiểm tra mã và trả về DTO chứa số tiền được giảm
            PromotionApplyResponseDto response = promotionService.applyCode(code, cartTotal);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
