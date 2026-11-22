
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onRegister }) {

    // Mobile menu state
    const [menuOpen, setMenuOpen] = useState(false);

    // Logout loading and error states
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [logoutError, setLogoutError] = useState("");

    // Access authentication data and functions
    const { user, isAuthenticated, logout } = useAuth();

    // Navigation function
    const navigate = useNavigate();

    // Handle logout
    async function handleLogout() {
        try {
            setLogoutError("");
            setLogoutLoading(true);

            // Call backend logout through AuthContext
            await logout();

            // Close mobile menu
            setMenuOpen(false);

            // Redirect to home page
            navigate("/", { replace: true });

        } catch (error) {
            console.error("Logout failed:", error);
            setLogoutError(error.message || "Unable to logout. Please try again.");
        } finally {
            setLogoutLoading(false);
        }
    }

    // Handle Get Started button
    function handleRegister() {
        setMenuOpen(false);
        onRegister();
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-midnight/80 backdrop-blur-xl border-b border-white/5 py-4 px-6">

            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-2"
                    onClick={() => setMenuOpen(false)}
                >
                    <span className="text-aurora text-lg">✦</span>

                    <span className="font-display italic text-3xl text-white">
                        Serenity
                    </span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-8">

                    <a href="#features" className="text-white/60 hover:text-aurora text-sm transition-colors">
                        Features
                    </a>

                    <a href="#how-it-works" className="text-white/60 hover:text-aurora text-sm transition-colors">
                        How It Works
                    </a>

                    <a href="#community" className="text-white/60 hover:text-aurora text-sm transition-colors">
                        Community
                    </a>

                    <a href="#blog" className="text-white/60 hover:text-aurora text-sm transition-colors">
                        Blog
                    </a>

                    <a href="#faq" className="text-white/60 hover:text-aurora text-sm transition-colors">
                        FAQ
                    </a>

                </div>

                {/* Desktop Authentication Actions */}
                <div className="hidden md:flex items-center gap-4">

                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/account"
                                className="text-white/80 hover:text-aurora text-sm transition-colors"
                            >
                                My Account
                            </Link>

                            <button
                                type="button"
                                onClick={handleLogout}
                                disabled={logoutLoading}
                                className="btn-aurora px-5 py-2.5 rounded-full text-sm disabled:opacity-50"
                            >
                                {logoutLoading ? "Logging out..." : "Logout"}
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-white/80 hover:text-aurora text-sm transition-colors"
                            >
                                Login
                            </Link>

                            <button
                                type="button"
                                onClick={handleRegister}
                                className="btn-aurora px-5 py-2.5 rounded-full text-sm"
                            >
                                Get Started
                            </button>
                        </>
                    )}

                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    className="md:hidden text-white text-2xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? "✕" : "☰"}
                </button>

            </div>

            {/* Mobile Navigation Menu */}
            {menuOpen && (
                <div className="md:hidden flex flex-col items-center gap-6 py-8 border-t border-white/5 mt-4">

                    <a href="#features" onClick={() => setMenuOpen(false)} className="text-white/70 text-lg">
                        Features
                    </a>

                    <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="text-white/70 text-lg">
                        How It Works
                    </a>

                    <a href="#community" onClick={() => setMenuOpen(false)} className="text-white/70 text-lg">
                        Community
                    </a>

                    <a href="#blog" onClick={() => setMenuOpen(false)} className="text-white/70 text-lg">
                        Blog
                    </a>

                    <a href="#faq" onClick={() => setMenuOpen(false)} className="text-white/70 text-lg">
                        FAQ
                    </a>

                    {/* Mobile Authentication Actions */}
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/account"
                                onClick={() => setMenuOpen(false)}
                                className="text-white/80 text-lg hover:text-aurora"
                            >
                                My Account
                            </Link>

                            <button
                                type="button"
                                onClick={handleLogout}
                                disabled={logoutLoading}
                                className="btn-aurora px-8 py-3 rounded-full disabled:opacity-50"
                            >
                                {logoutLoading ? "Logging out..." : "Logout"}
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                className="text-white/80 text-lg hover:text-aurora"
                            >
                                Login
                            </Link>

                            <button
                                type="button"
                                onClick={handleRegister}
                                className="btn-aurora px-8 py-3 rounded-full"
                            >
                                Get Started
                            </button>
                        </>
                    )}

                </div>
            )}

            {/* Logout Error Message */}
            {logoutError && (
                <p className="text-red-400 text-center text-sm mt-3">
                    {logoutError}
                </p>
            )}

        </nav>
    );
}

/**
AuthContext is the central place where authentication information is stored.

user:	                Contains the logged-in user's name and email
isAuthenticated:	    true if logged in, otherwise false
logout:	              Calls the backend logout endpoint and clears the frontend user state



Is user authenticated?
       |
    YES | NO
     |    |
     v    v
 Account  Login
 Logout   Get Started

 
 */