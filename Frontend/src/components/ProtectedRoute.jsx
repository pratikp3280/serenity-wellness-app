/**Protected Route: A route that only allows users with a valid authenticated session to access its content. */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {

    const { isAuthenticated, authLoading } = useAuth();
    const location = useLocation();

    // Wait until the backend session check finishes.
    if (authLoading) {

        return (
            <div className="min-h-screen bg-midnight flex items-center justify-center">
                <p className="text-white">
                    Checking your Serenity session...
                </p>
            </div>
        );
    }

    // Redirect unauthenticated users to Login.
    if (!isAuthenticated) {

        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    // Allow authenticated users to access the requested page.
    return <Outlet />;
}


/**
Why is this important?


Imagine someone manually types:  http://localhost:5173/account

Without logging in.
React checks the authentication state. If no authenticated user exists, it redirects them to /login.

 * 
 */