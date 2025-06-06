package com.url.urlshortenersb.dtos;

import lombok.Data;

import java.util.Set;

@Data
public class RegisterRequest {
    private String email;
    private String password;
    private String username;
    private Set<String> role ;
}
