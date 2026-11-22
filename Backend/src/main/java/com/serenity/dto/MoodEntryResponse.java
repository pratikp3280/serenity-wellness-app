package com.serenity.dto;

import java.time.LocalDateTime;
import java.util.Locale;

import com.serenity.entity.MoodEntry;

public record MoodEntryResponse(
        Long id,
        String mood,
        String note,
        LocalDateTime recordedAt
) {

    public static MoodEntryResponse from(MoodEntry entry) {

        return new MoodEntryResponse(
                entry.getId(),
                entry.getMood().name().toLowerCase(Locale.ROOT),
                entry.getNote(),
                entry.getRecordedAt()
        );
    }
}