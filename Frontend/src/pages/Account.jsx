
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  UserRound,
  Mail,
  ShieldCheck,
  ArrowLeft,
  Heart,
} from "lucide-react";

export default function Account() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-7">

      {/* Profile Heading */}
      <section>
        <p className="text-sm text-[#4ECDC4] uppercase tracking-widest">
          Personal space
        </p>

        <h2 className="font-display text-4xl text-white mt-2">
          Your Profile
        </h2>

        <p className="text-gray-400 mt-2">
          Your account information and personal details.
        </p>
      </section>

      {/* Profile Card */}
      <section className="rounded-3xl border border-white/10
        bg-white/[0.03] p-6 sm:p-9"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">

          <div className="w-20 h-20 rounded-2xl
            bg-[#4ECDC4]/10 border border-[#4ECDC4]/20
            flex items-center justify-center"
          >
            <UserRound size={36} className="text-[#4ECDC4]" />
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white">
              {user?.fullName || "Serenity User"}
            </h3>

            <p className="text-sm text-gray-400 mt-1">
              Member of Serenity
            </p>

            <div className="flex items-center gap-2 mt-3
              text-xs text-[#4ECDC4]"
            >
              <ShieldCheck size={15} />
              Authenticated account
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 my-8" />

        <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-5">
          Account information
        </h4>

        <div className="space-y-5">

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5
              flex items-center justify-center"
            >
              <UserRound size={18} className="text-gray-400" />
            </div>

            <div>
              <p className="text-xs text-gray-500">Full name</p>
              <p className="text-sm text-white mt-1">
                {user?.fullName || "Not available"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5
              flex items-center justify-center"
            >
              <Mail size={18} className="text-gray-400" />
            </div>

            <div>
              <p className="text-xs text-gray-500">Email address</p>
              <p className="text-sm text-white mt-1">
                {user?.email || "Not available"}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Wellness Connection */}
      <section className="rounded-2xl border border-[#4ECDC4]/15
        bg-[#4ECDC4]/[0.04] p-6"
      >
        <div className="flex items-center gap-3">
          <Heart size={22} className="text-[#4ECDC4]" />

          <h3 className="text-lg font-semibold text-white">
            Your wellness journey
          </h3>
        </div>

        <p className="text-sm text-gray-400 mt-3 leading-relaxed">
          Serenity is your personal space to understand your
          emotions, reflect on your experiences, and build
          healthier wellness habits.
        </p>

        <Link
          to="/mood-checkin"
          className="inline-flex items-center gap-2 mt-5
            text-sm font-medium text-[#4ECDC4]
            hover:text-white transition-colors"
        >
          Go to Mood Check-in
          <ArrowLeft size={15} className="rotate-180" />
        </Link>
      </section>

    </div>
  );
}
