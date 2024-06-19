package com.industech.service.auth;

import com.industech.dto.auth.PaginatedUsers;
import com.industech.exception.AuthUserException;
import com.industech.exception.ProductException;
import com.industech.model.auth.AuthUser;
import com.industech.model.auth.User;
import com.industech.model.order.Order;
import com.industech.repository.auth.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public PaginatedUsers getUsers(Integer page, Integer pageSize) {
        PageRequest pages = PageRequest.of(page - 1, pageSize);
        Page<User> users = userRepository.findAll(pages);
        return new PaginatedUsers(users.getContent()
                    .stream()
                    .map(AuthUser::new).collect(Collectors.toList()),
                    users.getTotalElements());
    }

    public PaginatedUsers searchUsers(Integer page, Integer pageSize, String wordsToRegex){
        List<String> words = Stream.of(wordsToRegex.split(" "))
                .map(String::trim).toList();
        log.info("\u001B[35mwords from the client mapped to array: " + words + "\u001B[0m");

        String regex = IntStream.range(0, words.size())
                .filter(i -> i < words.size())
                .mapToObj(i -> "(?=.*[[:<:]](" + words.get(i) + ")[[:>:]])")
                .collect(Collectors.joining("|", "(?i)^", ".*"));

        PageRequest pages = PageRequest.of(page - 1, pageSize);
        if(userRepository.searchByKeywords(regex, pages).isEmpty()){
            log.error("No users found -> searchUsers");
            throw new ProductException("No users found", HttpStatus.NOT_FOUND);
        }else {
            Page<User> users=userRepository.searchByKeywords(regex, pages);
            return new PaginatedUsers(users.getContent()
                    .stream()
                    .map(AuthUser::new).collect(Collectors.toList()),
                    users.getTotalElements());
        }
    }

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
