
-- V6: Update mood entries to support
-- 10 standardized moods and optional journal notes.

ALTER TABLE mood_entries

    -- Remove the old five-mood restriction.
    DROP CHECK chk_mood_entries_mood,

    -- Add an optional journal note.
    ADD COLUMN note TEXT NULL AFTER mood,

    -- Allow only the ten approved mood values.
    ADD CONSTRAINT chk_mood_entries_mood
    CHECK (
        mood IN (
            'happy',
            'calm',
            'excited',
            'grateful',
            'neutral',
            'sad',
            'anxious',
            'stressed',
            'angry',
            'tired'
        )
    );