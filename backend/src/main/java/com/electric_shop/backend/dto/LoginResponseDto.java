package com.electric_shop.backend.dto;

import lombok.Data;
import lombok.AllArgsConstructor;


@Data
@AllArgsConstructor
public class LoginResponseDto {
    private String token;
    private String username;
    private String role;
}
