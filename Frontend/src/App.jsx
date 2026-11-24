import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthenticatedLayout from "./Layouts/AuthenticatedLayout";
import ProgramsPage from "./pages/ProgramsPage";

// Main pages
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";

// Mood pages
import MoodCheckIn from "./pages/MoodCheckIn";
import MoodHistory from "./pages/MoodHistory";
import Analytics from "./pages/Analytics";

// Blog pages
import Blogs from "./pages/Blogs";
import BlogArticle from "./pages/BlogArticle";

// Mood-based session page
import SessionPage from "./pages/SessionPage";

// Registration navigation wrapper
function RegisterPage() {
  const navigate = useNavigate();

  return <Register onBack={() => navigate("/")} />;
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
              {/* Dashboard */}
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Account */}
              <Route path="/account" element={<Account />} />

              {/* Mood Features */}
              <Route path="/mood-checkin" element={<MoodCheckIn />} />

               <Route path="/programs" element={<ProgramsPage />} />


              <Route path="/mood-history" element={<MoodHistory />} />

              <Route path="/analytics" element={<Analytics />} />

              {/* Serenity Journal */}
              <Route path="/blogs" element={<Blogs />} />

              <Route path="/blogs/:slug" element={<BlogArticle />} />

              {/* Individual Mood-Based Sessions */}
              <Route path="/sessions/:moodId" element={<SessionPage />} />
            </Route>
          </Route>

          {/* Unknown URLs */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
