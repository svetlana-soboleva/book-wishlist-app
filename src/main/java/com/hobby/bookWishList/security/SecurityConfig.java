package com.hobby.bookWishList.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


import static org.springframework.security.config.Customizer.withDefaults;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.csrf(AbstractHttpConfigurer::disable).cors(withDefaults()).sessionManagement(session -> session.sessionCreationPolicy(STATELESS)).authorizeHttpRequests(auth -> auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll().requestMatchers("/api/secure/**").authenticated().anyRequest().permitAll()).oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.jwkSetUri("https://engaged-insect-6.clerk.accounts.dev/.well-known/jwks.json"))).build();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:5173").allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS").allowedHeaders("Authorization", "Content-Type").allowCredentials(true);
            }
        };
    }


}
