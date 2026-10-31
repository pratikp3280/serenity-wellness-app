// This is a React functional component called Programs that displays a beautiful animated UI section showing meditation programs.

import { useRef } from 'react'                     // Creates a reference to a DOM element
import { motion, useInView } from 'framer-motion'  // motion = animated components , useInView = detects when something enters screen
import { Moon, Waves, Sun, Heart, ArrowRight } from 'lucide-react' // Icon library (Moon 🌙, Sun ☀️ etc.)


// A data array of objects — each object = one program card
const programs = [
  {
    icon: Moon,
    title: 'Deep Sleep',
    desc: 'Gentle meditations and delta wave audio designed to ease you into restorative, uninterrupted sleep every single night.',
    sessions: '8 sessions',
    duration: '5–20 min each',
    gradient: 'from-indigo-900/60 to-indigo-800/30',
    border: 'border-indigo-500/25',
    iconBg: 'bg-indigo-500/20',
    iconColor: 'text-indigo-300',
    tag: 'SLEEP',
    tagColor: 'bg-indigo-500/20 text-indigo-300',
    glow: 'rgba(99, 102, 241, 0.15)',
  },
  {
    icon: Waves,
    title: 'Stress Relief',
    desc: 'Evidence-based breathing patterns and body scans that dissolve tension and bring you back to calm in real time.',
    sessions: '10 sessions',
    duration: '3–15 min each',
    gradient: 'from-teal-900/60 to-teal-800/30',
    border: 'border-aurora/25',
    iconBg: 'bg-aurora/15',
    iconColor: 'text-aurora',
    tag: 'STRESS',
    tagColor: 'bg-aurora/20 text-aurora',
    glow: 'rgba(78, 205, 196, 0.15)',
  },
  {
    icon: Sun,
    title: 'Morning Focus',
    desc: 'Start every day with clarity and intention. Alpha-wave soundscapes and mindful goal-setting to prime your mind.',
    sessions: '7 sessions',
    duration: '5–10 min each',
    gradient: 'from-amber-900/60 to-amber-800/30',
    border: 'border-gold/25',
    iconBg: 'bg-gold/15',
    iconColor: 'text-gold',
    tag: 'FOCUS',
    tagColor: 'bg-gold/20 text-gold',
    glow: 'rgba(247, 201, 72, 0.15)',
  },
  {
    icon: Heart,
    title: 'Anxiety Rescue',
    desc: '5-4-3-2-1 grounding, box breathing, and self-compassion meditations crafted for your most overwhelming moments.',
    sessions: '12 sessions',
    duration: '3–12 min each',
    gradient: 'from-rose-900/60 to-rose-800/30',
    border: 'border-rose-500/25',
    iconBg: 'bg-rose-500/20',
    iconColor: 'text-rose-300',
    tag: 'ANXIETY',
    tagColor: 'bg-rose-500/20 text-rose-300',
    glow: 'rgba(244, 63, 94, 0.15)',
  },
]

// A Framer Motion animation variant
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export default function Programs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" ref={ref} className="py-28 px-6 relative overflow-hidden">

      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(78, 205, 196, 0.04)' }}
      />

      <div className="max-w-6xl mx-auto relative">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-aurora/60 text-sm tracking-widest uppercase mb-4">
            Programs
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-white">
            Your path,{' '}
            <span className="italic gradient-text">your pace</span>
          </h2>
          <p className="text-white/40 text-base mt-5 max-w-lg mx-auto leading-relaxed">
            Structured programs built by neuroscientists and mindfulness experts. Each one evolves as you grow.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {programs.map((program, i) => (
            <motion.div
              key={program.title}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ duration: 0.6, delay: i * 0.12 }}        // Like domino effect 🧩- Each card appears one after another
              whileHover={{ y: -6, scale: 1.01 }}             // 👉 Moves up + slightly zooms
              className={
                'group relative overflow-hidden rounded-3xl border p-7 cursor-pointer ' +
                'bg-gradient-to-br ' + program.gradient + ' ' + program.border
              }
              style={{
                transition: 'box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 60px ' + program.glow   // onMouseEnter → add shadow
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'               // onMouseLeave → remove shadow
              }}
            >

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              />

              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className={
                  'w-13 h-13 rounded-2xl flex items-center justify-center flex-shrink-0 ' +
                  program.iconBg
                }
                  style={{ width: '52px', height: '52px' }}
                >
                  <program.icon size={26} className={program.iconColor} />
                </div>

                <span className={
                  'text-xs font-semibold tracking-widest px-3 py-1.5 rounded-full ' +
                  program.tagColor
                }>
                  {program.tag}
                </span>
              </div>

              <div className="relative z-10">
                <h3 className="font-display text-2xl font-medium text-white mb-3">
                  {program.title}
                </h3>

                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {program.desc}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-xs font-medium">
                      {program.sessions}
                    </p>
                    <p className="text-white/35 text-xs mt-0.5">
                      {program.duration}
                    </p>
                  </div>

                  <div className="w-9 h-9 rounded-full glass-card border border-white/10 flex items-center justify-center group-hover:border-aurora/40 transition-all duration-300"
                    style={{ transition: 'background 0.3s ease' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(78,205,196,0.2)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <ArrowRight
                      size={15}
                      className="text-white/50 group-hover:text-aurora transition-colors duration-300"
                    />
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center mt-12"
        >
        <a
            href="#cta"
            className="text-aurora/60 text-sm hover:text-aurora transition-colors duration-200 inline-flex items-center gap-2"
         >
            View all 40+ programs
            <ArrowRight size={14} />
        </a>
        </motion.div>
      </div>
    </section>
  )
}


/**
useRef → reference DOM
useInView → detect visibility
motion.div → animated div
variants → animation states
.map() → render list
key → unique identity
whileHover → hover animation
dynamic styles → program.gradient
dynamic component → <program.icon />
 */