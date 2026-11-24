package com.serenity.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.serenity.entity.Testimonial;
import com.serenity.enums.TestimonialStatus;

@Repository
public interface TestimonialRepository
        extends JpaRepository<Testimonial, Long> {

    // Find the review belonging to a particular user.
    Optional<Testimonial> findByUser_Id(Long userId);

    // Retrieve approved reviews, newest first.
    List<Testimonial> findAllByStatusOrderByCreatedAtDesc(
            TestimonialStatus status
    );

    // Count reviews having a particular status.
    long countByStatus(TestimonialStatus status);

    // Calculate the average rating for a particular status.
    @Query("""
            SELECT AVG(t.rating)
            FROM Testimonial t
            WHERE t.status = :status
            """)
    Double findAverageRatingByStatus(
            @Param("status") TestimonialStatus status
    );
}