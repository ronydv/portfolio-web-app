package com.industech.service;

import com.industech.model.Role;
import com.industech.model.User;
import com.industech.repository.PrivilegeRepository;
import com.industech.repository.RoleRepository;
import com.industech.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
    private PasswordEncoder passwordEncoder;


    private Set<Role> userRoles(){
        return null;
    }

    public User registerUser(String name, String email, String password) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            log.error("email is already in use.");
            throw new IllegalStateException("This email is already in use.");
        }
        else {
            User recordUser = new User(name, email, passwordEncoder.encode(password), userRoles());
            return userRepository.save(recordUser);
        }
    }
}
