
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  CalendarDays,
  Flame,
  Heart,
  Sparkles,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Smile,
  Leaf,
  Zap,
  Meh,
  CloudRain,
  Brain,
  BatteryLow,
  Frown,
  Clock,
  NotebookPen,
  TrendingUp,
  CalendarCheck,
  BarChart3,
} from "lucide-react";

import { apiRequest } from "../services/api";

// --------------------------------------------------
// Mood configuration
// Reused for calendar icons and selected-day details
// --------------------------------------------------

const moodDetails = {
  happy: {
    label: "Happy",
    emoji: "😊",
    icon: Smile,
    color: "text-yellow-300",
    background: "bg-yellow-400/10",
    border: "border-yellow-400/20",
  },
  calm: {
    label: "Calm",
    emoji: "😌",
    icon: Leaf,
    color: "text-teal-300",
    background: "bg-teal-400/10",
    border: "border-teal-400/20",
  },
  excited: {
    label: "Excited",
    emoji: "🤩",
    icon: Zap,
    color: "text-orange-300",
    background: "bg-orange-400/10",
    border: "border-orange-400/20",
  },
  grateful: {
    label: "Grateful",
    emoji: "🙏",
    icon: Heart,
    color: "text-pink-300",
    background: "bg-pink-400/10",
    border: "border-pink-400/20",
  },
  neutral: {
    label: "Neutral",
    emoji: "😐",
    icon: Meh,
    color: "text-gray-300",
    background: "bg-gray-400/10",
    border: "border-gray-400/20",
  },
  sad: {
    label: "Sad",
    emoji: "😔",
    icon: CloudRain,
    color: "text-blue-300",
    background: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  anxious: {
    label: "Anxious",
    emoji: "😟",
    icon: Brain,
    color: "text-purple-300",
    background: "bg-purple-400/10",
    border: "border-purple-400/20",
  },
  stressed: {
    label: "Stressed",
    emoji: "😣",
    icon: Flame,
    color: "text-rose-300",
    background: "bg-rose-400/10",
    border: "border-rose-400/20",
  },
  angry: {
    label: "Angry",
    emoji: "😠",
    icon: Flame,
    color: "text-red-300",
    background: "bg-red-400/10",
    border: "border-red-400/20",
  },
  tired: {
    label: "Tired",
    emoji: "😴",
    icon: BatteryLow,
    color: "text-indigo-300",
    background: "bg-indigo-400/10",
    border: "border-indigo-400/20",
  },
};

const fallbackMood = {
  label: "Unknown Mood",
  emoji: "💭",
  icon: Frown,
  color: "text-gray-300",
  background: "bg-gray-400/10",
  border: "border-gray-400/20",
};

const statisticsConfig = [
  {
    label: "Total Check-ins",
    key: "totalCheckIns",
    icon: Activity,
    accent: "text-[#4ECDC4]",
    background: "bg-[#4ECDC4]/10",
  },
  {
    label: "Active Days",
    key: "activeDays",
    icon: CalendarDays,
    accent: "text-purple-300",
    background: "bg-purple-400/10",
  },
  {
    label: "Current Streak",
    key: "currentStreak",
    icon: Flame,
    accent: "text-amber-300",
    background: "bg-amber-400/10",
  },
  {
    label: "Most Frequent Mood",
    key: "mostFrequentMood",
    icon: Heart,
    accent: "text-pink-300",
    background: "bg-pink-400/10",
  },
];

// --------------------------------------------------
// Date helpers
// --------------------------------------------------

function getDateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;
}

