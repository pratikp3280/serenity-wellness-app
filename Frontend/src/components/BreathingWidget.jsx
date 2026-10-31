/* BreathingWidget is a React interactive component that guides users through a breathing exercise (4-4-6 technique) using:
⏱️ Timers 🔄 State changes 🎬 Animations 🫁 Visual breathing circle 
*/

import { useState, useEffect, useRef } from 'react'      
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Play, Square } from 'lucide-react'    // Icons for play and stop buttons

/**
 * useState: Store changing values
 * useEffect Run logic (timers)
 * useRef: Keep mutable values without re-rendering
 * useInView: Trigger animations when component enters viewport
 * motion: Animate elements with declarative syntax
 * AnimatePresence: Handle enter/exit animations for components
 */

// Array of PHASES(Inhale, Hold, Exhale) with properties for label, duration, scale, and colors
const PHASES = [
  {
    label: 'Breathe In...',
    duration: 4,
    scale: 1.45,
    color: 'rgba(78, 205, 196, 0.4)',
    ringColor: 'rgba(78, 205, 196, 0.15)',
  },
  {
    label: 'Hold...',
    duration: 4,
    scale: 1.45,
    color: 'rgba(247, 201, 72, 0.4)',
    ringColor: 'rgba(247, 201, 72, 0.15)',
  },
  {
    label: 'Breathe Out...',
    duration: 6,
    scale: 1.0,
    color: 'rgba(78, 205, 196, 0.2)',
    ringColor: 'rgba(78, 205, 196, 0.08)',
  },
]

