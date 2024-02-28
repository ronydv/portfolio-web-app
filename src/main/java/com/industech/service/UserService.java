package com.industech.service;

import com.industech.model.AuthUser;
import com.industech.model.User;
import com.industech.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<AuthUser> getUsers(){
        return Optional.of(userRepository.findAll()
                        .stream()
                        .map(AuthUser::new).collect(Collectors.toList())
                ).orElseThrow(() -> new IllegalStateException("No users found"));
    }
}
