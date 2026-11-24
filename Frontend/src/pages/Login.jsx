import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";

const inputClassName =
  "w-full rounded-xl border border-white/10 bg-[#0A0E1A]/65 px-4 py-3.5 text-sm text-white placeholder:text-white/35 outline-none transition duration-200 focus:border-aurora/70 focus:ring-2 focus:ring-aurora/15";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState(location.state?.email || "");
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
        password,
      });

      // Preserve Serenity's existing post-login destination.
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout variant="login">
      <div className="mb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-aurora">
          Your space is waiting
        </p>
        <h2
          id="auth-title"
          className="font-display text-4xl font-medium tracking-tight text-white sm:text-[2.7rem]"
        >
          Welcome back
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/55">
          Sign in and continue your wellness journey.
        </p>
      </div>

       {registered && (
        <div
          role="status"
          className="mb-6 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.08] p-3.5 text-sm leading-6 text-emerald-200"
        >
          Your account was created successfully. Please sign in to continue.
        </div>
      )}

      <form onSubmit={handleSubmit} aria-labelledby="auth-title" className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-white/85"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            maxLength={255}
            autoComplete="email"
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-white/85"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className={`${inputClassName} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-white/45 transition hover:text-aurora focus-visible:outline focus-visible:outline-2 focus-visible:outline-aurora"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-400/20 bg-red-400/[0.08] p-3.5 text-sm leading-6 text-red-200"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-aurora mt-2 flex w-full items-center justify-center rounded-xl px-4 py-3.5 text-sm font-semibold shadow-[0_10px_30px_rgba(78,205,196,0.12)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in to Serenity"}
        </button>
      </form>

      <div className="mt-7 border-t border-white/[0.08] pt-6 text-center">
        <p className="text-sm text-white/55">
          New to Serenity?{" "}
          <Link
            to="/register"
            className="font-semibold text-aurora transition hover:text-white"
          >
            Create an account
          </Link>
        </p>
      </div>

      <Link
        to="/"
        className="mt-5 flex items-center justify-center text-xs text-white/40 transition hover:text-aurora"
      >
        <span aria-hidden="true" className="mr-2">←</span>
        Back to Serenity
      </Link>
    </AuthLayout>
  )
}