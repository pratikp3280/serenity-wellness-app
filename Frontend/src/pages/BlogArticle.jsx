
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, BookOpen } from "lucide-react";
import { blogPosts } from "../data/blogPosts";

export default function BlogArticle() {
  const { slug } = useParams();

  const post = blogPosts.find((article) => article.slug === slug);

  // Invalid article URL
  if (!post) {
    return <Navigate to="/blogs" replace />;
  }

  return (
    <article className="max-w-4xl mx-auto space-y-8">

      {/* Back to Articles */}
      <Link
        to="/blogs"
        className="inline-flex items-center gap-2
          text-sm text-gray-400 hover:text-[#4ECDC4]
          transition-colors"
      >
        <ArrowLeft size={16} />
        Back to all articles
      </Link>

      {/* Article Header */}
      <header>
        <div className="flex items-center gap-3 mb-5">
          <span className="rounded-full bg-[#4ECDC4]/10
            px-3 py-1.5 text-xs font-semibold
            tracking-widest text-[#4ECDC4]"
          >
            {post.tag}
          </span>

          <span className="flex items-center gap-2
            text-xs text-gray-500"
          >
            <Clock size={14} />
            {post.readTime}
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl
          text-white leading-tight"
        >
          {post.title}
        </h1>

        <p className="mt-5 text-lg text-gray-400 leading-relaxed">
          {post.excerpt}
        </p>
      </header>

      {/* Article Cover Image */}
      <div className="overflow-hidden rounded-3xl
        border border-white/10"
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full max-h-[460px] object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="space-y-9">
        {post.content.map((section, index) => (
          <section key={index} className="space-y-4">

            <h2 className="font-display text-2xl sm:text-3xl
              text-white"
            >
              {section.heading}
            </h2>

            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <p
                key={paragraphIndex}
                className="text-gray-300 text-base
                  leading-8"
              >
                {paragraph}
              </p>
            ))}

          </section>
        ))}
      </div>

      {/* Closing Section */}
      <section className="rounded-2xl border border-[#4ECDC4]/15
        bg-[#4ECDC4]/[0.04] p-6 sm:p-8"
      >
        <div className="flex items-center gap-2 text-[#4ECDC4]">
          <BookOpen size={19} />
          <span className="text-xs uppercase tracking-widest">
            A thought from Serenity
          </span>
        </div>

        <h2 className="font-display text-2xl text-white mt-4">
          Small moments of awareness can make room for meaningful reflection.
        </h2>

        <p className="mt-3 text-sm text-gray-400 leading-relaxed">
          Take what feels useful from this article and move at your own pace.
          Your wellbeing journey is personal.
        </p>

        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 mt-6
            text-sm font-medium text-[#4ECDC4]
            hover:text-white transition-colors"
        >
          Explore more articles
          <ArrowLeft size={15} className="rotate-180" />
        </Link>
      </section>

      {/* Educational Disclaimer */}
      <p className="border-t border-white/10 pt-5
        text-xs text-gray-500 leading-relaxed"
      >
        The articles in Serenity Journal are for general educational
        and informational purposes. They are not medical advice,
        diagnosis or treatment.
      </p>

    </article>
  );
}
