package com.electric_shop.backend.service;

import com.electric_shop.backend.dto.RegisterRequest;
import com.electric_shop.backend.entity.User;
import com.electric_shop.backend.enums.Role;
import com.electric_shop.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor // Tự động inject các Bean (Repository, Encoder) thông qua Constructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public String register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Lỗi: Tên đăng nhập đã được sử dụng!");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Lỗi: Email này đã được đăng ký!");
        }

        // 3. Xây dựng đối tượng User từ DTO
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword())) 
                .role(Role.USER)
                .status(true)
                .build();

        // 4. Lưu xuống Database
        userRepository.save(user);

        return "Đăng ký tài khoản thành công!";
    }
}
