
CREATE TABLE breathing_sessions (

    id BIGINT NOT NULL AUTO_INCREMENT,

    user_id BIGINT NOT NULL,

    exercise_type VARCHAR(50) NOT NULL,

    duration_seconds INT UNSIGNED NOT NULL,

    cycles_completed INT UNSIGNED NOT NULL DEFAULT 0,

    completed_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pk_breathing_sessions
        PRIMARY KEY (id),

    CONSTRAINT chk_breathing_duration
        CHECK (duration_seconds > 0),

    CONSTRAINT fk_breathing_sessions_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    INDEX idx_breathing_sessions_user_completed_at
        (user_id, completed_at)

) ENGINE=InnoDB;
