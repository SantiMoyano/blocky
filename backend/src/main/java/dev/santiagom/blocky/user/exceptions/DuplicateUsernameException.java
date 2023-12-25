package dev.santiagom.blocky.user.exceptions;

public class DuplicateUsernameException extends RuntimeException {

    public DuplicateUsernameException(String username) {
        super("Username '" + username + "' already exists.");
    }
}
