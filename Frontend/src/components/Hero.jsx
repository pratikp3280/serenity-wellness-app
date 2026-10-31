// src/components/Hero.jsx

// ── IMPORTS ──────────────────────────────────────────────────────
// motion  = wraps HTML elements to make them animate
// animate = controls animation state
// useInView = detects when element enters the screen
import { motion } from "framer-motion";

// useRef = pointer to a DOM element
import { useRef } from "react";

// Icons from Lucide React library
import { ArrowRight, Play, Users, Star, Clock } from "lucide-react";

// ── DATA ──────────────────────────────────────────────────────────
// We store the 3 stat badges as an array of objects
// This way we can .map() over them instead of copy-pasting 3 times
const stats = [
  { icon: Users, label: "Active Users", value: "50,000+" },
  { icon: Star, label: "Average Rating", value: "4.9 / 5" },
  { icon: Clock, label: "Avg Session", value: "3 mins" },
];

// ── ANIMATION VARIANTS ───────────────────────────────────────────
// Instead of writing initial/animate on every element,
// we define "variants" (named animation states) once and reuse them

const fadeUp = {
  hidden: { opacity: 0, y: 40 }, // start: invisible + shifted 40px down
  visible: { opacity: 1, y: 0 }, // end:   visible  + normal position
};

// ── COMPONENT ────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* ── BACKGROUND LAYER ──────────────────────────────────── */}
      {/* This sits BEHIND everything. z-0 = back of the stack     */}
      <div className="absolute inset-0 z-0">
        {/* Background Image from Unsplash */}
        <img
          src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=1400&q=80"
          alt="Person meditating peacefully"
          className="w-full h-full object-cover opacity-65"
        />

        {/* Dark gradient overlay ON TOP of the image */}
        {/* Makes the image fade into our midnight background */}
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight/70 to-midnight" />
      </div>

      {/* ── GLOWING ORBS ──────────────────────────────────────── */}
      {/* These are blurry colored circles that float in background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Teal orb — top left area */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(78, 205, 196, 0.08)" }}
        />

        {/* Gold orb — bottom right area */}
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "rgba(247, 201, 72, 0.06)" }}
        />
      </div>

      {/* ── BREATHING CIRCLE (right side, desktop only) ───────── */}
      {/* hidden = hide on mobile, lg:block = show on large screens */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block z-0">
        <div className="relative w-80 h-80 flex items-center justify-center">
          {/* 3 circles — each bigger, each more transparent */}
          {/* CSS animations defined in index.css as .breathe-outer etc */}

          {/* Outermost ring */}
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

          {/* Middle ring */}
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

          {/* Core circle */}
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

          {/* Center text */}
          <span className="font-display italic text-aurora text-sm text-center leading-relaxed relative z-10">
            breathe
            <br />
            freely
          </span>
        </div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────── */}
      {/* z-10 = in FRONT of backgrounds (z-0) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          {/* ── BADGE (small pill at top) ─────────────────────── */}
          <motion.div
            variants={fadeUp} // use our fadeUp variant
            initial="hidden" // start at "hidden" state
            animate="visible" // animate to "visible" state
            transition={{ duration: 0.6, delay: 0 }}
            className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-8"
          >
            {/* Pulsing green dot */}
            <div className="w-2 h-2 rounded-full bg-aurora animate-pulse" />
            <span className="text-aurora/80 text-sm font-medium tracking-wide">
              Science-backed mindfulness — trusted by 50,000+
            </span>
          </motion.div>

          {/* ── HEADLINE ──────────────────────────────────────── */}
          {/*
            motion.h1 = animated h1
            delay: 0.15 means it starts 0.15s AFTER the badge animates
            This creates a "stagger" effect — each element appears one by one
          */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-6xl md:text-7xl lg:text-8xl font-light text-white leading-[1.05] mb-6"
          >
            Still your mind.
            <br />
            {/*
              gradient-text = custom CSS class from index.css
              italic = Cormorant Garamond looks AMAZING in italic
            */}
            <span className="gradient-text italic">Find your center.</span>
          </motion.h1>

          {/* ── SUBTEXT ───────────────────────────────────────── */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.28 }}
            className="text-white/60 text-lg md:text-xl font-light max-w-xl leading-relaxed mb-10"
          >
            Serenity guides you from overwhelm to calm in minutes.
            Science-backed meditation, breathing, and rest — personalized for
            you.
          </motion.p>

          {/* ── CTA BUTTONS ───────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            {/* Primary CTA — filled teal button */}
            <a
              href="#mood"
              className="btn-aurora px-8 py-4 rounded-full text-base inline-flex items-center justify-center gap-2 group"
            >
              Begin Your Journey
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </a>

            <a
              href="#how-it-works"
              className="btn-ghost px-8 py-4 rounded-full text-base inline-flex items-center justify-center gap-2"
            >
              <Play size={16} className="fill-current text-aurora/60" />
              How It Works
            </a>
          </motion.div>

          {/* ── STAT BADGES ───────────────────────────────────── */}
          {/*
            We have 3 stats. Instead of writing 3 identical divs,
            we .map() over the stats array.
            .map() = "for each item, create a JSX element"
          */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {stats.map(({ icon: Icon, label, value }) => (
              // The "key" prop is REQUIRED when using .map() in React
              // It helps React track which item is which
              <div
                key={label}
                className="glass-card rounded-2xl px-5 py-4 flex items-center gap-3"
              >
                {/* Icon in a circular teal background */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(78,205,196,0.15)" }}
                >
                  {/* Icon = the component passed in (Users, Star, or Clock) */}
                  <Icon size={16} className="text-aurora" />
                </div>

                <div>
                  <p className="text-white font-semibold text-sm">{value}</p>
                  <p className="text-white/40 text-xs">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── SCROLL INDICATOR (bottom center) ─────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">
          Scroll
        </span>
        {/* Vertical line that pulses */}
        <div className="w-px h-12 bg-gradient-to-b from-aurora/60 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
