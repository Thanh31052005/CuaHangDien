package com.electric_shop.backend.dto;
import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}
