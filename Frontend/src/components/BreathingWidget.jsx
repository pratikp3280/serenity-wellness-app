import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Play, Square, RotateCcw } from "lucide-react";

const PHASES = [
  { label: "Breathe in", instruction: "Gently breathe in", duration: 4, scale: 1.2 },
  { label: "Breathe out", instruction: "Slowly breathe out", duration: 6, scale: 0.84 },
];

const TOTAL_CYCLES = 3;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function BreathingWidget() {
  const [status, setStatus] = useState("ready");
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(PHASES[0].duration);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (status !== "running") return undefined;

    const timerId = window.setTimeout(() => {
      if (secondsLeft > 1) {
        setSecondsLeft((seconds) => seconds - 1);
        return;
      }

      if (phaseIndex === 0) {
        setPhaseIndex(1);
        setSecondsLeft(PHASES[1].duration);
        return;
      }

      const nextCycleCount = cyclesCompleted + 1;
      setCyclesCompleted(nextCycleCount);

      if (nextCycleCount >= TOTAL_CYCLES) {
        setStatus("complete");
        setPhaseIndex(0);
        setSecondsLeft(PHASES[0].duration);
      } else {
        setPhaseIndex(0);
        setSecondsLeft(PHASES[0].duration);
      }
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [status, secondsLeft, phaseIndex, cyclesCompleted]);

  const currentPhase = PHASES[phaseIndex];
  const isRunning = status === "running";

  function startSession() {
    setPhaseIndex(0);
    setSecondsLeft(PHASES[0].duration);
    setCyclesCompleted(0);
    setStatus("running");
  }

  function stopSession() {
    setStatus("stopped");
    setPhaseIndex(0);
    setSecondsLeft(PHASES[0].duration);
  }

  let statusMessage = "Ready when you are. Begin with a comfortable breath.";
  if (status === "running") statusMessage = `${currentPhase.instruction}.`;
  if (status === "stopped") statusMessage = "Session stopped. You can begin again whenever you're ready.";
  if (status === "complete") statusMessage = "You've completed three gentle breathing cycles. Take a moment before returning to your day.";

  const animationDuration = prefersReducedMotion ? 0.01 : currentPhase.duration;

  return (
    <section
      id="breathing"
      ref={ref}
      className="scroll-mt-24 relative overflow-hidden px-6 py-28"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="h-[min(600px,90vw)] w-[min(600px,90vw)] rounded-full blur-3xl"
          style={{ background: "rgba(78,205,196,0.035)" }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.65 }}
          className="mb-14 text-center"
        >
          <p className="mb-4 text-sm uppercase tracking-widest text-aurora/60">
            TAKE A MOMENT
          </p>
          <h2 className="font-display text-5xl font-light text-white md:text-6xl">
            Try a quick <span className="italic gradient-text">breath.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/50">
            Follow a gentle visual breathing rhythm. Breathe comfortably, move at
            your own pace, and stop whenever you need.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="flex flex-col items-center gap-9"
        >
          <div
            className="relative flex aspect-square w-[min(72vw,280px)] items-center justify-center"
            aria-hidden="true"
          >
            <motion.div
              className="absolute h-full w-full rounded-full border border-aurora/10"
              animate={{ scale: isRunning ? currentPhase.scale : 1, opacity: isRunning ? 0.13 : 0.07 }}
              transition={{ duration: animationDuration, ease: "easeInOut" }}
              style={{ background: "rgba(78,205,196,0.06)" }}
            />
            <motion.div
              className="absolute h-[72%] w-[72%] rounded-full border border-aurora/20"
              animate={{ scale: isRunning ? currentPhase.scale : 1, opacity: isRunning ? 0.22 : 0.12 }}
              transition={{ duration: animationDuration, ease: "easeInOut" }}
              style={{ background: "rgba(78,205,196,0.08)" }}
            />
            <motion.div
              className="absolute h-[46%] w-[46%] rounded-full border border-aurora/40"
              animate={{ scale: isRunning ? currentPhase.scale : 1, opacity: isRunning ? 0.7 : 0.35 }}
              transition={{ duration: animationDuration, ease: "easeInOut" }}
              style={{ background: "rgba(78,205,196,0.16)" }}
            />
            <div className="relative z-10 text-center">
              <p className="font-display text-xl italic text-white">
                {isRunning ? currentPhase.label : status === "complete" ? "Well done" : "Breathe"}
              </p>
              <p className="mt-1 text-4xl font-light tabular-nums text-aurora">
                {isRunning ? secondsLeft : status === "complete" ? "✓" : ""}
              </p>
            </div>
          </div>

          <div className="max-w-xl text-center">
            <p aria-live="polite" aria-atomic="true" className="min-h-6 text-sm text-white/65">
              {statusMessage}
            </p>
            <p className="mt-3 text-xs tracking-wide text-white/35">
              {cyclesCompleted} of {TOTAL_CYCLES} cycles completed
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            {isRunning ? (
              <button
                type="button"
                onClick={stopSession}
                className="inline-flex items-center gap-3 rounded-full border border-white/20 px-9 py-4 text-base font-medium text-white transition-colors hover:border-white/40"
              >
                <Square size={15} className="fill-current" aria-hidden="true" />
                Stop Session
              </button>
            ) : (
              <button
                type="button"
                onClick={startSession}
                className="btn-aurora inline-flex items-center gap-3 rounded-full px-9 py-4 text-base font-medium"
              >
                {status === "complete" ? (
                  <RotateCcw size={17} aria-hidden="true" />
                ) : (
                  <Play size={17} className="fill-current" aria-hidden="true" />
                )}
                {status === "complete" ? "Try Again" : status === "stopped" ? "Begin Again" : "Begin Breathing"}
              </button>
            )}
          </div>

          <div className="grid w-full max-w-sm grid-cols-2 gap-4">
            {[
              { label: "Inhale", value: "4 sec", color: "text-aurora" },
              { label: "Exhale", value: "6 sec", color: "text-gold" },
            ].map((phase) => (
              <div key={phase.label} className="glass-card rounded-2xl p-4 text-center">
                <p className={`font-display text-2xl font-light ${phase.color}`}>
                  {phase.value}
                </p>
                <p className="mt-1 text-xs text-white/40">{phase.label}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/30">3 cycles · about 30 seconds · no account needed</p>
        </motion.div>
      </div>
    </section>
  );
}