// Framer Motion animations - 
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export default function BreathingWidget() {
  const [active, setActive] = useState(false)       // Track if breathing session is active(running / stopped)
  const [phase, setPhase] = useState(0)             // Track current phase index (0: Inhale, 1: Hold, 2: Exhale)
  const [countdown, setCountdown] = useState(PHASES[0].duration)   //  Track remaining time in current phase, initialized to duration of first phase (Inhale)
  const [cycles, setCycles] = useState(0)            // Track completed cycles of the breathing exercise (one cycle = Inhale + Hold + Exhale)

  const intervalRef = useRef(null)     // Store interval ID for the timer, allowing us to clear it when needed without causing re-renders
  const phaseRef = useRef(0)          // Store current phase index in a ref to access it inside the timmer

  const ref = useRef(null)           // Ref for the main section element to track if it's in the viewport using useInView hook
  const isInView = useInView(ref, { once: true, margin: '-80px' })  // Track if the component is in view, triggering animations only once when it enters the viewport with a margin offset

  useEffect(() => {
    if (!active) {             // if not active -> stop Timer -> reset everyThing
      clearInterval(intervalRef.current)
      phaseRef.current = 0
      setPhase(0)
      setCountdown(PHASES[0].duration)
      return
    }

    // Phase Switching Logic
    function runPhase(idx) {
      phaseRef.current = idx
      setPhase(idx)
      setCountdown(PHASES[idx].duration)

      let remaining = PHASES[idx].duration

      intervalRef.current = setInterval(() => {
        remaining -= 1
        setCountdown(remaining)

        if (remaining <= 0) {
          clearInterval(intervalRef.current)
          const next = (idx + 1) % PHASES.length
          if (next === 0) {         // Cycle Tracking
            setCycles((c) => c + 1)
          }
          runPhase(next)
        }
      }, 1000)
    }

    runPhase(0)

    return () => clearInterval(intervalRef.current)
  }, [active])

  const currentPhase = PHASES[phase]

  return (
    <section ref={ref} className="py-28 px-6 relative overflow-hidden">

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: 'rgba(78, 205, 196, 0.03)' }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-aurora/60 text-sm tracking-widest uppercase mb-4">
            Interactive
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-white">
            Try a quick{' '}
            <span className="italic gradient-text">breath</span>
          </h2>
          <p className="text-white/40 text-base mt-5 max-w-md mx-auto leading-relaxed">
            The 4-4-6 technique activates your parasympathetic nervous system in under a minute.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center gap-12"
        >

          <div
            className="relative flex items-center justify-center"
            style={{ width: '280px', height: '280px' }}
          >

            <motion.div
              className="absolute rounded-full"
              animate={
                active
                  ? { scale: currentPhase.scale * 1.3, opacity: 0.15 }
                  : { scale: 1, opacity: 0.08 }
              }
              transition={{
                duration: currentPhase.duration,
                ease: 'easeInOut',
              }}
              style={{
                width: '280px',
                height: '280px',
                background: currentPhase.ringColor,
                border: '1px solid rgba(78,205,196,0.1)',
              }}
            />

            <motion.div
              className="absolute rounded-full"
              animate={
                active
                  ? { scale: currentPhase.scale * 1.1, opacity: 0.25 }
                  : { scale: 1, opacity: 0.15 }
              }
              transition={{
                duration: currentPhase.duration,
                ease: 'easeInOut',
              }}
              style={{
                width: '200px',
                height: '200px',
                background: currentPhase.ringColor,
                border: '1px solid rgba(78,205,196,0.2)',
              }}
            />

            <motion.div
              className="absolute rounded-full"
              animate={
                active
                  ? {
                      scale: currentPhase.scale,
                      background: currentPhase.color,
                    }
                  : {
                      scale: 1,
                      background: 'rgba(78, 205, 196, 0.15)',
                    }
              }
              transition={{
                duration: currentPhase.duration,
                ease: 'easeInOut',
              }}
              style={{
                width: '130px',
                height: '130px',
                border: '1.5px solid rgba(78,205,196,0.5)',
              }}
            />

            <div className="relative z-10 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active ? phase : 'idle'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center gap-1"
                >
                  {active ? (
                    <>
                      <span className="text-aurora/70 text-xs tracking-widest uppercase font-medium">
                        {currentPhase.label}
                      </span>
                      <span className="font-display text-4xl text-white font-light">
                        {countdown}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-white/30 text-xs tracking-widest uppercase">
                        Ready
                      </span>
                      <span className="font-display text-2xl text-white/50 italic font-light">
                        to begin
                      </span>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              {PHASES.map((p, i) => (
                <div
                  key={p.label}
                  className={
                    'flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 ' +
                    (i === phase
                      ? 'border border-aurora/30'
                      : 'opacity-30')
                  }
                  style={
                    i === phase
                      ? { background: 'rgba(78,205,196,0.1)' }
                      : {}
                  }
                >
                  <div className={
                    'w-1.5 h-1.5 rounded-full ' +
                    (i === phase ? 'bg-aurora' : 'bg-white/30')
                  } />
                  <span className={
                    'text-xs ' +
                    (i === phase ? 'text-aurora' : 'text-white/40')
                  }>
                    {p.label.replace('...', '')}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

          {cycles > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/30 text-sm"
            >
              {cycles} {cycles === 1 ? 'cycle' : 'cycles'} completed — you are doing great
            </motion.p>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setActive(!active)}
            className={
              'flex items-center gap-3 px-10 py-4 rounded-full font-medium text-base transition-all duration-300 ' +
              (active
                ? 'glass-card border border-white/20 text-white hover:border-white/40'
                : 'btn-aurora')
            }
          >
            {active ? (
              <>
                <Square size={16} className="fill-current" />
                Stop Session
              </>
            ) : (
              <>
                <Play size={16} className="fill-current" />
                Begin Breathing
              </>
            )}
          </motion.button>

          <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
            {[
              { label: 'Inhale', val: '4s', color: 'text-aurora' },
              { label: 'Hold',   val: '4s', color: 'text-gold' },
              { label: 'Exhale', val: '6s', color: 'text-aurora' },
            ].map((t) => (
              <div
                key={t.label}
                className="glass-card rounded-2xl p-4 text-center"
              >
                <p className={
                  'font-display text-2xl font-light ' + t.color
                }>
                  {t.val}
                </p>
                <p className="text-white/35 text-xs mt-1">
                  {t.label}
                </p>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  )
}


/*
useState → dynamic values
useEffect → timer logic
useRef → persistent values
setInterval → countdown
% → looping phases
motion.div → animation
AnimatePresence → smooth transitions
 */