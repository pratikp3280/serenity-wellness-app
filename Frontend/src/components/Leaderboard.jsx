// Leaderboard is a UI component that displays a ranked list of users based on activity (streaks, sessions, badges).

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, Flame } from 'lucide-react'


// A mock dataset (fake users) Each object: with user info: rank, name, avatar URL, streak, sessions, badge emoji, badge label, badge color class
const users = [
  {
    rank: 1,
    name: 'Priya Sharma',
    avatar: 'https://i.pravatar.cc/60?img=47',
    streak: 62,
    sessions: 118,
    badge: '🧘',
    badgeLabel: 'Master',
    badgeColor: 'text-aurora',
  },
  {
    rank: 2,
    name: 'Marcus Reid',
    avatar: 'https://i.pravatar.cc/60?img=12',
    streak: 48,
    sessions: 94,
    badge: '🌸',
    badgeLabel: 'Blooming',
    badgeColor: 'text-pink-400',
  },
  {
    rank: 3,
    name: 'Aiko Tanaka',
    avatar: 'https://i.pravatar.cc/60?img=44',
    streak: 35,
    sessions: 71,
    badge: '🌸',
    badgeLabel: 'Blooming',
    badgeColor: 'text-pink-400',
  },
  {
    rank: 4,
    name: 'Lena Fischer',
    avatar: 'https://i.pravatar.cc/60?img=25',
    streak: 17,
    sessions: 42,
    badge: '🌿',
    badgeLabel: 'Growing',
    badgeColor: 'text-emerald-400',
  },
  {
    rank: 5,
    name: 'Kwame Asante',
    avatar: 'https://i.pravatar.cc/60?img=15',
    streak: 11,
    sessions: 29,
    badge: '🌿',
    badgeLabel: 'Growing',
    badgeColor: 'text-emerald-400',
  },
  {
    rank: 6,
    name: 'Sofia Vega',
    avatar: 'https://i.pravatar.cc/60?img=38',
    streak: 5,
    sessions: 12,
    badge: '🌱',
    badgeLabel: 'Seedling',
    badgeColor: 'text-green-400',
  },
]

const rankTrophyColor = {
  1: 'text-gold',
  2: 'text-slate-300',
  3: 'text-amber-600',
}

// animation variants for fade-up effect when the leaderboard section comes into view on scroll. Initially hidden (opacity 0, y offset 40), becomes visible (opacity 1, y 0) when in view.
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

// function component that renders the leaderboard section. It uses a ref to track when the section is in view and applies fade-up animations to the heading and user list items.
//  The users are displayed in a grid with their rank, avatar, name, streak, sessions, and badge information. The top 3 ranks have trophy icons with different colors.
//  At the bottom, there is a legend explaining the badge levels based on streak ranges.
export default function Leaderboard() {
//👉 Animate only when visible 👀
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="community" ref={ref} className="py-28 px-6">
      <div className="max-w-4xl mx-auto">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-aurora/60 text-sm tracking-widest uppercase mb-4">
            Community
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-white leading-tight">
            You are not alone{' '}
            <span className="italic gradient-text">in this</span>
          </h2>
          <p className="text-white/40 text-base mt-5 max-w-md mx-auto leading-relaxed">
            Thousands are on this journey with you. Build streaks, earn badges, and grow together.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass-card rounded-3xl overflow-hidden"
        >
{/* Table Layout (Using CSS GRID SYSTEM) - | # | User | Streak | Sessions | Badge | */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5">
            <div className="col-span-1">
              <span className="text-white/30 text-xs font-medium uppercase tracking-wide">
                #
              </span>
            </div>
            <div className="col-span-5">
              <span className="text-white/30 text-xs font-medium uppercase tracking-wide">
                User
              </span>
            </div>
            <div className="col-span-2 hidden sm:block">
              <span className="text-white/30 text-xs font-medium uppercase tracking-wide">
                Streak
              </span>
            </div>
            <div className="col-span-2 hidden sm:block">
              <span className="text-white/30 text-xs font-medium uppercase tracking-wide">
                Sessions
              </span>
            </div>
            <div className="col-span-4 sm:col-span-2">
              <span className="text-white/30 text-xs font-medium uppercase tracking-wide">
                Badge
              </span>
            </div>
          </div>
{/* Dynamic Rendering - 1- 3 (🏆 icon)Trophies, 4-6 Badges  and also 👉 Rank 1 gets special background 👑*/}
          {users.map((user, i) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className={
                'grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-white/5 transition-colors duration-200 hover:bg-white/3 ' +
                (user.rank === 1 ? 'bg-gold/15' : '')    
              }
            >

              <div className="col-span-1 flex items-center">
                {user.rank <= 3 ? (
                  <Trophy
                    size={16}
                    className={rankTrophyColor[user.rank]}
                  />
                ) : (
                  <span className="text-white/30 text-sm">
                    {user.rank}
                  </span>
                )}
              </div>

              <div className="col-span-5 flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover border border-white/10 flex-shrink-0"
                />
                <span className="text-white text-sm font-medium truncate">
                  {user.name}
                </span>
              </div>

              <div className="col-span-2 hidden sm:flex items-center gap-1.5">
                <Flame size={13} className="text-orange-400" />
                <span className="text-white/70 text-sm">
                  {user.streak}d
                </span>
              </div>

              <div className="col-span-2 hidden sm:block">
                <span className="text-white/70 text-sm">
                  {user.sessions}
                </span>
              </div>

              <div className="col-span-4 sm:col-span-2 flex items-center gap-1.5">
                <span className="text-base">{user.badge}</span>
                <span className={
                  'text-xs hidden sm:block ' + user.badgeColor
                }>
                  {user.badgeLabel}
                </span>
              </div>

            </motion.div>
          ))}

          <div className="px-6 py-5 text-center">
            <p className="text-white/30 text-sm">
              Join{' '}
              <span className="text-aurora">50,000+</span>
              {' '}people building a calmer life
            </p>
          </div>

        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          {[
            { badge: '🌱', label: 'Seedling', range: '1–7 days' },
            { badge: '🌿', label: 'Growing',  range: '8–20 days' },
            { badge: '🌸', label: 'Blooming', range: '21–50 days' },
            { badge: '🧘', label: 'Master',   range: '50+ days' },
          ].map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-2 glass-card px-4 py-2 rounded-full"
            >
              <span className="text-sm">{b.badge}</span>
              <span className="text-white/50 text-xs">{b.label}</span>
              <span className="text-white/25 text-xs">· {b.range}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}


/* How to Upgrade to Real Users 

 * 1. User signs in (Google/Auth)
2. Store user data in DB
3. Track sessions + streak
4. Fetch leaderboard from DB
5. Replace "users" array
 */