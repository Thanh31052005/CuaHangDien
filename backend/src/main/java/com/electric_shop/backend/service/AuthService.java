package com.electric_shop.backend.service;

import com.electric_shop.backend.dto.RegisterRequest;
import com.electric_shop.backend.entity.User;
import com.electric_shop.backend.enums.Role;
import com.electric_shop.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.electric_shop.backend.security.JwtUntils;
import com.electric_shop.backend.dto.LoginResponse;
import com.electric_shop.backend.dto.LoginRequest;

@Service
@RequiredArgsConstructor // Tự động inject các Bean (Repository, Encoder) thông qua Constructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUntils jwtUntils;

    public String register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Lỗi: Tên đăng nhập đã được sử dụng!");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Lỗi: Email này đã được đăng ký!");
        }

        // Xây dựng đối tượng User từ DTO
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword())) 
                .role(Role.USER)
                .status(true)
                .build();

        userRepository.save(user);
        return "Đăng ký tài khoản thành công!";
    }
    
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Sai tài khoản hoặc mật khẩu!"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Sai tài khoản hoặc mật khẩu!");
        }

        String token = jwtUntils.generateToken(user.getUsername());
        return new LoginResponse(token, user.getUsername(), user.getRole().name());
    }
}
