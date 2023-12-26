package dev.santiagom.blocky.user.exceptions;

public class NoUsersFoundException extends RuntimeException {

    public NoUsersFoundException() {
        super("No users found in the database.");
    }
}
