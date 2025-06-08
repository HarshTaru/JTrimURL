package com.url.urlshortenersb.controller;

import com.url.urlshortenersb.models.UrlMapping;
import com.url.urlshortenersb.service.UrlMappingService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@AllArgsConstructor
public class RedirectController {

    private UrlMappingService urlMappingService;

    @GetMapping("/{shortUrl}")
    public ResponseEntity<Void> redirect(@PathVariable  String shortUrl) {
        UrlMapping urlMapping = urlMappingService.getOriginalUrl(shortUrl);
        if(urlMapping != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Location", urlMapping.getOriginalUrl());
            return ResponseEntity.status(302)
                    .headers(headers)
                    .build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/public/{shortUrl}")
    public ResponseEntity<Map<String,String>> publicRedirect(@PathVariable String shortUrl) {
        UrlMapping urlMapping = urlMappingService.getOriginalUrl(shortUrl);

        if(urlMapping != null) {
            String originalUrl = urlMapping.getOriginalUrl();
            Map<String, String> originalUrlMap = Map.of("originalUrl", originalUrl);
            return ResponseEntity.ok(originalUrlMap);
        }
        return ResponseEntity.notFound().build();
    }
}
