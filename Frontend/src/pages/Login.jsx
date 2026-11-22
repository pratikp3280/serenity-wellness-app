
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated, authLoading } = useAuth();

    const [email, setEmail] = useState(
        location.state?.email || ""
    );

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const registered = location.state?.registered === true;

   async function handleSubmit(event) {

    event.preventDefault();
    setError("");

    try {

        setLoading(true);

        await login({
            email: email.trim(),
            password: password
        });

        navigate("/dashboard", { replace: true });

    } catch (err) {

        setError(
            err.message || "Unable to log in. Please try again."
        );

    } finally {

        setLoading(false);

    }
}

    return (
        <div className="min-h-screen bg-midnight flex items-center justify-center px-4 py-12">

            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl">

                {/* Header */}
                <div className="mb-8 text-center">

                    <h1 className="text-3xl font-bold text-white">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Continue your wellness journey with Serenity.
                    </p>

                </div>

                {/* Registration confirmation */}
                {registered && (
                    <div
                        role="status"
                        className="mb-5 rounded-lg bg-green-500/10 p-3 text-sm text-green-300"
                    >
                        Your account was created successfully.
                        Please log in to continue.
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>

                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-200"
                        >
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="you@example.com"
                            maxLength={255}
                            autoComplete="email"
                            required
                            className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-400"
                        />

                    </div>

                    {/* Password */}
                    <div>

                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-200"
                        >
                            Password
                        </label>

                        <div className="relative">

                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                required
                                className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 pr-12 text-white placeholder-gray-400 outline-none focus:border-purple-400"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                                {showPassword ? (
                                    <Eye size={20} />
                                ) : (
                                    <EyeOff size={20} />
                                )}
                            </button>

                        </div>

                    </div>

                    {/* Error */}
                    {error && (
                        <p
                            role="alert"
                            className="rounded-lg bg-red-500/10 p-3 text-sm text-red-300"
                        >
                            {error}
                        </p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-purple-600 px-4 py-3 font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                </form>

                {/* Registration navigation */}
                <p className="mt-6 text-center text-sm text-gray-400">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-purple-400 hover:text-purple-300"
                    >
                        Create Account
                    </Link>
                </p>

                {/* Home navigation */}
                <Link
                    to="/"
                    className="mt-5 block text-center text-sm text-gray-400 transition hover:text-white"
                >
                    ← Back to Serenity
                </Link>

            </div>

        </div>
    );
}
