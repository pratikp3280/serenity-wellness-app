
CREATE TABLE mood_entries (

    id BIGINT NOT NULL AUTO_INCREMENT,

    user_id BIGINT NOT NULL,

    mood VARCHAR(20) NOT NULL,

    recorded_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pk_mood_entries
        PRIMARY KEY (id),

    CONSTRAINT chk_mood_entries_mood
        CHECK (mood IN (
            'stressed',
            'tired',
            'anxious',
            'unfocused',
            'good'
        )),

    CONSTRAINT fk_mood_entries_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    INDEX idx_mood_entries_user_recorded_at
        (user_id, recorded_at)

) ENGINE=InnoDB;
