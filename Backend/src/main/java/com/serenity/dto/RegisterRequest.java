
package com.serenity.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// record(concise, immutable data carriers.) lets us declare the data directly.
// instead of writing a class with fields, constructors, getters and setters.
public record RegisterRequest(

    @NotBlank(message = "Full name is required")
    @Size(max = 100, message = "Full name cannot exceed 100 characters")
    String fullName,

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    @Size(max = 255, message = "Email cannot exceed 255 characters")
    String email,

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 72,
          message = "Password must contain between 8 and 72 characters")
    String password

) {
}


/*
DTO : Data Transfer Object.
=> a Java object used to transfer data between different parts of an application, especially between the frontend and backend.
=> React sends JSON request Body to Backend and then Backend recives and Processes and sends back the desired respose body to React or any other Layer/Parts

 */