import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, LogIn } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function CTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="cta" ref={ref} className="relative overflow-hidden px-6 py-28">
      <div
        className="pointer-events-none absolute left-1/4 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "rgba(78,205,196,0.06)" }}
      />
      <div
        className="pointer-events-none absolute right-1/4 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "rgba(247,201,72,0.045)" }}
      />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.65 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 p-9 text-center glass-card sm:p-14 md:p-20"
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{ background: "linear-gradient(135deg, rgba(78,205,196,0.06), transparent 55%, rgba(247,201,72,0.04))" }}
          />
          <div className="relative z-10">
            <p className="mb-4 text-sm uppercase tracking-widest text-aurora/60">
              YOUR NEXT MOMENT STARTS HERE
            </p>
            <h2 className="mx-auto max-w-3xl font-display text-5xl font-light leading-tight text-white md:text-6xl">
              Start with <span className="italic gradient-text">one small step.</span>
            </h2>
            <p className="mx-auto mb-9 mt-6 max-w-2xl text-base leading-relaxed text-white/50">
              Your wellbeing journey doesn't need to be complicated. Begin by
              understanding how you feel today.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/register"
                className="btn-aurora inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium"
              >
                Create Your Account
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link
                to="/login"
                className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium"
              >
                <LogIn size={16} aria-hidden="true" />
                Sign In
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
 