package com.example.controller;

import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.LoginRequest;
import com.example.entity.SupportUser;
import com.example.repository.SupportUserRepository;
import com.example.security.JwtUtil;

@RestController
@RequestMapping("/workflow/auth")
public class AuthController {

    private final SupportUserRepository repo;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder encoder;

    public AuthController(SupportUserRepository repo,
                          JwtUtil jwtUtil,
                          PasswordEncoder encoder) {
        this.repo = repo;
        this.jwtUtil = jwtUtil;
        this.encoder = encoder;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest req) {

        SupportUser user = repo.findByUsername(req.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(
                user.getUsername(),
                user.getRole()
        );

        return Map.of(
                "token", token,
                "role", user.getRole()
        );
    }
}
	