package com.url.urlshortenersb.dtos;

import lombok.Data;
import lombok.NonNull;

import java.util.Set;

@Data
public class RegisterRequest {
    @NonNull
    private String email;
    @NonNull
    private String password;
    @NonNull
    private String username;
    private Set<String> role ;
}
