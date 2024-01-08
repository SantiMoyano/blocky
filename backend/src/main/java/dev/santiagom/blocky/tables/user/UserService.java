package dev.santiagom.blocky.tables.user;

import dev.santiagom.blocky.tables.user.exceptions.NoUsersFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> allUsers() {
        List<User> users = userRepository.findAll();
        if (users.isEmpty())
            throw new NoUsersFoundException();

        return users;
    }
}
