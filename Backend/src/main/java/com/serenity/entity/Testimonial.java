
package com.serenity.entity;

import java.time.LocalDateTime;

import com.serenity.enums.TestimonialStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "testimonials")
public class Testimonial {

    // Primary key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Connects the review to its registered user.
    // Each user can have only one testimonial.
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    // Rating from 1 to 5.
    // Byte maps naturally to MySQL TINYINT.
    @Column(name = "rating", nullable = false)
    private Byte rating;

    // User occupation.
    @Column(name = "occupation", nullable = false, length = 100)
    private String occupation;

    // Written feedback.
    @Column(name = "comment", nullable = false, length = 1000)
    private String comment;

    // Review moderation status.
    // New reviews start as PENDING.
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private TestimonialStatus status = TestimonialStatus.PENDING;

    // MySQL automatically generates these timestamps.
    @Column(
        name = "created_at",
        nullable = false,
        insertable = false,
        updatable = false
    )
    private LocalDateTime createdAt;

    @Column(
        name = "updated_at",
        nullable = false,
        insertable = false,
        updatable = false
    )
    private LocalDateTime updatedAt;

    // Required by JPA
    protected Testimonial() {
    }

    // Constructor for creating a testimonial.
    public Testimonial(
            User user,
            Byte rating,
            String occupation,
            String comment) {

        this.user = user;
        this.rating = rating;
        this.occupation = occupation;
        this.comment = comment;
        this.status = TestimonialStatus.PENDING;
    }

    // Update an existing testimonial.
    // Editing an approved review sends it for approval again.
    public void updateReview(
            Byte rating,
            String occupation,
            String comment) {

        this.rating = rating;
        this.occupation = occupation;
        this.comment = comment;
        this.status = TestimonialStatus.PENDING;
    }

    // Getters

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Byte getRating() {
        return rating;
    }

    public String getOccupation() {
        return occupation;
    }

    public String getComment() {
        return comment;
    }

    public TestimonialStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    // Set status for future moderation operations.
    public void setStatus(TestimonialStatus status) {
        this.status = status;
    }
}