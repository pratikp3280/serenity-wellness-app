
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import BrandMark from "./BrandMark";

// Reuse the same visual frame for Login and Register so both pages
// feel like one consistent Serenity experience.
const AUTH_IMAGE =
  "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1800&q=90";

export default function AuthLayout({ children, variant = "login" }) {
  const isRegister = variant === "register";

  return (
    <main className="min-h-screen bg-midnight px-4 py-4 text-white sm:px-6 sm:py-6 lg:px-8 lg:py-8">

      {/*
        Mobile / Tablet:
        Only the form card is displayed.

        Desktop:
        Two cards with a 60:40 width ratio.
        Both cards have matching minimum heights.
      */}

      <div className="mx-auto grid w-full max-w-[560px] grid-cols-1 gap-6 xl:w-[90%] xl:max-w-[1600px] xl:grid-cols-[3fr_2fr] xl:gap-5">

        {/* LEFT CARD: Image and Serenity message
            Visible only on desktop (1280px and above). */}

        <section className="relative isolate hidden min-h-0 overflow-hidden rounded-[28px] border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.28)] xl:flex xl:min-h-[calc(80vh_-_3.2rem)] xl:flex-col xl:justify-between">

          {/* Background image only: opacity does not affect the text */}
          <img
            src={AUTH_IMAGE}
            alt="A peaceful person practising meditation in nature"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-30"
          />

          {/* Dark overlays keep the message readable */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-[#070c17]/65 via-[#0A0E1A]/45 to-[#0A0E1A]/75"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-aurora/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
          />

          {/* Matching inner spacing for the left and right cards */}
          <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-between p-7 sm:p-9 lg:p-10 xl:p-12">

            {/* Brand */}
            <div>
              <Link
                to="/"
                aria-label="Serenity homepage"
                className="inline-flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-aurora focus-visible:outline-offset-4"
              >
                {/* Official Serenity Lotus Logo */}
                <BrandMark className="h-12 w-12 shrink-0" />

                <span className="font-display text-3xl font-medium tracking-wide text-white">
                  Serenity
                </span>
              </Link>
            </div>

            {/* Brand message */}
            <div className="max-w-2xl py-10 lg:py-8">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-midnight/35 px-3.5 py-2 text-[11px] font-medium tracking-[0.18em] text-white/85 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-aurora shadow-[0_0_12px_rgba(78,205,196,0.8)]" />

                {isRegister
                  ? "YOUR JOURNEY STARTS HERE"
                  : "WELCOME BACK TO YOUR SPACE"}
              </div>

              <h1 className="max-w-xl font-display text-4xl font-light leading-[1.08] text-white sm:text-5xl xl:text-6xl">

                {isRegister ? (
                  <>
                    Make room for a
                    <br />
                    <span className="gradient-text italic">calmer you.</span>
                  </>
                ) : (
                  <>
                    A little more calm.
                    <br />
                    <span className="gradient-text italic">
                      A little more you.
                    </span>
                  </>
                )}

              </h1>

              <p className="mt-5 max-w-lg text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
                {isRegister
                  ? "Build a simple habit of checking in with yourself. Start small, find your rhythm, and make space for wellbeing in everyday life."
                  : "Your space to pause, reflect, and reconnect with yourself is right here. Pick up your wellness journey one mindful moment at a time."}
              </p>

              <div className="mt-7 max-w-lg border-l border-aurora/60 pl-5 sm:mt-9">

                <p className="font-display text-xl italic leading-relaxed text-white/95 sm:text-2xl">
                  “You don't have to do it all today. Just take one mindful
                  step.”
                </p>

                <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/55">
                  A gentle reminder from Serenity
                </p>

              </div>
            </div>

            {/* Product areas */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs tracking-wide text-white/70">
              <span>Mood check-ins</span>
              <span className="text-aurora/80">•</span>
              <span>Guided breathing</span>
              <span className="text-aurora/80">•</span>
              <span>Mood insights</span>
            </div>

          </div>
        </section>


        {/* RIGHT CARD: Login or Register form
            Visible on all screen sizes. */}

        <section
          aria-label={
            isRegister ? "Create a Serenity account" : "Sign in to Serenity"
          }
          className="relative isolate flex min-h-0 w-full items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-[#111827]/90 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-9 lg:p-10 xl:min-h-[calc(80vh_-_3.2rem)]"
        >

          {/* Subtle ambient lighting inside the form card */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 top-10 h-80 w-80 rounded-full bg-aurora/[0.07] blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-gold/[0.05] blur-3xl"
          />


          <div className="relative z-10 mx-auto w-full max-w-[440px]">

            {/* Mobile / Tablet Brand Header */}
            <div className="mb-7 flex items-center justify-between xl:hidden">

              <Link
                to="/"
                aria-label="Serenity homepage"
                className="inline-flex items-center gap-2.5"
              >
                <BrandMark className="h-10 w-10 shrink-0" />

                <span className="font-display text-2xl font-medium tracking-wide text-white">
                  Serenity
                </span>
              </Link>

              {/* Existing home navigation */}
              <Link
                to="/"
                className="inline-flex items-center gap-1 text-xs text-white/55 transition hover:text-aurora"
              >
                Back to Serenity
                <ArrowUpRight size={13} />
              </Link>

            </div>

            {/* Login.jsx or Register.jsx renders here */}
            {children}

          </div>
        </section>

      </div>
    </main>
  );
}
