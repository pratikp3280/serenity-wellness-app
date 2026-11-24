package com.serenity.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.serenity.dto.MyTestimonialResponse;
import com.serenity.dto.TestimonialRequest;
import com.serenity.dto.TestimonialResponse;
import com.serenity.dto.TestimonialSummaryResponse;
import com.serenity.entity.Testimonial;
import com.serenity.entity.User;
import com.serenity.enums.TestimonialStatus;
import com.serenity.repository.TestimonialRepository;
import com.serenity.repository.UserRepository;

import jakarta.persistence.EntityManager;

@Service
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;
    private final UserRepository userRepository;
    private final EntityManager entityManager;

    // Constructor injection.
    public TestimonialService(
            TestimonialRepository testimonialRepository,
            UserRepository userRepository,
            EntityManager entityManager) {

        this.testimonialRepository = testimonialRepository;
        this.userRepository = userRepository;
        this.entityManager = entityManager;
    }

    // ----------------------------------------------------
    // 1. Submit a new review or update an existing review.
    // ----------------------------------------------------

    @Transactional
    public MyTestimonialResponse submitOrUpdateReview(
            String authenticatedEmail,
            TestimonialRequest request) {

        // Step 1: Validate authenticated email.
        if (authenticatedEmail == null || authenticatedEmail.isBlank()) {
            throw new IllegalArgumentException(
                    "Authenticated user email is required."
            );
        }

        // Step 2: Validate rating.
        if (request.rating() == null
                || request.rating() < 1
                || request.rating() > 5) {

            throw new IllegalArgumentException(
                    "Rating must be between 1 and 5."
            );
        }

        // Step 3: Normalize the input.
        String occupation = request.occupation().trim();
        String comment = request.comment().trim();

        // Step 4: Find the actual authenticated user.
        User user = userRepository.findByEmail(authenticatedEmail)
                .orElseThrow(() -> new IllegalStateException(
                        "Authenticated user was not found."
                ));

        // Step 5: Check whether this user already has a review.
        Optional<Testimonial> existingReview =
                testimonialRepository.findByUser_Id(user.getId());

        Testimonial testimonial;

        if (existingReview.isPresent()) {

            // Update the existing review.
            testimonial = existingReview.get();

            testimonial.updateReview(
                    request.rating().byteValue(),
                    occupation,
                    comment
            );

        } else {

            // Create a new review.
            testimonial = new Testimonial(
                    user,
                    request.rating().byteValue(),
                    occupation,
                    comment
            );
        }

        // Step 6: Save the review.
        Testimonial savedTestimonial =
                testimonialRepository.saveAndFlush(testimonial);

        // Step 7: Refresh database-generated timestamps.
        entityManager.refresh(savedTestimonial);

        // Step 8: Return the user's review.
        return MyTestimonialResponse.from(savedTestimonial);
    }


    // ----------------------------------------------------
    // 2. Retrieve the authenticated user's own review.
    // ----------------------------------------------------

    @Transactional(readOnly = true)
    public Optional<MyTestimonialResponse> getMyReview(
            String authenticatedEmail) {

        // Find authenticated user.
        User user = findAuthenticatedUser(authenticatedEmail);

        // Find their review.
        return testimonialRepository.findByUser_Id(user.getId())
                .map(MyTestimonialResponse::from);
    }


    // ----------------------------------------------------
    // 3. Retrieve approved public reviews.
    // ----------------------------------------------------

    @Transactional(readOnly = true)
    public List<TestimonialResponse> getApprovedReviews() {

        List<Testimonial> testimonials =
                testimonialRepository
                        .findAllByStatusOrderByCreatedAtDesc(
                                TestimonialStatus.APPROVED
                        );

        // Convert Entities into safe Response DTOs.
        return testimonials.stream()
                .map(TestimonialResponse::from)
                .toList();
    }


    // ----------------------------------------------------
    // 4. Calculate public review statistics.
    // ----------------------------------------------------

    @Transactional(readOnly = true)
    public TestimonialSummaryResponse getReviewSummary() {

        // Count only approved reviews.
        long reviewCount =
                testimonialRepository.countByStatus(
                        TestimonialStatus.APPROVED
                );

        // Calculate average rating of approved reviews.
        Double averageRating =
                testimonialRepository.findAverageRatingByStatus(
                        TestimonialStatus.APPROVED
                );

        // AVG returns null when there are no matching records.
        double safeAverageRating =
                averageRating != null ? averageRating : 0.0;

        return new TestimonialSummaryResponse(
                safeAverageRating,
                reviewCount
        );
    }


    // ----------------------------------------------------
    // Common helper method.
    // ----------------------------------------------------

    private User findAuthenticatedUser(String authenticatedEmail) {

        if (authenticatedEmail == null || authenticatedEmail.isBlank()) {
            throw new IllegalArgumentException(
                    "Authenticated user email is required."
            );
        }

        return userRepository.findByEmail(authenticatedEmail)
                .orElseThrow(() -> new IllegalStateException(
                        "Authenticated user was not found."
                ));
    }
}
/*
It handles:
1. Identifying the authenticated user.
2. Finding their existing review.
3. Creating a new review or updating the old one.
4. Keeping new or edited reviews in PENDING.
5. Retrieving approved public reviews.
6. Calculating actual rating statistics.
 */