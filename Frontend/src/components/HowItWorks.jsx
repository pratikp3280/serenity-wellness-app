import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Gauge, Waves, TrendingUp } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Gauge,
    title: 'Choose Your State',
    desc: 'Start by selecting your current mood — calm, stressed, anxious, or unfocused. Serenity reads where you are and curates the perfect session for this exact moment in your day.',
    accentColor: 'text-aurora',
    iconBg: 'bg-aurora/10',
    iconBorder: 'border-aurora/20',
    numberColor: 'text-aurora/40',
  },
  {
    number: '02',
    icon: Waves,
    title: 'Follow the Guide',
    desc: 'Whether it is a guided meditation, immersive soundscape, or deep breathing session, every experience is crafted by neuroscientists and mindfulness experts for real results.',
    accentColor: 'text-gold',
    iconBg: 'bg-gold/10',
    iconBorder: 'border-gold/20',
    numberColor: 'text-gold/40',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Track Your Growth',
    desc: 'Build a mindfulness habit with streaks, mood tracking, and deep insights that evolve as you do. Your progress feels rewarding and natural, never pressuring or performative.',
    accentColor: 'text-purple-400',
    iconBg: 'bg-purple-400/10',
    iconBorder: 'border-purple-400/20',
    numberColor: 'text-purple-400/40',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" ref={ref} className="py-28 px-6 relative overflow-hidden">

      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: 0.4 }}
      >
        <div
          className="w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'rgba(78, 205, 196, 0.05)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-aurora/60 text-sm tracking-widest uppercase mb-4">
            Simple process
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-white">
            Three steps to{' '}
            <span className="italic gradient-text">peace</span>
          </h2>
          <p className="text-white/40 text-base mt-5 max-w-lg mx-auto leading-relaxed">
            A few mindful moments can change your entire day. Serenity makes starting effortless.
          </p>
        </motion.div>

        <div className="relative">

          <div className="hidden md:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex flex-col items-center md:items-start text-center md:text-left"
              >

                <div className="relative mb-8">
                  <div className={
                    'w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ' +
                    step.iconBg + ' border ' + step.iconBorder
                  }>
                    <step.icon size={28} className={step.accentColor} />
                  </div>

                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-midnight border border-white/10 flex items-center justify-center">
                    <span className="text-white/40 text-xs font-semibold">{i + 1}</span>
                  </div>

                  <span className={
                    'text-xs tracking-widest font-semibold uppercase ' + step.numberColor
                  }>
                    Step {step.number}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-medium text-white mb-4">
                  {step.title}
                </h3>

                <p className="text-white/45 text-sm leading-relaxed">
                  {step.desc}
                </p>

              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-center mt-16"
        >
          <a
            href="#mood"
            className="btn-ghost px-8 py-3.5 rounded-full text-sm inline-flex items-center gap-2"
          >
            Try it now — it is free
          </a>
        </motion.div>

      </div>
    </section>
  )
}