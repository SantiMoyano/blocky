package dev.santiagom.blocky.auth;

import dev.santiagom.blocky.jwt.JwtService;
import dev.santiagom.blocky.user.Role;
import dev.santiagom.blocky.user.User;
import dev.santiagom.blocky.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    public AuthResponse login(LoginRequest request) {
        return null;
    }

    public AuthResponse register(RegisterRequest request) {
        User user = User.builder()
                .firstname(request.getFirstname())
                .username(request.getUsername())
                .password(request.getPassword())
                .role(Role.USER)
                .build();

        userRepository.save(user);
        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();
    }
}
