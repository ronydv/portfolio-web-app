package com.industech.controller.auth;

import com.industech.dto.auth.PaginatedUsers;
import com.industech.model.auth.AuthUser;
import com.industech.service.auth.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    //@PreAuthorize("hasRole('admin:read')")
    public ResponseEntity<PaginatedUsers> getAllUsers(@RequestParam("page") Integer page,
                                                      @RequestParam("page-size") Integer pageSize){
        return new ResponseEntity<>(userService.getUsers(page,pageSize), OK);
    }
    @GetMapping("/search")
    public ResponseEntity<PaginatedUsers> searchUsers(@RequestParam("page") Integer page,
                                                      @RequestParam("page-size") Integer pageSize,
                                                      @RequestParam("browse") String browse){
        return new ResponseEntity<>(userService.searchUsers(page,pageSize,browse), OK);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id")Long id){
        return new ResponseEntity<>(userService.deleteUser(id),OK);
    }
}
