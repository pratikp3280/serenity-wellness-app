
package com.serenity.converter;

import com.serenity.enums.Mood;

import jakarta.persistence.AttributeConverter;  // AttributeConverter is a JPA interface that converts a Java attribute into a database-compatible value and back again.
import jakarta.persistence.Converter;

@Converter
public class MoodConverter implements AttributeConverter<Mood, String> {

    @Override
    public String convertToDatabaseColumn(Mood mood) {  // Java → MySQL       	Mood.HAPPY → "happy"

        if (mood == null) {
            return null;
        }

        return mood.name().toLowerCase();
    }

    @Override
    public Mood convertToEntityAttribute(String moodValue) {  // MySQL → Java		"happy" → Mood.HAPPY

        if (moodValue == null) {
            return null;
        }

        return Mood.valueOf(moodValue.toUpperCase());
    }
}
