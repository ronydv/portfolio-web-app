package com.industech.service;

import com.industech.dto.LoginResponse;
import com.industech.model.AuthUser;
import com.industech.model.Privilege;
import com.industech.model.Role;
import com.industech.model.User;
import com.industech.repository.PrivilegeRepository;
import com.industech.repository.RoleRepository;
import com.industech.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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


    private Set<Role> roles(String roleName){
        Set<Privilege>privileges=new HashSet<>(privilegeRepository.getUserPermissions());
        Set<Role> roles=new HashSet<>();
        Optional<Role> role= roleRepository.findByRoleName(roleName);
        if(role.isPresent()){
            role.get().setPrivileges(privileges);
            roles.add(role.get());
        }
        return roles;
    }

    public User registerUser(String name, String email, String password) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            log.error("email is already in use.");
            throw new IllegalStateException("This email is already in use.");
        }
        else {
            User recordUser = new User(name, email, passwordEncoder.encode(password), roles("user"));
            return userRepository.save(recordUser);
        }
    }

    public LoginResponse login(String username, String password){
        AuthUser user= null;
        String accessToken= null;
        try {
            Authentication auth =//Authenticate the user for the ProviderManager in SecurityConfig.class, @Bean AuthenticationManager
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            if(auth.isAuthenticated()){
                user= (AuthUser) auth.getPrincipal();//the principal is set in UserDetailsServiceImpl.class
                accessToken=tokenService.createJwtAccessToken(user);
                log.info("\u001B[96mauthenticated user:\n"+ user+"\u001B[0m");
            }
            return new LoginResponse(user,accessToken);
        }catch (AuthenticationException e) {
            //TODO: create custom exception for users and tokens
            throw new IllegalStateException("invalid user");
        }
    }
}