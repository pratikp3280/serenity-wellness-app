
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Smile,
  BarChart3,
  Wind,
} from "lucide-react";

const stats = [
  {
    icon: Smile,
    label: "Mood Choices",
    description: "Understand how you feel",
  },
  {
    icon: BarChart3,
    label: "Wellness Metrics",
    description: "Explore your mood patterns",
  },
  {
    icon: Wind,
    label: "Guided Breathing",
    description: "Pause and find your rhythm",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero({ onRegister }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=1400&q=80"
          alt="Person meditating peacefully"
          className="w-full h-full object-cover opacity-65"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight/70 to-midnight" />
      </div>

      {/* Background Glow Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(78, 205, 196, 0.08)" }}
        />

        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "rgba(247, 201, 72, 0.06)" }}
        />
      </div>

      {/* Animated Breathing Rings */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block z-0">
        <div className="relative w-80 h-80 flex items-center justify-center">

          <div
            className="absolute rounded-full border"
            style={{
              width: "320px",
              height: "320px",
              borderColor: "rgba(78,205,196,0.1)",
              background: "rgba(78,205,196,0.03)",
              animation: "breatheOuter 14s ease-in-out infinite",
            }}
          />

          <div
            className="absolute rounded-full border"
            style={{
              width: "220px",
              height: "220px",
              borderColor: "rgba(78,205,196,0.2)",
              background: "rgba(78,205,196,0.06)",
              animation: "breatheRing 14s ease-in-out infinite",
            }}
          />

          <div
            className="absolute rounded-full border"
            style={{
              width: "130px",
              height: "130px",
              borderColor: "rgba(78,205,196,0.5)",
              background: "rgba(78,205,196,0.15)",
              animation: "breatheIn 14s ease-in-out infinite",
            }}
          />

          <span className="font-display italic text-aurora text-sm text-center leading-relaxed relative z-10">
            breathe
            <br />
            freely
          </span>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl">

          {/* Eyebrow Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0 }}
            className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-aurora animate-pulse" />

            <span className="text-aurora/80 text-sm font-medium tracking-wide">
              YOUR SPACE TO CHECK IN, REFLECT & GROW
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] mb-6"
          >
            Still your mind.
            <br />
            <span className="gradient-text italic">
              Find your center.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.28 }}
            className="text-white/60 text-lg md:text-xl font-light max-w-xl leading-relaxed mb-10"
          >
            Serenity guides you from overwhelm to calm in minutes.
            Science-backed meditation, breathing, and rest — personalized for you.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <button
              type="button"
              onClick={onRegister}
              className="btn-aurora px-8 py-4 rounded-full text-base inline-flex items-center justify-center gap-2 group"
            >
              Begin Your Journey

              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </button>

            <a
              href="#how-it-works"
              className="btn-ghost px-8 py-4 rounded-full text-base inline-flex items-center justify-center gap-2"
            >
              <Play size={16} className="fill-current text-aurora/60" />
              How It Works
            </a>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.55 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            {stats.map(({ icon: Icon, label, description }) => (
              <div
                key={label}
                className="glass-card rounded-2xl px-4 py-4 flex items-center gap-3"
              >
                {/* Feature Icon */}
                <div
                  className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(78,205,196,0.15)",
                  }}
                >
                  <Icon
                    size={21}
                    strokeWidth={1.8}
                    className="text-aurora"
                  />
                </div>

                {/* Feature Text */}
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm">
                    {label}
                  </p>

                  <p className="text-white/40 text-xs mt-1 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">
          Scroll
        </span>

        <div className="w-px h-12 bg-gradient-to-b from-aurora/60 to-transparent animate-pulse" />
      </motion.div>

    </section>
  );
}
