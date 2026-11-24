
package com.serenity.exception;

import java.util.Map;

import org.springframework.http.HttpStatus;  // HttpStatus provides predefined HTTP status codes.
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.security.core.AuthenticationException;
import org.springframework.http.converter.HttpMessageNotReadableException;

@RestControllerAdvice   // Makes this class available to handle exceptions across REST controllers.
public class GlobalExceptionHandler {

    // Handle duplicate email registration
    @ExceptionHandler(EmailAlreadyExistsException.class)             // Specifies which exception a method handles.
    public ResponseEntity<Map<String, String>> handleDuplicateEmail(
            EmailAlreadyExistsException exception) {

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Map.of("message", exception.getMessage()));
    }

    // Handle invalid request data
    @ExceptionHandler(MethodArgumentNotValidException.class)   // thrown when a request contains data that fails Bean Validation
    public ResponseEntity<Map<String, String>> handleValidationErrors(
            MethodArgumentNotValidException exception) {

    	
    	// Give me the first validation message. If there is no message, use Invalid registration details.
        String errorMessage = exception.getBindingResult()  // Give me the information about the request-binding and validation results.
                .getFieldErrors()
                .stream()
                .map(error -> error.getDefaultMessage())
                .findFirst()                                 // findFirst() selects/retrieves the first element from the stream, if one exists.
                .orElse("Invalid request details.");

        
        // Create an HTTP response with status code 409 Conflict and include the exception message inside a JSON response body
        return ResponseEntity
                .badRequest()
                .body(Map.of("message", errorMessage));

    
    
    
    } 
    
    
    
    //to handle invalid login credentials gracefully.
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<Map<String, String>> handleAuthenticationException(
            AuthenticationException exception) {

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(Map.of(
                    "message",
                    "Invalid email or password."
                ));
    }
   // API will return HTTP 401 Unauthorized for invalid login credentials rather than exposing internal authentication details.
    
    
    
 // Handle malformed JSON or unsupported mood values.
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> handleInvalidRequestBody(
            HttpMessageNotReadableException exception) {

        return ResponseEntity
                .badRequest()
                .body(Map.of(
                        "message",
                        "Invalid request body. Please check the submitted values and try again."
                ));
    }
    
    
    
 // Handle invalid values rejected by service-level validation.
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgument(
            IllegalArgumentException exception) {

        return ResponseEntity
                .badRequest()
                .body(Map.of(
                        "message",
                        exception.getMessage()
                ));
    }
    
    
    
    
    
}

/*
 * Global Exception Handler:
 =>
 => centralized mechanism in Spring Boot that catches and handles exceptions thrown by different parts of an application,
 => particularly during HTTP request processing. 
 * 
 *
ResponseEntity(delivery box.) :=> represents the complete HTTP response sent by your backend to the client.
 * 
 * 
 HTTP response Parts :  1.STATUS CODE
 						2.HEADERS    
 						3.BODY
 
 
 * 
 * 
 * 
@ExceptionHandler : Tells the springs Whena Matching exception occurs use this method to handle.
 * 
 * 
Status							Meaning
200 	OK						Request successful
201 	CREATED	Resource 		successfully created
400 	BAD REQUEST				Client sent invalid request data
401 	UNAUTHORIZED			Authentication required or failed
403 	FORBIDDEN				Access is not permitted
404 	NOT FOUND				Resource not found
409 	CONFLICT				Request conflicts with existing data
500 	INTERNAL SERVER ERROR	Unexpected server-side problem 
 * 
 * 
 * 
Why @RestControllerAdvice instead of @ControllerAdvice?
Because you're developing a REST API.
Your frontend(React) expects JSON responses, not HTML pages or view templates.
so @RestControllerAdvice is combination of      @ControllerAdvice
														+
											    @ResponseBody														
 * 
 * 
 * 
 * 
 * 
 * 
 HttpStatus.CONFLICT means: HTTP 409 Conflict
Why 409?
Because the user is trying to register an email that already exists.
The new registration conflicts with existing application data.


Map.of() creates a map containing key-value pairs.
- Key: "message"
- Value: exception.getMessage()
 *
 * 
 * 
 * 
 What is Stream API?

Java Stream API allows us to process collections of data in a readable, step-by-step manner. 
 * 
What is a lambda expression?
A lambda expression is a concise way to represent a function-like block of code in Java.
 * **/



















