
import { Link } from "react-router-dom";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { blogPosts } from "../data/blogPosts";

export default function Blogs() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* Page Heading */}
      <section>
        <div className="flex items-center gap-3 text-[#4ECDC4] mb-3">
          <BookOpen size={21} />
          <span className="text-xs uppercase tracking-[0.2em]">
            Serenity Journal
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl text-white">
          Explore the{" "}
          <span className="italic text-[#4ECDC4]">Journal.</span>
        </h1>

        <p className="mt-4 max-w-2xl text-gray-400 leading-relaxed">
          Thoughtful reads on mindfulness, emotional awareness,
          breathing and everyday wellbeing.
        </p>
      </section>

      {/* Article List */}
      <section className="space-y-6">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="group grid grid-cols-1 md:grid-cols-[280px_1fr]
              gap-5 rounded-2xl border border-white/10
              bg-white/[0.03] p-4
              hover:bg-white/[0.05]
              transition-all duration-300"
          >
            {/* Article Image */}
            <div className="overflow-hidden rounded-xl">
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                className="w-full h-52 md:h-full min-h-48 object-cover
                  transition-transform duration-500
                  group-hover:scale-105"
              />
            </div>

            {/* Article Details */}
            <div className="flex flex-col justify-center py-2">

              <span className="text-xs font-semibold tracking-widest
                text-[#4ECDC4] mb-3"
              >
                {post.tag}
              </span>

              <h2 className="font-display text-2xl sm:text-3xl
                text-white leading-snug
                group-hover:text-[#4ECDC4] transition-colors"
              >
                {post.title}
              </h2>

              <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="mt-5 flex flex-wrap items-center
                justify-between gap-4"
              >
                <span className="inline-flex items-center gap-2
                  text-xs text-gray-500"
                >
                  <Clock size={14} />
                  {post.readTime}
                </span>

                <Link
                  to={`/blogs/${post.slug}`}
                  className="inline-flex items-center gap-2
                    text-sm font-medium text-[#4ECDC4]
                    hover:text-white transition-colors"
                >
                  Read Article
                  <ArrowRight size={16} />
                </Link>
              </div>

            </div>
          </article>
        ))}
      </section>

      {/* Closing Note */}
      <section className="rounded-2xl border border-[#4ECDC4]/15
        bg-[#4ECDC4]/[0.04] p-6 sm:p-8"
      >
        <h2 className="font-display text-2xl text-white">
          Take a moment for yourself.
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Every small step towards understanding yourself matters.
        </p>
      </section>

    </div>
  );
}
