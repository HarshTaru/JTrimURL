package com.url.urlshortenersb.controller;

import com.url.urlshortenersb.dtos.LoginRequest;
import com.url.urlshortenersb.dtos.RegisterRequest;
import com.url.urlshortenersb.models.User;
import com.url.urlshortenersb.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/public/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        User user = new User();
        if (registerRequest.getEmail().isBlank() || registerRequest.getUsername().isBlank() || registerRequest.getPassword().isBlank()) {
            return ResponseEntity.badRequest().body("Email, username, and password are required");
        }
        user.setEmail(registerRequest.getEmail());
        user.setUsername(registerRequest.getUsername());
        user.setPassword(registerRequest.getPassword());
        user.setRole("ROLE_USER");
        userService.registerUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/public/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        if(loginRequest.getUsername().isBlank() || loginRequest.getPassword().isBlank()) {
            return ResponseEntity.badRequest().body("Username and password are required");
        }
        return ResponseEntity.ok(userService.loginUser(loginRequest));
    }
}
