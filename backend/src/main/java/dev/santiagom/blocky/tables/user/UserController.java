package dev.santiagom.blocky.tables.user;

import dev.santiagom.blocky.tables.user.exceptions.DuplicateUsernameException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins = {"http://localhost:3000"})
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<List<User>>(userService.allUsers(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            return new ResponseEntity<User>(userService.createUser(user), HttpStatus.CREATED);
        } catch (DuplicateUsernameException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
