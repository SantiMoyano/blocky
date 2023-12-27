package dev.santiagom.blocky.auth;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @PostMapping("/login")
    public String login() {
        return "Login from public endpoint";
    }

    @PostMapping("/register")
    public String register() {
        return "Register from public endpoint";
    }
}
