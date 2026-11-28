export async function onRequest({ request, env }) {
    const backendOrigin = env.BACKEND_ORIGIN;

    if (!backendOrigin) {
        return new Response(
            "BACKEND_ORIGIN is not configured.",
            { status: 500 }
        );
    }

    let backendUrl;

    try {
        const parsedOrigin = new URL(backendOrigin);

        if (parsedOrigin.protocol !== "https:") {
            throw new Error("HTTPS is required.");
        }

        const incomingUrl = new URL(request.url);

        backendUrl = new URL(
            incomingUrl.pathname + incomingUrl.search,
            parsedOrigin.origin
        );
    } catch {
        return new Response(
            "BACKEND_ORIGIN must be a valid HTTPS origin.",
            { status: 500 }
        );
    }

    // Preserve the original method, headers, cookies and request body.
    const proxyRequest = new Request(backendUrl.toString(), request);

    // Forward the response, including Set-Cookie headers.
    return fetch(proxyRequest);
}