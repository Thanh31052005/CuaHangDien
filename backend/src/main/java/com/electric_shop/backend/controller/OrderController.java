package com.electric_shop.backend.controller;

import org.springframework.web.bind.annotation.RestController;
import com.electric_shop.backend.service.OrderService;
import org.springframework.web.bind.annotation.RequestMapping;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import com.electric_shop.backend.dto.CheckoutRequestDto;
import com.electric_shop.backend.dto.OrderResponseDto;
import com.electric_shop.backend.entity.User;
import com.electric_shop.backend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    
    private final OrderService orderService;
    private final UserRepository userRepository;

    // HÀM PHỤ: Gom chung logic lấy User đang đăng nhập
    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        return userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại!"));
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody CheckoutRequestDto request) {
        try {
            User user = getAuthenticatedUser();
            String message = orderService.checkout (request, user.getId()); 
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/history")
    public ResponseEntity<?> getOrderHistory() {
        try {
            User user = getAuthenticatedUser();
            List<OrderResponseDto> history = orderService.getOrderHistory(user.getId());
            return ResponseEntity.ok(history);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrderDetail(@PathVariable Long orderId) {
        try {
            User user = getAuthenticatedUser();
            OrderResponseDto response = orderService.getOrderDetail(orderId, user.getId());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<?> cancelOrder(@PathVariable Long orderId) {
        try {
            User user = getAuthenticatedUser();
            String message = orderService.cancelOrder(orderId, user.getId());
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}