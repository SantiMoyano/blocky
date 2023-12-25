package dev.santiagom.blocky.user;

import dev.santiagom.blocky.user.exceptions.NoUsersFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class UserServiceTest {
    @Autowired
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    @Test
    void allUsers_noUsersFound() {
        // Simulate that userRepository.findAll() returns an empty list
        when(userRepository.findAll()).thenReturn(List.of());

        // Verify that the NoUsersFoundException is thrown
        assertThrows(NoUsersFoundException.class, () -> userService.allUsers());
    }

    @Test
    void allUsers() {
        // Simulate that userRepository.findAll() returns a non-empty list
        when(userRepository.findAll()).thenReturn(List.of(new User(1L, "user1", "pass1")));

        // Call the service function and verify that the list is not empty
        List<User> result = userService.allUsers();

        assertNotNull(result);
        assertFalse(result.isEmpty());
    }
}