package dev.santiagom.blocky.tables.user.exceptions;

public class NoUsersFoundException extends RuntimeException {

    public NoUsersFoundException() {
        super("No users found in the database.");
    }
}
