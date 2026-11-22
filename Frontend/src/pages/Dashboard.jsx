
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  Heart,
  History,
  UserRound,
  Sparkles,
  ArrowUpRight,
  Wind,
  Flower2,
} from "lucide-react";

const quickActions = [
  {
    title: "How are you feeling?",
    description: "Take a moment to check in with yourself.",
    path: "/mood-checkin",
    action: "Record your mood",
    icon: Heart,
    accent: "text-[#4ECDC4]",
    background: "bg-[#4ECDC4]/10",
    border: "border-[#4ECDC4]/20",
  },
  {
    title: "Your mood journey",
    description: "Look back at your previous mood entries.",
    path: "/mood-history",
    action: "Explore history",
    icon: History,
    accent: "text-purple-300",
    background: "bg-purple-400/10",
    border: "border-purple-400/20",
  },
  {
    title: "Your profile",
    description: "View your personal account information.",
    path: "/account",
    action: "View profile",
    icon: UserRound,
    accent: "text-amber-300",
    background: "bg-amber-400/10",
    border: "border-amber-400/20",
  },
];

export default function Dashboard() {
  const { user } = useAuth();

  const firstName = user?.fullName?.trim()?.split(/\s+/)[0] || "there";

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* Welcome Section */}
      <section className="relative overflow-hidden rounded-3xl
        border border-[#4ECDC4]/20
        bg-gradient-to-br from-[#142A32] via-[#101D2A] to-[#111426]
        p-7 sm:p-10"
      >
        <div className="absolute -right-16 -top-16 w-64 h-64
          rounded-full bg-[#4ECDC4]/10 blur-3xl"
        />

        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-[#4ECDC4] mb-4">
            <Sparkles size={18} />
            <span className="text-xs uppercase tracking-[0.2em]">
              Your personal wellness space
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl
            text-white leading-tight"
          >
            Welcome back, {firstName}.
          </h2>

          <p className="mt-4 text-gray-300 leading-relaxed max-w-xl">
            Every small step towards understanding yourself matters.
            Take a breath, check in with your feelings, and make
            space for your wellbeing today.
          </p>

          <Link
            to="/mood-checkin"
            className="inline-flex items-center gap-2 mt-7
              rounded-xl bg-[#4ECDC4] px-5 py-3
              text-sm font-semibold text-[#0A0E1A]
              hover:bg-[#68ddd5] transition-colors"
          >
            <Heart size={17} />
            Check in with your mood
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <div className="mb-5">
          <h2 className="font-display text-3xl text-white">
            Your wellness space
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            Everything you need to stay connected with yourself.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {quickActions.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group rounded-2xl border ${item.border}
                  bg-white/[0.03] p-6
                  hover:bg-white/[0.06]
                  hover:-translate-y-1
                  transition-all duration-300`}
              >
                <div className={`w-12 h-12 rounded-xl ${item.background}
                  flex items-center justify-center mb-5`}
                >
                  <Icon size={23} className={item.accent} />
                </div>

                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                  {item.description}
                </p>

                <div className={`flex items-center gap-2 mt-6
                  text-sm font-medium ${item.accent}`}
                >
                  {item.action}
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-1
                      group-hover:-translate-y-1 transition-transform"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Wellness Reminder */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <div className="rounded-2xl border border-white/10
          bg-white/[0.03] p-6 sm:p-7"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-purple-400/10
              flex items-center justify-center"
            >
              <Wind size={22} className="text-purple-300" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">
                Take a mindful pause
              </h3>

              <p className="text-xs text-gray-500">
                A little breathing space
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">
            You don't have to figure everything out right now.
            Pause for a moment, relax your shoulders, and take
            a slow, comfortable breath.
          </p>
        </div>

        <div className="rounded-2xl border border-[#4ECDC4]/15
          bg-[#4ECDC4]/[0.04] p-6 sm:p-7"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-[#4ECDC4]/10
              flex items-center justify-center"
            >
              <Flower2 size={22} className="text-[#4ECDC4]" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">
                A gentle reminder
              </h3>

              <p className="text-xs text-gray-500">
                Your wellbeing matters
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">
            Progress isn't always about feeling happy.
            Understanding your emotions, accepting them,
            and taking one small step is progress too.
          </p>
        </div>

      </section>
    </div>
  );
}
