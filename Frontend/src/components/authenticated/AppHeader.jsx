import { useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const pageTitles = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Your personal wellness space",
  },
  "/mood-checkin": {
    title: "Mood Check-in",
    subtitle: "Take a moment to understand how you feel",
  },
  "/mood-history": {
    title: "Mood History",
    subtitle: "Reflect on your emotional journey",
  },
  "/account": {
    title: "My Profile",
    subtitle: "Manage your personal information",
  },
};

export default function AppHeader() {
  const { user } = useAuth();
  const location = useLocation();

  const currentPage = pageTitles[location.pathname] || {
    title: "Serenity",
    subtitle: "Your personal wellness space",
  };

  const firstName = user?.fullName?.split(" ")[0] || "there";

  return (
    <header className="sticky top-0 z-30 border-b border-white/10
      bg-[#0A0E1A]/85 backdrop-blur-xl"
    >
      <div className="min-h-20 px-5 sm:px-8 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Sparkles
              size={17}
              className="text-[#4ECDC4] md:hidden shrink-0"
            />

            <h1 className="font-display text-2xl sm:text-3xl text-white truncate">
              {currentPage.title}
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-gray-400 mt-1 truncate">
            {currentPage.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-white">
              Welcome, {firstName}
            </p>

            <p className="text-xs text-gray-500">
              Your wellness journey matters
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-[#4ECDC4]/15
            border border-[#4ECDC4]/30 flex items-center justify-center"
          >
            <span className="text-sm font-semibold text-[#4ECDC4]">
              {firstName.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
