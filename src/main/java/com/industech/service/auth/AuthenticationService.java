package com.industech.service.auth;

import com.industech.dto.auth.LoginResponse;
import com.industech.dto.auth.Token;
import com.industech.exception.AuthUserException;
import com.industech.exception.TokenException;
import com.industech.model.auth.*;
import com.industech.repository.auth.PrivilegeRepository;
import com.industech.repository.auth.RoleRepository;
import com.industech.repository.auth.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Slf4j
@Service
public class AuthenticationService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PrivilegeRepository privilegeRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;


    private Set<Role> roles(){
        Set<Privilege>privileges=new HashSet<>(privilegeRepository.findAll());
        Set<Role> roles=new HashSet<>();
        Optional<Role> role= roleRepository.findByRoleName("user");
        if(role.isPresent()){
            role.get().setPrivileges(privileges);
            roles.add(role.get());
        }
        return roles;
    }

    public User registerUser(String name, String email, String phone, String password) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            throw new AuthUserException("Este email ya está en uso.", HttpStatus.CONFLICT);
        } else {
            User recordUser = new User(name, email, phone, passwordEncoder.encode(password), roles());
            return userRepository.save(recordUser);
        }
    }

    public LoginResponse login(String username, String password, HttpServletResponse response){
        AuthUser user= null;
        Token token=null;
        try {
            Authentication auth =//Authenticate the user for the ProviderManager in SecurityConfig.class, @Bean AuthenticationManager
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            if(auth.isAuthenticated()){
                user= (AuthUser) auth.getPrincipal();//the principal is set in UserDetailsServiceImpl.class
                token=new Token(
                        tokenService.createJwtAccessToken(user),
                        tokenService.createUUIDRefreshToken(user.getUser()).getToken());
                //Don't store access token in a cookie or in local storage, refresh token must be saved as a httpOnly cookie
                ResponseCookie cookie = ResponseCookie.from("refreshToken", token.refreshToken())
                        .httpOnly(true)
                        .sameSite("None")
                        .secure(true)
                        .path("/")
                        .maxAge(24* 60 * 60)  // Set the expiration same as the refresh token
                        .build();
                response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
            }
            return new LoginResponse(user,token);
        }catch (AuthenticationException e) {
            throw new AuthUserException("Usuario no válido", HttpStatus.UNAUTHORIZED);
        }
    }

    public LoginResponse refreshToken(String refreshTokenRequest) {
        return tokenService.findRefreshToken(refreshTokenRequest)
                .map(tokenService::verifyExpiration)//returns a token, or an exception if it has expired
                .map(RefreshToken::getUser)//get the user of the refresh token from above
                .map(user ->{
                    AuthUser authUser=new AuthUser(user);
                    String accessToken=tokenService.createJwtAccessToken(authUser);
                    log.info("\u001B[35mgenerated new access token: " + accessToken + "\u001B[0m");//delete after
                    return new LoginResponse(authUser,new Token(accessToken, refreshTokenRequest));
                })
                .orElseThrow(() -> {
                    log.error("\u001B[31minvalid token or user is null.\u001B[0m");
                    return new TokenException("token inválido o usuario nulo",HttpStatus.FORBIDDEN);
                });
    }
}