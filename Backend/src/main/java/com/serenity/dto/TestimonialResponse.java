package com.serenity.dto;

import java.time.LocalDateTime;

import com.serenity.entity.Testimonial;

// Data returned when displaying an approved public review.
public record TestimonialResponse(

        Long id,
        String fullName,
        String occupation,
        int rating,
        String comment,
        LocalDateTime createdAt

) {

    // Convert the database Entity into a safe API response.
    public static TestimonialResponse from(Testimonial testimonial) {

        return new TestimonialResponse(

                testimonial.getId(),

                // Get the real user's name from the User relationship.
                testimonial.getUser().getFullName(),

                testimonial.getOccupation(),

                testimonial.getRating().intValue(),

                testimonial.getComment(),

                testimonial.getCreatedAt()
        );
    }
}