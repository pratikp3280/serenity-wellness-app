
import { useState, useRef } from "react";

import {
    motion,
    AnimatePresence,
    useInView
} from "framer-motion";

import {
    Wind,
    Headphones,
    Heart,
    Zap,
    Smile,
    Sparkles,
    CloudRain,
    Brain,
    Flame,
    BatteryLow,
    ArrowRight
} from "lucide-react";

import { apiRequest } from "../services/api";


// --------------------------------------------------
// 1. Standardized moods
// --------------------------------------------------

const moods = [

    {
        id: "happy",
        emoji: "😊",
        label: "Happy",
        category: "Positive",
        meaning: "You feel cheerful and joyful.",
        gradient: "from-emerald-900/40 to-emerald-800/20",
        border: "border-emerald-500/30",
        session: "Gratitude Session",
        desc: "Deepen your wellbeing with a guided gratitude practice.",
        icon: Smile,
        duration: "7 min",
        tag: "GRATITUDE",
        tagColor: "bg-emerald-500/20 text-emerald-300"
    },

    {
        id: "calm",
        emoji: "😌",
        label: "Calm",
        category: "Peaceful",
        meaning: "You feel relaxed and at ease.",
        gradient: "from-teal-900/40 to-teal-800/20",
        border: "border-teal-500/30",
        session: "Mindful Breathing",
        desc: "Maintain your peaceful state through gentle mindful breathing.",
        icon: Wind,
        duration: "5 min",
        tag: "BREATHING",
        tagColor: "bg-teal-500/20 text-teal-300"
    },

    {
        id: "excited",
        emoji: "🤩",
        label: "Excited",
        category: "Energetic",
        meaning: "You feel enthusiastic and full of energy.",
        gradient: "from-amber-900/40 to-amber-800/20",
        border: "border-amber-500/30",
        session: "Energy Boost",
        desc: "Channel your enthusiasm into a positive and energizing activity.",
        icon: Zap,
        duration: "6 min",
        tag: "ENERGY",
        tagColor: "bg-amber-500/20 text-amber-300"
    },

    {
        id: "grateful",
        emoji: "🙏",
        label: "Grateful",
        category: "Appreciative",
        meaning: "You feel thankful for something in your life.",
        gradient: "from-green-900/40 to-green-800/20",
        border: "border-green-500/30",
        session: "Gratitude Reflection",
        desc: "Take a moment to appreciate the meaningful things in your life.",
        icon: Heart,
        duration: "7 min",
        tag: "REFLECTION",
        tagColor: "bg-green-500/20 text-green-300"
    },

    {
        id: "neutral",
        emoji: "😐",
        label: "Neutral / Okay",
        category: "Balanced",
        meaning: "You feel neither particularly good nor bad.",
        gradient: "from-slate-800/50 to-slate-700/20",
        border: "border-slate-400/30",
        session: "Mindful Pause",
        desc: "Take a gentle pause and reconnect with the present moment.",
        icon: Sparkles,
        duration: "5 min",
        tag: "MINDFULNESS",
        tagColor: "bg-slate-400/20 text-slate-300"
    },

    {
        id: "sad",
        emoji: "😢",
        label: "Sad",
        category: "Low mood",
        meaning: "You feel down, unhappy or disappointed.",
        gradient: "from-blue-900/40 to-blue-800/20",
        border: "border-blue-500/30",
        session: "Gentle Meditation",
        desc: "Give yourself space to acknowledge your feelings with kindness.",
        icon: CloudRain,
        duration: "8 min",
        tag: "MEDITATION",
        tagColor: "bg-blue-500/20 text-blue-300"
    },

    {
        id: "anxious",
        emoji: "😰",
        label: "Anxious",
        category: "Worried",
        meaning: "You feel nervous or concerned.",
        gradient: "from-orange-900/40 to-orange-800/20",
        border: "border-orange-500/30",
        session: "Body Scan",
        desc: "Reconnect with your body through a gentle awareness exercise.",
        icon: Brain,
        duration: "8 min",
        tag: "MEDITATION",
        tagColor: "bg-orange-500/20 text-orange-300"
    },

    {
        id: "stressed",
        emoji: "😤",
        label: "Stressed",
        category: "Overwhelmed",
        meaning: "You feel pressured by too many demands.",
        gradient: "from-rose-900/40 to-rose-800/20",
        border: "border-rose-500/30",
        session: "4-7-8 Breathing",
        desc: "Release tension with a breathing exercise: inhale for 4, hold for 7 and exhale for 8 counts.",
        icon: Wind,
        duration: "5 min",
        tag: "BREATHING",
        tagColor: "bg-rose-500/20 text-rose-300"
    },

    {
        id: "angry",
        emoji: "😠",
        label: "Angry",
        category: "Frustrated",
        meaning: "You feel irritated, upset or annoyed.",
        gradient: "from-red-900/40 to-red-800/20",
        border: "border-red-500/30",
        session: "Calming Reset",
        desc: "Create some space between your emotions and your next response.",
        icon: Flame,
        duration: "6 min",
        tag: "RELAXATION",
        tagColor: "bg-red-500/20 text-red-300"
    },

    {
        id: "tired",
        emoji: "😴",
        label: "Tired",
        category: "Low energy",
        meaning: "You feel exhausted or mentally drained.",
        gradient: "from-indigo-900/40 to-indigo-800/20",
        border: "border-indigo-500/30",
        session: "Restful Soundscape",
        desc: "Take a quiet break with a relaxing sound experience.",
        icon: BatteryLow,
        duration: "10 min",
        tag: "SOUNDSCAPE",
        tagColor: "bg-indigo-500/20 text-indigo-300"
    }

];


