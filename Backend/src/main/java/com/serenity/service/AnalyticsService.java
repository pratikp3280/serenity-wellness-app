
package com.serenity.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.serenity.dto.AnalyticsOverviewResponse;
import com.serenity.dto.DailyMoodTrend;
import com.serenity.entity.MoodEntry;
import com.serenity.entity.User;
import com.serenity.repository.MoodEntryRepository;
import com.serenity.repository.UserRepository;

@Service
public class AnalyticsService {

    private final MoodEntryRepository moodEntryRepository;
    private final UserRepository userRepository;

    public AnalyticsService(
            MoodEntryRepository moodEntryRepository,
            UserRepository userRepository) {

        this.moodEntryRepository = moodEntryRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public AnalyticsOverviewResponse getOverview(String authenticatedEmail) {

        if (authenticatedEmail == null || authenticatedEmail.isBlank()) {
            throw new IllegalArgumentException(
                    "Authenticated user email is required.");
        }

        User user = userRepository.findByEmail(authenticatedEmail)
                .orElseThrow(() -> new IllegalStateException(
                        "Authenticated user was not found."));

        List<MoodEntry> entries =
                moodEntryRepository.findAllByUser_IdOrderByRecordedAtDesc(
                        user.getId());

        // 1. Total mood check-ins.
        long totalCheckIns = entries.size();

        // 2. Count the frequency of each mood.
        Map<String, Long> moodDistribution = entries.stream()
                .collect(Collectors.groupingBy(
                        entry -> entry.getMood().name(),
                        LinkedHashMap::new,
                        Collectors.counting()));

        // 3. Find the most frequently recorded mood.
        String mostFrequentMood = moodDistribution.entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(null);

        // 4. Identify unique check-in dates.
        Set<LocalDate> activeDates = entries.stream()
                .filter(entry -> entry.getRecordedAt() != null)
                .map(entry -> entry.getRecordedAt().toLocalDate())
                .collect(Collectors.toCollection(TreeSet::new));

        long activeDays = activeDates.size();

        // 5. Calculate the current consecutive-day streak.
        long currentStreak = calculateCurrentStreak(activeDates);

        // 6. Generate the last seven calendar days of mood data.
        List<DailyMoodTrend> weeklyTrend = buildWeeklyTrend(entries);

        return new AnalyticsOverviewResponse(
                totalCheckIns,
                activeDays,
                currentStreak,
                mostFrequentMood,
                moodDistribution,
                weeklyTrend);
    }

    private long calculateCurrentStreak(Set<LocalDate> activeDates) {

        if (activeDates.isEmpty()) {
            return 0;
        }

        LocalDate today = LocalDate.now();
        LocalDate latestDate = ((TreeSet<LocalDate>) activeDates).last();

        // A streak is considered active if the latest check-in
        // happened today or yesterday.
        if (latestDate.isBefore(today.minusDays(1))) {
            return 0;
        }

        long streak = 0;
        LocalDate expectedDate = latestDate;

        while (activeDates.contains(expectedDate)) {
            streak++;
            expectedDate = expectedDate.minusDays(1);
        }

        return streak;
    }

    private List<DailyMoodTrend> buildWeeklyTrend(
            List<MoodEntry> entries) {

        LocalDate today = LocalDate.now();
        LocalDate startDate = today.minusDays(6);

        List<DailyMoodTrend> trends = new ArrayList<>();

        for (LocalDate date = startDate;
                !date.isAfter(today);
                date = date.plusDays(1)) {

            // Create an effectively final variable for the lambda.
            LocalDate currentDate = date;

            Map<String, Long> dailyMoodCounts = entries.stream()
                    .filter(entry -> entry.getRecordedAt() != null)
                    .filter(entry -> entry.getRecordedAt()
                            .toLocalDate().equals(currentDate))
                    .collect(Collectors.groupingBy(
                            entry -> entry.getMood().name(),
                            LinkedHashMap::new,
                            Collectors.counting()));

            long dailyTotal = dailyMoodCounts.values()
                    .stream()
                    .mapToLong(Long::longValue)
                    .sum();

            trends.add(new DailyMoodTrend(
                    currentDate,
                    dailyTotal,
                    dailyMoodCounts));
        }

        return trends;
    }
}
