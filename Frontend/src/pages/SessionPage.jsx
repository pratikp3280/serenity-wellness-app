import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Headphones,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  Wind,
} from "lucide-react";
import { getMoodSession } from "../data/moodSessions";

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

const fieldClassName =
  "w-full rounded-xl border border-white/10 bg-[#0A0E1A]/70 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#4ECDC4]/60 focus:ring-2 focus:ring-[#4ECDC4]/10";

function GuidedBreathing({ session }) {
  const pattern = session.breathingPattern;
  const maxCycles = session.breathingCycles;
  const [isActive, setIsActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(pattern[0].seconds);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const phase = pattern[phaseIndex];

  useEffect(() => {
    if (!isActive) return undefined;

    const timeoutId = window.setTimeout(() => {
      if (secondsLeft > 1) {
        setSecondsLeft((current) => current - 1);
        return;
      }

      const nextIndex = (phaseIndex + 1) % pattern.length;
      const nextCycleCount = nextIndex === 0 ? cyclesCompleted + 1 : cyclesCompleted;

      setPhaseIndex(nextIndex);
      setCyclesCompleted(nextCycleCount);

      if (nextIndex === 0 && nextCycleCount >= maxCycles) {
        setIsActive(false);
        setIsComplete(true);
        setSecondsLeft(0);
        return;
      }

      setSecondsLeft(pattern[nextIndex].seconds);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [isActive, phaseIndex, secondsLeft, cyclesCompleted, pattern, maxCycles]);

  function resetGuide() {
    setIsActive(false);
    setPhaseIndex(0);
    setSecondsLeft(pattern[0].seconds);
    setCyclesCompleted(0);
    setIsComplete(false);
  }

  function toggleGuide() {
    if (isComplete) {
      resetGuide();
      setIsActive(true);
    } else {
      setIsActive((current) => !current);
    }
  }

  const orbScale = phase.label.toLowerCase().includes("in")
    ? 1.12
    : phase.label.toLowerCase().includes("hold")
      ? 1.04
      : 0.9;

  return (
    <div className="rounded-2xl border border-[#4ECDC4]/15 bg-[#071b20]/60 p-5 sm:p-7">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4ECDC4]">
            Guided breathing
          </p>
          <h4 className="mt-1 text-lg font-semibold text-white">{session.id === "stressed" ? "4 · 7 · 8 rhythm" : "Gentle 4 · 6 rhythm"}</h4>
          <p className="mt-1 text-sm text-white/45">Follow the circle only while it feels comfortable.</p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/55">
          <Wind size={13} /> {cyclesCompleted}/{maxCycles} cycles
        </span>
      </div>

      <div className="my-7 flex flex-col items-center">
        <div className="relative flex h-52 w-52 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#4ECDC4]/10" />
          <motion.div
            animate={{ scale: isActive ? orbScale : 0.96, opacity: isActive ? 0.85 : 0.55 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute h-40 w-40 rounded-full border border-[#4ECDC4]/35 bg-gradient-to-br from-[#4ECDC4]/25 to-[#4ECDC4]/5 shadow-[0_0_55px_rgba(78,205,196,0.12)]"
          />
          <div className="relative z-10 text-center">
            <p className="font-display text-2xl italic text-white">{isComplete ? "Well done" : isActive ? phase.label : "Breathe"}</p>
            <p className="mt-1 text-4xl font-light tabular-nums text-[#4ECDC4]">{isComplete ? "✓" : isActive ? secondsLeft : "· · ·"}</p>
          </div>
        </div>
        <p className="mt-3 max-w-sm text-center text-xs leading-relaxed text-white/40">
          {isComplete ? "The guided cycles are complete. Let your breath return to its natural rhythm." : "You can pause, stop or breathe normally at any point."}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={toggleGuide}
          className="inline-flex min-w-36 items-center justify-center gap-2 rounded-full bg-[#4ECDC4] px-5 py-3 text-sm font-semibold text-[#0A0E1A] transition hover:bg-[#72ddd6]"
        >
          {isActive ? <Pause size={16} /> : <Play size={16} />}
          {isActive ? "Pause guide" : isComplete ? "Start again" : "Start guide"}
        </button>
        <button
          type="button"
          onClick={resetGuide}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-white/65 transition hover:border-white/25 hover:text-white"
        >
          <RotateCcw size={15} /> Reset
        </button>
      </div>
      {session.id === "stressed" && (
        <p className="mt-5 rounded-xl border border-amber-300/15 bg-amber-300/[0.06] p-3 text-xs leading-relaxed text-amber-100/75">
          This guide is limited to three cycles. Do not strain to meet the counts or force the breath hold. Stop if you feel dizzy, light-headed or uncomfortable; breathing naturally is always an option.
        </p>
      )}
    </div>
  );
}

function JournalActivity({ session, responses, setResponse }) {
  return (
    <div className="space-y-4">
      {session.prompts.map((prompt, index) => (
        <label key={prompt} className="block rounded-xl border border-white/8 bg-white/[0.025] p-4">
          <span className="mb-2 block text-sm font-medium text-white/80">{prompt}</span>
          <textarea
            rows={2}
            maxLength={500}
            value={responses[`prompt-${index}`] || ""}
            onChange={(event) => setResponse(`prompt-${index}`, event.target.value)}
            placeholder="Write whatever comes to mind…"
            className={fieldClassName + " resize-y"}
          />
        </label>
      ))}
      <p className="text-xs text-white/35">Your reflections stay in this page for now; they are not sent to the Serenity backend.</p>
    </div>
  );
}

function ChecklistActivity({ session, checkedItems, toggleItem }) {
  return (
    <div className="space-y-3">
      {session.tasks.map((task, index) => {
        const checked = Boolean(checkedItems[index]);
        return (
          <button
            key={task.title}
            type="button"
            onClick={() => toggleItem(index)}
            aria-pressed={checked}
            className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition ${checked ? "border-[#4ECDC4]/30 bg-[#4ECDC4]/[0.07]" : "border-white/8 bg-white/[0.025] hover:border-white/20"}`}
          >
            <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${checked ? "border-[#4ECDC4] bg-[#4ECDC4] text-[#0A0E1A]" : "border-white/20 text-transparent"}`}>
              <Check size={14} />
            </span>
            <span className="min-w-0 flex-1">
              <span className={`block text-sm font-semibold ${checked ? "text-[#8ce4dd]" : "text-white/85"}`}>{task.title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-white/45">{task.detail}</span>
            </span>
          </button>
        );
      })}
      <p className="text-xs text-white/35">{Object.values(checkedItems).filter(Boolean).length} of {session.tasks.length} reflections marked complete. Skip anything that does not feel right.</p>
    </div>
  );
}

function SensesActivity({ session, responses, setResponse }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {session.senses.map((sense, index) => (
        <label key={sense.id} className="rounded-xl border border-white/8 bg-white/[0.025] p-4">
          <span className="mb-2 block text-sm font-semibold text-white/80">{index + 1}. {sense.label}</span>
          <input
            type="text"
            maxLength={120}
            value={responses[sense.id] || ""}
            onChange={(event) => setResponse(sense.id, event.target.value)}
            placeholder={sense.placeholder}
            className={fieldClassName}
          />
        </label>
      ))}
      <p className="sm:col-span-3 text-xs text-white/35">You only need to notice what is comfortable and available. There is no right answer.</p>
    </div>
  );
}

function BodyScanActivity({ session, checkedItems, toggleItem }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {session.bodyRegions.map((region, index) => {
        const checked = Boolean(checkedItems[index]);
        return (
          <button
            type="button"
            key={region}
            onClick={() => toggleItem(index)}
            aria-pressed={checked}
            className={`flex items-center gap-3 rounded-xl border p-4 text-left text-sm transition ${checked ? "border-orange-300/30 bg-orange-300/[0.07] text-orange-100" : "border-white/8 bg-white/[0.025] text-white/65 hover:border-white/20"}`}
          >
            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${checked ? "border-orange-200 bg-orange-200 text-[#0A0E1A]" : "border-white/20"}`}>
              {checked && <Check size={14} />}
            </span>
            {region}
          </button>
        );
      })}
      <p className="sm:col-span-2 text-xs leading-relaxed text-white/35">Mark a region only if you have noticed it. You do not need to change or relax any sensation.</p>
    </div>
  );
}

function CompassionActivity({ session, responses, setResponse }) {
  const selectedPhrase = responses.selectedPhrase || session.phrases[0];
  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        {session.phrases.map((phrase) => (
          <button
            type="button"
            key={phrase}
            onClick={() => setResponse("selectedPhrase", phrase)}
            className={`rounded-xl border p-4 text-left text-sm leading-relaxed transition ${selectedPhrase === phrase ? "border-blue-300/30 bg-blue-300/[0.08] text-blue-100" : "border-white/8 bg-white/[0.025] text-white/60 hover:border-white/20"}`}
          >
            {phrase}
          </button>
        ))}
      </div>
      <label className="block rounded-xl border border-white/8 bg-white/[0.025] p-4">
        <span className="mb-2 block text-sm font-medium text-white/80">{session.prompts[0]}</span>
        <textarea
          rows={3}
          maxLength={500}
          value={responses.supportiveAction || ""}
          onChange={(event) => setResponse("supportiveAction", event.target.value)}
          placeholder="A small, kind next step…"
          className={fieldClassName + " resize-y"}
        />
      </label>
      <p className="text-xs text-white/35">You can change the phrase or leave the reflection blank.</p>
    </div>
  );
}

function AmbientSoundscape() {
  const contextRef = useRef(null);
  const sourceRef = useRef(null);
  const gainRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(25);
  const [audioError, setAudioError] = useState("");

  useEffect(() => {
    if (gainRef.current && contextRef.current) {
      gainRef.current.gain.setTargetAtTime((volume / 100) * 0.025, contextRef.current.currentTime, 0.15);
    }
  }, [volume]);

  function stopSound() {
    try {
      sourceRef.current?.stop();
    } catch {
      // The source may already have stopped.
    }
    sourceRef.current = null;
    gainRef.current = null;
    if (contextRef.current && contextRef.current.state !== "closed") {
      contextRef.current.close().catch(() => {});
    }
    contextRef.current = null;
    setIsPlaying(false);
  }

  async function startSound() {
    setAudioError("");
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      setAudioError("Your browser does not support generated ambient audio. You can continue in silence.");
      return;
    }

    try {
      const context = new AudioContextClass();
      await context.resume();
      const bufferLength = context.sampleRate * 3;
      const buffer = context.createBuffer(1, bufferLength, context.sampleRate);
      const channel = buffer.getChannelData(0);
      for (let index = 0; index < bufferLength; index += 1) {
        channel[index] = (Math.random() * 2 - 1) * 0.35;
      }

      const source = context.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const filter = context.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 520;
      filter.Q.value = 0.25;

      const gain = context.createGain();
      gain.gain.value = (volume / 100) * 0.025;

      source.connect(filter);
      filter.connect(gain);
      gain.connect(context.destination);
      source.start();

      contextRef.current = context;
      sourceRef.current = source;
      gainRef.current = gain;
      setIsPlaying(true);
    } catch {
      setAudioError("Ambient audio could not start. You can continue in silence.");
      stopSound();
    }
  }

  useEffect(() => () => {
    try {
      sourceRef.current?.stop();
    } catch {
      // Ignore cleanup errors.
    }
    if (contextRef.current && contextRef.current.state !== "closed") {
      contextRef.current.close().catch(() => {});
    }
  }, []);

  return (
    <div className="rounded-2xl border border-indigo-300/15 bg-gradient-to-br from-indigo-950/70 to-[#101426] p-5 sm:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-300/20 bg-indigo-300/10 text-indigo-200">
            <Headphones size={22} />
          </div>
          <div>
            <p className="font-semibold text-white">Soft ambient noise</p>
            <p className="mt-1 text-xs text-white/40">Generated locally in your browser</p>
          </div>
        </div>
        <button
          type="button"
          onClick={isPlaying ? stopSound : startSound}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-indigo-200/20 bg-indigo-200/10 px-5 py-3 text-sm font-medium text-indigo-100 transition hover:bg-indigo-200/15"
        >
          {isPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
          {isPlaying ? "Stop sound" : "Play ambient sound"}
        </button>
      </div>
      <div className="my-6 flex h-16 items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-black/15 px-4">
        {Array.from({ length: 36 }, (_, index) => (
          <motion.span
            key={index}
            className="w-1 rounded-full bg-indigo-200/55"
            animate={isPlaying ? { height: [8, 15 + ((index * 7) % 32), 10 + ((index * 3) % 19)] } : { height: 5 }}
            transition={isPlaying ? { duration: 1.4 + (index % 5) * 0.2, repeat: Infinity, repeatType: "mirror", delay: index * 0.025 } : { duration: 0.3 }}
          />
        ))}
      </div>
      <label className="flex items-center gap-3 text-xs text-white/50">
        <Volume2 size={15} />
        <span>Volume</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          className="min-w-0 flex-1 accent-indigo-300"
          aria-label="Ambient sound volume"
        />
        <span className="w-9 text-right tabular-nums">{volume}%</span>
      </label>
      {audioError && <p role="status" className="mt-3 text-xs text-amber-200/80">{audioError}</p>}
      <p className="mt-4 text-xs leading-relaxed text-white/35">This is a soft electronically generated noise layer, not a nature recording. Keep the volume comfortable or choose silence.</p>
    </div>
  );
}

function SessionActivity({ session, responses, setResponse, checkedItems, toggleItem }) {
  if (session.activityType === "breathing" || session.activityType === "breathing-478") {
    return <GuidedBreathing session={session} />;
  }
  if (session.activityType === "journal") {
    return <JournalActivity session={session} responses={responses} setResponse={setResponse} />;
  }
  if (session.activityType === "movement" || session.activityType === "reset") {
    return <ChecklistActivity session={session} checkedItems={checkedItems} toggleItem={toggleItem} />;
  }
  if (session.activityType === "senses") {
    return <SensesActivity session={session} responses={responses} setResponse={setResponse} />;
  }
  if (session.activityType === "body-scan") {
    return <BodyScanActivity session={session} checkedItems={checkedItems} toggleItem={toggleItem} />;
  }
  if (session.activityType === "self-compassion") {
    return <CompassionActivity session={session} responses={responses} setResponse={setResponse} />;
  }
  if (session.activityType === "soundscape") {
    return <AmbientSoundscape />;
  }
  return null;
}

function SessionExperience({ session }) {
  const prefersReducedMotion = useReducedMotion();
  const durationSeconds = session.durationMinutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);
  const [timerRequested, setTimerRequested] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [manuallyCompleted, setManuallyCompleted] = useState(false);
  const isTimerRunning = timerRequested && secondsLeft > 0;
  const isCompleted = manuallyCompleted || secondsLeft === 0;

  useEffect(() => {
    if (!timerRequested || secondsLeft <= 0) return undefined;
    const timeoutId = window.setTimeout(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);
    return () => window.clearTimeout(timeoutId);
  }, [timerRequested, secondsLeft]);

  const progress = Math.round(((durationSeconds - secondsLeft) / durationSeconds) * 100);
  const Icon = session.icon;
  const activeStep = session.steps[currentStep];

  function setResponse(key, value) {
    setResponses((current) => ({ ...current, [key]: value }));
  }

  function toggleItem(index) {
    setCheckedItems((current) => ({ ...current, [index]: !current[index] }));
  }

  function resetSession() {
    setSecondsLeft(durationSeconds);
    setTimerRequested(false);
    setCurrentStep(0);
    setResponses({});
    setCheckedItems({});
    setManuallyCompleted(false);
  }

  function finishSession() {
    setTimerRequested(false);
    setManuallyCompleted(true);
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/mood-checkin" className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-[#4ECDC4]">
          <ArrowLeft size={16} /> Back to Mood Check-in
        </Link>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/45">
          <Sparkles size={13} className="text-[#4ECDC4]" /> Your personal mindful moment
        </span>
      </div>

      <motion.section
        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br ${session.gradient} ${session.border} p-6 sm:p-9`}
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/[0.04] blur-3xl" />
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.16em] ${session.tagColor}`}>{session.tag}</span>
              <span className="text-xs text-white/45">For when you feel {session.label.toLowerCase()}</span>
            </div>
            <div className="mt-5 flex items-start gap-4">
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${session.border} ${session.iconBg}`}>
                <Icon size={27} className={session.iconColor} />
              </div>
              <div>
                <h1 className="font-display text-3xl font-medium leading-tight text-white sm:text-4xl">{session.session}</h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/60">{session.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-white/45">
                  <Clock size={14} /> {session.duration} guided experience
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-10 flex h-28 w-28 shrink-0 items-center justify-center self-center rounded-full border border-white/15 bg-black/10 text-5xl shadow-inner lg:self-auto">
            <span aria-hidden="true">{session.emoji}</span>
          </div>
        </div>
      </motion.section>

      {isCompleted ? (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-[#4ECDC4]/20 bg-[#4ECDC4]/[0.06] p-7 text-center sm:p-10"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#4ECDC4]/15 text-[#4ECDC4]">
            <CheckCircle2 size={34} />
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#4ECDC4]">A moment for yourself</p>
          <h2 className="mt-2 font-display text-3xl text-white sm:text-4xl">You showed up. That matters.</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/55">Your {session.session.toLowerCase()} is complete. Take a moment before moving on. You can return to your check-in whenever you're ready.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={resetSession} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-white/70 transition hover:border-white/30 hover:text-white">
              <RotateCcw size={15} /> Repeat session
            </button>
            <Link to="/mood-checkin" className="inline-flex items-center gap-2 rounded-full bg-[#4ECDC4] px-5 py-3 text-sm font-semibold text-[#0A0E1A] transition hover:bg-[#72ddd6]">
              Back to mood check-in <ArrowRight size={15} />
            </Link>
          </div>
        </motion.section>
      ) : (
        <>
          <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Your session timer</p>
              <div className="mt-4 flex items-end justify-between gap-3">
                <div>
                  <p className="font-display text-5xl tabular-nums text-white sm:text-6xl">{formatTime(secondsLeft)}</p>
                  <p className="mt-2 text-xs text-white/40">Time remaining · {session.duration} total</p>
                </div>
                <div className="mb-1 rounded-2xl border border-[#4ECDC4]/15 bg-[#4ECDC4]/[0.07] p-3 text-[#4ECDC4]">
                  <Clock size={22} />
                </div>
              </div>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-[#4ECDC4] to-[#8be2d9]" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setTimerRequested((current) => !current)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#4ECDC4] px-4 py-3 text-sm font-semibold text-[#0A0E1A] transition hover:bg-[#72ddd6]"
                >
                  {isTimerRunning ? <Pause size={15} /> : <Play size={15} />}
                  {isTimerRunning ? "Pause timer" : "Start timer"}
                </button>
                <button type="button" onClick={() => { setSecondsLeft(durationSeconds); setTimerRequested(false); }} aria-label="Reset timer" className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-3 text-white/65 transition hover:border-white/25 hover:text-white">
                  <RotateCcw size={15} />
                </button>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-white/35">The timer is a gentle guide, not a test. Pause, reset or finish whenever you need to.</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4ECDC4]">Guided flow</p>
                <span className="text-xs tabular-nums text-white/40">Step {currentStep + 1} of {session.steps.length}</span>
              </div>
              <div className="mt-4 flex gap-1.5" aria-label={`Step ${currentStep + 1} of ${session.steps.length}`}>
                {session.steps.map((step, index) => (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => setCurrentStep(index)}
                    aria-label={`Go to step ${index + 1}: ${step.title}`}
                    className={`h-1.5 flex-1 rounded-full transition ${index <= currentStep ? "bg-[#4ECDC4]" : "bg-white/10"}`}
                  />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mt-6 min-h-32"
                >
                  <h2 className="font-display text-2xl text-white sm:text-3xl">{activeStep.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-white/55">{activeStep.detail}</p>
                </motion.div>
              </AnimatePresence>
              <div className="mt-5 flex items-center justify-between gap-3">
                <button type="button" onClick={() => setCurrentStep((step) => Math.max(0, step - 1))} disabled={currentStep === 0} className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-white/55 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-25">
                  <ChevronLeft size={16} /> Previous
                </button>
                <button type="button" onClick={() => setCurrentStep((step) => Math.min(session.steps.length - 1, step + 1))} disabled={currentStep === session.steps.length - 1} className="inline-flex items-center gap-1 rounded-full border border-[#4ECDC4]/25 px-4 py-2 text-sm text-[#7bded6] transition hover:bg-[#4ECDC4]/10 disabled:cursor-not-allowed disabled:opacity-25">
                  Next step <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">Your activity</p>
              <h2 className="mt-2 font-display text-2xl text-white sm:text-3xl">{session.activityTitle}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/50">{session.activityDescription}</p>
            </div>
            <SessionActivity
              session={session}
              responses={responses}
              setResponse={setResponse}
              checkedItems={checkedItems}
              toggleItem={toggleItem}
            />
            {session.safetyNote && (
              <div role="note" className="mt-6 rounded-xl border border-amber-300/15 bg-amber-300/[0.06] p-4 text-xs leading-relaxed text-amber-100/75">
                <strong className="font-semibold text-amber-100">A gentle safety note: </strong>
                {session.safetyNote}
              </div>
            )}
            {session.footerNote && <p className="mt-5 border-t border-white/8 pt-4 text-xs leading-relaxed text-white/35">{session.footerNote}</p>}
          </section>

          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.025] p-5 sm:flex-row">
            <p className="max-w-xl text-xs leading-relaxed text-white/35">Your activity responses are held in this page only. Session completion is not currently stored in your account.</p>
            <button type="button" onClick={finishSession} className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#4ECDC4] px-6 py-3 text-sm font-semibold text-[#0A0E1A] transition hover:bg-[#72ddd6] sm:w-auto">
              Finish session <CheckCircle2 size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function SessionPage() {
  const { moodId } = useParams();
  const session = getMoodSession(moodId);

  if (!session) return <Navigate to="/mood-checkin" replace />;

  return <SessionExperience key={session.id} session={session} />;
}
