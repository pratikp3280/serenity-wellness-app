import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BrandMark from "./BrandMark";

export default function Navbar({ onRegister }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      setLogoutError("");
      setLogoutLoading(true);
      await logout();
      setMenuOpen(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      setLogoutError(error.message || "Unable to logout. Please try again.");
    } finally {
      setLogoutLoading(false);
    }
  }

  function handleRegister() {
    setMenuOpen(false);
    onRegister?.();
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Programs", href: "#programs" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Blog", href: "#blog" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-midnight/80 px-6 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <BrandMark className="h-9 w-9" />

          <span className="font-display italic text-3xl text-white">
            Serenity
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="whitespace-nowrap text-sm text-white/60 transition-colors hover:text-aurora"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop authentication actions */}
        <div className="hidden items-center gap-4 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                to="/account"
                className="text-sm text-white/80 transition-colors hover:text-aurora"
              >
                My Account
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutLoading}
                className="btn-aurora rounded-full px-5 py-2.5 text-sm disabled:opacity-50"
              >
                {logoutLoading ? "Logging out..." : "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-white/80 transition-colors hover:text-aurora"
              >
                Login
              </Link>
              <button
                type="button"
                onClick={handleRegister}
                className="btn-aurora rounded-full px-5 py-2.5 text-sm"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="text-2xl text-white md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="mt-4 flex flex-col items-center gap-5 border-t border-white/5 py-7 md:hidden">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              className="text-base text-white/70 transition-colors hover:text-aurora"
            >
              {item.label}
            </a>
          ))}

          {isAuthenticated ? (
            <>
              <Link
                to="/account"
                onClick={closeMenu}
                className="text-base text-white/80 hover:text-aurora"
              >
                My Account
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutLoading}
                className="btn-aurora rounded-full px-8 py-3 disabled:opacity-50"
              >
                {logoutLoading ? "Logging out..." : "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="text-base text-white/80 hover:text-aurora"
              >
                Login
              </Link>
              <button
                type="button"
                onClick={handleRegister}
                className="btn-aurora rounded-full px-8 py-3"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      )}

      {logoutError && (
        <p role="alert" className="mt-3 text-center text-sm text-red-400">
          {logoutError}
        </p>
      )}
    </nav>
  );
}
