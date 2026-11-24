package com.serenity.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

// Data received from the frontend when a user submits a review.
public record TestimonialRequest(

        @NotNull(message = "Please select a star rating.")
        @Min(value = 1, message = "Rating must be at least 1.")
        @Max(value = 5, message = "Rating cannot exceed 5.")
        Integer rating,

        @NotBlank(message = "Please enter your occupation.")
        @Size(max = 100, message = "Occupation cannot exceed 100 characters.")
        String occupation,

        @NotBlank(message = "Please write your feedback.")
        @Size(max = 1000, message = "Feedback cannot exceed 1000 characters.")
        String comment

) {
}