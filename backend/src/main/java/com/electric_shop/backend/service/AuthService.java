package com.electric_shop.backend.service;

import com.electric_shop.backend.dto.RegisterRequestDto;
import com.electric_shop.backend.entity.User;
import com.electric_shop.backend.enums.Role;
import com.electric_shop.backend.repository.UserRepository;
import com.electric_shop.backend.security.JwtUtils;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.electric_shop.backend.dto.LoginResponseDto;
import com.electric_shop.backend.dto.LoginRequestDto;

@Service
@RequiredArgsConstructor // Tự động inject các Bean (Repository, Encoder) thông qua Constructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUntils;
    private final AuthenticationManager authenticationManager;

    public String register(RegisterRequestDto request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Lỗi: Tên đăng nhập đã được sử dụng!");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Lỗi: Email này đã được đăng ký!");
        }

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
    
    public LoginResponseDto login(LoginRequestDto request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                ));
        //Lưu trạng thái đăng nhập
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        String token = jwtUntils.generateToken(authentication.getName());

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found!"));

        return new LoginResponseDto(token, user.getUsername(), user.getRole().name());
        }
    }
