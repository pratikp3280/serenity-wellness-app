/* registration logic is now centralized in UserService. */
package com.serenity.service;

import java.util.Locale;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.serenity.entity.User;
import com.serenity.repository.UserRepository;
import com.serenity.exception.EmailAlreadyExistsException;

@Service  // Tells Spring that UserService is a service component Spring manages its lifecycle and makes it available for dependency injection.
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;
 
    // Constructor Injection :asking Spring to provide An Objects of Both UserRepository and PasswordEncoder
    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;

    }

    // User Registration Business Logic
    @Transactional // telling spring that group of database operations is treated as one logical unit
    public User registerUser(
            String fullName,
            String email,
            String rawPassword) {

        // STEP 1: Normalize email : All lowercase Only automatically
        String normalizedEmail =
                email.trim().toLowerCase(Locale.ROOT);

        // STEP 2: Check duplicate email
        if (userRepository.existsByEmail(normalizedEmail)) {

            throw new EmailAlreadyExistsException(
                    "An account with this email already exists."
            );

        }

        // STEP 3: Hash original password : BCrypt generates a password hash.
        String passwordHash =
                passwordEncoder.encode(rawPassword);

        // STEP 4: Create User object
        User user = new User(
                fullName.trim(),
                normalizedEmail,
                passwordHash
        );

        // STEP 5: Save using Repository
        return userRepository.save(user);
        // By above code Repository delegates the persistence operation to Hibernate, which generates the SQL INSERT statement.

    }
    
    
    public User getUserByEmail(String email) {

        String normalizedEmail =
                email.trim().toLowerCase(Locale.ROOT);

        return userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() ->
                    new IllegalStateException(
                        "Authenticated user record not found."
                    )
                );
    }
    
    
    
    
    
    
    
}


/*
 Constructor Dependency Injection
 : Its a Type Of Dependency Injection in a Spring 
 : Automatically Creates a dependencies via Costructor
 
 * */
