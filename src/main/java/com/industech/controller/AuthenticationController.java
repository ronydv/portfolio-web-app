package com.industech.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    @GetMapping("/login")
    public String logIn(){
        return "login endpoint tested successfully";
    }

    @GetMapping("/signup")
    public String signUp(){
        return "signup endpoint tested successfully";
    }

    //change hasAuthority to hasRole if the role contains ROLE_ prefix
    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/testadmin")
    public String testAdmin(){
        return "login endpoint for role admin tested successfully";
    }

    @GetMapping("/testuser")
    public String testUser(){
        return "login endpoint for role user tested successfully";
    }

}
