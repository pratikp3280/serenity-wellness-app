import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Smile,
  Leaf,
  Zap,
  Heart,
  Meh,
  CloudRain,
  Brain,
  Flame,
  BatteryLow,
  Frown,
  RefreshCw,
  Clock,
} from "lucide-react";

import { apiRequest } from "../services/api";

// --------------------------------------------------
// Mood display configuration
// --------------------------------------------------

const moodDetails = {
  happy: {
    label: "Happy",
    emoji: "😊",
    color: "text-yellow-300",
    background: "bg-yellow-400/10",
    border: "border-yellow-400/20",
    icon: Smile,
  },
  calm: {
    label: "Calm",
    emoji: "😌",
    color: "text-teal-300",
    background: "bg-teal-400/10",
    border: "border-teal-400/20",
    icon: Leaf,
  },
  excited: {
    label: "Excited",
    emoji: "🤩",
    color: "text-orange-300",
    background: "bg-orange-400/10",
    border: "border-orange-400/20",
    icon: Zap,
  },
  grateful: {
    label: "Grateful",
    emoji: "🙏",
    color: "text-pink-300",
    background: "bg-pink-400/10",
    border: "border-pink-400/20",
    icon: Heart,
  },
  neutral: {
    label: "Neutral",
    emoji: "😐",
    color: "text-gray-300",
    background: "bg-gray-400/10",
    border: "border-gray-400/20",
    icon: Meh,
  },
  sad: {
    label: "Sad",
    emoji: "😔",
    color: "text-blue-300",
    background: "bg-blue-400/10",
    border: "border-blue-400/20",
    icon: CloudRain,
  },
  anxious: {
    label: "Anxious",
    emoji: "😟",
    color: "text-purple-300",
    background: "bg-purple-400/10",
    border: "border-purple-400/20",
    icon: Brain,
  },
  stressed: {
    label: "Stressed",
    emoji: "😣",
    color: "text-rose-300",
    background: "bg-rose-400/10",
    border: "border-rose-400/20",
    icon: Flame,
  },
  angry: {
    label: "Angry",
    emoji: "😠",
    color: "text-red-300",
    background: "bg-red-400/10",
    border: "border-red-400/20",
    icon: Flame,
  },
  tired: {
    label: "Tired",
    emoji: "😴",
    color: "text-indigo-300",
    background: "bg-indigo-400/10",
    border: "border-indigo-400/20",
    icon: BatteryLow,
  },
};

// --------------------------------------------------
// Date formatting helper
// --------------------------------------------------

