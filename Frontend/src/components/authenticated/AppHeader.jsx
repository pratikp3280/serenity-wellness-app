
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import BrandMark from "../BrandMark";

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
  "/programs": {
    title: "Programs",
    subtitle: "Explore your mindful experiences",
  },
  "/blogs": {
    title: "Serenity Journal",
    subtitle: "Explore stories and wellness insights",
  },
  "/account": {
    title: "My Profile",
    subtitle: "Manage your personal information",
  },
  "/analytics": {
    title: "Analytics",
    subtitle: "Understand your wellness patterns",
  },
};

export default function AppHeader() {
  const { user } = useAuth();
  const location = useLocation();

  const currentPage = pageTitles[location.pathname] || {
    title: "Serenity",
    subtitle: "Your personal wellness space",
  };

  const firstName = user?.fullName?.trim()?.split(/\s+/)[0] || "there";

  return (
    <header
      className="sticky top-0 z-30 border-b border-white/10
        bg-[#0A0E1A]/85 backdrop-blur-xl"
    >
      <div className="min-h-20 px-5 sm:px-8 flex items-center justify-between gap-4">

        {/* Current Page Information */}
        <div className="min-w-0">

          <div className="flex items-center gap-2">
            <BrandMark className="w-[18px] h-[18px] md:hidden" />

            <h1 className="font-display text-2xl sm:text-3xl text-white truncate">
              {currentPage.title}
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-gray-400 mt-1 truncate">
            {currentPage.subtitle}
          </p>

        </div>

        {/* User Profile Section */}
        <div className="flex items-center gap-3 shrink-0">

          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-white">
              Welcome, {firstName}
            </p>

            <p className="text-xs text-gray-500">
              Your wellness journey matters
            </p>
          </div>

          {/* Clickable Profile Icon */}
          <Link
            to="/account"
            aria-label="Go to My Profile"
            title="My Profile"
            className="group block rounded-full focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-[#4ECDC4]
              focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0E1A]"
          >
            <div
              className="w-10 h-10 rounded-full bg-[#4ECDC4]/15
                border border-[#4ECDC4]/30
                flex items-center justify-center
                cursor-pointer
                transition-all duration-300
                group-hover:bg-[#4ECDC4]/25
                group-hover:border-[#4ECDC4]/70
                group-hover:scale-105"
            >
              <span className="text-sm font-semibold text-[#4ECDC4]">
                {firstName.charAt(0).toUpperCase()}
              </span>
            </div>
          </Link>

        </div>
      </div>
    </header>
  );
}
