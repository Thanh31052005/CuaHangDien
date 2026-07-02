package com.electric_shop.backend.security;

import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUntils {
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long jwtExpirationInMillis = 900000; // 15 minutes

    public String generateToken(String username)
    {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationInMillis))
                .signWith(key)
                .compact();
    }
}
