
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Heart,
  History,
  ChartLine,
  UserRound,
} from "lucide-react";

const navigationItems = [
  {
    label: "Home",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Mood",
    path: "/mood-checkin",
    icon: Heart,
  },
  {
    label: "History",
    path: "/mood-history",
    icon: History,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: ChartLine,
  },
  {
    label: "Profile",
    path: "/account",
    icon: UserRound,
  },
];

export default function MobileBottomNav() {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40
        bg-[#0A0E1A]/95 backdrop-blur-xl
        border-t border-white/10"
    >
      <div className="grid grid-cols-5 px-2 pt-2 pb-3">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 py-2
                transition-colors
                ${
                  isActive
                    ? "text-[#4ECDC4]"
                    : "text-gray-500 hover:text-gray-300"
                }`
              }
            >
              <Icon size={21} />

              <span className="text-[11px] font-medium">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
