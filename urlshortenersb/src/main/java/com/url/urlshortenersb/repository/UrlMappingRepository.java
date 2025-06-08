package com.url.urlshortenersb.repository;

import com.url.urlshortenersb.models.UrlMapping;
import com.url.urlshortenersb.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UrlMappingRepository extends JpaRepository<UrlMapping,Long> {
    UrlMapping findByShortUrl(String shortUrl);
    List<UrlMapping> findByUser(User user);
    void deleteByShortUrlAndUser(String shortUrl, User user);
    Optional<UrlMapping> findByShortUrlAndUser(String shortUrl, User user);

}
