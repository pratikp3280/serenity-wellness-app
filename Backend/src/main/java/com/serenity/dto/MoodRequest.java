package com.serenity.dto;

import com.serenity.enums.Mood;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record MoodRequest(

        @NotNull(message = "Please select a mood.")
        Mood mood,

        @Size(max = 2000, message = "Journal note cannot exceed 2000 characters.")
        String note

) {
}