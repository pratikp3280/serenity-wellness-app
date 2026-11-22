
package com.serenity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.serenity.entity.MoodEntry;

public interface MoodEntryRepository extends JpaRepository<MoodEntry, Long> {

    // Fetch only the mood entries belonging to a specific user.
    // Newest entries appear first.
    List<MoodEntry> findAllByUser_IdOrderByRecordedAtDesc(Long userId);
    
    /*
     * findAllByUser_IdOrderByRecordedAtDesc(Long userId) is a Spring Data JPA derived query.
			- findAllBy				 – retrieve multiple records.
			- User_Id   			 – filter using the ID of the associated User.
			- OrderByRecordedAtDesc  – sort by recording time, newest first.
			- Long userId            – the ID used for filtering.**/
}
/**
JpaRepository provide methods such as:

Method:			Purpose:
save()			Save a mood entry
findById()		Find an entry by ID
findAll()		Retrieve all entries
deleteById()	Delete an entry
count()			Count entries

 */