function formatDate(dateValue) {
  if (!dateValue) return "Date unavailable";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

// --------------------------------------------------
// Mood History Page
// --------------------------------------------------

export default function MoodHistory() {
  const [moodEntries, setMoodEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch mood history from the backend
  async function fetchMoodHistory() {
    try {
      setErrorMessage("");
      setIsLoading(true);

      const data = await apiRequest("/api/moods");

      // Make sure the API response is an array
      setMoodEntries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch mood history:", error);
      setErrorMessage(error.message || "Unable to load your mood history.");
    } finally {
      setIsLoading(false);
    }
  }

  // Fetch history when the page first loads
  useEffect(() => {
    fetchMoodHistory();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
        <div className="mb-8">
        <div
          className="flex flex-col sm:flex-row
                    sm:items-center sm:justify-between gap-5"
        >
          <div>
            <p
              className="text-aurora text-sm tracking-widest
                            uppercase mb-3"
            >
              Your Wellness Journey
            </p>

            <h1
              className="font-display text-2xl sm:text-3xl
                            text-white mb-2"
            >
              Mood History
            </h1>

            <p className="text-white/50 leading-relaxed">
              Every feeling tells a story. Take a moment to reflect on yours.
            </p>
          </div>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={fetchMoodHistory}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2
                        px-5 py-3 rounded-full border border-white/10
                        bg-white/5 hover:bg-white/10 transition-colors
                        disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            {isLoading ? "Loading..." : "Refresh History"}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div
          className="min-h-[320px] flex flex-col
        items-center justify-center text-center"
        >
          <RefreshCw size={32} className="animate-spin text-aurora mb-4" />

          <p className="text-white/60">Fetching your mood history...</p>
        </div>
      )}

      {/* Error State */}
      {!isLoading && errorMessage && (
        <div
          className="rounded-2xl
                    border border-red-400/20 bg-red-400/5 p-8 text-center"
        >
          <div className="text-4xl mb-4">⚠️</div>

          <h2 className="text-xl text-white mb-2">Something went wrong</h2>

          <p className="text-red-300/80 mb-6">{errorMessage}</p>

          <button
            type="button"
            onClick={fetchMoodHistory}
            className="btn-aurora px-6 py-3 rounded-full"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !errorMessage && moodEntries.length === 0 && (
        <div
          className="rounded-3xl
                    border border-white/10 bg-white/[0.03]
                    text-center py-16 px-6"
        >
          <div className="text-6xl mb-6">🌱</div>

          <h2 className="text-2xl font-display text-white mb-3">
            Your journey starts here
          </h2>

          <p className="text-white/50 max-w-md mx-auto mb-8">
            You haven't recorded any moods yet. Every check-in is a small step
            toward understanding yourself better.
          </p>

          <Link
            to="/mood-checkin"
            className="btn-aurora inline-flex items-center
                        gap-2 px-7 py-3 rounded-full"
          >
            Record Your First Mood
          </Link>
        </div>
      )}

      {/* Mood History List */}
      {!isLoading && !errorMessage && moodEntries.length > 0 && (
        <div className="w-full space-y-4">
          {/* Entry Count */}
          <p className="text-white/40 text-sm mb-5">
            {moodEntries.length}{" "}
            {moodEntries.length === 1
              ? "check-in recorded"
              : "check-ins recorded"}
          </p>

          {/* History Cards */}
          <div className="space-y-4">
            {moodEntries.map((entry) => {
              const moodKey = String(entry.mood || "").toLowerCase();

              const details = moodDetails[moodKey] || {
                label: moodKey || "Unknown Mood",
                emoji: "💭",
                color: "text-white",
                background: "bg-white/5",
                border: "border-white/10",
                icon: Frown,
              };

              const MoodIcon = details.icon;

              return (
                <article
                  key={entry.id}
                  className="rounded-2xl border border-white/10
                                    bg-white/[0.03] hover:bg-white/[0.05]
                                    transition-colors p-5 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    {/* Mood Icon */}
                    <div
                      className={`shrink-0 w-14 h-14
                                            rounded-2xl flex items-center
                                            justify-center ${details.background}
                                            ${details.border} border`}
                    >
                      <MoodIcon size={26} className={details.color} />
                    </div>

                    {/* Mood Details */}
                    <div className="flex-1 min-w-0">
                      <div
                        className="flex flex-col
                                                sm:flex-row sm:items-center
                                                sm:justify-between gap-2 mb-3"
                      >
                        <h2
                          className={`text-xl
                                                    font-semibold
                                                    ${details.color}`}
                        >
                          {details.emoji} {details.label}
                        </h2>

                        <div
                          className="flex
                                                    items-center gap-2
                                                    text-white/40 text-xs"
                        >
                          <Clock size={14} />
                          {formatDate(entry.recordedAt)}
                        </div>
                      </div>

                      {/* Journal Note */}
                      <div
                        className="rounded-xl
                                                bg-black/20 p-4"
                      >
                        <p
                          className="text-xs
                                                    text-white/40 mb-2
                                                    uppercase tracking-wider"
                        >
                          Journal
                        </p>

                        <p
                          className="text-white/70
                                                    text-sm leading-relaxed
                                                    whitespace-pre-wrap
                                                    break-words"
                        >
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

          {/* Add Another Check-in */}
          <div className="text-center mt-10">
            <Link
              to="/mood-checkin"
              className="btn-aurora inline-flex
                            items-center gap-2 px-7 py-3 rounded-full"
            >
              Record Another Mood
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/**
What this component will do
- useEffect() → fetch mood history when the page opens.
- apiRequest() → call your existing backend API.
- useState() → manage loading, error and history data.
- try/catch → handle API errors.
- finally → end loading regardless of success or failure.
- Refresh button → fetch the latest history again.
 */
