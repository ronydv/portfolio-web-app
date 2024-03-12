package com.industech.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.industech.dto.auth.CustomError;
import com.industech.repository.auth.RefreshTokenRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
public class Logout implements LogoutHandler {

    @Autowired
    private RefreshTokenRepository repository;

    public <T> void logoutResponse(T object, HttpServletResponse response ){
        try {
            String json = new ObjectMapper().writeValueAsString(object);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.getWriter().write(json);
            //invalidating cookie
            ResponseCookie cookie = ResponseCookie.from("refreshToken")
                    .httpOnly(true)
                    .sameSite("None")
                    .secure(true)
                    .path("/")
                    .maxAge(0)//time in seconds
                    .build();
            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
            response.getWriter().flush();
        } catch (IOException ex) {throw new RuntimeException(ex);}
    }

    @Override
    public void logout(HttpServletRequest request,
                       HttpServletResponse response, Authentication authentication) {
        try {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("refreshToken")) {
                    repository.findByToken(cookie.getValue())
                            .ifPresent(token ->
                                    repository.delete(token));
                    logoutResponse("successfully logout",response);
                }
            }
        }catch (Exception e){
            log.error("No cookie has been found. "+ e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            CustomError error=new CustomError(
                    response.getStatus(),"No cookie has been found. "+ e.getMessage());
            logoutResponse(error,response);
        }
    }
}
