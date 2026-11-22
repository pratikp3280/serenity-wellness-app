
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState
} from "react";

import { apiRequest } from "../services/api";

// Create the central authentication context.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    // Check whether an existing backend session is valid.
    const refreshUser = useCallback(async () => {

        try {
            const currentUser = await apiRequest("/api/auth/me");

            setUser(currentUser);

            return currentUser;

        } catch (error) {

            setUser(null);

            return null;

        } finally {

            setAuthLoading(false);

        }

    }, []);

    // Restore the session when the application starts.
    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    // Authenticate and retrieve the logged-in user's details.
    const login = useCallback(async (credentials) => {

        await apiRequest("/api/auth/login", {
            method: "POST",
            body: credentials
        });

        const currentUser = await apiRequest("/api/auth/me");

        setUser(currentUser);

        return currentUser;

    }, []);

    // End the backend session.
    const logout = useCallback(async () => {

        await apiRequest("/api/auth/logout", {
            method: "POST"
        });

        setUser(null);

    }, []);

    const value = {
        user,
        isAuthenticated: Boolean(user),
        authLoading,
        login,
        logout,
        refreshUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Reusable hook for accessing authentication information.
export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider."
        );
    }

    return context;
}


/*
Function:	    Responsibility:

refreshUser()	Checks /api/auth/me
login()	        Authenticates and retrieves user details
logout()	    Calls backend logout and clears React state
isAuthenticated	Tells components whether a user is logged in
authLoading	    Prevents premature authentication decisions

*/