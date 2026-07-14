package com.electric_shop.backend.controller;

import com.electric_shop.backend.dto.RegisterRequestDto;
import com.electric_shop.backend.dto.LoginRequestDto;
import com.electric_shop.backend.dto.LoginResponseDto;
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
    public ResponseEntity<String> register(@RequestBody RegisterRequestDto request) {
        try {
            String message = authService.register(request);
            return ResponseEntity.ok(message); // Trả về HTTP 200 kèm thông báo
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // Trả về HTTP 400 nếu lỗi
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto request) {
        try {
            LoginResponseDto response = authService.login(request);
            return ResponseEntity.ok(response); // Trả về HTTP 200 kèm thông tin đăng nhập
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // Trả về HTTP 400 nếu lỗi
        }
    }

    // Các endpoint khác như refresh token, logout
}
