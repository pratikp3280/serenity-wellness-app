
// Blog.jsx
// Displays 1 featured blog post and 2 side blog posts.
// Clicking any article or "All articles" takes the visitor to Login.

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// Blog data
const posts = [
  {
    id: 1,
    tag: 'SCIENCE',
    tagColor: 'bg-aurora/20 text-aurora',
    title: 'The Science of 4-7-8 Breathing',
    excerpt:
      'How a simple breathing pattern activates your vagus nerve and switches off the stress response in under 60 seconds. Backed by peer-reviewed research.',
    image:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
    readTime: '5 min read',
    featured: true,
  },
  {
    id: 2,
    tag: 'WELLNESS',
    tagColor: 'bg-gold/20 text-gold',
    title: 'Why 5 Minutes of Meditation Changes Everything',
    excerpt:
      'New neuroscience reveals how even micro-sessions reshape your brain default mode network over time.',
    image:
      'https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=600&q=80',
    readTime: '4 min read',
    featured: false,
  },
  {
    id: 3,
    tag: 'SLEEP',
    tagColor: 'bg-indigo-400/20 text-indigo-300',
    title: 'How Sleep and Stress Are Connected',
    excerpt:
      'Breaking the cycle between poor sleep and cortisol spikes — and what you can do about it tonight.',
    image:
      'https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=600&q=80',
    readTime: '6 min read',
    featured: false,
  },
]

// Animation: bottom to top
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

// Animation: right to left
const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
}

// First post is the featured post
const featured = posts[0]

// Remaining posts appear in the side list
const sidePosts = posts.slice(1)

// Main Blog component
export default function Blog() {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '-80px',
  })

  // useNavigate must be called inside the component
  const navigate = useNavigate()

  // Navigate visitors to Login
  const goToLogin = () => {
    navigate('/login')
  }

  // Support Enter and Space keys for keyboard accessibility
  const handleCardKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      goToLogin()
    }
  }

  return (
    <section id="blog" ref={ref} className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">

        {/* Section Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14 gap-4"
        >
          <div>
            <p className="text-aurora/60 text-sm tracking-widest uppercase mb-3">
              Journal
            </p>

            <h2 className="font-display text-5xl md:text-6xl font-light text-white leading-tight">
              The Serenity{' '}
              <span className="italic gradient-text">Journal</span>
            </h2>
          </div>

          {/* All Articles Button */}
          <button
            type="button"
            onClick={goToLogin}
            className="btn-ghost px-6 py-3 rounded-full text-sm inline-flex items-center gap-2 flex-shrink-0"
          >
            All articles
            <ArrowRight size={14} />
          </button>
        </motion.div>

        {/* Blog Cards */}
        <div className="grid lg:grid-cols-5 gap-6">

          {/* Featured Post */}
          <motion.article
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3 group cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-aurora rounded-3xl"
            role="link"
            aria-label={`Read article: ${featured.title}`}
            tabIndex={0}
            onClick={goToLogin}
            onKeyDown={handleCardKeyDown}
          >
            <div
              className="relative overflow-hidden rounded-3xl mb-6"
              style={{ aspectRatio: '4/3' }}
            >
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(10,14,26,0.85) 0%, rgba(10,14,26,0.2) 50%, transparent 100%)',
                }}
              />

              <div className="absolute top-5 left-5">
                <span
                  className={
                    'text-xs font-semibold tracking-widest px-3 py-1.5 rounded-full ' +
                    featured.tagColor
                  }
                >
                  {featured.tag}
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="font-display text-2xl md:text-3xl text-white font-medium leading-tight group-hover:text-aurora transition-colors duration-300">
                  {featured.title}
                </h3>
              </div>
            </div>

            <p className="text-white/50 text-sm leading-relaxed mb-4">
              {featured.excerpt}
            </p>

            <div className="flex items-center gap-3">
              <Clock size={13} className="text-white/30" />

              <span className="text-white/30 text-xs">
                {featured.readTime}
              </span>

              <span className="text-white/10 text-xs">·</span>

              <span className="text-aurora text-xs inline-flex items-center gap-1 group-hover:underline">
                Read article
                <ArrowRight size={11} />
              </span>
            </div>
          </motion.article>

          {/* Side Posts */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {sidePosts.map((post, i) => (
              <motion.article
                key={post.id}
                variants={fadeRight}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.15,
                }}
                className="group cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-aurora rounded-2xl"
                role="link"
                aria-label={`Read article: ${post.title}`}
                tabIndex={0}
                onClick={goToLogin}
                onKeyDown={handleCardKeyDown}
              >
                <div
                  className="relative overflow-hidden rounded-2xl mb-4"
                  style={{ aspectRatio: '16/9' }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(10,14,26,0.6) 0%, transparent 60%)',
                    }}
                  />

                  <div className="absolute top-3 left-3">
                    <span
                      className={
                        'text-xs font-semibold tracking-widest px-2.5 py-1 rounded-full ' +
                        post.tagColor
                      }
                    >
                      {post.tag}
                    </span>
                  </div>
                </div>

                <h3 className="font-display text-xl text-white font-medium mb-2 leading-snug group-hover:text-aurora transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-white/40 text-xs leading-relaxed mb-3 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-2">
                  <Clock size={12} className="text-white/25" />

                  <span className="text-white/25 text-xs">
                    {post.readTime}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
