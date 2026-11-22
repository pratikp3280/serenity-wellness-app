/*** temporary demonstration Code 
 * To Run Follow steps
 * Run → Run Configurations. -> serenity-backend from Java Application
->
Open Environment ->  add new Varaible  -> SPRING_PROFILES_ACTIVE = repository-demo
-> 
then Apply -> Run
 * 
 * 
 * 
 * 
 */
package com.serenity.demo;

import java.util.Optional;
import java.util.UUID;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.serenity.entity.User;
import com.serenity.repository.UserRepository;

@Component
@Profile("repository-demo")
public class UserRepositoryDemoRunner implements CommandLineRunner {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public UserRepositoryDemoRunner(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {

        String demoEmail = "jpa-demo@gmail.com";

        // STEP 1: Check whether the demo user already exists
        Optional<User> existingUser =
                userRepository.findByEmail(demoEmail);

        User user;

        if (existingUser.isPresent()) {

            user = existingUser.get();

            System.out.println("Demo user already exists.");

        } else {

            // Generate a temporary secret and hash it
            String temporarySecret = UUID.randomUUID().toString();

            String hashedPassword =
                    passwordEncoder.encode(temporarySecret);

            // STEP 2: Create a Java User object
            User newUser = new User(
                    "Serenity Demo User",
                    demoEmail,
                    hashedPassword
            );

            // STEP 3: Save the user into MySQL
            user = userRepository.save(newUser);

            System.out.println("New demo user saved successfully!");
        }

        System.out.println("Saved User ID: " + user.getId());

        // STEP 4: Retrieve the same user using its ID
        Optional<User> retrievedUser =
                userRepository.findById(user.getId());

        if (retrievedUser.isPresent()) {

            User fetchedUser = retrievedUser.get();

            System.out.println("User retrieved successfully!");

            System.out.println("ID: " + fetchedUser.getId());

            System.out.println("Name: " + fetchedUser.getFullName());

            System.out.println("Email: " + fetchedUser.getEmail());
        }
    }
}


/**
CommandLineRunner : is an interface that allows us to execute code when our Spring Boot application starts.
 
 
 Activate the demonstration profile : @Profile("repository-demo")
 :-> demonstration runner executes only when the repository-demo Spring profile is active.
 
 
 Spring Data JPA received the Java object.



Hibernate recognized that it needed to insert a new entity.

Hibernate generated the INSERT statement.

JDBC sent it to MySQL

MySQL inserted the record.

MySQL generated the ID using AUTO_INCREMENT.

Hibernate populated the generated ID into the Java object.
 
 
 * */
