import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { apiRequest } from "../services/api";
import AuthLayout from "../components/AuthLayout";

const inputClassName =
  "w-full rounded-xl border border-white/10 bg-[#0A0E1A]/65 px-4 py-3.5 text-sm text-white placeholder:text-white/35 outline-none transition duration-200 focus:border-aurora/70 focus:ring-2 focus:ring-aurora/15";

export default function Register({ onBack }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    const registeredEmail = formData.email.trim();

    try {
      setLoading(true);

      // Keep the existing Spring Boot registration endpoint and payload.
      await apiRequest("/api/auth/register", {
        method: "POST",
        body: {
          fullName: formData.fullName.trim(),
          email: registeredEmail,
          password: formData.password,
        },
      });

      // Keep the existing flow: successful registration -> Login page.
      navigate("/login", {
        replace: true,
        state: {
          registered: true,
          email: registeredEmail,
        },
      });
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    if (onBack) {
      onBack();
    } else {
      navigate("/");
    }
  }

  return (
    <AuthLayout variant="register">
      <div className="mb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-aurora">
          A fresh start begins here
        </p>
        <h2
          id="auth-title"
          className="font-display text-4xl font-medium tracking-tight text-white sm:text-[2.7rem]"
        >
          Create your account
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/55">
          A few details are all it takes to begin.
        </p>
      </div>

      <form onSubmit={handleSubmit} aria-labelledby="auth-title" className="space-y-5">
        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-medium text-white/85"
          >
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            maxLength={100}
            autoComplete="name"
            required
            className={inputClassName}
          />
        </div>

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
            value={formData.email}
            onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              minLength={8}
              maxLength={72}
              autoComplete="new-password"
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
          <p className="mt-2 text-xs text-white/35">
            Use at least 8 characters.
          </p>
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
          {loading ? "Creating account..." : "Create your account"}
        </button>
      </form>

      <div className="mt-7 border-t border-white/[0.08] pt-6 text-center">
        <p className="text-sm text-white/55">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-aurora transition hover:text-white"
          >
            Sign in
          </Link>
        </p>
      </div>

      <button
        type="button"
        onClick={handleBack}
        className="mt-5 flex w-full items-center justify-center text-xs text-white/40 transition hover:text-aurora"
      >
        <span aria-hidden="true" className="mr-2">←</span>
        Back to Serenity
      </button>
    </AuthLayout>
  );
}
