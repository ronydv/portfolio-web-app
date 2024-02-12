package com.industech.controller;

import com.industech.model.User;
import com.industech.service.AuthenticationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;


    @PostMapping("/signup")
    public ResponseEntity<User> signUp(@RequestBody User user) {
        return new ResponseEntity<>(
                authenticationService.registerUser(
                        user.getName(), user.getEmail(), user.getPassword()
        ), HttpStatus.CREATED);
    }

    @GetMapping("/login")
    public String logIn(){
        return "login endpoint tested successfully";
    }

    //change hasAuthority to hasRole if the role contains ROLE_ prefix
    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/testadmin")
    public String testAdmin(){
        return "login endpoint for role admin tested successfully";
    }

    @PreAuthorize("hasAuthority('user')")
    @GetMapping("/testuser")
    public String testUser(){
        return "login endpoint for role user tested successfully";
    }

}
