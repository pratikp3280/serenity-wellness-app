
package com.serenity.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.serenity.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    // Find a user using their email address
    Optional<User> findByEmail(String email);

    // Check whether an email already exists
    boolean existsByEmail(String email);

}

/**
Spring Data JPA repositories:
:-> A Repository is an interface that provides methods to perform database operations 
     without requiring us to write SQL queries manually.
 * 
UserRepository	    repository interface
extends				Inherits functionality from another interface
JpaRepository		Provides ready-made database operations
User				The Entity we want to manage
Long				The data type of our primary key
 *
 * 
 * 
 Method	            What it does	            	SQL concept
save(user)	         Saves or updates a user		INSERT / UPDATE
findById(1L)	     Finds a user by ID	        	SELECT
findAll()			Retrieves all users				SELECT
findByEmail(email)	Finds a user by email			SELECT
existsByEmail(email)	Checks whether email exists	Existence check
deleteById(1L)			Deletes a user by ID		DELETE
count()					Counts user records			COUNT
 * */
