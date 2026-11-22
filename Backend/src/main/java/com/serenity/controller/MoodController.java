package com.serenity.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.serenity.dto.MoodEntryResponse;
import com.serenity.dto.MoodRequest;
import com.serenity.service.MoodService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/moods")
public class MoodController {

    private final MoodService moodService;

    public MoodController(MoodService moodService) {
        this.moodService = moodService;
    }

    // Save a mood entry for the currently authenticated user.
    @PostMapping  // Handles requests to save a mood.
    public ResponseEntity<MoodEntryResponse> saveMood(
            @Valid @RequestBody MoodRequest request,                   // Spring converts incoming JSON into MoodRequest and validates its fields before calling the service.
            Authentication authentication) {

        String authenticatedEmail = authentication.getName();

        MoodEntryResponse response = moodService.saveMoodEntry(
                authenticatedEmail,
                request.mood(),
                request.note()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // Retrieve mood history belonging to the currently authenticated user.
    @GetMapping // Handles requests to retrieve mood history.
    public ResponseEntity<List<MoodEntryResponse>> getMoodHistory(
            Authentication authentication) {

        String authenticatedEmail = authentication.getName();

        List<MoodEntryResponse> history =
                moodService.getMoodHistory(authenticatedEmail);

        return ResponseEntity.ok(history);
    }
}