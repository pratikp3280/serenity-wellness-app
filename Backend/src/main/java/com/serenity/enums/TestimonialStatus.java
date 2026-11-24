package com.serenity.enums;

// Represents the moderation state of a testimonial.
public enum TestimonialStatus {

    // Review submitted but not yet reviewed.
    PENDING,

    // Review approved and visible on the homepage.
    APPROVED,

    // Review rejected and not publicly visible.
    REJECTED
}