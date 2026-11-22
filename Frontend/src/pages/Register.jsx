import { useState } from "react";
import { apiRequest } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Register({ onBack }) {
  const navigate = useNavigate();

  // Store the values entered by the user.
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // Track submission and error states.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Update the corresponding field whenever the user types.
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  // Submit registration details to Spring Boot.
  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    // Preserve the registered email for the Login page.
    const registeredEmail = formData.email.trim();

    try {
      setLoading(true);

      // Step 1: Register the user with Spring Boot.
      await apiRequest("/api/auth/register", {
        method: "POST",
        body: {
          fullName: formData.fullName.trim(),
          email: registeredEmail,
          password: formData.password,
        },
      });

      // Step 2: Redirect to Login after successful registration.
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

  return (
    <div className="min-h-screen bg-midnight flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Join Serenity</h1>

          <p className="mt-2 text-gray-400">
            Create your account and begin your wellness journey.
          </p>
        </div>

        {/* Registration form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full name */}
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Full Name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              maxLength={100}
              required
              className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-400"
            />
          </div>

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
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              maxLength={255}
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

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              minLength={8}
              maxLength={72}
              required
              className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-400"
            />
          </div>

          {/* Error message */}
          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-500/10 p-3 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-purple-600 px-4 py-3 font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Existing user login navigation */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-purple-400 hover:text-purple-300 transition"
          >
            Sign In
          </Link>
        </p>

        {/* Return to landing page */}
        <button
          type="button"
          onClick={onBack}
          className="mt-6 w-full text-center text-sm text-gray-400 transition hover:text-white"
        >
          ← Back to Serenity
        </button>
      </div>
    </div>
  );
}
