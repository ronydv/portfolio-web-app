package com.industech.service.auth;

import com.industech.exception.AuthUserException;
import com.industech.exception.ProductException;
import com.industech.model.auth.AuthUser;
import com.industech.repository.auth.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
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

    //TODO add cellphone field to user dto and create admin with its roles again
    public String deleteUser(Long id){
        return userRepository.findById(id)
                .map((user)-> {
                    userRepository.delete(user);
                    return "deleted successfully";
                }).orElseGet(()-> {
                    log.error("\u001B[35mUser to delete doesn't exists\u001B[0m");
                    throw new AuthUserException("User to delete doesn't exists", HttpStatus.NOT_FOUND);
                });
    }
}
