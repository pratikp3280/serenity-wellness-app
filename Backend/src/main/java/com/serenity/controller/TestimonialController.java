package com.serenity.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.serenity.dto.MyTestimonialResponse;
import com.serenity.dto.TestimonialRequest;
import com.serenity.dto.TestimonialResponse;
import com.serenity.dto.TestimonialSummaryResponse;
import com.serenity.service.TestimonialService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialController {

    private final TestimonialService testimonialService;

    public TestimonialController(
            TestimonialService testimonialService) {

        this.testimonialService = testimonialService;
    }


    // ----------------------------------------------------
    // 1. Submit a new review or update an existing review.
    // POST /api/testimonials
    // ----------------------------------------------------

    @PostMapping
    public ResponseEntity<MyTestimonialResponse> submitReview(

            @Valid @RequestBody TestimonialRequest request,

            Authentication authentication) {

        String authenticatedEmail = authentication.getName();

        MyTestimonialResponse response =
                testimonialService.submitOrUpdateReview(
                        authenticatedEmail,
                        request
                );

        return ResponseEntity.ok(response);
    }


    // ----------------------------------------------------
    // 2. Retrieve the currently authenticated user's review.
    // GET /api/testimonials/me
    // ----------------------------------------------------

    @GetMapping("/me")
    public ResponseEntity<MyTestimonialResponse> getMyReview(
            Authentication authentication) {

        String authenticatedEmail = authentication.getName();

        Optional<MyTestimonialResponse> response =
                testimonialService.getMyReview(authenticatedEmail);

        // Return 200 if a review exists.
        // Return 204 if the user has not submitted one yet.
        return response
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }


    // ----------------------------------------------------
    // 3. Retrieve all approved public reviews.
    // GET /api/testimonials
    // ----------------------------------------------------

    @GetMapping
    public ResponseEntity<List<TestimonialResponse>> getApprovedReviews() {

        List<TestimonialResponse> reviews =
                testimonialService.getApprovedReviews();

        return ResponseEntity.ok(reviews);
    }


    // ----------------------------------------------------
    // 4. Retrieve actual public review statistics.
    // GET /api/testimonials/summary
    // ----------------------------------------------------

    @GetMapping("/summary")
    public ResponseEntity<TestimonialSummaryResponse> getReviewSummary() {

        TestimonialSummaryResponse summary =
                testimonialService.getReviewSummary();

        return ResponseEntity.ok(summary);
    }
}