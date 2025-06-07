package com.url.urlshortenersb.controller;

import com.url.urlshortenersb.dtos.UrlMappingDTO;
import com.url.urlshortenersb.models.User;
import com.url.urlshortenersb.service.UrlMappingService;
import com.url.urlshortenersb.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/urls")
@AllArgsConstructor
public class UrlMappingController {

    private UrlMappingService urlMappingService;
    private UserService userService;

    @PostMapping("/shorten")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<UrlMappingDTO> shortenUrl(@RequestBody Map<String,String> request,
                                                    Principal principal) {
        String originalUrl = request.get("originalUrl");
        User user = userService.getUserByUsername(principal.getName());
        UrlMappingDTO urlMappingDTO = urlMappingService.createShortUrl(originalUrl, user);
        return ResponseEntity.ok(urlMappingDTO);
    }

    @GetMapping("/myurls")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<List<UrlMappingDTO>> getUserUrls(Principal principal) {
        User user = userService.getUserByUsername(principal.getName());
        List<UrlMappingDTO> urlMappings = urlMappingService.getUrlsByUser(user);
        return ResponseEntity.ok(urlMappings);
    }
}
