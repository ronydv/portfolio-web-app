package com.portfolio.service.auth;

import com.portfolio.dto.auth.PaginatedUsers;
import com.portfolio.exception.AuthUserException;
import com.portfolio.exception.ProductException;
import com.portfolio.model.auth.AuthUser;
import com.portfolio.model.auth.User;
import com.portfolio.repository.auth.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
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
        //log.info("\u001B[35mwords from the client mapped to array: " + words + "\u001B[0m");

        String regex = IntStream.range(0, words.size())
                .filter(i -> i < words.size())
                .mapToObj(i -> "(?=.*[[:<:]](" + words.get(i) + ")[[:>:]])")
                .collect(Collectors.joining("|", "(?i)^", ".*"));

        PageRequest pages = PageRequest.of(page - 1, pageSize);
        if(userRepository.searchByKeywords(regex, pages).isEmpty()){
            //log.error("No users found -> searchUsers");
            throw new ProductException("No users with those values are found", HttpStatus.NOT_FOUND);
        }else {
            Page<User> users=userRepository.searchByKeywords(regex, pages);
            return new PaginatedUsers(users.getContent()
                    .stream()
                    .map(AuthUser::new).collect(Collectors.toList()),
                    users.getTotalElements());
        }
    }
    public AuthUser updateUser(User user) {
        if (user == null) throw new AuthUserException("Empty user", HttpStatus.BAD_REQUEST);
        Optional<User> reference = userRepository.findById(user.getId());
        if (reference.isEmpty()) return null;

        User existingUser = reference.get();
        try {
            Field[] fields = User.class.getDeclaredFields();
            for (Field field : fields) {
                field.setAccessible(true);
                Object value = field.get(user);
                if (value != null) {
                    switch (field.getName()) {
                        case "name": existingUser.setName((String) value);
                            break;
                        case "email": existingUser.setEmail((String) value);
                            break;
                        case "phone": existingUser.setPhone((String) value);
                            break;
                        case "password": existingUser.setPassword(new BCryptPasswordEncoder().encode((String) value));
                            break;
                        default:
                            break;
                    }
                }
            }
            return new AuthUser(userRepository.save(existingUser));
        } catch (IllegalAccessException e) {
            throw new AuthUserException("Error when accessing user fields", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            throw e.getLocalizedMessage().contains("ConstraintViolationException") ?
                    new AuthUserException("This email is already in use", HttpStatus.BAD_REQUEST) :
                    new AuthUserException(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    public String deleteUser(Long id){
        return userRepository.findById(id)
                .map((user)-> {
                    userRepository.delete(user);
                    return "deleted successfully!";
                }).orElseGet(()-> {
                    //log.error("\u001B[35mUser to delete doesn't exists\u001B[0m");
                    throw new AuthUserException("User to delete doesn't exists", HttpStatus.NOT_FOUND);
                });
    }
}
