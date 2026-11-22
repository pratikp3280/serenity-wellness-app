
package com.serenity.dto;

import java.time.LocalDate;
import java.util.Map;

public record DailyMoodTrend(
        LocalDate date,
        long totalCheckIns,
        Map<String, Long> moodCounts
) {
	
}
