// CTA Banner component - A call-to-action section encouraging users to download the app, 
// with animated phone mockups and trust badges.
// Ex: ""Download the app" , "Start free" ,"Chat with us"" .....

import { useRef } from 'react'  // useRef: To track DOM elements for animations and interactions
import { motion, useInView } from 'framer-motion' // motion: To create animated components, useInView: To trigger animations when elements enter the viewport

// Array of trust badges to display below the CTA buttons
const trustBadges = [
  'No credit card needed',
  '3 months free',
  'Cancel anytime',
]

// Animation Variants for Framer Motion - Define how elements should animate when they become visible
const fadeUp = {                 // moves up and fades in(visible)
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const fadeLeft = {               // moves left and fades in(visible)
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
}

const fadeRight = {             // moves right and fades in(visible)
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
}

// Apple icon component - SVG for Apple logo used in the App Store button
function AppleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-7 h-7 fill-white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

// Google Play icon component - SVG for Play logo used in the App Store button
function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-7 h-7 fill-white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.18 23.76c.3.16.63.24.97.24.48 0 .96-.14 1.38-.4l13.45-7.54-3.1-3.1-12.7 10.8zM.87 1.6C.34 2.05 0 2.78 0 3.7v16.6c0 .92.34 1.65.87 2.1L1 22.5 12.5 11 1 .5.87 1.6zM20.13 9.36L16.8 7.5 13.37 11l3.43 3.43 3.36-1.88c.96-.54.96-1.64-.03-2.19zM4.53.4L17.98 7.94l-3.1 3.1L2.08.14C2.5-.12 3.06-.1 3.54.16L4.53.4z" />
    </svg>
  )
}

// PhoneMockup component - A stylized phone frame used to showcase app screenshots in the CTA banner
function PhoneMockup({ className, screenContent }) {
  return (
    <div
      className={
        'relative rounded-3xl border border-white/10 overflow-hidden flex flex-col ' +
        className
      }
      style={{ background: 'rgba(13, 18, 37, 0.9)' }}
    >
      <div
        className="h-6 flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(255,255,255,0.03)' }}
      >
        <div className="w-12 h-1 rounded-full bg-white/10" />
      </div>

      <div className="flex-1 p-3 flex flex-col gap-2 overflow-hidden">
        {screenContent}
      </div>
    </div>
  )
}

// Main CTA Banner component - Combines all elements to create the call-to-action section
export default function CTABanner() {
    // When section enters screen → Trigger animation
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="cta" ref={ref} className="py-28 px-6 relative overflow-hidden">

      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(78, 205, 196, 0.06)' }}
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(247, 201, 72, 0.05)' }}
      />

      <div className="max-w-6xl mx-auto relative">
        <div
          className="rounded-3xl border border-white/8 relative overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(12px)',
          }}
        >

          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(78,205,196,0.05) 0%, transparent 50%, rgba(247,201,72,0.04) 100%)',
            }}
          />

          <div className="grid lg:grid-cols-2 gap-16 items-center p-12 md:p-20 relative z-10">

            <motion.div
              variants={fadeLeft}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ duration: 0.7 }}
            >
              <p className="text-aurora/60 text-sm tracking-widest uppercase mb-4">
                Get started free
              </p>

              <h2 className="font-display text-5xl md:text-6xl font-light text-white leading-tight mb-6">
                Your calm is one{' '}
                <span className="italic gradient-text">breath away.</span>
              </h2>

              <p className="text-white/45 text-base leading-relaxed mb-10 max-w-md">
                Start your free journey today. No credit card required. No pressure. Just open the app, breathe, and feel the difference from session one.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">

                <a
                  href="#"
                  className="flex items-center gap-4 glass-card border border-white/15 hover:border-aurora/30 rounded-2xl px-6 py-4 transition-all duration-300 group"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <AppleIcon />
                  <div>
                    <p className="text-white/40 text-xs leading-none mb-0.5">
                      Download on the
                    </p>
                    <p className="text-white text-base font-semibold leading-none group-hover:text-aurora transition-colors duration-200">
                      App Store
                    </p>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-4 glass-card border border-white/15 hover:border-aurora/30 rounded-2xl px-6 py-4 transition-all duration-300 group"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <PlayIcon />
                  <div>
                    <p className="text-white/40 text-xs leading-none mb-0.5">
                      Get it on
                    </p>
                    <p className="text-white text-base font-semibold leading-none group-hover:text-aurora transition-colors duration-200">
                      Google Play
                    </p>
                  </div>
                </a>

              </div>

              <div className="flex flex-wrap items-center gap-5">
                {trustBadges.map((badge) => (
                  <div key={badge} className="flex items-center gap-2">
                    <span className="text-aurora/60 text-sm">✦</span>
                    <span className="text-white/30 text-xs">{badge}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:flex items-end justify-center gap-4 h-80"
            >
{/* first phone mockup: meditation screen */}
              <PhoneMockup
                className="float-1 w-32 h-56"
                screenContent={
                  <img
                    src="/images/app-screen-1.png"
                    alt="Meditation Session Screen"
                    className="w-full h-full object-cover rounded-xl"
                  />
                }
              />
{/* second phone mockup: main app interface */}
              <PhoneMockup
                className="float-2 w-36 h-64"
                screenContent={
                  <img
                    src="/images/app-screen-2.png"
                    alt="App Dashboard"
                    className="w-full h-full object-cover rounded-xl"
                  />
                }
              />
{/* third phone mockup: notifications screen */}
              <PhoneMockup
                className="float-3 w-32 h-52"
                screenContent={
                  <img
                    src="/images/app-screen-3.png"
                    alt="Notifications & Progress"
                    className="w-full h-full object-cover rounded-xl"
                  />
                }
              />

            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}