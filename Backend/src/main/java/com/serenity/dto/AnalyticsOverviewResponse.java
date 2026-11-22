
package com.serenity.dto;

import java.util.List;
import java.util.Map;

public record AnalyticsOverviewResponse(
        long totalCheckIns,
        long activeDays,
        long currentStreak,
        String mostFrequentMood,
        Map<String, Long> moodDistribution,
        List<DailyMoodTrend> weeklyTrend
) {
}
