
import { motion } from "framer-motion";
import { ArrowRight, Clock3, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { moodSessions } from "../data/moodSessions";

export default function ProgramsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* Page Heading */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl
          border border-[#4ECDC4]/15
          bg-gradient-to-br from-[#142A32] via-[#101D2A] to-[#111426]
          p-7 sm:p-10"
      >
        <div className="absolute -right-16 -top-16
          h-64 w-64 rounded-full bg-[#4ECDC4]/10 blur-3xl"
        />

        <div className="relative z-10 max-w-2xl">

          <div className="flex items-center gap-2 text-[#4ECDC4] mb-4">
            <Sparkles size={18} />
            <span className="text-xs uppercase tracking-[0.2em]">
              Mindful Experiences
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl text-white">
            Explore your{" "}
            <span className="italic gradient-text">
              programs
            </span>
          </h1>

          <p className="mt-4 text-gray-300 leading-relaxed">
            Whatever you are feeling today, there is a mindful
            experience waiting for you. Choose a session and
            take a little time for yourself.
          </p>

          <Link
            to="/mood-checkin"
            className="inline-flex items-center gap-2 mt-7
              rounded-xl bg-[#4ECDC4] px-5 py-3
              text-sm font-semibold text-[#0A0E1A]
              hover:bg-[#68ddd5] transition-colors"
          >
            <HeartIcon />
            Find a session for my mood
            <ArrowRight size={16} />
          </Link>

        </div>
      </motion.section>

      {/* Programs Information */}
      <section>

        <div className="mb-6">
          <p className="text-[#4ECDC4]/70 text-xs uppercase tracking-[0.2em]">
            Your wellness library
          </p>

          <h2 className="font-display text-3xl sm:text-4xl text-white mt-2">
            Sessions for every mood
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            Explore all {moodSessions.length} guided experiences.
          </p>
        </div>

        {/* Three-column responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {moodSessions.map((session, index) => {
            const Icon = session.icon;

            return (
              <motion.article
                key={session.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                }}
                whileHover={{ y: -5 }}
                className={`group relative overflow-hidden
                  flex flex-col min-h-[280px]
                  rounded-3xl border p-6
                  bg-gradient-to-br ${session.gradient}
                  ${session.border}
                  hover:shadow-xl hover:shadow-black/20
                  transition-shadow duration-300`}
              >

                {/* Card Header */}
                <div className="flex items-start justify-between gap-3">

                  <div
                    className={`flex h-12 w-12 items-center
                      justify-center rounded-2xl
                      ${session.iconBg}`}
                  >
                    <Icon
                      size={24}
                      className={session.iconColor}
                    />
                  </div>

                  <span
                    className={`rounded-full px-3 py-1.5
                      text-[10px] font-semibold tracking-widest
                      ${session.tagColor}`}
                  >
                    {session.tag}
                  </span>

                </div>

                {/* Card Details */}
                <div className="flex-1 mt-5">

                  <div className="flex items-center gap-2 text-xs text-white/45 mb-2">
                    <span className="text-base">
                      {session.emoji}
                    </span>

                    <span>{session.label}</span>

                    <span className="text-white/20">·</span>

                    <span>{session.category}</span>
                  </div>

                  <h3 className="font-display text-2xl font-medium text-white">
                    {session.session}
                  </h3>

                  <p className="text-sm text-white/50 leading-relaxed mt-3">
                    {session.desc}
                  </p>

                </div>

                {/* Card Footer */}
                <div className="mt-6 pt-5 border-t border-white/10
                  flex items-center justify-between gap-3"
                >

                  <span className="flex items-center gap-2 text-xs text-white/45">
                    <Clock3 size={14} />
                    {session.duration}
                  </span>

                  <Link
                    to={`/sessions/${session.id}`}
                    className="inline-flex items-center gap-2
                      rounded-full border border-white/15
                      px-4 py-2 text-xs font-medium
                      text-white/75
                      hover:border-[#4ECDC4]/50
                      hover:text-[#4ECDC4]
                      transition-all duration-300"
                  >
                    Explore Session
                    <ArrowRight size={13} />
                  </Link>

                </div>

              </motion.article>
            );
          })}

        </div>
      </section>

      {/* Gentle Reminder */}
      <section className="rounded-2xl border border-white/10
        bg-white/[0.03] p-6 text-center"
      >
        <p className="font-display text-2xl italic text-white">
          "One small mindful moment can make room for a new perspective."
        </p>

        <p className="text-xs text-white/40 mt-3">
          Take your time. Your journey, your pace.
        </p>
      </section>

    </div>
  );
}

// Small reusable icon for the Mood Check-in CTA.
function HeartIcon() {
  return <Sparkles size={16} />;
}
