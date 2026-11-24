import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import { moodSessions } from "../data/moodSessions";

// MoodSelector and Programs both use moodSessions.js so the names,
// descriptions, durations and mood IDs stay consistent across Serenity.
export default function MoodSelector() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const selectedMood = moodSessions.find((mood) => mood.id === selected);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  function handleMoodClick(id) {
    if (isSubmitting) return;
    setSelected((current) => (current === id ? null : id));
    setSubmissionStatus("idle");
    setErrorMessage("");
  }

  function handleNoteChange(event) {
    setNote(event.target.value);
    setSubmissionStatus("idle");
    setErrorMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    if (!selectedMood) {
      setErrorMessage("Please select a mood before saving.");
      setSubmissionStatus("error");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmissionStatus("idle");
      setErrorMessage("");

      await apiRequest("/api/moods", {
        method: "POST",
        body: {
          mood: selectedMood.id.toUpperCase(),
          note: note.trim() || null,
        },
      });

      setSubmissionStatus("success");
    } catch (error) {
      console.error("Mood submission failed:", error);
      setSubmissionStatus("error");
      setErrorMessage(
        error.message || "Unable to save your mood. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleExploreSession() {
    if (!selectedMood || isSubmitting) return;
    navigate(`/sessions/${selectedMood.id}`);
  }

  return (
    <section id="mood" ref={ref} className="relative px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center sm:mb-16"
        >
          <p className="mb-4 text-sm uppercase tracking-widest text-aurora/60">
            Your wellbeing matters
          </p>
          <h2 className="font-display text-4xl font-light leading-tight text-white sm:text-5xl md:text-6xl">
            How are you feeling{" "}
            <span className="gradient-text italic">right now?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/40 sm:text-base">
            Choose the mood that best describes how you feel at this moment.
          </p>
        </motion.div>

        {/* Ten mood choices */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5">
          {moodSessions.map((mood, index) => {
            const isSelected = selected === mood.id;
            return (
              <motion.button
                key={mood.id}
                type="button"
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                whileTap={!isSubmitting ? { scale: 0.95 } : undefined}
                whileHover={!isSubmitting ? { y: -4 } : undefined}
                onClick={() => handleMoodClick(mood.id)}
                disabled={isSubmitting}
                title={mood.meaning}
                aria-label={`${mood.label}: ${mood.meaning}`}
                aria-pressed={isSelected}
                className={`relative flex w-full cursor-pointer flex-col items-center gap-3 rounded-2xl border p-4 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora disabled:cursor-not-allowed disabled:opacity-60 sm:p-5 ${
                  isSelected
                    ? `bg-gradient-to-b ${mood.gradient} ${mood.border} shadow-xl shadow-black/20`
                    : "glass-card border-white/10 hover:border-white/20"
                }`}
              >
                <span className="text-3xl" aria-hidden="true">{mood.emoji}</span>
                <span className={`text-center text-sm font-medium transition-colors ${isSelected ? "text-white" : "text-white/65"}`}>
                  {mood.label}
                </span>
                <span className="text-xs text-white/35">{mood.category}</span>
                {isSelected && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="h-1.5 w-1.5 rounded-full bg-aurora"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Selected mood recommendation and check-in form */}
        <AnimatePresence mode="wait">
          {selectedMood && (
            <motion.form
              key={selectedMood.id}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`glass-card rounded-3xl border p-5 shadow-xl sm:p-7 ${selectedMood.border}`}
            >
              <div className="mb-7 flex flex-col items-start gap-5 md:flex-row md:items-center">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border bg-gradient-to-br ${selectedMood.gradient} ${selectedMood.border}`}>
                  <selectedMood.icon size={26} className={selectedMood.iconColor || "text-white"} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold tracking-widest ${selectedMood.tagColor}`}>
                      {selectedMood.tag}
                    </span>
                    <span className="text-xs text-white/40">{selectedMood.duration}</span>
                  </div>
                  <h3 className="mb-2 font-display text-2xl font-medium text-white">
                    {selectedMood.session}
                  </h3>
                  <p className="max-w-xl text-sm leading-relaxed text-white/50">
                    {selectedMood.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleExploreSession}
                  disabled={isSubmitting}
                  className="btn-aurora inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
                >
                  Explore Session <ArrowRight size={15} />
                </button>
              </div>

              {/* Optional journal note */}
              <div className="border-t border-white/10 pt-6">
                <label htmlFor="mood-note" className="mb-3 block text-sm font-medium text-white">
                  What's on your mind?
                  <span className="ml-2 font-normal text-white/40">(Optional)</span>
                </label>
                <textarea
                  id="mood-note"
                  value={note}
                  onChange={handleNoteChange}
                  maxLength={2000}
                  rows={4}
                  disabled={isSubmitting}
                  placeholder="Write a few words about how you're feeling today..."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white placeholder:text-white/30 transition-all focus:border-aurora/60 focus:outline-none focus:ring-1 focus:ring-aurora/30 disabled:opacity-60"
                />
                <div className="mt-2 flex justify-end">
                  <span className="text-xs text-white/30">{note.length}/2000</span>
                </div>
              </div>

              {/* Submission feedback */}
              <AnimatePresence mode="wait">
                {submissionStatus === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="status"
                    className="mt-5 text-sm text-emerald-300"
                  >
                    ✓ Your {selectedMood.label.toLowerCase()} mood has been saved successfully!
                  </motion.p>
                )}
                {submissionStatus === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="alert"
                    className="mt-5 text-sm text-red-400"
                  >
                    {errorMessage}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Save mood */}
              <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-xs text-white/30">Your check-in is private to your account.</p>
                <button
                  type="submit"
                  disabled={isSubmitting || !selected}
                  className="btn-aurora w-full rounded-full px-8 py-3 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {isSubmitting ? "Saving your mood..." : "Save My Mood"}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {!selectedMood && (
          <div className="py-6 text-center">
            <p className="text-sm italic text-white/30">Select a mood above to begin your check-in.</p>
          </div>
        )}
      </div>
    </section>
  );
}