// --------------------------------------------------
// 2. Animation configuration
// --------------------------------------------------

const fadeUp = {

    hidden: {
        opacity: 0,
        y: 40
    },

    visible: {
        opacity: 1,
        y: 0
    }

};


// --------------------------------------------------
// 3. MoodSelector component
// --------------------------------------------------

export default function MoodSelector() {

    const [selected, setSelected] = useState(null);

    const [note, setNote] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [submissionStatus, setSubmissionStatus] = useState("idle");

    const [errorMessage, setErrorMessage] = useState("");

    const ref = useRef(null);

    const isInView = useInView(ref, {
        once: true,
        margin: "-100px"
    });


    // Find the currently selected mood.
    const selectedMood = moods.find(
        (mood) => mood.id === selected
    );


    // --------------------------------------------------
    // 4. Handle mood selection
    // --------------------------------------------------

    function handleMoodClick(id) {

        if (isSubmitting) return;

        setSelected((current) => current === id ? null : id);

        setSubmissionStatus("idle");

        setErrorMessage("");

    }


    // --------------------------------------------------
    // 5. Handle journal note
    // --------------------------------------------------

    function handleNoteChange(event) {

        setNote(event.target.value);

        setSubmissionStatus("idle");

        setErrorMessage("");

    }


    // --------------------------------------------------
    // 6. Submit mood to Spring Boot
    // --------------------------------------------------

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


            // Convert lowercase frontend mood ID
            // into uppercase Java enum value.

            const requestBody = {

                mood: selectedMood.id.toUpperCase(),

                note: note.trim() || null

            };


            // Call existing API utility.

            await apiRequest("/api/moods", {

                method: "POST",

                body: requestBody

            });


            // Display success feedback.

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


    // --------------------------------------------------
    // 7. UI
    // --------------------------------------------------

    return (

        <section
            id="mood"
            ref={ref}
            className="py-28 px-6 relative"
        >

            <div className="max-w-5xl mx-auto">


                {/* Heading */}

                <motion.div

                    variants={fadeUp}

                    initial="hidden"

                    animate={isInView ? "visible" : "hidden"}

                    transition={{ duration: 0.7 }}

                    className="text-center mb-16"

                >

                    <p className="text-aurora/60 text-sm tracking-widest uppercase mb-4">

                        Your wellbeing matters

                    </p>


                    <h2 className="font-display text-5xl md:text-6xl font-light text-white leading-tight">

                        How are you feeling{" "}

                        <span className="italic gradient-text">

                            right now?

                        </span>

                    </h2>


                    <p className="text-white/40 text-base mt-4 max-w-md mx-auto">

                        Choose the mood that best describes how you feel at this moment.

                    </p>

                </motion.div>


                {/* Mood Selection Grid */}

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12">

                    {moods.map((mood, index) => (

                        <motion.button

                            key={mood.id}

                            type="button"

                            variants={fadeUp}

                            initial="hidden"

                            animate={isInView ? "visible" : "hidden"}

                            transition={{
                                duration: 0.5,
                                delay: index * 0.06
                            }}

                            whileTap={!isSubmitting ? { scale: 0.95 } : undefined}

                            whileHover={!isSubmitting ? { y: -4 } : undefined}

                            onClick={() => handleMoodClick(mood.id)}

                            disabled={isSubmitting}

                            title={mood.meaning}

                            aria-label={`${mood.label}: ${mood.meaning}`}

                            aria-pressed={selected === mood.id}

                            className={

                                "relative p-5 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-3 cursor-pointer w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora disabled:opacity-60 disabled:cursor-not-allowed " +

                                (selected === mood.id

                                    ? "bg-gradient-to-b " + mood.gradient + " " + mood.border + " shadow-xl shadow-black/20"

                                    : "glass-card border-white/8 hover:border-white/20")

                            }

                        >

                            <span className="text-3xl">

                                {mood.emoji}

                            </span>


                            <span className={

                                "text-sm font-medium text-center transition-colors " +

                                (selected === mood.id
                                    ? "text-white"
                                    : "text-white/60")

                            }>

                                {mood.label}

                            </span>


                            <span className="text-xs text-white/35">

                                {mood.category}

                            </span>


                            {selected === mood.id && (

                                <motion.div

                                    initial={{ scale: 0 }}

                                    animate={{ scale: 1 }}

                                    className="w-1.5 h-1.5 rounded-full bg-aurora"

                                />

                            )}

                        </motion.button>

                    ))}

                </div>


                {/* Selected Mood and Journal Form */}

                <AnimatePresence mode="wait">

                    {selectedMood && (

                        <motion.form

                            key={selectedMood.id}

                            onSubmit={handleSubmit}

                            initial={{
                                opacity: 0,
                                y: 20,
                                scale: 0.97
                            }}

                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1
                            }}

                            exit={{
                                opacity: 0,
                                y: -20,
                                scale: 0.97
                            }}

                            transition={{
                                duration: 0.4,
                                ease: "easeOut"
                            }}

                            className={

                                "glass-card rounded-3xl p-6 md:p-8 border shadow-xl " +

                                selectedMood.border

                            }

                        >


                            {/* Mood Recommendation */}

                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">

                                <div className={

                                    "w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br " +

                                    selectedMood.gradient + " border " +

                                    selectedMood.border

                                }>

                                    <selectedMood.icon

                                        size={26}

                                        className="text-white"

                                    />

                                </div>


                                <div className="flex-1">

                                    <div className="flex flex-wrap items-center gap-3 mb-2">

                                        <span className={

                                            "text-xs font-semibold tracking-widest px-3 py-1 rounded-full " +

                                            selectedMood.tagColor

                                        }>

                                            {selectedMood.tag}

                                        </span>


                                        <span className="text-white/40 text-xs">

                                            {selectedMood.duration}

                                        </span>

                                    </div>


                                    <h3 className="font-display text-2xl font-medium text-white mb-2">

                                        {selectedMood.session}

                                    </h3>


                                    <p className="text-white/50 text-sm leading-relaxed max-w-xl">

                                        {selectedMood.desc}

                                    </p>

                                </div>


                                <a

                                    href="#cta"

                                    className="btn-aurora px-6 py-3 rounded-full text-sm inline-flex items-center gap-2 flex-shrink-0"

                                >

                                    Explore Session

                                    <ArrowRight size={15} />

                                </a>

                            </div>


                            {/* Optional Journal Note */}

                            <div className="border-t border-white/10 pt-6">

                                <label

                                    htmlFor="mood-note"

                                    className="block text-white text-sm font-medium mb-3"

                                >

                                    What's on your mind?

                                    <span className="text-white/40 font-normal ml-2">

                                        (Optional)

                                    </span>

                                </label>


                                <textarea

                                    id="mood-note"

                                    value={note}

                                    onChange={handleNoteChange}

                                    maxLength={2000}

                                    rows={4}

                                    disabled={isSubmitting}

                                    placeholder="Write a few words about how you're feeling today..."

                                    className="w-full rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 p-4 text-sm resize-none focus:outline-none focus:border-aurora/60 focus:ring-1 focus:ring-aurora/30 transition-all disabled:opacity-60"

                                />


                                <div className="flex justify-end mt-2">

                                    <span className="text-xs text-white/30">

                                        {note.length}/2000

                                    </span>

                                </div>

                            </div>


                            {/* Submission Feedback */}

                            <AnimatePresence mode="wait">

                                {submissionStatus === "success" && (

                                    <motion.p

                                        initial={{ opacity: 0, y: 8 }}

                                        animate={{ opacity: 1, y: 0 }}

                                        exit={{ opacity: 0 }}

                                        role="status"

                                        className="text-emerald-300 text-sm mt-5"

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

                                        className="text-red-400 text-sm mt-5"

                                    >

                                        {errorMessage}

                                    </motion.p>

                                )}

                            </AnimatePresence>


                            {/* Submit Button */}

                            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">

                                <p className="text-white/30 text-xs">

                                    Your check-in is private to your account.

                                </p>


                                <button

                                    type="submit"

                                    disabled={isSubmitting || !selected}

                                    className="btn-aurora px-8 py-3 rounded-full text-sm font-medium w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed transition-all"

                                >

                                    {isSubmitting

                                        ? "Saving your mood..."

                                        : "Save My Mood"

                                    }

                                </button>

                            </div>


                        </motion.form>

                    )}

                </AnimatePresence>


                {/* No Selection Message */}

                {!selectedMood && (

                    <div className="text-center py-6">

                        <p className="text-white/30 text-sm italic">

                            Select a mood above to begin your check-in.

                        </p>

                    </div>

                )}


            </div>

        </section>

    );

}
