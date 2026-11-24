import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Heart, Wind, TrendingUp } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export default function CoreFeatures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Heart,
      title: "Understand Your Mood",
      description:
        "Take a moment to check in with yourself. Choose how you're feeling and add a personal reflection to your mood entry.",
      action: "Explore Mood Tracking",
      to: isAuthenticated ? "/mood-checkin" : "/register",
      color: "text-aurora",
      iconBackground: "bg-aurora/10",
      border: "border-aurora/20",
    },
    {
      icon: Wind,
      title: "Practise Mindfulness",
      description:
        "Slow down and reconnect with the present moment through a gentle, visually guided breathing exercise.",
      action: "Try Breathing",
      href: "#breathing",
      color: "text-gold",
      iconBackground: "bg-gold/10",
      border: "border-gold/20",
    },
    {
      icon: TrendingUp,
      title: "Notice Your Patterns",
      description:
        "Look back at your mood check-ins and explore your emotional patterns, activity and progress over time.",
      action: "Explore Your Insights",
      to: isAuthenticated ? "/analytics" : "/register",
      color: "text-purple-300",
      iconBackground: "bg-purple-400/10",
      border: "border-purple-300/20",
    },
  ];

  return (
    <section id="features" ref={ref} className="scroll-mt-24 relative overflow-hidden px-6 py-28">
      <div
        className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "rgba(78,205,196,0.04)" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.65 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-widest text-aurora/60">
            WHAT YOU CAN DO
          </p>
          <h2 className="font-display text-5xl font-light text-white md:text-6xl">
            Small steps. <span className="italic gradient-text">More awareness.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/45">
            Simple tools to help you understand how you feel, find a moment of
            calm, and reflect on your wellbeing over time.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const cardClass =
              "group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.025] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-aurora/25 hover:bg-white/[0.04]";
            const action = (
              <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-medium text-aurora/80 transition-colors group-hover:text-aurora">
                {feature.action}
                <ArrowRight size={15} aria-hidden="true" />
              </span>
            );

            return (
              <motion.article
                key={feature.title}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.55, delay: index * 0.12 }}
                className={index === 2 ? "sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-xl lg:col-span-1 lg:max-w-none" : ""}
              >
                {feature.to ? (
                  <Link to={feature.to} className={cardClass}>
                    <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.iconBackground} border ${feature.border}`}>
                      <Icon size={26} className={feature.color} aria-hidden="true" />
                    </div>
                    <h3 className="mb-3 font-display text-2xl font-medium text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/50">
                      {feature.description}
                    </p>
                    {action}
                  </Link>
                ) : (
                  <a href={feature.href} className={cardClass}>
                    <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.iconBackground} border ${feature.border}`}>
                      <Icon size={26} className={feature.color} aria-hidden="true" />
                    </div>
                    <h3 className="mb-3 font-display text-2xl font-medium text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/50">
                      {feature.description}
                    </p>
                    {action}
                  </a>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
