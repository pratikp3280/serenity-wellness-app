package com.serenity.dto;

import java.time.LocalDateTime;

import com.serenity.entity.Testimonial;
import com.serenity.enums.TestimonialStatus;

// Data returned to the logged-in user for their own review.
public record MyTestimonialResponse(

        Long id,
        String fullName,
        String occupation,
        int rating,
        String comment,
        TestimonialStatus status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt

) {

    public static MyTestimonialResponse from(Testimonial testimonial) {

        return new MyTestimonialResponse(

                testimonial.getId(),

                testimonial.getUser().getFullName(),

                testimonial.getOccupation(),

                testimonial.getRating().intValue(),

                testimonial.getComment(),

                testimonial.getStatus(),

                testimonial.getCreatedAt(),

                testimonial.getUpdatedAt()
        );
    }
}