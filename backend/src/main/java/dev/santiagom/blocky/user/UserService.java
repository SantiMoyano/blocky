package dev.santiagom.blocky.user;

import dev.santiagom.blocky.user.exceptions.DuplicateUsernameException;
import dev.santiagom.blocky.user.exceptions.NoUsersFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> allUsers() {
        List<User> users = userRepository.findAll();

        if (users.isEmpty()) {
            throw new NoUsersFoundException("No users found in the database.");
        }

        return users;
    }

    public User createUser(User user) {

        if (userRepository.existsByUsername(user.getUsername())) {
            throw new DuplicateUsernameException(user.getUsername());
        }
        return userRepository.save(user);
    }
}
