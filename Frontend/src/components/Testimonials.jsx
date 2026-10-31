// Testimonials is a React component that displays user reviews in a scrolling carousel.

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'


// Testimonials Array : Mock data representing user feedback
// each containing the user's name, role, avatar image URL, star rating, and their testimonial quote.

const testimonials = [
  {
    name: 'Priya R.',
    role: 'Software Engineer',
    avatar: 'https://i.pravatar.cc/80?img=47',
    stars: 5,
    quote: 'I used to wake up in a panic every morning. Serenity changed that in two weeks. The body scan sessions are genuinely life changing.',
  },
  {
    name: 'Marcus T.',
    role: 'Graphic Designer',
    avatar: 'https://i.pravatar.cc/80?img=12',
    stars: 5,
    quote: 'I have tried six meditation apps. Serenity is the only one that feels like it was made for real people, not productivity robots.',
  },
  {
    name: 'Aiko M.',
    role: 'Nurse, Tokyo',
    avatar: 'https://i.pravatar.cc/80?img=44',
    stars: 5,
    quote: 'Working 12-hour shifts is brutal. The 3-minute emergency calm session saves me every single day without fail.',
  },
  {
    name: 'Lena B.',
    role: 'University Student',
    avatar: 'https://i.pravatar.cc/80?img=25',
    stars: 5,
    quote: 'My anxiety was through the roof during exams. The Focus Flow program helped me finally study without spiraling into overthinking.',
  },
  {
    name: 'Kwame A.',
    role: 'Entrepreneur',
    avatar: 'https://i.pravatar.cc/80?img=15',
    stars: 5,
    quote: 'I sleep better, think clearer, and honestly feel like a different person after 30 days with Serenity. Worth every single penny.',
  },
  {
    name: 'Sofia V.',
    role: 'Therapist',
    avatar: 'https://i.pravatar.cc/80?img=38',
    stars: 5,
    quote: 'As a mental health professional I am picky about these tools. Serenity uses real science and it shows. I recommend it to my clients.',
  },
  {
    name: 'James K.',
    role: 'Stay-at-home Parent',
    avatar: 'https://i.pravatar.cc/80?img=53',
    stars: 5,
    quote: 'Between toddlers and chaos I need 5 minutes of sanity a day. Serenity gives me that every single day without any fuss.',
  },
  {
    name: 'Riya S.',
    role: 'Teacher',
    avatar: 'https://i.pravatar.cc/80?img=29',
    stars: 5,
    quote: 'The leaderboard keeps me accountable. Knowing others are showing up too makes me want to show up for myself every morning.',
  },
]


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}


// StarRating Component : A reusable component that displays stars
function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (             // Renders star icons ⭐
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="#F7C948"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

// TestimonialCard Component: Reusable UI block for each testimonial
// gives a ⭐ Stars, a quote, and a user avatar with their name and role.
function TestimonialCard({ t }) {
  return (
    <div className="glass-card rounded-3xl p-6 flex-shrink-0 w-72 md:w-80 mx-3 flex flex-col gap-4">
      <StarRating count={t.stars} />
      <p className="text-white/65 text-sm leading-relaxed flex-1">
        "{t.quote}"
      </p>
      <div className="flex items-center gap-3">
        <img
          src={t.avatar}
          alt={t.name}
          className="w-10 h-10 rounded-full object-cover border border-white/10 flex-shrink-0"
        />
        <div>
          <p className="text-white text-sm font-medium">{t.name}</p>
          <p className="text-white/35 text-xs">{t.role}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
// Infinite Scroll Trick - Duplicating array to create seamless loop like [A B C D A B C D]
  const doubled = [...testimonials, ...testimonials]

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">

      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(17,24,48,0.3) 50%, transparent 100%)'
        }}
      />

      <div className="max-w-6xl mx-auto px-6 mb-14">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-aurora/60 text-sm tracking-widest uppercase mb-4">
            Reviews
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-white">
            Words from our{' '}
            <span className="italic gradient-text">community</span>
          </h2>
          <p className="text-white/40 text-base mt-5">
            Real people. Real results. No paid actors.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative"
      >

        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #0A0E1A, transparent)'
          }}
        />

        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, #0A0E1A, transparent)'
          }}
        />

        <div className="overflow-hidden">
          <div className="testimonials-track flex w-max">
            {doubled.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>

      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex justify-center mt-12 px-6"
      >
        <div className="glass-card rounded-full px-8 py-4 flex items-center gap-4">
          <StarRating count={5} />
          <span className="text-white text-sm font-medium">
            4.9 / 5
          </span>
          <div className="w-px h-4 bg-white/10" />
          <span className="text-white/30 text-xs">
            from 12,000+ reviews
          </span>
        </div>
      </motion.div>

    </section>
  )
}




/**
 *  Why a Separate StarRating Component?
Instead of copy-pasting 5 star SVGs 8 times inside each card, we made a small reusable component inside the same file:
jsxfunction StarRating({ count }) { ... }
This is used twice — once inside TestimonialCard and once in the aggregate rating pill at the bottom. One definition, two uses. This is the React mindset.
 */




















/*Testimonials Component
│💡
├── Data (testimonials[])
├── Sub-components
│     ├── StarRating
│     └── TestimonialCard
├── Animation (framer-motion)
└── Infinite scroll effect (doubled array)
*/