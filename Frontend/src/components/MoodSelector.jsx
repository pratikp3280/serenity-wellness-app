import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Wind, Headphones, Heart, Zap, Smile, ArrowRight } from 'lucide-react'

const moods = [
  {
    id: 'stressed',
    emoji: '😤',
    label: 'Stressed',
    gradient: 'from-rose-900/40 to-rose-800/20',
    border: 'border-rose-500/30',
    session: '4-7-8 Breathing',
    desc: 'Release tension with this ancient breathing technique. Inhale for 4, hold for 7, exhale for 8 counts.',
    icon: Wind,
    duration: '5 min',
    tag: 'BREATHING',
    tagColor: 'bg-rose-500/20 text-rose-300',
  },
  {
    id: 'tired',
    emoji: '😴',
    label: 'Tired',
    gradient: 'from-indigo-900/40 to-indigo-800/20',
    border: 'border-indigo-500/30',
    session: 'Power Nap Sound',
    desc: 'Immersive soundscape with binaural beats tuned to restore energy and reduce mental fog instantly.',
    icon: Headphones,
    duration: '10 min',
    tag: 'SOUNDSCAPE',
    tagColor: 'bg-indigo-500/20 text-indigo-300',
  },
  {
    id: 'anxious',
    emoji: '😰',
    label: 'Anxious',
    gradient: 'from-amber-900/40 to-amber-800/20',
    border: 'border-amber-500/30',
    session: 'Body Scan',
    desc: 'Ground yourself through a head-to-toe body awareness journey that gently melts anxiety away.',
    icon: Heart,
    duration: '8 min',
    tag: 'MEDITATION',
    tagColor: 'bg-amber-500/20 text-amber-300',
  },
  {
    id: 'unfocused',
    emoji: '😐',
    label: 'Unfocused',
    gradient: 'from-teal-900/40 to-teal-800/20',
    border: 'border-aurora/30',
    session: 'Focus Flow',
    desc: 'Alpha wave music with guided attention training designed to sharpen your mind in minutes.',
    icon: Zap,
    duration: '6 min',
    tag: 'FOCUS',
    tagColor: 'bg-aurora/20 text-aurora',
  },
  {
    id: 'good',
    emoji: '😊',
    label: 'Good',
    gradient: 'from-emerald-900/40 to-emerald-800/20',
    border: 'border-emerald-500/30',
    session: 'Gratitude Session',
    desc: 'Deepen your wellbeing with a guided gratitude practice that expands joy and positivity.',
    icon: Smile,
    duration: '7 min',
    tag: 'GRATITUDE',
    tagColor: 'bg-emerald-500/20 text-emerald-300',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export default function MoodSelector() {
  const [selected, setSelected] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const selectedMood = moods.find((m) => m.id === selected)

  function handleMoodClick(id) {
    if (selected === id) {
      setSelected(null)
    } else {
      setSelected(id)
    }
  }

  return (
    <section id="mood" ref={ref} className="py-28 px-6 relative">
      <div className="max-w-5xl mx-auto">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-aurora/60 text-sm tracking-widest uppercase mb-4">
            Personalized for you
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-white leading-tight">
            How are you feeling{' '}
            <span className="italic gradient-text">right now?</span>
          </h2>
          <p className="text-white/40 text-base mt-4 max-w-md mx-auto">
            Select your mood and we will curate the perfect session for this moment.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12">
          {moods.map((mood, i) => (
            <motion.button
              key={mood.id}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ y: -4 }}
              onClick={() => handleMoodClick(mood.id)}
              className={
                'relative p-5 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-3 cursor-pointer w-full ' +
                (selected === mood.id
                  ? 'bg-gradient-to-b ' + mood.gradient + ' ' + mood.border + ' shadow-xl'
                  : 'glass-card border-white/8 hover:border-white/20')
              }
            >
              <span className="text-3xl">{mood.emoji}</span>
              <span className={
                'text-sm font-medium transition-colors ' +
                (selected === mood.id ? 'text-white' : 'text-white/60')
              }>
                {mood.label}
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

        <AnimatePresence mode="wait">
          {selectedMood && (
            <motion.div
              key={selectedMood.id}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className={
                'glass-card rounded-3xl p-8 border shadow-xl ' + selectedMood.border
              }
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className={
                  'w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ' +
                  selectedMood.gradient + ' border ' + selectedMood.border
                }>
                  <selectedMood.icon size={26} className="text-white" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className={
                      'text-xs font-semibold tracking-widest px-3 py-1 rounded-full ' +
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
                  Start Session
                  <ArrowRight size={15} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!selected && (
          <div className="text-center py-6">
            <p className="text-white/20 text-sm italic">
              Select a mood above to see your personalized session
            </p>
          </div>
        )}

      </div>
    </section>
  )
}
