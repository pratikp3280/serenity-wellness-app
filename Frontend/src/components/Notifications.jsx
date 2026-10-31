// Notifications is a React UI component that simulates smart reminders / notifications in a meditation app.

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'


// Notifications Array : A mock dataset representing notifications.
// Each notification has an emoji, title, subtitle, time, highlight status, animation delay, and offset for staggered appearance.
const notifications = [
  {
    emoji: '🌅',
    title: 'Good morning. Start calm.',
    sub: 'Your 7-minute morning session is ready.',
    time: '7:30 AM',
    highlight: false,
    delay: 0.2,
    offset: '0px',
  },
  {
    emoji: '✨',
    title: 'You have hit a 7-day streak!',
    sub: 'You are blooming. Keep it going.',
    time: 'Just now',
    highlight: true,
    delay: 0.35,
    offset: '24px',
  },
  {
    emoji: '🧘',
    title: 'Time for your evening wind-down.',
    sub: 'Take 5 minutes — you deserve it.',
    time: '8:00 PM',
    highlight: false,
    delay: 0.5,
    offset: '48px',
  },
]

//Features Array : A list of key features of the smart reminders system, Used to render bullet points(a product benefits list)
const features = [
  'Personalized timing based on your daily schedule',
  'Context-aware — knows when you are in a meeting',
  'Mood-matched session suggestions every time',
]

// fadeLeft : slides from left -> right
const fadeLeft = {
  hidden: { opacity: 0, x: -40 },   
  visible: { opacity: 1, x: 0 },   
}
//  fadeUp : slides from bottom -> up
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}


// Notifications Component: it showcases the smart reminders feature of the app, with animated notification cards and a description of the benefits.
export default function Notifications() {
  // 👉 Animations trigger when section is visible 👀
    const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-28 px-6 relative overflow-hidden">

      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(247, 201, 72, 0.04)' }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
{/* LEFT SIDE (Features List) */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ duration: 0.7 }}
          >
            <p className="text-aurora/60 text-sm tracking-widest uppercase mb-4">
              Smart reminders
            </p>

            <h2 className="font-display text-5xl md:text-6xl font-light text-white leading-tight mb-6">
              We remind you{' '}
              <span className="italic gradient-text">to breathe</span>
            </h2>

            <p className="text-white/45 text-base leading-relaxed mb-8 max-w-md">
              Life gets loud. Serenity sends you soft, mindful nudges — not pressure, just a gentle hand on your shoulder saying hey, take a moment.
            </p>

            <ul className="space-y-4">
              {features.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-aurora/30"
                    style={{ background: 'rgba(78,205,196,0.1)' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-aurora" />
                  </div>
                  <span className="text-white/50 text-sm leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

{/* RIGHT SIDE (Notifications UI) */}
          <div className="relative flex flex-col gap-4">
            {notifications.map((notif) => (
              <motion.div
                key={notif.title}
                initial={{ opacity: 0, x: 60 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: notif.delay }}
                className={
                  'flex items-center gap-4 rounded-2xl p-4 border backdrop-blur-xl transition-all duration-300 ' +
                  (notif.highlight
                    ? 'border-aurora/25'
                    : 'border-white/8')
                }
                style={{
                  marginLeft: notif.offset,
                  background: notif.highlight
                    ? 'rgba(78, 205, 196, 0.06)'
                    : 'rgba(255, 255, 255, 0.04)',
                }}
              >

                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                  style={{
                    background: notif.highlight
                      ? 'rgba(78, 205, 196, 0.15)'
                      : 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  {notif.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium leading-snug">
                    {notif.title}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5 truncate">
                    {notif.sub}
                  </p>
                </div>

                <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
                  <span className="text-white/30 text-xs">
                    {notif.time}
                  </span>
                  {notif.highlight && (
                    <div className="w-2 h-2 rounded-full bg-aurora" />
                  )}
                </div>

              </motion.div>
            ))}

            <div className="absolute -z-10 inset-0 -m-6 rounded-3xl border border-white/3" />
          </div>

        </div>
      </div>
    </section>
  )
}


/* 
Notifications Component
│
├── Data (notifications[])
├── Features list (features[])
├── Animation (framer-motion)
└── UI rendering (left text + right cards) */