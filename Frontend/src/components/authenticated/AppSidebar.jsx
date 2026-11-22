// Responsibility: Desktop navigation, collapsible sidebar, active-page highlighting and logout.

import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Heart,
  History,
  UserRound,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  ChartLine
} from "lucide-react";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Mood Check-in",
    path: "/mood-checkin",
    icon: Heart,
  },
  {
    label: "Mood History",
    path: "/mood-history",
    icon: History,
  },

  {
  label: "Analytics",
  path: "/analytics",
  icon: ChartLine,
},

  {
    label: "My Profile",
    path: "/account",
    icon: UserRound,
  },

  
];

export default function AppSidebar({
  collapsed,
  onToggle,
  onLogout,
  loggingOut,
}) {
  const navigate = useNavigate();

  return (
    <aside
      className={`hidden md:flex h-screen sticky top-0 flex-col
        border-r border-white/10 bg-[#0A0E1A]
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}`}
    >
      
{/* Brand */}
<div className="shrink-0 border-b border-white/10">
  {/* Serenity logo */}
  <div
    className={`h-20 flex items-center px-5 ${
      collapsed ? "justify-center" : "justify-start"
    }`}
  >
    <button
      type="button"
      onClick={() => navigate("/dashboard")}
      className="flex items-center gap-3 min-w-0"
      title="Go to Dashboard"
    >
      <Sparkles className="w-7 h-7 text-[#4ECDC4] shrink-0" />

      {!collapsed && (
        <span className="font-display text-2xl italic text-white">
          Serenity
        </span>
      )}
    </button>
  </div>

  {/* Separate sidebar toggle row */}
  <div
    className={`h-12 flex items-center px-4 ${
      collapsed ? "justify-center" : "justify-end"
    }`}
  >
    <button
      type="button"
      onClick={onToggle}
      className="w-9 h-9 flex items-center justify-center
        rounded-lg text-gray-400
        hover:text-[#4ECDC4] hover:bg-white/5
        transition-colors"
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      {collapsed ? (
        <PanelLeftOpen size={19} />
      ) : (
        <PanelLeftClose size={19} />
      )}
    </button>
  </div>
</div>


      {/* Navigation */}
      <nav className="flex-1 px-3 py-7 space-y-2">
        {!collapsed && (
          <p className="px-3 mb-4 text-xs uppercase tracking-[0.18em] text-gray-500">
            Workspace
          </p>
        )}

        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3
                transition-all duration-200
                ${
                  isActive
                    ? "bg-[#4ECDC4]/10 text-[#4ECDC4] border border-[#4ECDC4]/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }
                ${collapsed ? "justify-center" : ""}`
              }
            >
              <Icon size={20} className="shrink-0" />

              {!collapsed && (
                <span className="text-sm font-medium">
                  {item.label}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/10">
        <button
          type="button"
          onClick={onLogout}
          disabled={loggingOut}
          title={collapsed ? "Logout" : undefined}
          className={`w-full flex items-center gap-3 rounded-xl px-3 py-3
            text-gray-400 hover:text-red-400 hover:bg-red-400/10
            transition-colors disabled:opacity-50
            ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut size={20} className="shrink-0" />

          {!collapsed && (
            <span className="text-sm font-medium">
              {loggingOut ? "Logging out..." : "Logout"}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}