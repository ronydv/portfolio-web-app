package com.industech.security;

import com.industech.exception.TokenException;
import com.industech.model.RefreshToken;
import com.industech.repository.RefreshTokenRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Slf4j
@Component
public class Logout implements LogoutHandler {

    @Autowired
    private RefreshTokenRepository repository;
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        try {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("refreshToken")) {
                    repository.findByToken(cookie.getValue())
                            .ifPresent(token -> repository.delete(token));
                }
            }
        }catch (Exception e){
            log.error("No cookie has been found. "+ e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
        //invalidating cookie
        ResponseCookie cookie = ResponseCookie.from("refreshToken")
                .httpOnly(true).sameSite("None")
                .secure(true)
                .path("/")
                .maxAge(0)//time in seconds
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }
}
