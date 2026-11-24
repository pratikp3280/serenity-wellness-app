
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import AppSidebar from "../components/authenticated/AppSidebar";
import AppHeader from "../components/authenticated/AppHeader";
import MobileBottomNav from "../components/authenticated/MobileBottomNav";

export default function AuthenticatedLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const handleLogout = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);
      setLogoutError("");

      await logout();

      navigate("/", { replace: true });
    } catch (error) {
      setLogoutError(
        error.message || "Unable to log out. Please try again."
      );
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-midnight text-white flex">

      {/* Desktop Sidebar */}
      <AppSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((previous) => !previous)}
        onLogout={handleLogout}
        loggingOut={loggingOut}
      />

      {/* Main Application Area */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Shared Header */}
        <AppHeader />

        {/* Page Content */}
        <main className="flex-1 min-w-0 px-4 py-6 sm:px-6 lg:px-8 pb-28 md:pb-8">

          {logoutError && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-400/20
                bg-red-400/10 px-4 py-3 text-sm text-red-300"
            >
              {logoutError}
            </div>
          )}

          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

    </div>
  );
}
