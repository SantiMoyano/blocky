package dev.santiagom.blocky.tables.user.exceptions;

public class DuplicateUsernameException extends RuntimeException {

    public DuplicateUsernameException(String username) {
        super("Username '" + username + "' already exists.");
    }
}
