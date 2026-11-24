import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Minus, Plus } from "lucide-react";

const faqs = [
  {
    question: "What is Serenity?",
    answer:
      "Serenity is your personal space for everyday mindfulness and mood reflection. You can record how you're feeling, try a guided breathing exercise, and look back at your mood patterns over time.",
  },
  {
    question: "Do I need an account to use Serenity?",
    answer:
      "You can try the breathing exercise on the homepage without signing in. To save mood check-ins and explore your mood history and insights, create an account and sign in.",
  },
  {
    question: "How does mood tracking work?",
    answer:
      "Choose the mood that best describes how you're feeling and optionally add a personal note. Your entry is saved to your account so you can reflect on it later.",
  },
  {
    question: "Can I review my past mood check-ins?",
    answer:
      "Yes. Sign in to explore your mood history and analytics, including your recorded moods, activity, and patterns over time.",
  },
  {
    question: "Are my mood entries private?",
    answer:
      "Your mood entries are associated with your account, and the app requires authentication to access your mood history and insights. Avoid including highly sensitive information in journal notes.",
  },
  {
    question: "Is Serenity a medical or therapy service?",
    answer:
      "No. Serenity is an everyday wellness and mindfulness tool. It does not provide medical advice, diagnosis, or treatment, and it is not a replacement for professional mental health care.",
  },
  {
    question: "Can I use Serenity on my phone?",
    answer:
      "Yes. Serenity is a web application designed to work in modern mobile and desktop browsers. There is currently no separate Android or iOS app to download.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  function toggleItem(index) {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  }

  return (
    <section id="faq" ref={ref} className="scroll-mt-24 px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.65 }}
          className="mb-14 text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-widest text-aurora/60">
            A FEW THINGS TO KNOW
          </p>
          <h2 className="font-display text-5xl font-light leading-tight text-white md:text-6xl">
            Questions? <span className="italic gradient-text">We're here to help.</span>
          </h2>
          <p className="mt-5 text-base text-white/45">
            A little clarity can make it easier to get started. Here are some
            things you might want to know about Serenity.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`border-b transition-colors duration-300 ${isOpen ? "border-aurora/20" : "border-white/8"}`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className={`pr-3 text-base font-medium transition-colors ${isOpen ? "text-white" : "text-white/70 group-hover:text-white"}`}>
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all ${isOpen ? "border-aurora/30 bg-aurora/10" : "border-white/10 glass-card group-hover:border-white/25"}`}
                      aria-hidden="true"
                    >
                      {isOpen ? (
                        <Minus size={14} className="text-aurora" />
                      ) : (
                        <Plus size={14} className="text-white/50 group-hover:text-white" />
                      )}
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={answerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-sm leading-relaxed text-white/50">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
