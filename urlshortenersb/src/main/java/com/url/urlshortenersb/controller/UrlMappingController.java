package com.url.urlshortenersb.controller;

import com.url.urlshortenersb.dtos.ClickEventDTO;
import com.url.urlshortenersb.dtos.UrlMappingDTO;
import com.url.urlshortenersb.models.User;
import com.url.urlshortenersb.service.UrlMappingService;
import com.url.urlshortenersb.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

    @GetMapping("/analytics/{shortUrl}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<List<ClickEventDTO>> getUrlAnalytics(@PathVariable String shortUrl,
                                                               @RequestParam("startDate") String startDate,
                                                               @RequestParam("endDate") String endDate){
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime start = LocalDateTime.parse(startDate, dateTimeFormatter);
        LocalDateTime end = LocalDateTime.parse(endDate, dateTimeFormatter);
        List<ClickEventDTO> clickEventDTOS = urlMappingService.getClickEventsByDate(shortUrl, start, end);
        return ResponseEntity.ok(clickEventDTOS);
    }

    @GetMapping("/totalClicks")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Map<LocalDate,Long>> getTotalClicksByDate(Principal principal,
                                                          @RequestParam("startDate") String startDate,
                                                          @RequestParam("endDate") String endDate){
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ISO_LOCAL_DATE;
        LocalDate start = LocalDate.parse(startDate, dateTimeFormatter);
        LocalDate end = LocalDate.parse(endDate, dateTimeFormatter);
        User user = userService.getUserByUsername(principal.getName());
        Map<LocalDate ,Long> totalClicks = urlMappingService.getTotalClicksByUser(user, start, end);
        return ResponseEntity.ok(totalClicks);
    }

    @DeleteMapping("/delete/{shortUrl}")
    public ResponseEntity<String> deleteUrl(@PathVariable String shortUrl, Principal principal) {
        User user = userService.getUserByUsername(principal.getName());
        boolean isDeleted = urlMappingService.deleteUrl(shortUrl, user);
        if (isDeleted) {
            return ResponseEntity.ok("URL deleted successfully");
        } else {
            return ResponseEntity.status(404).body("URL not found or you do not have permission to delete it");
        }
    }
}
