
package com.serenity.entity;

import java.time.LocalDateTime;

import com.serenity.converter.MoodConverter;
import com.serenity.enums.Mood;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity   // Marks this Java class as a JPA entity
@Table(name = "mood_entries")   // Maps the entity to mood_entries table
public class MoodEntry { 

    @Id  // Identifies the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)   // Lets MySQL generate the ID
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)     // Many mood entries can belong to one user
    @JoinColumn(name = "user_id", nullable = false)          // Maps the relationship to user_id
    private User user;

    @Convert(converter = MoodConverter.class)               // Uses our lowercase mood converter
    @Column(name = "mood", nullable = false, length = 20)
    private Mood mood;

    @Column(name = "note", columnDefinition = "TEXT")
    private String note;

    @Column(                             // Maps Java fields to database columns
        name = "recorded_at",
        nullable = false,
        insertable = false,
        updatable = false
    )
    private LocalDateTime recordedAt;

    // Required by JPA
    protected MoodEntry() {
    }

    // Constructor for creating a mood entry
    public MoodEntry(User user, Mood mood, String note) {
        this.user = user;
        this.mood = mood;
        this.note = note;
    }

    // Getters

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Mood getMood() {
        return mood;
    }

    public String getNote() {
        return note;
    }

    public LocalDateTime getRecordedAt() {
        return recordedAt;
    }

    // Setters

    public void setUser(User user) {
        this.user = user;
    }

    public void setMood(Mood mood) {
        this.mood = mood;
    }

    public void setNote(String note) {
        this.note = note;
    }
}


/*
 Why FetchType.LAZY?
 
Imagine a user has recorded 500 mood entries.
When we retrieve a single mood entry, we generally don't need to load the entire User object immediately.
LAZY delays loading the related User until it's needed.
This is useful for database efficiency.
 

Why are timestamps read-only?
We use:
insertable = false,
updatable = false


Just like your existing User.java, MySQL manages the timestamp using DEFAULT CURRENT_TIMESTAMP

* **/
