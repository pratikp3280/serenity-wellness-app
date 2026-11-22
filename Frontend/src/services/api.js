
const API_BASE_URL = "http://localhost:8080";

// Read a cookie from the browser.
function getCookie(name) {
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
        const [key, ...valueParts] = cookie.trim().split("=");

        if (key === name) {
            return decodeURIComponent(valueParts.join("="));
        }
    }

    return null;
}

// Obtain a fresh CSRF cookie from Spring Security.
async function initializeCsrf() {
    const response = await fetch(
        `${API_BASE_URL}/api/auth/csrf`,
        {
            method: "GET",
            credentials: "include"
        }
    );

    if (!response.ok) {
        throw new Error("Unable to initialize CSRF protection.");
    }

    const csrfToken = getCookie("XSRF-TOKEN");

    if (!csrfToken) {
        throw new Error("CSRF cookie was not received.");
    }

    return csrfToken;
}

// Reusable function for all backend API requests.
export async function apiRequest(path, options = {}) {

    const method = (options.method || "GET").toUpperCase();

    const headers = {
        Accept: "application/json",
        ...options.headers
    };

    let body;

    if (options.body !== undefined) {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(options.body);
    }

    // State-changing requests require a CSRF token.
    const requiresCsrf = ![
        "GET",
        "HEAD",
        "OPTIONS",
        "TRACE"
    ].includes(method);

    if (requiresCsrf) {
        const csrfToken = await initializeCsrf();

        headers["X-XSRF-TOKEN"] = csrfToken;
    }

    const response = await fetch(
        `${API_BASE_URL}${path}`,
        {
            ...options,
            method,
            headers,
            body,
            credentials: "include"
        }
    );

    // Handle responses that contain no body.
    if (response.status === 204) {
        return null;
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(
            data?.message || `Request failed: ${response.status}`
        );
    }

    return data;
}





























/*
React Components
Login.jsx · Register.jsx · MoodSelector.jsx
        |
        V

api.js
Central API communication utility(Instead of writing cookie, CSRF and error-handling logic repeatedly in every component, we'll centralize it in one file.)
Cookies · CSRF · Requests · Errors
        |
        V

Spring Boot REST APIs
localhost:8080












Code	                What it does
API_BASE_URL	        Stores our backend address
getCookie()	            Reads the CSRF cookie
initializeCsrf()	    Requests a CSRF token from Spring Security
apiRequest()	        Sends reusable API requests
credentials:            "include"	Includes eligible session cookies
X-XSRF-TOKEN	        Sends the CSRF token in the expected header
response.ok	            Checks whether the HTTP request succeeded
*/ 