package dev.santiagom.blocky.tables.user;

import dev.santiagom.blocky.jwt.JwtService;
import dev.santiagom.blocky.tables.user.exceptions.NoUsersFoundException;
import dev.santiagom.blocky.tables.user.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired JwtService jwtService;

    public User findUserByToken(String token) {
        return userRepository.findByUsername(jwtService.getUsernameFromToken(token))
                .orElseThrow(() -> new UserNotFoundException("User not found for token: " + token));
    }

    public List<User> allUsers() {
        List<User> users = userRepository.findAll();
        if (users.isEmpty())
            throw new NoUsersFoundException();

        return users;
    }
}
