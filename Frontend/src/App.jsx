import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthenticatedLayout from "./Layouts/AuthenticatedLayout";

import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";

import Account from "./pages/Account";
import MoodCheckIn from "./pages/MoodCheckIn";
import MoodHistory from "./pages/MoodHistory";
import Analytics from "./pages/Analytics";

// Registration navigation wrapper
function RegisterPage() {
  const navigate = useNavigate();

  return <Register onBack={() => navigate("/")} />;
}

// Temporary dashboard until Milestone 3
function DashboardPlaceholder() {
  return (
    <section className="max-w-5xl mx-auto py-8">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
        <p className="text-sm uppercase tracking-widest text-[#4ECDC4]">
          Your wellness space
        </p>

        <h2 className="font-display text-4xl text-white mt-3">
          Welcome to Serenity
        </h2>

        <p className="text-gray-400 mt-4 leading-relaxed">
          Your personal wellness dashboard is coming together. Start by
          recording your mood or exploring your mood history.
        </p>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Homepage */}
          <Route path="/" element={<HomePage />} />

          {/* Public Authentication Pages */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Application */}
          <Route element={<ProtectedRoute />}>
            {/* Shared Authenticated Layout */}
            <Route element={<AuthenticatedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/account" element={<Account />} />

              <Route path="/mood-checkin" element={<MoodCheckIn />} />

              <Route path="/mood-history" element={<MoodHistory />} />

              <Route path="/analytics" element={<Analytics />} />
            </Route>
          </Route>

          {/* Unknown URLs */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
