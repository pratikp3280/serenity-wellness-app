const API_BASE_URL = "";

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