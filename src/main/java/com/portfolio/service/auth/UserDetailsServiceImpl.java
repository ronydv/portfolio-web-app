package com.portfolio.service.auth;

import com.portfolio.model.auth.AuthUser;
import com.portfolio.repository.auth.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
@Slf4j
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override// fetch user through the @Bean AuthenticationManager from SecurityConfig.class
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        return userRepository
                .findByEmail(email)
                .map( user ->{
                    //get the user from database, set data to User Entity and transform to AuthUser
                    return new AuthUser(user);
                })
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
