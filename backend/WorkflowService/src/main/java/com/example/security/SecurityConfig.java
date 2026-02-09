package com.example.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            // 🔓 Disable CSRF (required for H2 console)
            .csrf(csrf -> csrf.disable())

            // 🔓 Allow H2 console frames
            .headers(headers ->
                headers.frameOptions(frame -> frame.disable())
            )

            .authorizeHttpRequests(auth -> auth
                // ✅ ALLOW H2 CONSOLE
                .requestMatchers("/h2-console/**").permitAll()

                // ✅ ALLOW AUTH APIs
                .requestMatchers("/workflow/auth/**").permitAll()

                // 🔐 PROTECT WORKFLOW APIs
                .requestMatchers("/workflow/complaints/**")
                    .hasRole("SUPPORT")

                .anyRequest().authenticated()
            )

            // ✅ JWT filter
            .addFilterBefore(jwtFilter,
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
