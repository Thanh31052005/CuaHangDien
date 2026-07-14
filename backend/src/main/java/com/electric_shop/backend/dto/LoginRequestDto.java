package com.electric_shop.backend.dto;
import lombok.Data;

@Data
public class LoginRequestDto {
    private String username;
    private String password;
}
