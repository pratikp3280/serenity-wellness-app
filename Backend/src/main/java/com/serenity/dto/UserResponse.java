
package com.serenity.dto;

import com.serenity.entity.User;

public record UserResponse(
    Long id,
    String fullName,
    String email
) {

    // Convert Entity into a safe response DTO
    public static UserResponse from(User user) {

        return new UserResponse(
            user.getId(),
            user.getFullName(),
            user.getEmail()
        );
    }
}
