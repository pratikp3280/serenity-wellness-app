package com.serenity.exception;

public class EmailAlreadyExistsException extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public EmailAlreadyExistsException(String message) {

        super(message);

    }
}

/*
What is a custom exception?
=> an exception class created by the developer to represent a specific application-level problem.

For example:
- EmailAlreadyExistsException
- UserNotFoundException
- ProductNotFoundException
- InsufficientBalanceException
 */