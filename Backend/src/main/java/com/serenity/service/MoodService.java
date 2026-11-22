package com.serenity.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.serenity.dto.MoodEntryResponse;
import com.serenity.entity.MoodEntry;
import com.serenity.entity.User;
import com.serenity.enums.Mood;
import com.serenity.repository.MoodEntryRepository;
import com.serenity.repository.UserRepository;

import jakarta.persistence.EntityManager;

@Service
public class MoodService {

    private final MoodEntryRepository moodEntryRepository;
    private final UserRepository userRepository;
    private final EntityManager entityManager;

    public MoodService(
            MoodEntryRepository moodEntryRepository,
            UserRepository userRepository,
            EntityManager entityManager) {

        this.moodEntryRepository = moodEntryRepository;
        this.userRepository = userRepository;
        this.entityManager = entityManager;
    }

    // Save a mood entry for the authenticated user.
    @Transactional
    public MoodEntryResponse saveMoodEntry(
            String authenticatedEmail,
            Mood mood,
            String note) {

        // 1. Validate the authenticated user's email.
        if (authenticatedEmail == null || authenticatedEmail.isBlank()) {
            throw new IllegalArgumentException(
                    "Authenticated user email is required."
            );
        }

        // 2. Validate the selected mood.
        if (mood == null) {
            throw new IllegalArgumentException(
                    "Please select a valid mood."
            );
        }

        // 3. Find the actual user from the database.
        User user = userRepository.findByEmail(authenticatedEmail)
                .orElseThrow(() -> new IllegalStateException(
                        "Authenticated user was not found."
                ));

        // 4. Normalize the optional journal note.
        String normalizedNote = normalizeNote(note);

        // 5. Create a mood entry linked to this user.
        MoodEntry moodEntry = new MoodEntry(
                user,
                mood,
                normalizedNote
        );

        // 6. Save the entry.
        MoodEntry savedEntry = moodEntryRepository.saveAndFlush(moodEntry);

        // Refresh to retrieve the database-generated recorded_at value.
        entityManager.refresh(savedEntry);

        // 7. Return a safe response DTO.
        return MoodEntryResponse.from(savedEntry);
    }

    // Retrieve only the authenticated user's mood history.
    @Transactional(readOnly = true)
    public List<MoodEntryResponse> getMoodHistory(
            String authenticatedEmail) {

        if (authenticatedEmail == null || authenticatedEmail.isBlank()) {
            throw new IllegalArgumentException(
                    "Authenticated user email is required."
            );
        }

        User user = userRepository.findByEmail(authenticatedEmail)
                .orElseThrow(() -> new IllegalStateException(
                        "Authenticated user was not found."
                ));

        List<MoodEntry> entries =
                moodEntryRepository.findAllByUser_IdOrderByRecordedAtDesc(
                        user.getId()
                );

        return entries.stream()
                .map(MoodEntryResponse::from)
                .toList();
    }

    // Normalize optional journal notes.
    private String normalizeNote(String note) {

        if (note == null || note.isBlank()) {
            return null;
        }

        return note.trim();
    }
}