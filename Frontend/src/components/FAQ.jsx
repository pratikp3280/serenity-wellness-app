// FAQ.jsx : UI section/component that shows:
// Frequently Asked Questions (FAQs) about the app, its features, pricing, etc.

import { useState, useRef } from 'react'            // useState: to track which FAQ item is open, useRef: to reference the FAQ section for animation
import { motion, AnimatePresence, useInView } from 'framer-motion' // motion: to animate the FAQ items, AnimatePresence: to handle exit animations when collapsing an FAQ item, useInView: to trigger animations when the FAQ section scrolls into view
import { Plus, Minus } from 'lucide-react'         // ➕ and ➖ icons from the lucide-react library to indicate whether an FAQ item is expanded or collapsed

// FAQ Data: An array of objects where each object represents a frequently asked question (FAQ) and its corresponding answer. 
// Each object has two properties: 'q' for the question and 'a' for the answer. 
const faqs = [
  {
    q: 'Is Serenity free to use?',
    a: 'Serenity offers a full-featured free plan with 10 guided sessions, the breathing widget, and basic streak tracking. Serenity Premium unlocks all 40 programs, personalized plans, advanced insights, and priority support starting at just 6.99 per month.',
  },
  {
    q: 'Do I need any meditation experience?',
    a: 'Not at all. Serenity is built for real people, not monks. Our beginner programs start at 3 minutes and guide you every step of the way with voice instructions, visual cues, and breathing prompts. If you can breathe, you can use Serenity.',
  },
  {
    q: 'How long should I meditate each day?',
    a: 'Even 3 to 5 minutes of consistent practice makes a measurable difference. Serenity offers sessions from 3 minutes to 30 minutes. We recommend starting small with one session a day and building naturally from there. Consistency always beats duration.',
  },
  {
    q: 'Can I use Serenity on multiple devices?',
    a: 'Yes. Your Serenity account syncs in real time across iOS, Android, iPad, and web. Your streaks, programs, favourite sessions, and insights follow you everywhere. Log in on any device and pick up exactly where you left off.',
  },
  {
    q: 'How do I cancel my subscription?',
    a: 'Cancel anytime from your account settings with one tap — no hidden steps, no dark patterns, no guilt trips. Your Premium access continues until the end of your current billing period. We will even send you a personal progress summary before you go.',
  },
  {
    q: 'What makes Serenity different from other apps?',
    a: 'Three things: science, personalization, and design. Every session is grounded in peer-reviewed research. The app learns your patterns and evolves with you over time. And we obsess over the experience so that opening Serenity always feels like a relief, never another chore.',
  },
]

// reusable Animation Config: elements fade in move from bottom to top
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

// FAQItem Component: it represents a single FAQ item with its question and answer. 
// It takes in props for the FAQ data, its index, the currently open index, and a toggle function to handle opening and closing the FAQ item. 
function FAQItem({ faq, index, openIndex, onToggle }) {
  const isOpen = openIndex === index

  return (
    // Animated Container
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={
        'border-b transition-colors duration-300 ' +
        (isOpen ? 'border-aurora/20' : 'border-white/8')
      }
    >

      <button
    // //When clicked: -> calls onToggle() -> send index -> updates openIndex in parent FAQ component -> (updtes)determines which FAQ item is open
        onClick={() => onToggle(index)}  
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className={
          'text-base font-medium transition-colors duration-300 pr-6 ' +
          (isOpen ? 'text-white' : 'text-white/70 group-hover:text-white')
        }>
          {faq.q}
        </span>

        <div className={
          'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ' +
          (isOpen
            ? 'border border-aurora/30'
            : 'glass-card border border-white/10 group-hover:border-white/25')
        }
          style={isOpen ? { background: 'rgba(78,205,196,0.15)' } : {}}
        >
          {isOpen            
            ? <Minus size={14} className="text-aurora" />
            : <Plus size={14} className="text-white/50 group-hover:text-white" />
          }
        </div>
      </button>

      <AnimatePresence>
        {/* Conditional Rendering(Only render answer when open) + Animation */}
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-white/45 text-sm leading-relaxed pb-6 max-w-2xl">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}

// FAQ Component: it renders the entire FAQ section, including the heading, the list of FAQ items, and a call-to-action at the bottom.
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

//   Toggle Logic: 
/*If clicked item is already open:
    → close it
Else:
    → open it */
  function handleToggle(index) {
    if (openIndex === index) {
      setOpenIndex(null)
    } else {
      setOpenIndex(index)
    }
  }

  return (
    <section id="faq" ref={ref} className="py-28 px-6">
      <div className="max-w-3xl mx-auto">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-aurora/60 text-sm tracking-widest uppercase mb-4">
            Got questions?
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-white leading-tight">
            Frequently{' '}
            <span className="italic gradient-text">asked</span>
          </h2>
          <p className="text-white/40 text-base mt-5">
            Cannot find your answer?{' '}
            <a
              href="#"
              className="text-aurora hover:underline transition-colors duration-200"
            >
              Contact us
            </a>
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
            {/* Rendering List :  */}
          {faqs.map((faq, i) => (
            <FAQItem
              key={faq.q}
              faq={faq}
              index={i}
              openIndex={openIndex}
              onToggle={handleToggle}
            />
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16 glass-card rounded-3xl p-8 border border-white/8"
        >
            {/* Call-to-Action(CTA) : If FAQ doesn’t help → contact option */}
          <p className="text-white/50 text-sm mb-2">
            Still have questions?
          </p>
          <p className="font-display text-2xl text-white font-light mb-6">
            We are here to help
          </p>
          
          <a
            href="#"
            className="btn-aurora px-8 py-3 rounded-full text-sm inline-flex items-center gap-2"
          >
            Chat with us
          </a>
        </motion.div>

      </div>
    </section>
  )
}