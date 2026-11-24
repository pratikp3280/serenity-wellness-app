import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Wind, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Heart,
    title: "Check In With Yourself",
    description:
      "Start by choosing how you're feeling. Add an optional journal note to capture your thoughts and create a personal record of your mood.",
    color: "text-aurora",
    iconBackground: "bg-aurora/10",
    iconBorder: "border-aurora/20",
  },
  {
    number: "02",
    icon: Wind,
    title: "Take a Mindful Pause",
    description:
      "Give yourself a moment to slow down. Follow the breathing guide, find a comfortable rhythm, and reconnect with the present moment.",
    color: "text-gold",
    iconBackground: "bg-gold/10",
    iconBorder: "border-gold/20",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Reflect on Your Journey",
    description:
      "Return to your mood history and explore your personal insights. Notice your activity, mood distribution, and patterns over time.",
    color: "text-purple-300",
    iconBackground: "bg-purple-400/10",
    iconBorder: "border-purple-300/20",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="scroll-mt-24 relative overflow-hidden px-6 py-28"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="h-96 w-96 rounded-full blur-3xl"
          style={{ background: "rgba(78,205,196,0.045)" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.65 }}
          className="mx-auto mb-20 max-w-2xl text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-widest text-aurora/60">
            HOW SERENITY WORKS
          </p>
          <h2 className="font-display text-5xl font-light text-white md:text-6xl">
            A little awareness <span className="italic gradient-text">goes a long way.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/45">
            Build a gentle routine around checking in with yourself, taking a
            mindful pause, and understanding your emotional journey.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:block" />
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.number}
                  variants={fadeUp}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ duration: 0.55, delay: index * 0.13 }}
                  className="flex flex-col items-center text-center md:items-start md:text-left"
                >
                  <div className="relative mb-7">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border ${step.iconBackground} ${step.iconBorder}`}>
                      <Icon size={27} className={step.color} aria-hidden="true" />
                    </div>
                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-midnight text-xs font-semibold text-white/55">
                      {index + 1}
                    </span>
                  </div>

                  <p className={`mb-3 text-xs font-semibold tracking-widest ${step.color}`}>
                    STEP {step.number}
                  </p>
                  <h3 className="mb-4 font-display text-2xl font-medium text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/50">
                    {step.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href="#breathing"
            className="btn-ghost inline-flex items-center rounded-full px-8 py-3.5 text-sm"
          >
            Try a Breathing Exercise
          </a>
        </motion.div>
      </div>
    </section>
  );
}
