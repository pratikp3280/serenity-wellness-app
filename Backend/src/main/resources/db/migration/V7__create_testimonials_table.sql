
CREATE TABLE testimonials (

    id BIGINT NOT NULL AUTO_INCREMENT,

    -- Connects the review to the registered Serenity user.
    user_id BIGINT NOT NULL,

    -- Rating must be between 1 and 5.
    rating TINYINT NOT NULL,

    -- User-selected occupation or custom Other value.
    occupation VARCHAR(100) NOT NULL,

    -- Written feedback.
    comment VARCHAR(1000) NOT NULL,

    -- Reviews are not publicly visible until approved.
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',

    created_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_testimonials
        PRIMARY KEY (id),

    -- One review per account; users can update their existing review.
    CONSTRAINT uk_testimonials_user
        UNIQUE (user_id),

    CONSTRAINT chk_testimonials_rating
        CHECK (rating BETWEEN 1 AND 5),

    CONSTRAINT chk_testimonials_status
        CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),

    CONSTRAINT fk_testimonials_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    INDEX idx_testimonials_status_created_at
        (status, created_at)

) ENGINE=InnoDB;
