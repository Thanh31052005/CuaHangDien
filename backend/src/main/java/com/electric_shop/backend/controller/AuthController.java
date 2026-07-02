package com.electric_shop.backend.controller;

import com.electric_shop.backend.dto.RegisterRequest;
import com.electric_shop.backend.dto.LoginRequest;
import com.electric_shop.backend.dto.LoginResponse;
import com.electric_shop.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        try {
            String message = authService.register(request);
            return ResponseEntity.ok(message); // Trả về HTTP 200 kèm thông báo
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // Trả về HTTP 400 nếu lỗi
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse response = authService.login(request);
            return ResponseEntity.ok(response); // Trả về HTTP 200 kèm thông tin đăng nhập
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // Trả về HTTP 400 nếu lỗi
        }
    }
}