function getEntryDateKey(recordedAt) {
  if (!recordedAt) return null;

  const date = new Date(recordedAt);

  if (Number.isNaN(date.getTime())) return null;

  return getDateKey(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
}

function getMoodInfo(mood) {
  return moodDetails[String(mood || "").toLowerCase()] || fallbackMood;
}

function formatTime(recordedAt) {
  if (!recordedAt) return "Time unavailable";

  const date = new Date(recordedAt);

  if (Number.isNaN(date.getTime())) return "Time unavailable";

  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatSelectedDate(dateKey) {
  if (!dateKey) return "";

  const [year, month, day] = dateKey.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// --------------------------------------------------
// Analytics Page
// --------------------------------------------------

export default function Analytics() {
  const today = new Date();

  const [analytics, setAnalytics] = useState(null);
  const [moodEntries, setMoodEntries] = useState([]);

  const [loading, setLoading] = useState(true);
  const [analyticsError, setAnalyticsError] = useState("");
  const [calendarError, setCalendarError] = useState("");

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  // ------------------------------------------------
  // Fetch both analytics and complete mood history
  // ------------------------------------------------

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setAnalyticsError("");
    setCalendarError("");

    const results = await Promise.allSettled([
      apiRequest("/api/analytics/overview"),
      apiRequest("/api/moods"),
    ]);

    if (results[0].status === "fulfilled") {
      setAnalytics(results[0].value);
    } else {
      setAnalyticsError(
        results[0].reason?.message || "Unable to load analytics."
      );
    }

    if (results[1].status === "fulfilled") {
      setMoodEntries(
        Array.isArray(results[1].value) ? results[1].value : []
      );
    } else {
      setCalendarError(
        results[1].reason?.message || "Unable to load mood history."
      );
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // ------------------------------------------------
  // Group mood entries by calendar date
  // ------------------------------------------------

  const entriesByDate = useMemo(() => {
    const grouped = {};

    moodEntries.forEach((entry) => {
      const dateKey = getEntryDateKey(entry.recordedAt);

      if (!dateKey) return;

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }

      grouped[dateKey].push(entry);
    });

    Object.values(grouped).forEach((entries) => {
      entries.sort(
        (a, b) => new Date(a.recordedAt) - new Date(b.recordedAt)
      );
    });

    return grouped;
  }, [moodEntries]);

  // ------------------------------------------------
  // Wellness Insights calculations
  // All calculations use actual mood history.
  // ------------------------------------------------

  const wellnessInsights = useMemo(() => {
    const validEntries = moodEntries.filter((entry) =>
      getEntryDateKey(entry.recordedAt)
    );

    // No mood history available.
    if (validEntries.length === 0) {
      return {
        mostActiveWeekday: "No data yet",
        weekdayCheckIns: 0,
        moodVariety: 0,
        busiestDay: "No data yet",
        busiestDayCheckIns: 0,
        averageCheckIns: "0",
        hasData: false,
      };
    }

    // 1. Count check-ins for each weekday.
    // Sunday = 0, Monday = 1, ..., Saturday = 6.

    const weekdayCounts = Array(7).fill(0);

    validEntries.forEach((entry) => {
      const date = new Date(entry.recordedAt);

      weekdayCounts[date.getDay()] += 1;
    });

    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const highestWeekdayCount = Math.max(...weekdayCounts);

    const mostActiveWeekdayIndex = weekdayCounts.findIndex(
      (count) => count === highestWeekdayCount
    );

    // 2. Count distinct recognized moods.

    const recordedMoods = new Set(
      validEntries
        .map((entry) => String(entry.mood || "").toLowerCase())
        .filter((mood) => moodDetails[mood])
    );

    // 3. Find the calendar day with the highest number
    // of mood check-ins.

    const dailyCounts = Object.entries(entriesByDate);

    const busiestDayEntry = dailyCounts.reduce(
      (busiest, current) => {
        if (!busiest || current[1].length > busiest[1].length) {
          return current;
        }

        return busiest;
      },
      null
    );

    let busiestDay = "No data yet";
    let busiestDayCheckIns = 0;

    if (busiestDayEntry) {
      const [dateKey, entries] = busiestDayEntry;
      const [year, month, day] = dateKey.split("-").map(Number);

      busiestDay = new Date(year, month - 1, day).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      );

      busiestDayCheckIns = entries.length;
    }

    // 4. Calculate average check-ins per active day.

    const activeDays = dailyCounts.length;

    const averageCheckIns =
      activeDays > 0
        ? (validEntries.length / activeDays).toFixed(1)
        : "0";

    return {
      mostActiveWeekday: weekdays[mostActiveWeekdayIndex],
      weekdayCheckIns: highestWeekdayCount,
      moodVariety: recordedMoods.size,
      busiestDay,
      busiestDayCheckIns,
      averageCheckIns,
      hasData: true,
    };
  }, [moodEntries, entriesByDate]);

  // ------------------------------------------------
  // Calendar calculations
  // ------------------------------------------------

  const daysInMonth = new Date(
    selectedYear,
    selectedMonth + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    selectedYear,
    selectedMonth,
    1
  ).getDay();

  const calendarCells = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  const monthName = new Date(
    selectedYear,
    selectedMonth,
    1
  ).toLocaleDateString("en-IN", {
    month: "long",
  });

  // Include the current year and all years containing mood entries.
  const yearOptions = useMemo(() => {
    const recordedYears = moodEntries
      .map((entry) => {
        if (!entry.recordedAt) return null;

        const date = new Date(entry.recordedAt);

        return Number.isNaN(date.getTime())
          ? null
          : date.getFullYear();
      })
      .filter((year) => year !== null);

    const earliestYear = Math.min(
      today.getFullYear() - 5,
      ...recordedYears
    );

    return Array.from(
      { length: today.getFullYear() - earliestYear + 1 },
      (_, index) => today.getFullYear() - index
    );
  }, [moodEntries]);

  // ------------------------------------------------
  // Month navigation
  // ------------------------------------------------

  function changeMonth(direction) {
    const newDate = new Date(
      selectedYear,
      selectedMonth + direction,
      1
    );

    setSelectedMonth(newDate.getMonth());
    setSelectedYear(newDate.getFullYear());
    setSelectedDate(null);
  }

  function handleMonthChange(event) {
    setSelectedMonth(Number(event.target.value));
    setSelectedDate(null);
  }

  function handleYearChange(event) {
    setSelectedYear(Number(event.target.value));
    setSelectedDate(null);
  }

  function goToToday() {
    setSelectedMonth(today.getMonth());
    setSelectedYear(today.getFullYear());
    setSelectedDate(getDateKey(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ));
  }

  // ------------------------------------------------
  // Statistics
  // ------------------------------------------------

  const moodDistribution = Object.entries(
    analytics?.moodDistribution || {}
  ).sort((a, b) => b[1] - a[1]);

  // ------------------------------------------------
  // Loading state
  // ------------------------------------------------

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <RefreshCw
          size={30}
          className="animate-spin text-[#4ECDC4] mx-auto"
        />

        <p className="text-gray-400 mt-4">
          Gathering your wellness insights...
        </p>
      </div>
    );
  }

  // ------------------------------------------------
  // Page
  // ------------------------------------------------

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* Page heading */}

      <section>
        <div className="flex items-center gap-2 text-[#4ECDC4] mb-3">
          <Sparkles size={18} />

          <span className="text-xs uppercase tracking-[0.2em]">
            Your wellness insights
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl text-white">
              Your Analytics
            </h1>

            <p className="text-gray-400 mt-3 max-w-2xl">
              Understand your emotional patterns and explore
              your wellness journey through your mood history.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchDashboardData}
            className="inline-flex items-center justify-center gap-2
              px-4 py-2.5 rounded-xl border border-white/10
              bg-white/5 hover:bg-white/10 text-sm text-gray-300
              transition-colors"
          >
            <RefreshCw size={15} />
            Refresh insights
          </button>
        </div>
      </section>

      {/* Analytics error */}

      {analyticsError && (
        <div className="rounded-xl border border-red-400/20 bg-red-400/5 p-4">
          <p className="text-sm text-red-300">{analyticsError}</p>
        </div>
      )}

      {/* Overview + Mood Distribution */}

      <section>
        <h2 className="text-xl font-semibold text-white mb-5">
          Overview
        </h2>

        <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-5">

          {/* Left: 2 x 2 statistics */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {statisticsConfig.map((item) => {
              const Icon = item.icon;

              const value =
                analytics?.[item.key] ??
                (item.key === "mostFrequentMood" ? "N/A" : 0);

              return (
                <article
                  key={item.key}
                  className="rounded-2xl border border-white/10
                    bg-white/[0.03] p-5 sm:p-6
                    hover:bg-white/[0.05] transition-colors"
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${item.background}
                      flex items-center justify-center`}
                  >
                    <Icon size={22} className={item.accent} />
                  </div>

                  <p className="text-sm text-gray-400 mt-5">
                    {item.label}
                  </p>

                  <h3 className="text-2xl font-semibold text-white mt-2 break-words">
                    {value}
                  </h3>
                </article>
              );
            })}

          </div>

          {/* Right: Mood Distribution */}

          <article
            className="rounded-2xl border border-white/10
              bg-white/[0.03] p-6 sm:p-7 flex flex-col"
          >
            <div>
              <div className="flex items-center gap-2">
                <Heart size={19} className="text-pink-300" />

                <h2 className="text-xl font-semibold text-white">
                  Mood Distribution
                </h2>
              </div>

              <p className="text-sm text-gray-400 mt-2">
                Your emotional patterns at a glance.
              </p>
            </div>

            {moodDistribution.length === 0 ? (
              <p className="text-gray-500 text-sm mt-8">
                No mood records available yet.
              </p>
            ) : (
              <div className="space-y-6 mt-8">
                {moodDistribution.map(([mood, count]) => {
                  const percentage =
                    analytics?.totalCheckIns > 0
                      ? (count / analytics.totalCheckIns) * 100
                      : 0;

                  const details = getMoodInfo(mood);
                  const MoodIcon = details.icon;

                  return (
                    <div key={mood}>
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <MoodIcon
                            size={17}
                            className={details.color}
                          />

                          <span className="text-sm font-medium text-white">
                            {details.label}
                          </span>
                        </div>

                        <span className="text-xs text-gray-400">
                          {count} ({percentage.toFixed(0)}%)
                        </span>
                      </div>

                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#4ECDC4]
                            transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </article>

        </div>
      </section>

      {/* ------------------------------------------------
          Wellness Insights
          ------------------------------------------------ */}

      <section>
        <div className="mb-5">
          <div className="flex items-center gap-2">
            <Sparkles size={19} className="text-[#4ECDC4]" />

            <h2 className="text-xl font-semibold text-white">
              Wellness Insights
            </h2>
          </div>

          <p className="text-sm text-gray-400 mt-2">
            Small observations based on your actual mood check-in history.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

          {/* Insight 1: Most Active Weekday */}

          <article className="rounded-2xl border border-white/10
            bg-white/[0.03] p-5 hover:bg-white/[0.05] transition-colors">

            <div className="w-10 h-10 rounded-xl bg-purple-400/10
              flex items-center justify-center">
              <CalendarCheck size={20} className="text-purple-300" />
            </div>

            <p className="text-sm text-gray-400 mt-4">
              Most Active Weekday
            </p>

            <h3 className="text-xl font-semibold text-white mt-2">
              {wellnessInsights.mostActiveWeekday}
            </h3>

            <p className="text-xs text-gray-500 mt-2">
              {wellnessInsights.hasData
                ? `${wellnessInsights.weekdayCheckIns} check-ins recorded`
                : "Start recording your moods"}
            </p>
          </article>

          {/* Insight 2: Mood Variety */}

          <article className="rounded-2xl border border-white/10
            bg-white/[0.03] p-5 hover:bg-white/[0.05] transition-colors">

            <div className="w-10 h-10 rounded-xl bg-pink-400/10
              flex items-center justify-center">
              <Heart size={20} className="text-pink-300" />
            </div>

            <p className="text-sm text-gray-400 mt-4">
              Mood Variety
            </p>

            <h3 className="text-xl font-semibold text-white mt-2">
              {wellnessInsights.moodVariety} / {Object.keys(moodDetails).length}
            </h3>

            <p className="text-xs text-gray-500 mt-2">
              Different moods recorded
            </p>
          </article>

          {/* Insight 3: Busiest Day */}

          <article className="rounded-2xl border border-white/10
            bg-white/[0.03] p-5 hover:bg-white/[0.05] transition-colors">

            <div className="w-10 h-10 rounded-xl bg-amber-400/10
              flex items-center justify-center">
              <TrendingUp size={20} className="text-amber-300" />
            </div>

            <p className="text-sm text-gray-400 mt-4">
              Busiest Day
            </p>

            <h3 className="text-xl font-semibold text-white mt-2">
              {wellnessInsights.busiestDay}
            </h3>

            <p className="text-xs text-gray-500 mt-2">
              {wellnessInsights.hasData
                ? `${wellnessInsights.busiestDayCheckIns} check-ins on this day`
                : "No activity recorded yet"}
            </p>
          </article>

          {/* Insight 4: Average Check-ins */}

          <article className="rounded-2xl border border-white/10
            bg-white/[0.03] p-5 hover:bg-white/[0.05] transition-colors">

            <div className="w-10 h-10 rounded-xl bg-[#4ECDC4]/10
              flex items-center justify-center">
              <BarChart3 size={20} className="text-[#4ECDC4]" />
            </div>

            <p className="text-sm text-gray-400 mt-4">
              Average Check-ins
            </p>

            <h3 className="text-xl font-semibold text-white mt-2">
              {wellnessInsights.averageCheckIns}
            </h3>

            <p className="text-xs text-gray-500 mt-2">
              Per active day
            </p>
          </article>

        </div>

        {!wellnessInsights.hasData && (
          <p className="text-xs text-gray-500 mt-4">
            Your insights will appear here after you record your first mood check-in.
          </p>
        )}
      </section>

      {/* Monthly Mood Calendar */}

      <section className="rounded-2xl border border-white/10
        bg-white/[0.03] p-5 sm:p-7">

        {/* Calendar heading */}

        <div className="flex flex-col lg:flex-row lg:items-center
          lg:justify-between gap-5 mb-7">

          <div>
            <div className="flex items-center gap-2">
              <CalendarDays size={20} className="text-[#4ECDC4]" />

              <h2 className="text-xl font-semibold text-white">
                Your Mood Calendar
              </h2>
            </div>

            <p className="text-sm text-gray-400 mt-2">
              Explore your daily emotional journey.
              Select any date to view its check-ins.
            </p>
          </div>

          {/* Month/year controls */}

          <div className="flex flex-wrap items-center gap-2">

            <button
              type="button"
              onClick={goToToday}
              className="px-3 py-2 rounded-lg border border-white/10
                bg-white/5 hover:bg-white/10 text-sm text-gray-300
                transition-colors"
            >
              Today
            </button>

            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              aria-label="Select month"
              className="rounded-lg border border-white/10
                bg-[#151A27] text-white text-sm px-3 py-2
                outline-none focus:border-[#4ECDC4]"
            >
              {Array.from({ length: 12 }, (_, index) => (
                <option key={index} value={index}>
                  {new Date(2026, index, 1).toLocaleDateString(
                    "en-IN",
                    { month: "long" }
                  )}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={handleYearChange}
              aria-label="Select year"
              className="rounded-lg border border-white/10
                bg-[#151A27] text-white text-sm px-3 py-2
                outline-none focus:border-[#4ECDC4]"
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                aria-label="Previous month"
                className="w-9 h-9 flex items-center justify-center
                  rounded-lg border border-white/10 bg-white/5
                  hover:bg-white/10 text-white transition-colors"
              >
                <ChevronLeft size={19} />
              </button>

              <button
                type="button"
                onClick={() => changeMonth(1)}
                aria-label="Next month"
                className="w-9 h-9 flex items-center justify-center
                  rounded-lg border border-white/10 bg-white/5
                  hover:bg-white/10 text-white transition-colors"
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar month title */}

        <div className="mb-5">
          <h3 className="text-2xl font-display text-white">
            {monthName} {selectedYear}
          </h3>

          <p className="text-xs text-gray-500 mt-1">
            {Object.keys(entriesByDate).filter((dateKey) =>
              dateKey.startsWith(
                `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-`
              )
            ).length} days with mood activity
          </p>
        </div>

        {/* Weekday labels */}

        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day) => (
              <div
                key={day}
                className="text-center text-[10px] sm:text-xs
                  font-semibold uppercase tracking-wider
                  text-gray-500 py-2"
              >
                <span className="hidden sm:inline">
                  {day}
                </span>
                <span className="sm:hidden">
                  {day.slice(0, 1)}
                </span>
              </div>
            )
          )}
        </div>

        {/* Calendar dates */}

        <div className="grid grid-cols-7 gap-1 sm:gap-2">

          {calendarCells.map((day, index) => {
            if (day === null) {
              return (
                <div
                  key={`empty-${index}`}
                  className="min-h-[65px] sm:min-h-[100px]"
                />
              );
            }

            const dateKey = getDateKey(
              selectedYear,
              selectedMonth,
              day
            );

            const dayEntries = entriesByDate[dateKey] || [];

            const isToday =
              today.getFullYear() === selectedYear &&
              today.getMonth() === selectedMonth &&
              today.getDate() === day;

            const isSelected = selectedDate === dateKey;

            return (
              <button
                type="button"
                key={dateKey}
                onClick={() => setSelectedDate(dateKey)}
                aria-label={`${dateKey}, ${dayEntries.length} check-ins`}
                aria-pressed={isSelected}
                className={`relative min-w-0 min-h-[65px] sm:min-h-[100px]
                  rounded-lg sm:rounded-xl border p-1.5 sm:p-2
                  flex flex-col items-center sm:items-start gap-1
                  transition-all duration-200
                  ${
                    isSelected
                      ? "border-[#4ECDC4] bg-[#4ECDC4]/10 ring-1 ring-[#4ECDC4]/30"
                      : isToday
                      ? "border-[#4ECDC4]/50 bg-white/[0.05]"
                      : "border-white/5 bg-white/[0.025] hover:bg-white/[0.07] hover:border-white/15"
                  }`}
              >
                <span
                  className={`text-xs sm:text-sm font-medium
                    ${isToday || isSelected
                      ? "text-[#4ECDC4]"
                      : "text-gray-300"
                    }`}
                >
                  {day}
                </span>

                {/* Mood icons */}

                {dayEntries.length > 0 && (
                  <>
                    <div className="flex flex-wrap items-center
                      justify-center sm:justify-start gap-0.5 sm:gap-1 mt-1">

                      {dayEntries.slice(0, 3).map((entry) => {
                        const details = getMoodInfo(entry.mood);
                        const MoodIcon = details.icon;

                        return (
                          <span
                            key={entry.id}
                            title={details.label}
                            className={`${details.color}`}
                          >
                            <MoodIcon size={14} />
                          </span>
                        );
                      })}

                      {dayEntries.length > 3 && (
                        <span className="text-[9px] text-gray-400">
                          +{dayEntries.length - 3}
                        </span>
                      )}
                    </div>

                    <span className="hidden sm:block text-[10px]
                      text-[#4ECDC4] mt-auto">
                      {dayEntries.length} check-ins
                    </span>

                    <span className="sm:hidden text-[9px]
                      text-[#4ECDC4]">
                      {dayEntries.length}
                    </span>
                  </>
                )}
              </button>
            );
          })}

        </div>

        {/* Mood legend */}

        <div className="flex flex-wrap gap-x-5 gap-y-3 mt-7
          pt-5 border-t border-white/10">

          {Object.entries(moodDetails).map(([key, details]) => {
            const MoodIcon = details.icon;

            return (
              <div key={key} className="flex items-center gap-1.5">
                <MoodIcon size={14} className={details.color} />

                <span className="text-xs text-gray-400">
                  {details.label}
                </span>
              </div>
            );
          })}

        </div>

        {/* Calendar error */}

        {calendarError && (
          <div className="mt-5 rounded-xl border border-red-400/20
            bg-red-400/5 p-4">
            <p className="text-sm text-red-300">
              Unable to load calendar entries: {calendarError}
            </p>
          </div>
        )}

        {/* Selected day details */}

        {selectedDate && (
          <div className="mt-7 pt-6 border-t border-white/10">

            <div className="flex flex-col sm:flex-row
              sm:items-center sm:justify-between gap-2 mb-5">

              <div>
                <p className="text-xs uppercase tracking-wider
                  text-[#4ECDC4] mb-1">
                  Daily reflection
                </p>

                <h3 className="text-lg font-semibold text-white">
                  {formatSelectedDate(selectedDate)}
                </h3>
              </div>

              <span className="text-sm text-gray-400">
                {(entriesByDate[selectedDate] || []).length} check-ins
              </span>
            </div>

            {(entriesByDate[selectedDate] || []).length === 0 ? (
              <div className="rounded-xl border border-white/5
                bg-white/[0.025] p-6 text-center">
                <div className="text-3xl mb-3">🌱</div>

                <p className="text-sm text-gray-300">
                  No mood check-ins on this day.
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Every day is a new opportunity to check in with yourself.
                </p>
              </div>
            ) : (
              <div className="space-y-3">

                {(entriesByDate[selectedDate] || []).map((entry) => {
                  const details = getMoodInfo(entry.mood);
                  const MoodIcon = details.icon;

                  return (
                    <article
                      key={entry.id}
                      className="rounded-xl border border-white/10
                        bg-white/[0.025] p-4 sm:p-5"
                    >
                      <div className="flex items-start gap-3">

                        <div className={`w-11 h-11 shrink-0 rounded-xl
                          flex items-center justify-center
                          ${details.background} ${details.border} border`}>
                          <MoodIcon size={21} className={details.color} />
                        </div>

                        <div className="flex-1 min-w-0">

                          <div className="flex flex-wrap
                            items-center justify-between gap-2">

                            <h4 className={`font-semibold ${details.color}`}>
                              {details.emoji} {details.label}
                            </h4>

                            <span className="inline-flex items-center
                              gap-1.5 text-xs text-gray-500">
                              <Clock size={13} />
                              {formatTime(entry.recordedAt)}
                            </span>
                          </div>

                          <div className="mt-3 rounded-lg
                            bg-black/20 p-3">

                            <p className="flex items-center gap-2
                              text-[10px] uppercase tracking-wider
                              text-gray-500 mb-2">
                              <NotebookPen size={12} />
                              Journal
                            </p>

                            <p className="text-sm text-gray-300
                              leading-relaxed whitespace-pre-wrap break-words">
                              {entry.note?.trim()
                                ? entry.note
                                : "You checked in without adding a note."}
                            </p>
                          </div>

                        </div>
                      </div>
                    </article>
                  );
                })}

              </div>
            )}

          </div>
        )}

      </section>

    </div>
  );
}
