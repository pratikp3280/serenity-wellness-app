
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Clock3, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { moodSessions } from "../data/moodSessions";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

// Public homepage preview: display only six mood-based experiences.
// All ten experiences remain available through Mood Check-in.
export default function Programs() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  return (
    <section
      id="programs"
      ref={ref}
      className="relative scroll-mt-28 overflow-hidden px-6 py-24 sm:py-28"
    >
      {/* Preserve the previous Features anchor */}
      <span
        id="features"
        className="absolute top-0"
        aria-hidden="true"
      />

      {/* Background glow */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "rgba(78, 205, 196, 0.045)" }}
      />

      <div className="relative mx-auto max-w-6xl">

        {/* Section Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-widest text-aurora/60">
            Mindful experiences
          </p>

          <h2 className="font-display text-4xl font-light text-white sm:text-5xl md:text-6xl">
            A session for every{" "}
            <span className="gradient-text italic">
              kind of day
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/45 sm:text-base">
            Start with how you feel. Serenity offers a small,
            guided experience to help you pause, reflect,
            move gently or rest.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-aurora/15 bg-aurora/[0.06] px-4 py-2 text-xs text-aurora/80">
            <Sparkles size={14} />
            10 mood-based experiences · 5–10 minutes
          </div>
        </motion.div>

        {/* Display ONLY the first six sessions */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

          {moodSessions.slice(0, 6).map((session, index) => {
            const Icon = session.icon;

            return (
              <motion.article
                key={session.id}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{
                  duration: 0.55,
                  delay: index * 0.055,
                }}
                whileHover={{ y: -5 }}
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-gradient-to-br ${session.gradient} ${session.border} p-6 transition-shadow duration-300 hover:shadow-[0_18px_55px_rgba(0,0,0,0.25)]`}
              >

                {/* Hover overlay */}
                <div className="pointer-events-none absolute inset-0 bg-white/[0.015] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon and Tag */}
                <div className="relative z-10 flex items-start justify-between gap-3">

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/5 ${session.iconBg}`}
                  >
                    <Icon
                      size={23}
                      className={session.iconColor}
                    />
                  </div>

                  <span
                    className={`rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] ${session.tagColor}`}
                  >
                    {session.tag}
                  </span>

                </div>

                {/* Session Details */}
                <div className="relative z-10 mt-5 flex-1">

                  <div className="mb-2 flex items-center gap-2 text-xs text-white/40">
                    <span>{session.emoji}</span>
                    <span>{session.label}</span>
                    <span className="text-white/20">·</span>
                    <span>{session.category}</span>
                  </div>

                  <h3 className="font-display text-2xl font-medium text-white">
                    {session.session}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-white/50">
                    {session.desc}
                  </p>

                </div>

                {/* Card Footer */}
                <div className="relative z-10 mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-5">

                  <span className="inline-flex items-center gap-2 text-xs text-white/45">
                    <Clock3 size={14} />
                    {session.duration}
                  </span>

                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white/75 transition group-hover:border-aurora/40 group-hover:text-aurora"
                  >
                    Sign in to explore
                    <ArrowRight size={13} />
                  </Link>

                </div>

              </motion.article>
            );
          })}

        </div>

        {/* Bottom-right Registration CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-12 flex justify-end"
        >
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-full bg-aurora px-7 py-3.5 text-sm font-semibold text-midnight transition hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(78,205,196,0.25)]"
          >
            More Programs
            <ArrowRight size={16} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
